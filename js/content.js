// content.js
const STYLE_ID = "better-classeviva-style";
const DEBUG_ID = "better-classeviva-debug";
let DEBUG_ENABLED = false;

initDebugState();
initListeners();
initializePluginState();

function initDebugState() {
  chrome.storage.local.get("debugMode", ({ debugMode }) => {
    DEBUG_ENABLED = debugMode ?? false;
    if (DEBUG_ENABLED) {
      injectDebugCSS();
      debugLog("Debug attivo all'avvio");
    }
  });
}

function initListeners() {
  chrome.runtime.onMessage.addListener((msg) => {
    if (msg.type === "TOGGLE_DEBUG") {
      DEBUG_ENABLED = msg.enabled;
      if (DEBUG_ENABLED) {
        injectDebugCSS();
        debugLog("Debug abilitato da messaggio");
      } else {
        removeDebugUI();
      }
    }

    if (msg.type === "TOGGLE_PLUGIN") {
      debugLog("Messaggio ricevuto: TOGGLE_PLUGIN = " + msg.active);
      togglePlugin(msg.active);
    }

    if (msg.type === "CLEAR_DEBUG_LOG") {
      clearDebugLog();
    }
  });
}

function initializePluginState() {
  chrome.storage.local.get("pluginActive", (res) => {
    const isActive = res.pluginActive ?? true;
    debugLog("Stato iniziale plugin: " + isActive);
    togglePlugin(isActive);
  });
}

function debugLog(message) {
  if (!DEBUG_ENABLED) return;

  let box = document.getElementById(DEBUG_ID);
  if (!box) {
    box = document.createElement("div");
    box.id = DEBUG_ID;
    box.className = "debug-box";
    document.body.appendChild(box);
  }

  const timestamp = new Date().toLocaleTimeString();
  const entry = document.createElement("div");
  entry.textContent = `[${timestamp}] ${message}`;
  box.appendChild(entry);

  // Optional: logga anche in console
  console.log("[BetterClasseviva Debug]", message);
}

function clearDebugLog() {
  const box = document.getElementById(DEBUG_ID);
  if (box) box.innerHTML = "";
  debugLog("Log pulito");
}

function injectDebugCSS() {
  if (!document.getElementById("debug-css-link")) {
    const link = document.createElement("link");
    link.id = "debug-css-link";
    link.href = chrome.runtime.getURL("css/debug.css");
    link.type = "text/css";
    link.rel = "stylesheet";
    document.head.appendChild(link);
  }
}

function removeDebugUI() {
  const box = document.getElementById(DEBUG_ID);
  if (box) box.remove();
}

function togglePlugin(isActive) {
  debugLog("togglePlugin: " + isActive);
  if (isActive) {
    enablePluginFeatures();
  } else {
    disablePluginFeatures();
  }
}

function applyStyles() {
  if (document.getElementById(STYLE_ID)) {
    debugLog("Stile già applicato");
    return;
  }
  const link = document.createElement("link");
  link.id = STYLE_ID;
  link.href = chrome.runtime.getURL("css/styles.css");
  link.type = "text/css";
  link.rel = "stylesheet";
  document.head.appendChild(link);
  debugLog("Stile applicato");
}

function removeStyles() {
  const link = document.getElementById(STYLE_ID);
  if (link) link.remove();
  debugLog("Stile rimosso");
}

function enablePluginFeatures() {
  applyStyles();
  customizeLoginPage();
}

function disablePluginFeatures() {
  removeStyles();
  // Refresh pagine non necessario; sarà gestito da settings.js se serve
}

function customizeLoginPage() {
  if (!location.href.includes("login.php")) return;

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

  const prjDesc = document.querySelector(".prj-desc-container");
  if (prjDesc) prjDesc.remove();
}
