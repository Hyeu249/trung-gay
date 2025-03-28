const got = require("got");
const tunnel = require("tunnel");

// Sample list of proxy servers (replace these with your actual proxies)
const serversList = [
  "38.154.227.167:5868:fvqkybmd:6gfjo75snmc2",
  "45.127.248.127:5128:fvqkybmd:6gfjo75snmc2",
  "198.23.239.134:6540:fvqkybmd:6gfjo75snmc2",
  "207.244.217.165:6712:fvqkybmd:6gfjo75snmc2",
  "167.160.180.203:6754:fvqkybmd:6gfjo75snmc2",
  "104.239.105.125:6655:fvqkybmd:6gfjo75snmc2",
  "154.36.110.199:6853:fvqkybmd:6gfjo75snmc2",
  "45.151.162.198:6600:fvqkybmd:6gfjo75snmc2",
  "204.44.69.89:6342:fvqkybmd:6gfjo75snmc2",
  "206.41.172.74:6634:fvqkybmd:6gfjo75snmc2",
];

// Function to get the next proxy server
const getHost = () => {
  const [host, port, username, password] = serversList[3].split(":"); // Use the first proxy in the list
  return {
    host,
    port: Number(port),
    proxyAuth: `${username}:${password}`,
  };
};

const requestBody = {
  form_config_id: "66f4e0e8e9335a001119dce6",
  ladipage_id: "66f4e106e9335a001119e0a8",
  name: "test from nodejs",
  phone: "test from nodejs",
  address: "whats up",
  form_item921: "ML05",
  form_item898: "Beli 2 Item: LEADR Super Serum COD RM95 + Free Shipping",
  form_item919: "LEADR Super Serum",
  form_item924: "CML09",
  form_item920: "",
  form_item988: "ML05-TESTING",
  form_item987: "FB",
  zipcode: "3",
};

const apiurl = "https://api1.ldpform.com/sendform";
const ipCheckUrl = "https://api.ipify.org?format=json"; // IP checking service

// Function to make the API request
const callApi = async () => {
  try {
    // Log the proxy details
    const { host, port } = getHost();
    console.log(`Using proxy: ${host}:${port}`);

    // Check what IP is being used through the proxy
    const ipResponse = await got(ipCheckUrl, {
      agent: {
        https: tunnel.httpsOverHttp({
          proxy: getHost(),
        }),
      },
    });
    console.log("Proxy IP Address-nodejs:", ipResponse.body); // Log the proxy IP address

    // Make the actual API request
    const response = await got.post(apiurl, {
      json: requestBody, // Send the request body as JSON
      responseType: "json", // Parse the response as JSON
      agent: {
        https: tunnel.httpsOverHttp({
          proxy: getHost(),
        }),
      },
      timeout: 5000, // Timeout after 5 seconds
    });

    console.log("API Response with proxy:", response.body); // Log the API response
  } catch (err) {
    console.error("Error: hello!!!!", err.message); // Log any errors
  }
};

// Call the API
callApi();
