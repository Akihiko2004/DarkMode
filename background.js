let darkModeEnabled = false;

chrome.runtime.onInstalled.addListener(() => {
  chrome.contextMenus.create({
    id: "toggle-dark-mode",
    title: "Toggle Dark Mode",
    contexts: ["all"]
  });
});

chrome.contextMenus.onClicked.addListener((info, tab) => {
  if (info.menuItemId === "toggle-dark-mode") {
    if (!darkModeEnabled) {
      chrome.scripting.insertCSS({
        target: { tabId: tab.id },
        files: ["styles.css"]
      });
      darkModeEnabled = true;
    } else {
      chrome.scripting.removeCSS({
        target: { tabId: tab.id },
        files: ["styles.css"]
      });
      darkModeEnabled = false;
    }
  }
});
