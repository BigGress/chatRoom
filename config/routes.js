/**
 * Created by �� on 2016/2/21.
 */
var chat = require("../app/ctrl/chat.js");
var message = require("../app/ctrl/message.js");

var con = 1
module.exports = function(app,io,config){
    app.get("/",function(req,res){
        chat.chat(config,req,res,io)
    })

    app.post("/message",function(req,res){
        message(config,req,res)
    })
}
