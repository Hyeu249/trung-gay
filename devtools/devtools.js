chrome.devtools.panels.create(
  "My Panel",
  "MyPanelIcon.png",
  "panel/panel.html",
  function (panel) {
     console.log("DevTools Panel Created!");
  }
  
);
