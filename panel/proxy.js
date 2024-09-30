const sendStatusDiv2 = document.getElementById("sendStatus");

function setProxy(
  proxy = "38.154.227.167:5868",
  proxyForUrl = "*api1.ldpform.com*",
  callback
) {
  chrome.proxy.settings.clear({ scope: "regular" }, function () {
    chrome.proxy.settings.set(
      {
        value: {
          mode: "pac_script",
          pacScript: {
            data: `
          function FindProxyForURL(url, host) {
            
            const proxy = "PROXY ${proxy}"; 
            const direct = "DIRECT"; // Direct connection

            // Use the proxy for a specific URL
            if (shExpMatch(url, '${proxyForUrl}')) {
                return proxy;
            }

            return direct;
          }
        `,
          },
        },
        scope: "regular",
      },
      function () {
        if (chrome.runtime.lastError) {
          callback(false, chrome.runtime.lastError);
        } else {
          callback(true);
        }
      }
    );
  });
}

function setProxy2(proxy = "38.154.227.167:5868", proxyForUrl = "", callback) {
  const host = proxy.split(":")[0];
  const port = proxy.split(":")[1];
  const config = {
    mode: "fixed_servers",
    rules: {
      singleProxy: {
        scheme: "http",
        host: host, // Replace with your proxy server
        port: port, // Replace with the correct port
      },
      bypassList: ["localhost", "127.0.0.1"],
    },
  };

  chrome.proxy.settings.set({ value: config, scope: "regular" }, function () {
    performActtackDiv.innerText = "config proxy";
    callback();
  });
}

function clearProxy() {
  chrome.proxy.settings.clear({ scope: "regular" }, function () {});
}

chrome.proxy.onProxyError.addListener(() => {
  sendStatusDiv2.innerText = "errror proxy";
});
