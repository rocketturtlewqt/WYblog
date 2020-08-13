function selfcenterAndLogout(){
    $("#header>.list2>li:contains('个人中心')").click(function () {
        var str=window.location.href;
        str=str.substr(0,str.indexOf('md'));
        str+="uc/profile.jsp";
        window.location.href=str;
    });
    $("#header>.list2>li:contains('注销')").click(function () {
        window.sessionStorage.removeItem("username");
        $(this).css("display","none");
        $(this).parent().next().css("display","none");
        $("#form>button").css("display","none");
    });
}