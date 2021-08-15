const express = require("express");

// 利用 express 建立了一個 express application
let app = express();

app.use((req, res, next)=>{
    let current = new Date();
    console.log(`安安 at ${current.toISOString()}`);
    next();
  });
  app.use((req, res, next)=>{
    console.log("第二個");
    next();
  });
// HTTP Method: get, post, put, patch, delete
app.get("/", function (request, response, next) {
  response.send("Hello");
});

app.listen(3000, function () {
  console.log("我們的 web server 啟動了～");
});