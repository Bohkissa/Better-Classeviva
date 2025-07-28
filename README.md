🚀 Better Classeviva - v0.2-beta

Better Classeviva è un'estensione per browser (Chrome e Firefox) progettata per migliorare l’esperienza utente del portale Classeviva.  
È ancora in fase di sviluppo e test (beta), ma include già funzionalità utili e un'architettura facilmente estendibile.

---

## ✨ Funzionalità principali

- ✅ **Attivazione/disattivazione del plugin** via popup
- 🛠️ **Debug Mode** (visibile solo se attivato)
- 🎯 **Iniezione di CSS personalizzati** per migliorare la UI
- 🔄 **Modifica dinamica del logo nella pagina di login**
- 🧠 **Stato persistente** con `chrome.storage.local`
- 🛜 **Messaggistica tra background, popup e content script**
- ⚙️ **Pagina impostazioni** (con info su plugin, autore, sito)
- 🌐 **Compatibilità multipiattaforma** (Chrome e Firefox)

---

## 📦 Struttura dei file

- `manifest.json`: configurazione dell'estensione
- `js/`: logica dell'estensione (popup, contenuti, background)
- `css/`: stile aggiuntivo applicato al sito target
- `popup.html` e `settings.html`: UI semplice per interazione utente
- `icons/`: icone dell’estensione

---

## 🧪 Installazione locale

1. Scarica o clona questo repository.
2. Vai su:
   - `chrome://extensions/` per Chrome
   - `about:debugging#/runtime/this-firefox` per Firefox
3. Attiva la **modalità sviluppatore**.
4. Carica la cartella come **estensione non pacchettizzata**.

---

## ⚙️ Come adattarla al tuo progetto

1. **Modifica `manifest.json`**:
   - Cambia `name`, `description`, `version`, `author`
   - Aggiorna `host_permissions` con l’URL del tuo sito target

2. **Personalizza**:
   - `js/content.js`: logica personalizzata da iniettare
   - `css/styles.css`: modifica lo stile del sito target

3. **Costruisci la tua UI**:
   - `popup.html`: pannello principale utente
   - `settings.html`: pagina impostazioni avanzate

---

## 🐞 Debug Mode

- Attivabile dalla **pagina impostazioni**
- Mostra una box in overlay sul sito target con log e messaggi temporali
- Utile per il debug visivo durante lo sviluppo/test

---

## 🧾 Versioni

| Versione    | Stato        | Descrizione breve                      |
|-------------|--------------|----------------------------------------|
| `v0.1-alpha`| 🧪 Sperimentale | Architettura iniziale, comunicazioni base |
| `v0.2-beta` | 🔧 In sviluppo | Debug Mode, sincronizzazione icona, gestione stati |

---

## 📌 Roadmap (prossime funzionalità)

- [ ] Supporto Temi (default/light/dark)
- [ ] Modifiche grafica login

---

## 📄 Licenza

Questo progetto è rilasciato sotto licenza **MIT**.  
Consulta il file `LICENSE` per maggiori dettagli.

---

## 👨‍💻 Autore

**Paolo Balzano**  
💼 [balzanoconsulting.com](https://www.balzanoconsulting.com)  
📧 info@balzanoconsulting.com  
🧠 Progetto open-source pensato per migliorare un sistema chiuso.