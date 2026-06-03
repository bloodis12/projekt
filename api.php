<?php
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");
header("Access-Control-Allow-Methods: GET, POST");
header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");

// --- KONFIGURACJA BAZY DANYCH ---
$host = "twor_host_np_localhost";
$db_name = "nazwa_twojej_bazy";
$username = "uzytkownik_bazy";
$password = "haslo_bazy";

try {
    $pdo = new PDO("mysql:host=$host;dbname=$db_name;charset=utf8", $username, $password);
    $pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
} catch(PDOException $e) {
    echo json_encode(["error" => "Błąd połączenia z bazą: " . $e->getMessage()]);
    exit();
}

$method = $_SERVER['REQUEST_METHOD'];

// --- 1. POBIERANIE NOTATEK (GET) ---
if ($method === 'GET') {
    $stmt = $pdo->prepare("SELECT * FROM bjj_notes ORDER BY created_at DESC");
    $stmt->execute();
    $notes = $stmt->fetchAll(PDO::FETCH_ASSOC);
    echo json_encode($notes);
}

// --- 2. DODAWANIE NOTATKI (POST) ---
if ($method === 'POST') {
    // Wspieramy multipart/form-data (dla plików i tekstu)
    $title = $_POST['title'] ?? null;
    $content = $_POST['content'] ?? null;
    $youtube_url = $_POST['youtube_url'] ?? null;
    $category = $_POST['category'] ?? null;
    $video_file_path = null;

    if (!$title || !$content || !$category) {
        http_response_code(400);
        echo json_encode(["error" => "Tytuł, treść i kategoria są wymagane."]);
        exit();
    }

    // Obsługa wgrywania pliku wideo
    if (isset($_FILES['video_file']) && $_FILES['video_file']['error'] === UPLOAD_ERR_OK) {
        $upload_dir = 'uploads/';
        if (!is_dir($upload_dir)) {
            mkdir($upload_dir, 0755, true);
        }
        
        $file_extension = pathinfo($_FILES['video_file']['name'], PATHINFO_EXTENSION);
        // Bezpieczna nazwa pliku (timestamp + losowy ciąg)
        $file_name = time() . '_' . uniqid() . '.' . $file_extension;
        $target_file = $upload_dir . $file_name;

        if (move_uploaded_uploaded_file($_FILES['video_file']['tmp_num'], $target_file)) {
            $video_file_path = $target_file;
        }
    }

    // Zapis do bazy danych
    $sql = "INSERT INTO bjj_notes (title, content, youtube_url, video_file_path, category) 
            VALUES (:title, :content, :youtube_url, :video_file_path, :category)";
    
    $stmt = $pdo->prepare($sql);
    
    $result = $stmt->execute([
        ':title' => $title,
        ':content' => $content,
        ':youtube_url' => $youtube_url,
        ':video_file_path' => $video_file_path,
        ':category' => $category
    ]);

    if ($result) {
        http_response_code(201);
        echo json_encode(["message" => "Technika zapisana pomyślnie!", "id" => $pdo->lastInsertId()]);
    } else {
        http_response_code(500);
        echo json_encode(["error" => "Nie udało się zapisać techniki."]);
    }
}
?>