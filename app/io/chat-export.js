var chat = require("../schemas/chat.js");
var room = require("../schemas/room.js");

//公共消息
function publicChat(socket,io){
    socket.on("message for public",function(msg){
        var _message = new chat({
            user:msg.name,
            message:msg.message
        });
        _message.save(function(){})

        io.emit("message for public",msg)
    })
}

//私聊
function chatOneByOne(socket,user){
    socket.on("send One",function(msg){
        console.log(msg)
        msg.to.map(function(el){
            if(user.hasOwnProperty(el)){
                user[el].emit("send One",{
                    message:msg.meesage,
                    name:msg.name
                })
            }
        })
    })
}

//某人加入
function join(socket,io){
    socket.on("join",function(msg){
        if(msg){
            io.emit("join",msg)
        }
    })

}

//退出
function disconnect(socket,callback){
    socket.on("disconnect",function(){
        if(callback) callback(socket)
        console.log("出去")
    })
}


exports.publicChat = publicChat;

exports.disconnect = disconnect;

exports.join = join;

exports.chatOneByOne = chatOneByOne;