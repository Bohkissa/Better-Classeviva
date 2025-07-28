
// Recupero lo stato del plugin all'avvio di chrome
chrome.runtime.onStartup.addListener(syncIconWithStorage);

// Recupero lo stato del plugin quendo viene installata o aggiornata
chrome.runtime.onInstalled.addListener(syncIconWithStorage);

// Recupero lo stato del plugin quando viene attivato/disattivato dall'utente.

chrome.storage.onChanged.addListener((changes, area) => {

  // Controllo se ci sono stati cambiamenti di valore e se
  // questo cambiamento avviene in area "local" per non 
  // triggerare la funzione in modalità "sync"

  if (area === "local" && changes.pluginActive) {
    // se viene triggerato passo alla funzione il nuovo valore
    // true -> false || false -> true 
    updateIcon(changes.pluginActive.newValue);
  }
});

// sincronizzo l'icona con lo status del plugin
function syncIconWithStorage(){
  // ottengo lo stato del plugin
  chrome.storage.local.get("pluginActive", (res) => {
    // aggiorno l'icona in base allo stato
    updateIcon(res.pluginActive ?? true);
      // uso "true" come valore di default in caso di "null" o "undefined"
  });
}

// cambia l'icona se il plugin e attivato o disattivato
function updateIcon(isActive) {
  // in base allo stato del plugin definisco il percorso dell'icona
  const iconPath = isActive ? "/icons/classeviva-icon-48.png" : "/icons/classeviva-icon-48-gray.png";
  // passo il percorso per settare l'icona
  chrome.action.setIcon({ path: iconPath });
}

// Riceve il messaggio da settings.js e lo inoltra a tutte le tab
chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  if (message.type === "TOGGLE_DEBUG") {
    chrome.tabs.query({}, (tabs) => {
      for (const tab of tabs) {
        if (!tab.id) continue;
        chrome.tabs.sendMessage(tab.id, {
          type: "TOGGLE_DEBUG",
          enabled: message.enabled
        });
      }
    });
  }
});