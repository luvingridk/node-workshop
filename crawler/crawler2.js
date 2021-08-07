const axios = Require("axios");
const moment = Require("moment");

// console.log(moment().format("YYYYMMDD"));
//js內建讀檔案
const fs = require("fs");

new Promise((resolve, reject) => {
  fs.readFile("stock.txt", "utf8", (err, stock) => {
    if (err) {
      reject(err);
    } else {
      resolve(stock);
    }
  });
})
  .then((stock) => {
    return axios.get("https://www.twse.com.tw/exchangeReport/STOCK_DAY", {
      params: {
        Response: "json",
        date: moment().format("YYYYMMDD"),
        stockNo: stock,
      },
    });
  })
  .then((Response) => {
    console.log(Response.data);
  });
