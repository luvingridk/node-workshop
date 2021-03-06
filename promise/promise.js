let doWork = function (job, timer, isOK) {
  return new Promise((resolve, reject) => {
    // 模擬一個非同步工作
    console.log("in promise");
    setTimeout(() => {
      let dt = new Date();
      if (isOK) {
        // 完成
        resolve(`完成工作: ${job} at ${dt.toISOString()}`);
      } else {
        // 失敗
        reject(`失敗了 ${job}`);
      }
    }, timer);
  });
};

let dt = new Date();
console.log(`開始工作 at ${dt.toISOString()}`);
let job1 = doWork("刷牙", 3000, false);
console.log(job1);
job1.then(
  function (resolve) {
    console.log("第 1 個函式被呼叫了", resolve);
  },
  function (reject) {
    console.log("第 2 個函式被呼叫了", reject);
  }
);
