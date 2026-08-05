<?php
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");
header("Access-Control-Allow-Methods: GET, POST");
header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");

$host = "localhost";
$db_name = "bjj";
$username = "root";
$password = "";

try {
    $pdo = new PDO("mysql:host=$host;dbname=$db_name;charset=utf8mb4", $username, $password);
    $pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
} catch(PDOException $e) {
    echo json_encode(["error" => "Błąd połączenia: " . $e->getMessage()]);
    exit();
}

$method = $_SERVER['REQUEST_METHOD'];

// --- GET ---
if ($method === 'GET') {
    // 🔍 Jeśli zapytanie pyta o listę samych kategorii do listy rozwijanej:
    if (isset($_GET['fetch_categories'])) {
        $stmt = $pdo->query("SELECT * FROM categories ORDER BY name ASC");
        echo json_encode($stmt->fetchAll(PDO::FETCH_ASSOC));
        exit();
    }

    // Standardowe pobieranie notatek wraz z kategoriami
    $sql = "SELECT n.*, 
            GROUP_CONCAT(c.name SEPARATOR ', ') AS categories_names,
            GROUP_CONCAT(c.id) AS categories_ids
            FROM bjj_notes n
            LEFT JOIN bjj_note_categories nc ON n.id = nc.note_id
            LEFT JOIN categories c ON nc.category_id = c.id
            GROUP BY n.id
            ORDER BY n.created_at DESC";

    $stmt = $pdo->prepare($sql);
    $stmt->execute();
    $notes = $stmt->fetchAll(PDO::FETCH_ASSOC);
    echo json_encode($notes);
}

// --- POST: Dodawanie notatki + powiązanie wielu kategorii ---
if ($method === 'POST') {
    $title = $_POST['title'] ?? null;
    $content = $_POST['content'] ?? null;
    $youtube_url = $_POST['youtube_url'] ?? null;
    // Oczekujemy tablicy z ID kategorii, np. $_POST['categories'] = [1, 3]
    $categories = $_POST['categories'] ?? []; 
    $video_file_path = null;

    if (!$title || !$content || empty($categories)) {
        http_response_code(400);
        echo json_encode(["error" => "Tytuł, treść oraz co najmniej jedna kategoria są wymagane."]);
        exit();
    }

    // Wgrywanie wideo
    if (isset($_FILES['video_file']) && $_FILES['video_file']['error'] === UPLOAD_ERR_OK) {
        $upload_dir = 'uploads/';
        if (!is_dir($upload_dir)) mkdir($upload_dir, 0755, true);
        
        $ext = pathinfo($_FILES['video_file']['name'], PATHINFO_EXTENSION);
        $target_file = $upload_dir . time() . '_' . uniqid() . '.' . $ext;

        if (move_uploaded_file($_FILES['video_file']['tmp_name'], $target_file)) {
            $video_file_path = $target_file;
        }
    }

    try {
        // Transakcja - gwarantuje, że notatka i jej kategorie zapiszą się razem
        $pdo->beginTransaction();

        // 1. Zapis notatki
        $stmt = $pdo->prepare("INSERT INTO bjj_notes (title, content, youtube_url, video_file_path) VALUES (:title, :content, :youtube_url, :video_file_path)");
        $stmt->execute([
            ':title' => $title,
            ':content' => $content,
            ':youtube_url' => $youtube_url,
            ':video_file_path' => $video_file_path
        ]);
        
        $note_id = $pdo->lastInsertId();

        // 2. Zapis wybranej listy kategorii w tabeli łączącej
        $stmtCategory = $pdo->prepare("INSERT INTO bjj_note_categories (note_id, category_id) VALUES (:note_id, :category_id)");
        
        // Jeśli dane przyszły z HTML jako ciąg znaków (np. z checkboxów), upewniamy się że to tablica
        if (!is_array($categories)) {
            $categories = [$categories];
        }

        foreach ($categories as $cat_id) {
            $stmtCategory->execute([
                ':note_id' => $note_id,
                ':category_id' => (int)$cat_id
            ]);
        }

        $pdo->commit();

        http_response_code(201);
        echo json_encode(["message" => "Technika zapisana z kategoriami!", "id" => $note_id]);

    } catch (Exception $e) {
        $pdo->rollBack();
        http_response_code(500);
        echo json_encode(["error" => "Nie udało się zapisać danych: " . $e->getMessage()]);
    }
}
?>