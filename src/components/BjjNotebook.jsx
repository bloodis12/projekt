import React, { useState, useEffect } from "react";

const API_URL = "https://localhost//api.php";

export default function BjjNotebook() {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [youtubeUrl, setYoutubeUrl] = useState("");
  const [category, setCategory] = useState("");
  const [statusMessage, setStatusMessage] = useState("");

  // --- SYNCHRONIZACJA OFFLINE (uruchamiana raz przy załadowaniu komponentu) ---
  useEffect(() => {
    const handleOnline = () => {
      const offlineNotes =
        JSON.parse(localStorage.getItem("bjj_notes_offline")) || [];

      if (offlineNotes.length > 0) {
        setStatusMessage(
          `Wykryto sieć! Synchronizuję ${offlineNotes.length} notatek...`
        );

        offlineNotes.forEach((note) => {
          sendToMySQL(note);
        });

        localStorage.removeItem("bjj_notes_offline");
        setStatusMessage("Wszystkie notatki zostały zsynchronizowane z bazą!");
      }
    };

    // Nasłuchujemy zmian statusu sieci
    window.addEventListener("online", handleOnline);

    // Czyszczenie listenera przy demontażu komponentu
    return () => window.removeEventListener("online", handleOnline);
  }, []);

  // --- FUNKCJA WYSYŁAJĄCA DO PHP ---
  const sendToMySQL = (noteData) => {
    const formData = new URLSearchParams();
    formData.append("title", noteData.title);
    formData.append("content", noteData.content);
    formData.append("youtube_url", noteData.youtube_url);
    formData.append("category", noteData.category);

    fetch(API_URL, {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: formData,
    })
      .then((res) => res.json())
      .then((data) => console.log("Zapisano w bazie:", data))
      .catch((err) => {
        console.error("Błąd wysyłania, cofanie do LocalStorage:", err);
        saveToLocalStorage(noteData);
      });
  };

  // --- FUNKCJA ZAPISU DO LOCALSTORAGE ---
  const saveToLocalStorage = (noteData) => {
    const offlineNotes =
      JSON.parse(localStorage.getItem("bjj_notes_offline")) || [];
    offlineNotes.push(noteData);
    localStorage.setItem("bjj_notes_offline", JSON.stringify(offlineNotes));
    setStatusMessage(
      "Brak internetu! Notatka zapisana tymczasowo na telefonie."
    );
  };

  // --- OBSŁUGA DIALOGU/FORMULARZA ---
  const handleSubmit = (e) => {
    e.preventDefault();

    const newNote = { title, content, youtube_url: youtubeUrl, category };

    if (navigator.onLine) {
      sendToMySQL(newNote);
      setStatusMessage("Dodano technikę online!");
    } else {
      saveToLocalStorage(newNote);
    }

    // Reset pól formularza
    setTitle("");
    setContent("");
    setYoutubeUrl("");
    setCategory("");
  };

  return (
    <div style={{ padding: "20px", maxWidth: "500px", margin: "0 auto" }}>
      <h2>🥋 BJJ Notatnik Technik</h2>

      {statusMessage && (
        <div
          style={{
            padding: "10px",
            backgroundColor: "#e0e0e0",
            marginBottom: "15px",
          }}
        >
          {statusMessage}
        </div>
      )}

      <form onSubmit={handleSubmit}>
        <div>
          <label>Tytuł techniki:</label>
          <br />
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />
        </div>
        <br />
        <div>
          <label>Kategoria (np. Garda, Półgarda):</label>
          <br />
          <input
            type="text"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            required
          />
        </div>
        <br />
        <div>
          <label>Opis / Szczegóły:</label>
          <br />
          <textarea
            value={content}
            onChange={(e) => setContent(e.target.value)}
            required
          />
        </div>
        <br />
        <div>
          <label>Link YouTube (opcjonalnie):</label>
          <br />
          <input
            type="url"
            value={youtubeUrl}
            onChange={(e) => setYoutubeUrl(e.target.value)}
          />
        </div>
        <br />
        <button type="submit">Zapisz Technikę</button>
      </form>
    </div>
  );
}
