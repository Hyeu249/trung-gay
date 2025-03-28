const sendStatusDiv = document.getElementById("sendStatus");
const proxyTimeDiv = document.getElementById("proxy_time");

function run() {
  const proxyForUrl = "*api1.ldpform.com*";

  setInterval(async () => {
    const [proxy, ladi_data, onSuccess] = await getData(setLogs);

    setProxy(proxy, proxyForUrl, async (isSuccess) => {
      if (!isSuccess) return;
      try {
        fetch("https://api1.ldpform.com/sendform", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(ladi_data),
        }).then((e) => {
          onSuccess(ladi_data);
        });
      } catch (error) {
        sendStatusDiv.innerText = `${error}`;
      }
    });
  }, proxyTimeDiv.value + 100);
}

function setLogs(logs) {
  const newDiv = document.createElement("div");
  newDiv.classList.add("styled-button");
  newDiv.style.marginBottom = "5px";
  newDiv.innerText = `${logs}`;
  sendStatusDiv.appendChild(newDiv);
}
