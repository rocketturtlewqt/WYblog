function login() {
    $(function(){
        /*
        * wqt:设置所有文字不可选中
        */
        $("*").attr("onselectstart","return false");
        //点赞
        var favor=document.getElementById("favor");
        favor.onmousedown=function(){
            favor.innerHTML++;
        }
        /*
        wqt:切换登录/注册
        */
        var li=$("#body li"),login=$("#user_pw>input").eq(2);
        for(var i=0;i<2;i++){
            li[i].index=i;
            li.eq(i).click(function(){
                this.style.borderBottom="2px solid red";
                li.eq(Math.abs(this.index-1)).css("border-bottom","none");
                if(this.index==1&&login.attr("value")==="登录"){
                    var str=window.location.href;
                    str=str.substr(0,str.indexOf("login.html"));
                    str+="register.html";
                    window.location.href=str;
                }else if(this.index==0&&login.attr("value")==="注册"){
                    for(var j=0;j<2;j++){
                        $("#user_pw>input").eq(j).val("");
                    }
                    login.attr("value","登录");
                    login.css("background-color","rgba(245, 245, 245, 1)").css("color","rgba(176,176,176,1");
                    login.prop("disabled",true);
                }
            });
        }

        var input=$("#body input");
        for(var i=0;i<2;i++){
            input[i].index=i;
            input.eq(i).focus(function(){
                this.style.border="1px solid rgba(51,153,234,1)";
                input.eq(Math.abs(this.index-1)).css("border","1px solid rgba(204,204,204,1)");
            });
        }

        /*
        wqt:设置登录/注册按钮样式
        */
        /*
        wqt:使按钮不可用
        */
        function disabled(){
            login.css("background-color","rgba(245, 245, 245, 1)").css("color","rgba(176,176,176,1");
            login.prop("disabled",true);
        }
        function judge(){
            var flag=true;
            for(var j=0;j<2;j++){
                if($("#user_pw>input").eq(j).val()===""){
                    flag=false;
                    break;
                }
            }
            if(flag){
                login.prop("disabled",false);
                login.css("background-color","rgba(202, 12, 22, 1)").css("color","rgba(255, 255, 218, 1)");
                login.hover(function(){
                    login.css("background-color","rgba(182, 11, 20, 1)").css("cursor","pointer");
                },function(){
                    login.css("background-color","rgba(202, 12, 22, 1)");
                });
            }
            else{
                disabled();
            }
        }
        for(var i=0;i<2;i++){
            $("#user_pw>input").eq(i).keyup(function(){
                judge();
            });
        }
        /*
        wqt:监听叉叉和小眼睛
        */
        var body_img=$("#body img");
        for(var i=0;i<2;i++){
            body_img[i].index=i;
            body_img[i].onclick=function(){
                if(this.index===0){
                    $("#user_pw>input").eq(0).val("");
                    body_img[0].style.display="none";
                    disabled();
                }
                else{
                    var ps=$("#user_pw>input").eq(1);
                    if(ps.attr("type")==="text") ps.attr("type","password");
                    else ps.attr("type","text");
                }
            }
        }
        $("#user_pw>input").eq(0).keyup(function(){
            if(this.value!="") body_img[0].style.display="block";
            else body_img[0].style.display="none";
        });
        /*
        * wqt:监听登录/注册按钮点击事件
        */
        var x=["name","sex","birth","company","position","degree","school","industry","introduction"]
        $("#user_pw>input").eq(2).click(function(){
            ajax({
                url:"../LoginOrRegister",
                type:"GET",
                data:{
                    username:$("#user_pw>input").eq(0).val(),
                    password:$("#user_pw>input").eq(1).val(),
                    submit:$("#user_pw>input").eq(2).attr("value")
                },
                success:function(xhr) {
                    if(xhr.responseText=='用户名不存在'||xhr.responseText=="密码错误"){
                        $("#user_pw>span").eq(2).text(xhr.responseText);
                    }else{
                        /*
                        * 将用户的信息保存在sessionStorage上
                        * */
                        var str=JSON.parse(xhr.responseText);
                        var pos=1;
                        for(var i in str){
                            if(str[x[pos-1]]!="null"&&str[x[pos-1]]!="undefined") window.sessionStorage.setItem(x[pos-1],str[x[pos-1]]);
                            pos++;
                        }
                        /*
                        * wqt:页面地址栏跳转
                        * */
                        window.sessionStorage.setItem("username",$("#user_pw>input").eq(0).val());
                        var loc=window.location.href.substr(0,window.location.href.indexOf('page'));
                        loc+="uc/profile.jsp";
                        window.location.href=loc;
                    }
                },
                error:function (xhr) {
                    alert(xhr.status);
                }
            });
        });
    });
}