
var express = require("express")
var app = express();
var PORT = 18080;
var io = require("socket.io")(app.listen(PORT));
var con = 1,config = {};

config.path = __dirname

app.use("/static",express.static(__dirname+"/lib"));

require("./app/io/io-server.js")(io)

require("./config/routes.js")(app,io,config)

require("./config/mongodb.js")()
console.log(PORT)