const axios = require("axios");
const moment = require("moment");
const mysql = require("mysql");

const connection = mysql.createConnection({
  host: "localhost",
  user: "crawler",
  port: 3306,
  password: "1234",
  database: "stock",
});

connection.connect((err) => {
  if (err) {
    console.error("資料庫連不上");
  }
});

// 不關閉連線，認為程式一直在執行
connection.end();

// console.log(moment().format("YYYYMMDD"));
//js內建讀檔案
// const fs = require("fs");

// async function dowork() {
//   let stock = await new Promise((resolve, reject) => {
//     fs.readFile("stock.txt", "utf8", (err, stock) => {
//       if (err) {
//         reject(err);
//       } else {
//         resolve(stock);
//       }
//     });
//   });
//   let Response = await axios.get(
//     "https://www.twse.com.tw/exchangeReport/STOCK_DAY",
//     {
//       params: {
//         Response: "json",
//         date: moment().format("YYYYMMDD"),
//         stockNo: stock,
//       },
//     }
//   );
//   console.log(Response.data);
// }
// dowork();
