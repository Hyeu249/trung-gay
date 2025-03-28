function getUsedProxies() {
  return new Promise((resolve) => {
    chrome.storage.local.get(["used_proxys"], (result) => {
      resolve(result.used_proxys || []);
    });
  });
}

async function setUsedProxies(proxies) {
  return new Promise((resolve) => {
    chrome.storage.local.set({ used_proxys: proxies }, resolve);
  });
}

async function getProxyData() {
  const serversLists = JSON.parse(proxyfileRender.innerText) || [];
  let used_proxys = await getUsedProxies();
  let proxy;
  let availableProxies = serversLists.filter((p) => !used_proxys.includes(p));

  if (availableProxies.length === 0) {
    used_proxys = await setUsedProxies([]);
    availableProxies = [...serversLists];
  }

  proxy = availableProxies[0];
  used_proxys.push(proxy);
  await setUsedProxies(used_proxys);

  return [proxy, used_proxys];
}
