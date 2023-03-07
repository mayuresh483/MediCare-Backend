const express = require('express');
require('dotenv').config();
var cookieParser = require('cookie-parser');
const app = express();
app.use(express.json());

var route = require('./routes/commonRoutes');
const PORT = process.env.APP_PORT;
app.set('port', PORT);
app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ limit: '50mb', extended: false }));
app.use(cookieParser());

app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Methods", "GET,HEAD,OPTIONS,POST,PUT");
  res.header("Access-Control-Allow-Headers", "*,Origin, X-Requested-With, Content-Type, Accept, Authorization");
  next();
});
app.use('/auth', route);

app.listen(PORT,()=>{
    console.log("Port is Running on "+ PORT);
})

module.exports = app;