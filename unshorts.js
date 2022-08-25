'use strict';

chrome.action.onClicked.addListener((tab) => {
  chrome.scripting.executeScript({
    target: { tabId:tab.id },
    func: main
  },
  (isExtensionEnabled) => {
    if (isExtensionEnabled) {
      chrome.action.setIcon({ path: 'images/48x48.png' });
    } else {
      chrome.action.setIcon({ path: 'images/48x48-gray.png'});
    }
  });
});

function main() {

  let isExtensionEnabled = false;
  const unshortsIdentifier = document.getElementById("unshortsExtension");
  const shortsSelectors = [...document.querySelectorAll('[overlay-style=SHORTS]')];
  const shortsVideos = shortsSelectors.map(x => x.parentElement.closest('ytd-grid-video-renderer'))

  if (shortsVideos?.length) {
    if (unshortsIdentifier) {
      shortsVideos.forEach(short => short.style.display = 'block');

      // Disable action by removing identifier
      const unshortsIdentifier = document.getElementById("unshortsExtension");
      document.body.removeChild(unshortsIdentifier);
    } else {
      shortsVideos.forEach(short => short.style.display = 'none');

      // Enable action by creating a new identifier
      isExtensionEnabled = true;
      const newUnshortsIdentifier = document.createElement("div");
      newUnshortsIdentifier.id = "unshortsExtension";
      document.body.appendChild(newUnshortsIdentifier);
    }
  }

  return isExtensionEnabled;
}
