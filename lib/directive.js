angular.module("dir",[])
    .directive("btn",function(){
        return {
            restrict:"E",
            template:"<button class='borderRaduis' ng-click='alert.agreeFn()'>确认</button>"
        }
    })
    .directive("close",function(){
        return {
            restrict: "E",
            template: "<button class='borderRaduis' ng-click='alert.close()'>取消</button>"
        }
    })
    .directive("curtain",function(){
        return{
            restrict:"E",
            transclude: true,
            template:"<div class='curtain' ng-class='{show:alert.show}' ><ng-transclude></ng-transclude></div>"
        }
    })
    .directive("nameAlert",function(){
        return {
            require:["btn","close","curtain"],
            restrict:"E",
            template:"<curtain>" +
            "<div class='nameBox borderRaduis text-center' ng-class='{alertBox:alert.show}'>" +
            "<span class='title'>{{alert.title}}</span>" +
            "<input type='text' ng-model='alert.name' class='borderRaduis'>" +
            "<btn></btn><close></close>" +
            "</div></curtain>"
        }
    })
    .directive("messageAlert",function(){
        return {
            restrict:"E",
            template: "<div class='curtain' ng-class='{show:message.show}'>" +
            "<div class='nameBox forMessage borderRaduis text-center' ng-class='{alertBox:message.show}'>" +
            "<button class='close borderRaduis' ng-click='message.close()'>关闭</button>" +
            "<span class='title'>{{message.title}}</span>" +
            "<div ng-repeat='item in message.data.data'>" +
            "<div class='messageDetial'>" +
            "<span class='name fl'>{{item.user}}</span>" +
            "<span class='time fr'>{{item.meta.updateAt|date:'MM-dd hh:mm:ss'}}</span>" +
            "</div>" +
            "<span class='messageDetail clearBoth'>" +
            "<p class='text-left'>{{item.message}}</p>" +
            "</span>" +
            "</div>" +
            "<div ng-bind='message.alert'></div>" +
            "<button class='btn borderRaduis' ng-click='getMessage(\"back\")'>上一页</button>" +
            "<button class='btn borderRaduis' ng-click='getMessage(\"next\")'>下一页</button>" +
            "</div></div>"
        }
    })