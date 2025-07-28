/*#########*/
/* BOTTONI */
/*#########*/
const toggle = document.getElementById("toggle");
const refreshBtn = document.getElementById("refreshBtn");
const settingsBtn = document.getElementById("settingsBtn");

// Carica stato iniziale e imposta toggle
chrome.storage.local.get("pluginActive", (res) => {
  toggle.checked = res.pluginActive ?? true;
  console.log("plugin active:" + toggle.checked);
});

// Funzione per inviare messaggio al content script
function sendToggleMessage(active) {
  chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
    if (tabs[0]?.id) {
      chrome.tabs.sendMessage(tabs[0].id, { type: "TOGGLE_PLUGIN", active });
      console.log("Message sent");
    }
  });
}

// Gestione cambio toggle
toggle.addEventListener("change", () => {
  const active = toggle.checked;
  chrome.storage.local.set({ pluginActive: active }, () => {
    sendToggleMessage(active);
  });

  if (!active) {
    // Se il plugin è stato disattivato, forziamo il refresh
    chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
      if (tabs[0]?.id) {
        chrome.tabs.reload(tabs[0].id);
      }
    });
  }
  
  console.log("plugin active:" + active);

});

// Ricarica scheda attiva
refreshBtn.addEventListener("click", () => {
  chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
    if (tabs[0]?.id) {
      chrome.tabs.reload(tabs[0].id);
    }
  });
});

// Apri pagina impostazioni
settingsBtn.addEventListener("click", () => {
  chrome.runtime.openOptionsPage();
});