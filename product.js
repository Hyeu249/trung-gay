async function getData(setLogs) {
  const [proxy, used_proxys] = await getProxyData();
  const [ladi_data, used_ladi_datas] = await getLandiData();

  function onSuccess(e) {
    setLogs(`${proxy}---${getLadiDataCode(ladi_data)}---${JSON.stringify(e)}`);
  }

  return [proxy, ladi_data, onSuccess];
}
