function debugLog(message) {
  const debugId = "better-classeviva-debug";
  let debugBox = document.getElementById(debugId);

  if (!debugBox) {
    debugBox = document.createElement("div");
    debugBox.id = debugId;
    debugBox.style.position = "fixed";
    debugBox.style.bottom = "10px";
    debugBox.style.right = "10px";
    debugBox.style.zIndex = "999999";
    debugBox.style.background = "rgba(0,0,0,0.7)";
    debugBox.style.color = "#0f0";
    debugBox.style.padding = "8px 12px";
    debugBox.style.fontSize = "12px";
    debugBox.style.fontFamily = "monospace";
    debugBox.style.borderRadius = "8px";
    debugBox.style.boxShadow = "0 0 6px #0f0";
    document.body.appendChild(debugBox);
  }

  const timestamp = new Date().toLocaleTimeString();
  debugBox.innerText = `[${timestamp}] ${message}`;
}


//####################//
// CONFIG E VARIABILI // 
//####################//

const STYLE_ID = "better-classeviva-style";

//##############//
// GESTIONE CSS //
//##############//

// inserisco forzatamente lo stile nel codice html
function applyStyles() {
  
  // controllo in caso di refresh del plugin, 
  // se già esiste il foglio di stile esco
  if (document.getElementById(STYLE_ID)){
    debugLog("Stile già applicato");
    return;
  }

  // creazione del tag link 
  // <link href="css/styles.css" type="text/css" rel="stylesheet">
  const link = document.createElement("link");
  link.id = STYLE_ID;
  link.href = chrome.runtime.getURL("css/styles.css");
  link.type = "text/css";
  link.rel = "stylesheet";
  document.head.appendChild(link);

  debugLog("Stile applicato");

}

// rimuovo il foglio di stile 
function removeStyles() {
  const myStyle = document.getElementById(STYLE_ID);
  if (myStyle) myStyle.remove();

  console.log("Stile rimosso");

}

//#######################//
// GESTIONE STATO PLUGIN //
//#######################//

// Abilito/Disabilito le funzionalità
function togglePlugin(isPluginActive) {
  debugLog("togglePlugin: " + isPluginActive);
  (isPluginActive) ? enablePluginFeatures() : disablePluginFeatures();
}

// Ascolto i messaggi in arrivo dal popup
chrome.runtime.onMessage.addListener((msg) => {
  // se arriva un messaggio di tipo "Toggle Plugin"
  if (msg.type === "TOGGLE_PLUGIN") {
    // lo passo direttamente alla funzione
    debugLog("Messaggio ricevuto: TOGGLE_PLUGIN = " + msg.active);
    togglePlugin(msg.active);
  }
});

// Recupero lo stato del plugin
chrome.storage.local.get("pluginActive", (res) => { 
  const isActive = res.pluginActive ?? true;
    // uso "true" come valore di default in caso di "null" o "undefined"
  // Passo il valore alla funzione Toggle
  debugLog("Stato iniziale plugin: " + isActive);
  togglePlugin(isActive);
});


//######################//
// MODIFICHE DOM CUSTOM //
//######################//

// Abilito le funzionalità del plugin
function enablePluginFeatures() {
  // applico lo stile
  applyStyles();
  
  // faccio partire gli script 
  customizeLoginPage();

}

// disabilito le funzionalità del plugin
function disablePluginFeatures() {
  // rimuovo il foglio di stile
  removeStyles();

  // ... non c'è bisogno di disattivare o resettare gli script 
  // dato che viene effettuato un refresh della pagina e tutto
  // ritorna allo stato originale

}

function customizeLoginPage() {

  const url = location.href; // prelevo l'url della pagina

  if (!url.includes("login.php")) return; // eseguo questo script solo nella pagina del login

  // Cambia logo
  const logoContainer = document.querySelector(".main-logo-container");
  if (logoContainer) {
    logoContainer.innerHTML = "";

    const img = document.createElement("img");
    img.src = chrome.runtime.getURL("images/better-classeviva-logo.png");
    img.alt = "Better Classeviva";
    img.style.maxWidth = "200px";
    img.style.height = "auto";

    logoContainer.appendChild(img);
  }

  // Nascondi elementi non desiderati
  const prjDesc = document.querySelector(".prj-desc-container");
  if (prjDesc) prjDesc.remove();

  // Altre modifiche future possono essere aggiunte qui
  // ...
}
