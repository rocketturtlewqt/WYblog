function room() {
    $("#header>.list1>li").eq(0).click(function () {
        var str=window.location.href;
        str=str.substr(0,str.indexOf("room"))+"blogindex.html";
        window.location.href=str;
    });
    var username=window.sessionStorage.getItem("username");
    if(username==null){
        $("#header>.write>a").eq(0).attr("href","../page/login.html");
    }
    else {
        $("#header>.write>a").eq(0).attr("href","../md/artical.html");
        $("#header>.pic>img").eq(0).attr("src","../avatorImg/"+username+".jpg");
    }
    $("#content").eq(0).append();
    var href=window.location.href;
    var id=href.split("?")[1].split("=")[1];
    ajax({
        url:"../GetArtical",
        type:"GET",
        data:{
            id:id
        },
        success:function(xhr) {
            var str=xhr.responseText;
            if(str){
                str=JSON.parse(str);
                $("#user>ul>li>img").eq(0).attr("src","../avatorImg/"+str.username+".jpg");
                $("#user>ul>li").eq(1).text(str.username);
                $("#content>h1").text(str.title);
                $("#content>p").text(str.content);
            }else{
                console.log("服务端处理出错");
            }
        },
        error:function (xhr) {
            alert(xhr.status);
        }
    });
}