var socketFn = require("./chat-export");

var user = {};

module.exports = function(io){
    io.on("connection",function(socket){
        socketFn.publicChat(socket,io);

        socketFn.join(socket,io);
        
        socketFn.disconnect(socket,function(outId){
            var id = outId.id;
            if(user.hasOwnProperty(id)) user[id] = null;
        });

        socketFn.chatOneByOne(socket,user)

        addUser(socket);
    })

    io.emit("event",{for:"everyone"});
}

function addUser(socket){
    //console.log(socket.id)
    var id = socket.id.split("#")[1]
    if(!user.hasOwnProperty(id)){
        user[id] = socket
    }
}