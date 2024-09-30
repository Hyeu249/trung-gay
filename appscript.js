const sendStatusDiv = document.getElementById("sendStatus");

const serversList = [
  "38.154.227.167:5868",
  "45.127.248.127:5128",
  "198.23.239.134:6540",
  "207.244.217.165:6712",
  "167.160.180.203:6754",
  "104.239.105.125:6655",
  "154.36.110.199:6853",
  "45.151.162.198:6600",
  "204.44.69.89:6342",
  "206.41.172.74:6634",
];

const data = {
  form_config_id: "66f4e0e8e9335a001119dce6",
  ladi_form_id: "FORM5",
  ladipage_id: "66f4e106e9335a001119e0a8",
  tracking_form: [
    { name: "url_page", value: "https://www.beautythera.online/test-dos" },
    { name: "utm_source", value: "" },
    { name: "utm_medium", value: "" },
    { name: "utm_campaign", value: "" },
    { name: "utm_term", value: "" },
    { name: "utm_content", value: "" },
    { name: "variant_url", value: "" },
    { name: "variant_content", value: "" },
  ],
  form_data: [
    { name: "name", value: "test proxy new devtools" },
    { name: "phone", value: "0905969584" },
    { name: "address", value: "test proxy" },
    { name: "form_item921", value: "ML05" },
    {
      name: "form_item898",
      value: "Beli 2 Item: LEADR Super Serum COD RM95 + Free Shipping",
    },
    { name: "form_item919", value: "LEADR Super Serum" },
    { name: "form_item924", value: "CML09" },
    { name: "form_item920", value: "" },
    { name: "form_item988", value: "ML05-TESTING" },
    { name: "form_item987", value: "FB" },
    { name: "zipcode", value: "" },
  ],
  data_key: null,
  status_send: 2,
  total_revenue: 300000,
  time_zone: 7,
};
let i = 0;
function run() {
  // proxy format => ip:port
  // only use proxy for this 'format url'
  const proxyForUrl = "*api1.ldpform.com*";

  setInterval(async () => {
    const proxy = serversList[i];
    sendStatusDiv.innerText = "Running!";
    i++;

    setProxy(proxy, proxyForUrl, async (isSuccess) => {
      if (!isSuccess) return;
      try {
        fetch("https://api1.ldpform.com/sendform", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(data),
        }).then(() => {
          sendStatusDiv.innerText = "Success!";
        });
      } catch (error) {}
    });
  }, 5000);
}
