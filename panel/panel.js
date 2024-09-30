const parentDiv = document.getElementById("render_log");
const keyword_filter = document.getElementById("keyword_filter");
const resetUrlsButton = document.getElementById("resetUrlsButton");
const storage = document.getElementById("storage");
const resetStorageButton = document.getElementById("resetStorageButton");
const urlDiv = document.getElementById("url");
const proxy_fileDiv = document.getElementById("proxy_file");
const proxyfileRender = document.getElementById("proxyfileRender");
const params_fileDiv = document.getElementById("params_file");
const paramsFileRender = document.getElementById("paramsFileRender");

function createDiv(text) {
  // Create a new div element
  const newDiv = document.createElement("div");
  const textDiv = document.createElement("div");

  // Add some text content
  textDiv.textContent = text;

  // Apply some basic styles to make it stand out
  newDiv.style.padding = "10px";
  newDiv.style.margin = "10px 0";
  newDiv.style.backgroundColor = "#f4f4f4";
  newDiv.style.border = "1px solid #ccc";
  newDiv.style.position = "relative";

  // Create the delete button
  const deleteButton = document.createElement("button");
  deleteButton.textContent = "Get";
  deleteButton.style.position = "absolute";
  deleteButton.style.right = "5px";
  deleteButton.style.top = "5px";
  deleteButton.onclick = function () {
    try {
      const postData = JSON.parse(textDiv.innerText || "{}");

      chrome.storage.local.get(["arrayUrl"], (result) => {
        let arrayUrl = [];
        if (result.arrayUrl) {
          arrayUrl = JSON.parse(JSON.stringify(result.arrayUrl));
        }
        arrayUrl.push({
          url: postData.url || "",
          form_config_id: postData.params.form_config_id || "",
          ladipage_id: postData.params.ladipage_id || "",
        });
        chrome.storage.local.set({ arrayUrl });
        loadData();
      });
    } catch {}
  };

  // Append the delete button to the div
  newDiv.appendChild(textDiv);
  newDiv.appendChild(deleteButton);

  return newDiv;
}

function createUrlTargetDiv(text) {
  // Create a new div element
  const newDiv = document.createElement("div");
  const textDiv = document.createElement("div");

  // Add some text content
  textDiv.textContent = text;

  // Apply some basic styles to make it stand out
  newDiv.style.padding = "10px";
  newDiv.style.margin = "10px 0";
  newDiv.style.backgroundColor = "#f4f4f4";
  newDiv.style.border = "1px solid #ccc";
  newDiv.style.position = "relative";

  // Create the delete button
  const deleteButton = document.createElement("button");
  deleteButton.textContent = "Delete";
  deleteButton.style.position = "absolute";
  deleteButton.style.right = "5px";
  deleteButton.style.top = "5px";
  deleteButton.onclick = function () {
    newDiv.remove();
  };

  // Append the delete button to the div
  newDiv.appendChild(textDiv);
  newDiv.appendChild(deleteButton);

  return newDiv;
}

function keyword_filter_action() {
  const children = parentDiv.children;
  for (let i = 0; i < children.length; i++) {
    const child = children[i];

    if (child.textContent.includes(keyword_filter.value)) {
      child.style.display = "block";
    } else {
      child.style.display = "none";
    }
  }
}

chrome.devtools.network.onRequestFinished.addListener(function (request) {
  try {
    const params = JSON.parse(request.request?.postData?.text || "{}");
    const url = JSON.stringify({
      url: request.request?.url || {},
      params: params,
    });

    createDiv(url);
    parentDiv.appendChild(createDiv(url));

    keyword_filter_action();
  } catch (error) {}
});

function clearStorageUI() {
  while (storage.firstChild) {
    storage.removeChild(storage.firstChild);
  }
}

resetUrlsButton.onclick = () => {
  while (parentDiv.firstChild) {
    parentDiv.removeChild(parentDiv.firstChild);
  }
};

resetStorageButton.onclick = () => {
  chrome.storage.local.clear();
  clearStorageUI();
};

keyword_filter.addEventListener("input", () => {
  keyword_filter_action();
});

function renderChildStorage(target) {
  const url = target.url;
  const form_config_id = target.form_config_id;
  const ladipage_id = target.ladipage_id;

  const text = `${url}?form_config_id=${form_config_id}&ladipage_id=${ladipage_id}`;
  storage.appendChild(createUrlTargetDiv(text));
}

// Retrieve data
function loadData() {
  chrome.storage.local.get(["arrayUrl"], function (result) {
    if (result.arrayUrl) {
      clearStorageUI();
      // storage.appendChild(createUrlTargetDiv(JSON.stringify(result.arrayUrl)));

      result.arrayUrl.forEach((target) => renderChildStorage(target));
    }
  });
}

// Call the functions as needed
// saveData();
loadData();

proxy_fileDiv.addEventListener("change", function (event) {
  const file = event.target.files[0];
  const reader = new FileReader();

  reader.onload = function (e) {
    const text = e.target.result;

    // Split text into lines
    const lines = text.split("\n").filter((line) => line.trim() !== "");

    // Convert each line to an array element
    const proxyArray = lines.map((line) => line.trim());

    // Display the array
    proxyfileRender.innerText = JSON.stringify(proxyArray, null, 2);
  };

  // Read the file as text
  reader.readAsText(file);
});

params_fileDiv.addEventListener("change", function (event) {
  const file = event.target.files[0];

  if (file && file.type === "application/json") {
    const reader = new FileReader();

    reader.onload = function (e) {
      try {
        const jsonData = JSON.parse(e.target.result);
        paramsFileRender.innerText = JSON.stringify(jsonData, null, 2); // Pretty print JSON
      } catch (error) {
        paramsFileRender.innerText = "Invalid JSON file!";
      }
    };

    reader.readAsText(file); // Read JSON file content as text
  }
});
