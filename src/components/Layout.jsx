import React from "react";
import "./Layout.css";

const Layout = () => {
  const notesList = [
    {
      title: "Triangle choke z closed guard",
      date: "12.05",
      desc: "Setup przez arm drag, kontrola ramienia, kąt 45 stopni kluczowy do finalizacji...",
      tags: ["guard", "duszenie"],
      active: true,
    },
    {
      title: "Leg drag pass",
      date: "10.05",
      desc: "Kontrola nogi, weight distribution, shoulder pressure. Uważaj na back take oponenta...",
      tags: ["przejście"],
      active: false,
    },
    {
      title: "Arm bar z mount – escape options",
      date: "08.05",
      desc: "Stack escape, hitchhiker escape, rotation. Najważniejszy jest wczesny timing przed...",
      tags: ["dźwignia"],
      active: false,
    },
    {
      title: "De la Riva → berimbolo",
      date: "05.05",
      desc: "DLR hook, kontrola panta, invert timing. Kluczowe to zebranie łopatki w odpowiednim momencie...",
      tags: ["guard", "sweep"],
      active: false,
    },
    {
      title: "Half guard – lockdown",
      date: "01.05",
      desc: "Electric chair sweep, old school sweep. Kontrola biodrami, underhook battle...",
      tags: ["guard", "sweep"],
      active: false,
    },
    {
      title: "Rear naked choke – systematics",
      date: "28.04",
      desc: "Seat belt control, body triangle vs hooks, chin strap, figure four finish...",
      tags: ["duszenie"],
      active: false,
    },
  ];

  return (
    <div className="vault-container">
      {/* GÓRNY PASS (Navbar) */}
      <header className="vault-navbar">
        <div className="vault-logo">
          BJJ <span>VAULT</span>
        </div>
        <div className="vault-search-wrapper">
          <input
            type="text"
            placeholder="Szukaj techniki, pozycji..."
            className="vault-search-input"
          />
        </div>
        <div className="vault-user-actions">
          <button className="vault-add-btn">+ Nowa notatka</button>
          <div className="vault-avatar">MK</div>
        </div>
      </header>

      {/* GŁÓWNY WORKSPACE (3 kolumny) */}
      <div className="vault-workspace">
        {/* KOLUMNA 1: SIDEBAR */}
        <aside className="vault-sidebar">
          <div className="sidebar-section">
            <span className="section-title">Widok</span>
            <ul className="sidebar-list">
              <li className="active">
                <span>📄 Wszystkie notatki</span>
                <span className="count">48</span>
              </li>
              <li>
                <span>🎬 Z filmami</span>
                <span className="count">23</span>
              </li>
              <li>
                <span>⭐ Ulubione</span>
                <span className="count">11</span>
              </li>
            </ul>
          </div>

          <div className="sidebar-section">
            <span className="section-title">Kategorie</span>
            <ul className="sidebar-list">
              <li>
                <span>
                  <i className="dot guard">●</i> Guard
                </span>
                <span className="count">14</span>
              </li>
              <li>
                <span>
                  <i className="dot pass">●</i> Przejście
                </span>
                <span className="count">9</span>
              </li>
              <li>
                <span>
                  <i className="dot sub">●</i> Dźwignia / Duszenie
                </span>
                <span className="count">12</span>
              </li>
              <li>
                <span>
                  <i className="dot sweep">●</i> Sweep
                </span>
                <span className="count">7</span>
              </li>
              <li>
                <span>
                  <i className="dot back">●</i> Back Take
                </span>
                <span className="count">6</span>
              </li>
            </ul>
          </div>

          <div className="sidebar-section">
            <span className="section-title">Trenerzy</span>
            <ul className="sidebar-list text-muted">
              <li>
                <span>⚫ John Danaher</span>
                <span className="count">18</span>
              </li>
              <li>
                <span>⚫ Gordon Ryan</span>
                <span className="count">5</span>
              </li>
              <li>
                <span>⚫ Lachlan Giles</span>
                <span className="count">8</span>
              </li>
            </ul>
          </div>

          <div className="sidebar-belt-card">
            <div className="belt-graphic"></div>
            <div className="belt-info">
              <div className="belt-name">Niebieski pas</div>
              <div className="belt-stats">2 paski • 48 notatek</div>
            </div>
          </div>
        </aside>

        {/* KOLUMNA 2: LISTA NOTATEK */}
        <section className="vault-notes-list-col">
          <div className="list-col-header">
            <span className="section-title">
              Notatki <span className="sort-label">⇅ data</span>
            </span>
            <span className="count">48</span>
          </div>
          <div className="list-items-wrapper">
            {notesList.map((note, index) => (
              <div
                key={index}
                className={`note-item-card ${note.active ? "active" : ""}`}
              >
                <div className="item-card-row">
                  <h4>{note.title}</h4>
                  <span className="item-date">{note.date}</span>
                </div>
                <p className="item-desc">{note.desc}</p>
                <div className="item-tags">
                  {note.tags.map((tag, i) => (
                    <span key={i} className={`tag-badge ${tag}`}>
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* KOLUMNA 3: PODGLĄD NOTATKI */}
        <main className="vault-content-view">
          <div className="content-meta-row">
            <div className="breadcrumbs">
              <span className="txt-guard">GUARD</span> ·{" "}
              <span className="txt-sub">DUSZENIE</span> ·{" "}
              <span className="txt-date">12 maja 2025 – trening gi</span>
            </div>
            <div className="content-actions">
              <button className="action-icon">☆</button>
              <button className="action-icon">📤</button>
              <button className="action-icon">⋮</button>
            </div>
          </div>

          <h1 className="main-note-title">Triangle choke z closed guard</h1>

          <div className="main-note-tags">
            <span className="tag-badge guard">guard</span>
            <span className="tag-badge duszenie">duszenie</span>
            <span className="tag-badge add-tag">+ tag</span>
          </div>

          <div className="content-grid-layout">
            {/* Lewa strona teksty */}
            <div className="content-left-pane">
              <div className="info-block">
                <span className="block-title">Opis techniki</span>
                <p>
                  Triangle choke (sankaku-jime) to duszenie nożycami wykonywane
                  z pozycji closed guard lub innych pozycji. Polega na
                  uwięzieniu szyi i jednego ramienia przeciwnika pomiędzy nogami
                  atakującego, tworząc trójkąt dźwigniowo-duszący.
                </p>
              </div>

              <div className="info-block">
                <span className="block-title">Kroki wykonania</span>
                <div className="steps-list">
                  {[
                    "Kontrola ramienia – arm drag lub overhook, wciągamy jedno ramię oponenta głęboko przez biodra.",
                    "Ustawiamy kąt 45° – przesuwamy biodra w bok (hip escape), to kluczowe do efektywnego zamknięcia trójkąta.",
                    "Zakładamy nogi – kolano blokujące pod szyją, pięta kontrolująca z tyłu głowy, spinamy podkolanową na łydkę.",
                    "Finalizacja – ściągamy głowę, dociskamy kolano, wypinamy biodra do góry. Kontrola ramienia wewnątrz jest krytyczna.",
                  ].map((step, idx) => (
                    <div key={idx} className="step-row">
                      <span className="step-number">{idx + 1}</span>
                      <p>{step}</p>
                    </div>
                  ))}
                </div>
              </div>

              <div className="danger-alert-box">
                <h5>⚠️ Uwaga: Najczęstsze błędy</h5>
                <p>
                  Najczęstszy błąd to brak kąta przed zamknięciem trójkąta – bez
                  45° oponent łatwo stack'uje i przechodzi. Drugi błąd: za
                  wczesne ściąganie głowy zanim nogi są poprawnie zamknięte.
                </p>
              </div>

              <div className="info-block">
                <span className="block-title">Notatki z treningu</span>
                <p className="training-comment">
                  "Dziś robiłem drilling z Marcinem – zauważyłem, że moje biodra
                  są za wolne przy arm drag. Trener powiedział żebym myślał o
                  tym jak o sweep: najpierw destabilizacja, potem zamknięcie.
                  Warto ćwiczyć samo przesunięcie bioder na sucho."
                </p>
              </div>
            </div>

            {/* Prawa strona media i postępy */}
            <div className="content-right-pane">
              <div className="info-block">
                <span className="block-title">Materiały wideo</span>
                <div className="video-cards-stack">
                  {[
                    "Danaher - Triangle System Complete",
                    "Lachlan Giles - Angle Mechanics",
                  ].map((v, i) => (
                    <div key={i} className="video-mini-card">
                      <div className="video-meta">
                        <h6>{v}</h6>
                        <span>{i === 0 ? "58:24" : "12:47"} • YouTube</span>
                      </div>
                      <div className="play-btn-icon">▶</div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="info-block">
                <span className="block-title">Powiązane techniki</span>
                <div className="related-stack">
                  <div className="related-item">
                    <h6>Omoplata z closed guard</h6>
                    <span>guard · dźwignia</span>
                  </div>
                  <div className="related-item">
                    <h6>Arm bar z closed guard</h6>
                    <span>guard · dźwignia</span>
                  </div>
                  <div className="related-item">
                    <h6>Hip escape drills</h6>
                    <span>ruch · podstawy</span>
                  </div>
                </div>
              </div>

              <div className="info-block">
                <span className="block-title">Opanowanie techniki</span>
                <div className="progress-text">
                  <span>Progres</span>
                  <strong>64%</strong>
                </div>
                <div className="progress-bar-container">
                  <div
                    className="progress-bar-fill"
                    style={{ width: "64%" }}
                  ></div>
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default Layout;
