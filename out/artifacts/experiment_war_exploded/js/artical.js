function artical() {
    $("#header>.list1>li").eq(0).click(function () {
        var str=window.location.href;
        str=str.substr(0,str.indexOf("md"))+"blogindex.html";
        window.location.href=str;
    });
    var username=window.sessionStorage.getItem("username");
    //wqt:用户名不存在则跳转至登录页面
    if(username==null) {
        var href=window.location.href;
        href=href.substr(0,href.indexOf("md"));
        href+="page/login.html";
        window.location.href=href;
    }
    drawbgartical();
    $("*").attr("onselectstart","return false");
    selfcenterAndLogout();
    var vm=new Vue({
        el:"#body",
        data:{
            title:"",
            content:""
        },
        methods:{
            titleChange:function(){
                var num=$("#form>input").val().length;
                $("#form>span").eq(1).text(num+"/20");
            }
        }
    });
    vm.titleChange();
    var a=window.location.href.split("?");
    if(a.length!==1){
        var id=a[1].split("=")[1];
        ajax({
            url:"../GetArtical",
            type:"POST",
            data:{
                id:id
            },
            success:function(xhr) {
                var str=xhr.responseText;
                str=JSON.parse(str);
                $("#form>input").val(str.title);
                $("#form>textarea").val(str.content);
                $("#form>span").eq(1).text(20-str.title.length+"/20");
                vm.title=str.title;
                vm.content=str.content;
            },
            error:function (xhr) {
                alert(xhr.status);
            }
        });
    }
    $(function () {
        /*
        * wqt:设置右边视角框与左边输入框的大小一致
        * */
        var width=$("#form").css("width");
        var height=$("#form").css("height");
        $("#show").css("width",width).css("height",height);
        /*
        * wqt:设置图片
        * */
        var username=window.sessionStorage.getItem("username");
        $("#header>div>img").eq(0).attr("src","../avatorImg/"+username+".jpg");
        /*
        * wqt:点击注销按钮将注销按钮，提交文章按钮和个人头像移除
        * */
        $("#header>.list2>li").eq(1).click(function () {
            window.sessionStorage.clear();
            var str=window.location.href;
            str=str.substr(0,str.indexOf("md"))+"blogindex.html";
            window.location.href=str;
        });
        $("#form>button").click(function(){
            var title=$("#form>input").eq(0).val();
            var content=$("#form>textarea").eq(0).val();
            var date=getDate();
            var id=window.location.href.split('?');
            if(id.length===1) id="no";
            else id=id[1].split('=')[1];
            ajax({
                url:"../PublishArticals",
                type:"POST",
                data:{
                    id:id,
                    username:username,
                    title:title,
                    content:content,
                    date:date
                },
                success:function(xhr) {
                    /*
                    * wqt:如果服务端返回success信息则表示成功处理了逻辑
                    * 将浏览器页面跳转到个人文章管理部分
                    * */
                    console.log(xhr.responseText);
                    if(xhr.responseText=='success'){
                        var loc=window.location.href.substr(0,window.location.href.indexOf('md'));
                        loc+="uc/profile.jsp";
                        window.location.href=loc;
                    }
                },
                error:function (xhr) {
                    alert(xhr.status);
                }
            });
        });
    })
}