function register(){
    $(":input").hover(function () {
        $(this).css("border","1px rgb(131,145,165) solid"); //鼠标悬浮颜色
        if($(":input").not(this).css("border-color")!="rgb(32,160,255)"){ //鼠标点击后的颜色
            $(":input").not(this).css("border","1px rgb(221,221,221) solid");//默认颜色
        }
    },function () {
        if($(this).css("border-color")!="rgb(32,160,255)"){
            $(":input").css("border","1px rgb(221,221,221) solid");
        }
      }
    );
    $(":input").focus(function () {
        $(this).css("border","1px rgb(32,160,255) solid");
        $(":input").not(this).css("border","1px rgb(221,221,221) solid")
    });
    $(":input").blur(function () {
        $(this).css("border","1px rgb(221,221,221) solid");
    });
    //改变性别选项
    $("#sex_box>label").click(function () {
        $(this).css("background-color","rgb(34,161,214)").css("color","white");
        $("#sex_box>label").not(this).css("background-color","rgba(244,244,244,0.6)").css("color","black");
    });
    //验证用户名
    var flag=[0,0];
    $("#username").bind("input",function () {
        if($(this).val().length==0){
            $("#nameCheck").text("请告诉我你的用户名吧").css("color","rgb(244,123,190").css("font-size","14px");
        }
        else if ($(this).val().length==1){
            $("#nameCheck").text("用户名过短").css("color","rgb(244,123,190").css("font-size","14px");
        }
        else if ($(this).val().length>=2&&$(this).val().length<=16){
            console.log("key up");
            // alert("hello");
            console.log($(this).val());
            var username = $("#username").val();
            ajax({
                url:"../LoginOrRegister",
                type:"GET",
                data:{
                    username: username
                },
                success:function(xhr) {
                    var str=xhr.responseText;
                    console.log(str);
                    if(str){
                        if(str=="用户名不存在"){
                            $("#nameCheck").text("");
                            flag[0]=1;
                        }
                        else{
                            $("#nameCheck").text(str);
                            flag[0]=0;
                        }
                       
                    }else{
                        console.log("服务端处理出错");
                    }
                },
                error:function (xhr) {
                    console.log("error");
                    //alert(xhr.status);
                }
            });
        }
        else {
            $("#nameCheck").text("用户名过长").css("color","rgb(244,123,190").css("font-size","14px");
        }
    })
    $("#password").bind("input",function(){
        var pwd = $(this).val();
        var pwdCheck = $("#pwdCheck");
        if(pwd.length==0){
            pwdCheck.text("请输入密码").css("color","rgb(244,123,190").css("font-size","14px");
            flag[1]=0
        }
        else if(pwd.length>=1&&pwd.length<6){
            pwdCheck.text("密码过短").css("color","rgb(244,123,190").css("font-size","14px");
            flag[1]=0
        }
        else if(pwd.length>16){
            pwdCheck.text("密码过长").css("color","rgb(244,123,190").css("font-size","14px");
            flag[1]=0
        }
        else{
            pwdCheck.text("");
            flag[1]=1;
        }
    })
    $("#password").bind("input",function() {
        var pwd = $(this).val();
        var level = $("#level").text("安全等级");
        var levelRed = $("#levelRed").css("background-color","rgb(255,0,0)");
        var levelOrange = $("#levelOrange").css("background-color","rgb(255,127,0)");
        var levelGreen = $("#levelGreen").css("background-color","green");
        var levelTip = $("#levelTip");
        var regNum = /[0-9]+/;
        var regChar = /[a-zA-Z]+/;
        if(pwd.length<6){
            levelRed.css("visibility","visible")
            levelOrange.css("visibility","hidden");
            levelGreen.css("visibility","hidden");
            levelTip.text("弱").css("color","rgb(255,0,0)");
        }
        else if(pwd.length>=6 && pwd.length<=10){
            var numFlag=0;
            var charFlag=0;
            for(var i=0;i<pwd.length;i++){
                if(pwd.charAt(i)>='0'&&pwd.charAt(i)<='9'){
                    numFlag=1;
                }
                else if((pwd.charAt(i)>='a'&&pwd.charAt(i)<='z')||(pwd.charAt(i)>='A'&&pwd.charAt(i)<='Z')){
                    charFlag=1;
                }
            }
            if((numFlag==1&&charFlag==0)||(numFlag==0&&charFlag==1)){
                levelRed.css("visibility","visible")
                levelOrange.css("visibility","hidden");
                levelGreen.css("visibility","hidden");
                levelTip.text("弱").css("color","rgb(255,0,0)");
            }
            else if(numFlag==1&&charFlag==1){
                levelRed.css("visibility","visible")
                levelOrange.css("visibility","visible");
                levelGreen.css("visibility","hidden");
                levelTip.text("中").css("color","rgb(255,127,0)");
            }
        }
        else if(pwd.length>=11&&pwd.length<=16){
            var numFlag=0;
            var charFlag=0;
            for(var i=0;i<pwd.length;i++){
                if(pwd.charAt(i)>='0'&&pwd.charAt(i)<='9'){
                    numFlag=1;
                }
                else if((pwd.charAt(i)>='a'&&pwd.charAt(i)<='z')||(pwd.charAt(i)>='A'&&pwd.charAt(i)<='Z')){
                    charFlag=1;
                }
            }
            if((numFlag==1&&charFlag==0)||(numFlag==0&&charFlag==1)){
                levelRed.css("visibility","visible")
                levelOrange.css("visibility","visible");
                levelGreen.css("visibility","hidden");
                levelTip.text("中").css("color","rgb(255,127,0)");
            }
            else if(numFlag==1&&charFlag==1){
                levelRed.css("visibility","visible")
                levelOrange.css("visibility","visible");
                levelGreen.css("visibility","visible");
                levelTip.text("安全").css("color","green");
            }
        }
        }
    )
    $("#introduction").bind("input",function(){
        var introduction = $(this).val();
        var intCheck = $("#intCheck").css("color","rgb(244,123,190").css("font-size","14px").text("还可以输入"+(100-introduction.length)+"个字");
    })
    $("#form").submit(function(){
        var username = $("#username").val();
        var password = $("#password").val();
        var nameCheck = $("#nameCheck");
        var pwdChcek = $("#pwdCheck");
        if(flag[0]==0||flag[1]==0){
            if(username==""&&password==""){
                nameCheck.text("请告诉我你的用户名").css("color","rgb(244,123,190").css("font-size","14px");
                pwdChcek.text("请输入密码").css("color","rgb(244,123,190").css("font-size","14px");
            }
            else if(username==""){
                nameCheck.text("请告诉我你的用户名").css("color","rgb(244,123,190").css("font-size","14px");
            }
            else if(password=""){
                pwdChcek.text("请输入密码").css("color","rgb(244,123,190").css("font-size","14px");
            }
            return false;
        }
    })
}
