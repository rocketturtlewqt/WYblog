function profile() {
    $("#header>.list1>li").eq(0).click(function () {
        var str=window.location.href;
        str=str.substr(0,str.indexOf("uc"))+"blogindex.html";
        window.location.href=str;
    });
    /*
    * wqt:这块代码必须放在外面
    * */
    var username=window.sessionStorage.getItem("username");
    //wqt:用户名不存在则跳转至登录页面
    if(username==null) {
        var href=window.location.href;
        href=href.substr(0,href.indexOf("uc"));
        href+="page/login.html";
        window.location.href=href;
    }
    $("*").attr("onselectstart","return false");
    //wqt:用户名存在则设置图片
    $("#img>img").eq(0).attr("src","../avatorImg/"+username+".jpg");
    var $li=$("#body>ul>li");
    //wqt:实现ul样式
    changeColor($li);
    //wqt:设置个人基本信息
    $("#information>ul>li").eq(0).text("昵称: "+window.sessionStorage.getItem("username"));
    var arr=["姓名: ","性别: ","生日: ","公司: ","职位: ","学历: ","学校: ","行业: ","简介: "];
    var x=["name","sex","birth","company","position","degree","school","industry","introduction"];
    for(var i=0;i<x.length;i++){
        var t=window.sessionStorage.getItem(x[i])
        //wqt:如果在登录期间传入sessionStorage有相关的设置信息则进行相关条目的渲染
        if(t) $("#information>ul>li").eq(i+1).text(arr[i]+t);
    }
    /*
    * wqt:修改资料
    * 因为这部分对DOM对象整体进行了动态修改，
    * 因此修改资料按钮的点击事件需要寄托在父元素身上
    * */
    $("#information").delegate("span:contains('修改资料>')","click",function(){
        //wqt:跳转到修改资料页面
        profilechange();
    });
    /*
    * wqt:点击取消按钮返回个人资料
    * 因为这部分对DOM对象整体进行了动态修改，
    * 因此修改资料按钮的点击事件需要寄托在父元素身上
    * */
    $("#information").delegate("button:contains('取消')","click",function(){
        //wqt:点击回退到基本信息
        profileshow(x,arr);
    });
    $("#information").delegate("button:contains('确认')","click",function(){
        var username=window.sessionStorage.getItem("username");
        var name=$("#information>input").eq(0).val();if(name=="") name="null";
        var sex=$("#information>input:radio:checked").val();if(sex=="") sex="null";
        var birth=$("#information>input").eq(3).val();if(birth=="") birth="null";
        var company=$("#information>input").eq(4).val();if(company=="") company="null";
        var position=$("#information>input").eq(5).val();if(position=="") position="null";
        var degree=$("select").eq(0).find("option:selected").text();if(degree=="") degree="null";
        var school=$("#information>input").eq(6).val();if(school=="") school="null";
        var industry=$("select").eq(1).find("option:selected").text();if(industry=="") industry="null";
        var introduction=$("#information>textarea").eq(0).val();if(introduction=="") introduction="null";
        ajax({
            url:"../PerfectData",
            type:"GET",
            data:{
                way:"确认",
                username:username,
                name:name,
                sex:sex,
                birth:birth,
                company:company,
                position:position,
                degree:degree,
                school:school,
                industry:industry,
                introduction:introduction
            },
            success:function(xhr) {
                var str=xhr.responseText;
                if(str){
                    str=JSON.parse(str);
                    console.log(str);
                    for(var i=0;i<x.length;i++)
                        window.sessionStorage.setItem(x[i],str[x[i]]);
                    profileshow(x,arr);
                }else{
                    alert("修改出错");
                }
            },
            error:function (xhr) {
                alert(xhr.status);
            }
        });
    });
    var fileObj = "";
    var imgData = "";
    $("#myFile").change(function () {
        // 构造一个文件渲染对象
        var reader = new FileReader();
        // 得到文件列表数组
        fileObj = $(this)[0].files[0];
        // 拿到文件数据
        reader.readAsDataURL(fileObj);

        reader.onload = function() {
            // 获取文件信息
            imgData = reader.result;
            // 显示图片
            $("#img>img").eq(0).attr("src", imgData);
            $("#img>img").eq(0).show();
        }
        $("#selfheader>button").eq(0).prop("disabled",false);
        console.log(fileObj);
    });
    /*
    * wqt:上传头像
    * */
    $("#selfheader>button").eq(0).click(function(){
        //通过创建新文件对象来更改文件名
        var username=window.sessionStorage.getItem("username");
        var newfile = new File([fileObj], username+".jpg",{type:"image/jpeg"});
        // 创建 FormData 对象用来保存图片数据
        var formData = new FormData();
        formData.append("headerImg",newfile);
        $.ajax({
            method:"post",
            timeout:5000,
            url: "../PortraitServlet",
            processData: false,
            contentType: false,
            data:formData,
            success: function(data){

            },
            error: function(xhr){
                alert(xhr.status);
            }
        });
    });
}