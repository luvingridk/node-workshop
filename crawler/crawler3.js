const axios = Require("axios");
const moment = Require("moment");

// console.log(moment().format("YYYYMMDD"));
//js內建讀檔案
const fs = require("fs");

async function dowork() {
  let stock = await new Promise((resolve, reject) => {
    fs.readFile("stock.txt", "utf8", (err, stock) => {
      if (err) {
        reject(err);
      } else {
        resolve(stock);
      }
    });
  });
  let Response = await axios.get(
    "https://www.twse.com.tw/exchangeReport/STOCK_DAY",
    {
      params: {
        Response: "json",
        date: moment().format("YYYYMMDD"),
        stockNo: stock,
      },
    }
  );
  console.log(Response.data);
}
dowork();
