/**
 * Created by hjy on 2016/1/22 0022.
 */

function getUserInfo(){
    util.callServerFunction({auth: window.btoa("userID="+util.getSessionStorage("userID")+"&authSign="+util.getSessionStorage("authSign"))},'pay/withdrawInfo?random='+parseInt(Math.random()*10000), {}, function(data) {
        if(data.code == 900) {
            vm.userNick(data.info.name);
            vm.userName(data.info.id);
            $("body").css("visibility","visible");
            $("body").addClass("animated fadeIn");
        } else {
            util.errorCodeApi(data);
        }
    },"GET");
}

var viewModel = function(){
    this.userName = ko.observable("");
    this.userNick = ko.observable("");
};
var vm = new viewModel();
$(document).ready(function(){
    ko.applyBindings(vm);
    getUserInfo();
    $(".errorText").text(util.getSessionStorage("message"));
});