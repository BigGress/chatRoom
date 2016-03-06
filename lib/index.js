/**
 * Created by Administrator on 2016/2/18.
 */

var socket= io();
var app = angular.module("app",["ngAnimate","dir"]);

app.run(function(){

})

app.controller("message",function($scope,$http){
    var PrivateName = [];
    //设置房间名字
    $scope.roomName = "public";
    $(".message").style.marginBottom = $(".messageBox").clientHeight+"px";
    if(!$scope.name&&!localStorage.name){

        $scope.alert={
            show:true,
            title:"请输入你的名字",
            agreeFn:function(){
                if($scope.alert.name){
                    localStorage.name = $scope.alert.name||localStorage.name;
                    $scope.alert.show = false;
                }
            },
            close:function(){
                $scope.alert.show = false;
            }
        }
    }
    socket.emit("join",localStorage.name)
    document.querySelector(".messageBox input").onfocus=function(){
        document.querySelector(".messageBox input").focus();
    };
    $scope.messageArr = [];
    //鼠标事件
    $scope.submit = function(){
        if($scope.sendMessage !=""){

            //判断是群发还是私聊
            if(!PrivateName){
                send();

                document.querySelector(".messageBox input").focus();
            }else{
                sendOne();

                document.querySelector(".messageBox input").focus();
            }
        }
    }
    //键盘事件
    $scope.subByKey = function(){
        if(arguments[0].keyCode===13){

        //判断是群发还是私聊
            if(PrivateName.length==0){
                send();

                document.querySelector(".messageBox input").focus();
            }else{
                sendOne();

                document.querySelector(".messageBox input").focus();
            }

        }else{
            //判断第一个字符是不是@
            wantSendSB()
        }
    }
    $scope.resetName = function(){
        //$scope.name = prompt("请输入你的名字","")
        //localStorage.name = $scope.name||localStorage.name;
        $scope.alert={
            show:true,
            title:"请输入你的名字",
            agreeFn:function(){
                console.log($scope.alert.name)
                if($scope.alert.name){
                    localStorage.name = $scope.alert.name||localStorage.name;
                    $scope.alert.show = false;
                }
            },
            close:function(){
                $scope.alert.show = false;
            }
        }
        console.log($scope.alert.show)
    }

    //设置发送的人
    $scope.setSendP = function(event){
        var id = event.target.getAttribute("data-id");
        var name = event.target.innerText

        if($scope.nameShow){

            PrivateName.push(id)

            $scope.sendMessage += name+" ";


            document.querySelector(".messageBox input").focus();
        }
    }

    $scope.getMessage = (function(){
        var page = 0

        return function (move){

            if(move==="next"){
                page+=1;
            }else if(move==="back"){
                page-=1;
            }
            if(page<=0){
                page=1
            }else if(page>=10){
                console.log(page)
                page=10
            }
            $http.post("/message?page="+(page-1).toString())
                .then(function(msg){
                    console.log(msg)
                    if(typeof msg.data){
                        $scope.message = {
                            show:true,
                            title:"聊天记录",
                            data:msg,
                            close:function(){
                                $scope.message.show=false
                            }
                        }
                    }else{
                        $scope.message.alert = msg
                    }


                })

        }

    })()

    function send(){
        socket.emit("message for "+$scope.roomName,{
            name:localStorage.name,
            message:$scope.sendMessage,
            id:socket.id
        });
        $scope.sendMessage = "";
    }

    function sendOne(){

        if($scope.nameShow){
            var arr = $scope.sendMessage.split(" ");
            message = arr[arr.length-1];

            socket.emit("send One",{
                to:PrivateName,
                meesage:message,
                name:localStorage.name
            })
            //清空消息
            $scope.sendMessage = "";

            //重置发送人
            $scope.nameShow = false;

            PrivateName=[];

            //发送系统事件
            $scope.messageArr.push({
                stylemessage: "消息发送成功"
            })
            scrollBottomFN();
        }
    }

    function wantSendSB(){
        if(/^@/.test($scope.sendMessage)){
            $scope.nameShow = true;
        }
    }

    function scrollBottomFN(){
        var scrollBottom = setInterval(function(){
            if((document.body.clientHeight/window.innerHeight)>0.8) {
                if (window.scrollY != document.body.scrollHeight - window.innerHeight){
                    window.scrollTo(0,window.scrollY+2)
                }else{
                    clearInterval(scrollBottom)
                }
            }
        })
    }

    //公共聊天方法
    socket.on("message for public",function(msg){
        console.log(msg)
        $scope.$apply(function(){

            $scope.messageArr.push({
                name:msg.name,
                message:msg.message,
                time:new Date(),
                id:msg.id
            });

            scrollBottomFN();
        })
    })

    //对方加入的方法
    socket.on("join",function(msg){
        console.log(msg)
        if(msg!=localStorage.name){

            $scope.$apply(function() {
                $scope.messageArr.push({
                    stylemessage: msg+"加入房间"
                })
                scrollBottomFN();
            })
        }
    })

    //私聊
    socket.on("send One",function(msg){
        console.log(msg)

        $scope.$apply(function(){

            $scope.messageArr.push({
                name:msg.name,
                message:msg.message,
                time:new Date()
            });

            scrollBottomFN();
        })
    })

    //系统事件
    //socket.on("system event",function(msg){
    //    if(msg.status==0){
    //        $scope.$apply(function() {
    //            $scope.messageArr.push({
    //                stylemessage: "消息发送成功"
    //            })
    //            scrollBottomFN();
    //        })
    //    }
    //})
})

function log(){
    Function.apply.call(console.log, console, arguments);
}
function isArray(arr){
    return Object.prototype.toString.call(arr).indexOf("Array")?true:false
}
function $(el){
    return document.querySelector(el)
}