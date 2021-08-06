let doWork = function (job, timer, cb) {
    let executor=(resolve,reject) =>{

    setTimeout(() => {
      let dt = new Date();
        if(isok){
            cb(null,`完成工作:${job} at ${dt.toISOString()}`)
        }else{
            reject(`失敗了 ${job}`);
        }

    }, timer);
  };
    return new Promise(executor);
};
let job1=doWork("刷牙",3000,true);
console.log(job1);
job1.then(
    (result) => {
        console.log("第一個函式被呼叫了",result);
        console.log(job1);
    }
    (error) => {
        console.log("第二個函式被呼叫了",error);
        console.log(job1)
    }

);