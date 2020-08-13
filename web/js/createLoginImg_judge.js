function createLoginImg_judge(){
    //wqt:获取浏览器url地址
    var href=window.location.href;
    //wqt:取出url后缀文件名
    var file=href.substr(href.lastIndexOf('/')+1);
    var username=window.sessionStorage.getItem("username");
    console.log(file,username);
    //wqt:如果是未登陆状态
    if(username===null){
        //wqt:如果是首页
        if(file==="blogindex.html")
            $("#header>.write>a").eq(0).attr("href","page/login.html");
        //wqt:如果不是首页
        else
            $("#header>.write>a").eq(0).attr("href","../page/login.html");
    }
    //wqt:如果是登录状态
    else {
        $("#header>.LoginOrRegister").eq(0).remove();
        $("#header").append("<div class=\"pic\"><img src=\"\"></div>");
        if(file==="blogindex.html"){
            $("#header>.write>a").eq(0).attr("href","md/artical.html");
            //wqt:设置登录注册按钮转为为任务头像
            $("#header>.pic>img").eq(0).attr("src","avatorImg/"+username+".jpg");
        }
        else{
            $("#header>.write>a").eq(0).attr("href","../md/artical.html");
            //wqt:设置登录注册按钮转为为任务头像
            $("#header>.pic>img").eq(0).attr("src","../avatorImg/"+username+".jpg");
        }
    }
    //设置登录注册按钮样式
    if($("#header>.LoginOrRegister").eq(0).text()==="登录/注册"){
        $("#header>.LoginOrRegister").eq(0).hover(function (event) {
            $(this).css("background-color","rgb(240,240,245)");
        },function () {
            $(this).css("background-color","white");
        });
    }
}