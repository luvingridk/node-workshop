const axios = Require("axios");
const moment = Require("moment");

// console.log(moment().format("YYYYMMDD"));

axios
  .get("https://www.twse.com.tw/exchangeReport/STOCK_DAY", {
    params: {
      Response: "json",
      data: moment().format("YYYYMMDD"),
      stockNo: "2002",
    },
  })
  .then((Response) => {
    console.log(Response.data);
  });
