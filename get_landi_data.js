function get_ladipage_data() {
  return new Promise((resolve) => {
    chrome.storage.local.get(["arrayUrl"], (result) => {
      if (result.arrayUrl.length) {
        return resolve(result.arrayUrl[0]);
      } else {
        return "";
      }
    });
  });
}

function getUsedLadidatas() {
  return new Promise((resolve) => {
    chrome.storage.local.get(["used_ladi_datas"], (result) => {
      resolve(result.used_ladi_datas || []);
    });
  });
}

async function setUsedLadidatas(ladi_datas) {
  return new Promise((resolve) => {
    chrome.storage.local.set({ used_ladi_datas: ladi_datas }, resolve);
  });
}

function getLadiDataCode(ladi_data) {
  const name = ladi_data.form_data[0].value;
  const phone = ladi_data.form_data[1].value;
  const address = ladi_data.form_data[2].value;
  return name + phone + address;
}

async function getLandiData() {
  let ladipage_data = await get_ladipage_data();
  const raw_data = JSON.parse(paramsFileRender.innerText) || [];

  const ladipage_datas = raw_data.map((data) => {
    const clonedData = JSON.parse(JSON.stringify(ladipage_data.params));
    const form_data = clonedData.form_data;

    for (let i = 0; i < form_data.length; i++) {
      const name = form_data[i].name;
      if (data[name]) {
        form_data[i].value = data[name];
      }
    }

    return clonedData;
  });

  let used_ladi_datas = await getUsedLadidatas();
  let ladi_data;
  let availableLadidatas = ladipage_datas.filter((p) => {
    return !used_ladi_datas.includes(getLadiDataCode(p));
  });

  if (availableLadidatas.length === 0) {
    used_ladi_datas = await setUsedLadidatas([]);
    availableLadidatas = [...ladipage_datas];
  }

  ladi_data = availableLadidatas[0];
  used_ladi_datas.push(getLadiDataCode(ladi_data));

  await setUsedLadidatas(used_ladi_datas);

  return [ladi_data, used_ladi_datas];
}
