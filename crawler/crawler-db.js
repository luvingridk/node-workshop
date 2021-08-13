const { rejects } = require("assert");
const axios = require("axios");
const moment = require("moment");
const mysql = require("mysql");
const { resolve } = require("path/posix");
//引用
require("dotenv").config();
//設定連線資料
const connection = mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  port: process.env.DB_PORT,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
});
//連線
connection.connect((err) => {
  if (err) {
    console.error("資料庫連不上");
  }
});
function readStockPromise() {
  return new Promise((resolve, reject) => {
      fs.readFile('stock.txt', 'utf8', (err, stockCode) => {
          if (err) {
              reject('error', err)
          } else {
              resolve(stockCode.trim())
          }
      })
  })
}
function queryStockPromise(stockCode) {
  return new Promise((resolve, reject) => {
      connection.query('SELECT * FROM stock WHERE stock_id=?', [stockCode], function (error, results, fields) {
          if (error) {
              reject(error)
          }
          resolve(results)
      })
  })
}

//抓資料
function axiosStock(stockNo) {
  return axios.get('https://www.twse.com.tw/exchangeReport/STOCK_DAY', {
      params: {
          response: 'json',
          date: moment().format('YYYYMMDD'),
          stockNo: stockNo,
      },
  })
}
function insertPromise(itemData) {
  return new Promise((parsedData) => {
      connection.query(
          'INSERT IGNORE INTO stock_price (stock_id, date, volume, amount, open_price, high_price, low_price, close_price, delta_price, transactions) VALUES ?',
          [itemData],
          function (error, results, fields) {
              if (error) reject(error)
              resolve(results)
          }
      )
  })
}
async function dowork() {
  try {
      let stockCode = await readStockPromise()
      let doResult = await queryStockPromise(stockCode)
      if (doResult.length === 0) {
          reject('此股票不在服務範圍內')
      }
      console.info('在資料庫有查到資料')
      let response = await axiosStock(stockCode)
      const twseData = response.data
      if (twseData.stat !== 'OK') {
          throw '查詢的資料有問題'
      }
      let dataItem = twseData.data.map((item) => {
          // 拿掉日期斜線
          item = item.map((val) => {
              return val.replace(/,/g, '')
          })
          // 轉西元年
          item[0] = parseInt(item[0].replace(/\//g, ''), 10) + 19110000;
          item.unshift(stockCode)
          return item;
      })
      console.log(dataItem)
      let insertData = await insertPromise(dataItem)
      console.log(insertData)
  } catch (error) {
      console.error('error', error);
  } finally {
      // 不管成功或失敗都要加上關閉 不關閉程式會一直執行
      connection.end();
  }
}
dowork();