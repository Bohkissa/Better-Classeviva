const debugMode = document.getElementById("debugMode");

// Legge lo stato salvato all'avvio e aggiorna checkbox
chrome.storage.local.get("debugMode", ({ debugMode: saved }) => {
  debugMode.checked = saved ?? false;
});

// Gestione toggle Debug Mode
debugMode.addEventListener("change", () => {
  const isActive = debugMode.checked;

  chrome.storage.local.set({ debugMode: isActive }, () => {
    chrome.runtime.sendMessage({ type: "TOGGLE_DEBUG", enabled: isActive });
  });

  if (!isActive) {
    // Forza il reload della tab attiva per eliminare i log
    chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
      if (tabs[0]?.id) chrome.tabs.reload(tabs[0].id);
    });
  }
});