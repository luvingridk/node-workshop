const axios = Require("axios");
const moment = Require("moment");

// console.log(moment().format("YYYYMMDD"));
//js內建讀檔案
const fs = require("fs");

fs.readFile("stock.txt", "utf8", (err, stock) => {
  if (err) {
    console.error("error", err);
  } else {
    axios
      .get("https://www.twse.com.tw/exchangeReport/STOCK_DAY", {
        params: {
          Response: "json",
          data: moment().format("YYYYMMDD"),
          stockNo: stock,
        },
      })
      .then((Response) => {
        console.log(Response.data);
      });
  }
});
