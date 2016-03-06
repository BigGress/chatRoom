var chat = require("../schemas/chat.js");
var room = require("../schemas/room.js");

module.exports = function(config,req,res){
    console.log(req.query.page)
    chat.find().skip(parseInt(req.query.page)*10)
        .sort({
            "_id":-1
        })
        .limit(10)
        .exec(function(err,data){
            if(data.length){
                res.send(data)
            }else{
                res.send(data)
            }
        })
}

