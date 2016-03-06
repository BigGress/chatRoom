/**
 * Created by 霖 on 2016/2/21.
 */
var chat = require("../schemas/chat.js");
var room = require("../schemas/room.js");

exports.chat = function(config,req,res,io){
    res.sendFile(config.path+"/page/index.html","utf-8");
        //chat.fetch(function(err,data){
        //    if(data.length>3){
        //        var sendArr = [data[data.length-3],data[data.length-2],data[data.length-1]]
        //    }else{
        //        var sendArr = data
        //    }
        //    setTimeout(function(){
        //        io.emit("message",sendArr);
        //    },1000)
        //})

}