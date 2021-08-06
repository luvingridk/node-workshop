let doWork = function (job, timer, isOK) {
  return new Promise((resolve, reject) => {
    // 模擬一個非同步工作
    setTimeout(() => {
      let dt = new Date();
      if (isOK) {
        resolve(`完成工作: ${job} at ${dt.toISOString()}`);
        //完成
      } else {
        reject(`${job}失敗`);
        //失敗
      }
    }, timer);
  });
};
let job1 = doWork("刷牙", 3000, true);
job1
  .then((resolve) => {
    console.log("第一個", resolve);
    return doWork("吃早餐", 5000, true);
  })
  .then((resolve) => {
    console.log("第二個", resolve);
    return doWork("寫功課", 3000, false);
  })

  .catch((reject) => {
    // 捕捉錯誤
    console.log("error", reject);
  })
  .finally(() => {
    console.log("end");
  });
