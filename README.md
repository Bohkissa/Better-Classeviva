# Better Extension Template

Questa è una **bozza di base** per un'estensione browser (Chrome e Firefox) pensata per migliorare l'esperienza d'uso di un sito web specifico.  
Il codice è strutturato per essere **facilmente adattabile** ad altri progetti: basta modificare il file `manifest.json` e i file JS/CSS di logica.

---

## 🚀 Funzionalità principali

- Interfaccia popup con switch per attivare/disattivare il plugin
- Pulsante per aggiornare manualmente il plugin
- Accesso alla pagina delle impostazioni (nome, versione, autore, sito web)
- Iniezione CSS/JS nel sito target
- Compatibilità multipiattaforma (Chrome, Firefox)

---

## 📦 Struttura dei file

- `manifest.json`: configurazione dell'estensione
- `js/`: logica dell'estensione (popup, contenuti, background)
- `css/`: stile aggiuntivo applicato al sito target
- `popup.html` e `settings.html`: UI semplice per interazione utente
- `icons/`: icone dell’estensione

---

## 🛠️ Come adattare questa estensione al tuo progetto

1. Modifica il file `manifest.json`:
   - Cambia `name`, `description`, `version`, `author`
   - Aggiorna il campo `host_permissions` con l’URL del tuo sito target

2. Personalizza:
   - `js/content.js`: logica da iniettare nel sito
   - `css/style.css`: regole di stile da applicare

3. Costruisci la tua UI nel file `popup.html` e `settings.html`

---

## 🧪 Installazione locale

1. Scarica o clona questo repository
2. Vai su `chrome://extensions` o `about:debugging#/runtime/this-firefox`
3. Attiva la modalità sviluppatore
4. Carica la cartella come "Estensione non pacchettizzata"

---

## 📄 Licenza

Questo progetto è rilasciato sotto licenza MIT. Vedi `LICENSE` per i dettagli.
