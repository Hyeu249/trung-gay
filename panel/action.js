const proxyfileRenderDiv = document.getElementById("proxyfileRender");
const paramsFileRenderDiv = document.getElementById("paramsFileRender");

const performActtackDiv = document.getElementById("performActtack");
const clearProxyButton = document.getElementById("clearProxyButton");
// background.js

// Function to set proxy

clearProxyButton.onclick = () => {
  clearProxy();
  clearProxyButton.innerText = "Success delete proxy";
};

performActtackDiv.onclick = () => {
  run();
};

// chrome.storage.local.get(["arrayUrl"], function (result) {
//   if (result.arrayUrl) {
//     try {
//       proxyArr = JSON.parse(proxyfileRenderDiv.innerText);
//       paramsArr = JSON.parse(paramsFileRenderDiv.innerText);
//       performActtackDiv.innerText = JSON.stringify(proxyArr);
//     } catch (error) {
//       performActtackDiv.innerText = JSON.stringify(error.message);
//     }
//   }
// });
