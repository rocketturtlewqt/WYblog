function blogindex() {
    createLoginImg_judge();
    var index=0;
    $("*").attr("onselectstart","return false");
    ajax({
        url:"GetArtical",
        type:"POST",
        success:function(xhr) {
            var str=xhr.responseText;
            if(str) {
                var arr = str.split(";");
                console.log(arr);
                for (var i = 0; i < arr.length; i++) {
                    arr[i] = JSON.parse(arr[i]);
                    if(arr[i].content.length>20){
                        arr[i].content=arr[i].content.substr(0,20)+"...";
                    }
                }
                /*
                * wqt:用vue创建博文条目组件
                * 条目的标题应用超链接与文章对象的标题绑定
                * 列表的第一个li元素则与文章对象的人物头像的相对地址绑定
                * 列表的第二个li元素则与文章对象的人物名字绑定
                * 列表的第三个li元素则与文章对象的内容绑定
                * */
                Vue.component('blog',{
                    props:["obj"],
                    template:
                        `
                            <div>
                                <a href="#">{{obj.title}}</a><br>
                                <ul>
                                    <li><img src=""></li>
                                    <li>{{obj.username}}</li>
                                    <li>{{obj.content}}</li>
                                </ul>
                            </div>
                            `
                });
                /*
                * wqt:创建vue对象vm
                * 挂载到id值为right的内容区
                * 将arr数组赋值给vue对象的arr变量
                * f方法通过循环给每篇文章的标题进行动态绑定id值和作者的人物头像
                * */
                var vm=new Vue({
                    el:"#right",
                    data:{
                        arr:arr
                    },
                    methods:{
                        f:function () {
                            for(var i=0;i<this.arr.length;i++){
                                $("#right>div").eq(i+1).find("a").attr("href","room/room.html?id="+this.arr[i].id);
                                $("#right ul").eq(i+1).find("img").attr("src","avatorImg/"+this.arr[i].username+".jpg");
                            }
                        },
                        k:function () {
                            //切割轮番图

                            var flag=true;
                            for(var i=0;i<2;i++){
                                $("#right>div>span")[i]["index"]=i;
                                $("#right>div>span").eq(i).click(function(){
                                    if(flag){
                                        flag=false;
                                        if($(this)[0]["index"]===0) index++;
                                        else index--;
                                        $(".view>li").each(function(ke,value){
                                            $(this).css({
                                                "transform":"rotateX("+(index*90)+"deg)",
                                                "transition-delay": (ke*0.1)+"s"
                                            });
                                        });
                                        setTimeout(function(){
                                            flag=true;
                                        },1000);
                                    }
                                });
                            }
                        }
                    }
                });
                /*
                * wqt:动态循环渲染
                * */
                vm.f();
                vm.k();
            }
        },
        error:function (xhr) {
            alert(xhr.status);
        }
    });
    /*
    * wqt:给头部搜索框设置回显功能
    * 每键入一个字则对服务端资源进行请求
    * */
    $("#header>input").on('input',function(){
        //获取已经键入的值
        var keyword=$(this).val();
        ajax({
            url:"SearchArtical",
            type:"GET",
            data:{
                keyword:keyword
            },
            success:function(xhr) {
                var str=xhr.responseText;
                if(str) {
                    var tl = str.split(";");
                    for (var i = 0; i < tl.length; i++) {
                        tl[i] = JSON.parse(tl[i]);
                        if (tl[i].title.length > 20) {
                            tl[i].title = tl[i].content.substr(0, 20) + "...";
                        }
                    }
                    //wqt:将原有的搜索条目移除
                    $(".list3>li").remove();
                    var $list3=$(".list3").eq(0);
                    //wqt:设置条目的标题，id和跳转地址
                    for(var i=0;i<tl.length;i++){
                        $list3.append("<li><a href='../room/room.html?id="+tl[i].id+"'>"+tl[i].title+"</a></li>");
                    }
                }
            },
            error:function (xhr) {
                alert(xhr.status);
            }
        });
    });
    /*
    * wqt:点击搜索按钮携带搜索文本框中的内容进行跳转
    * */
    $("#header>.searchImg").click(function () {
        var href=window.location.href;
        href=href.substr(0,href.indexOf("blogindex.html"))+"search/search.html?keyword=";
        href+=$("#header>input").val();
        window.location.href=href;
    });
    //切割轮番图
    var flag=true;
    for(var i=0;i<2;i++){
        $("#right>div>span")[i]["index"]=i;
        $("#right>div>span").eq(i).click(function(){
            if(flag){
                flag=false;
                if($(this)[0]["index"]===0) index++;
                else index--;
                $(".view>li").each(function(ke,value){
                    $(this).css({
                        "transform":"rotateX("+(index*90)+"deg)",
                        "transition-delay": (ke*0.1)+"s"
                    });
                });
                setTimeout(function(){
                    flag=true;
                },1000);
            }
        });
    }
}