function search() {
    $(function(){
        $("#header>.list1>li").eq(0).click(function () {
            var str=window.location.href;
            str=str.substr(0,str.indexOf("search"))+"blogindex.html";
            window.location.href=str;
        });
        createLoginImg_judge();
        var keyword=window.location.href.split('?');
        if(keyword.length!=1) keyword=keyword[1].split('=')[1];
        ajax({
            url:"../SearchArtical",
            type:"GET",
            data:{
                keyword:keyword
            },
            success:function(xhr) {
                var str=xhr.responseText;
                if(str) {
                    var arr = str.split(";");
                    for (var i = 0; i < arr.length; i++) {
                        arr[i] = JSON.parse(arr[i]);
                        //wqt:如果内容长度超过20，则将在博文条目中以...的形式显示
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
                                    $("#right>div").eq(i).find("a").attr("href","../room/room.html?id="+this.arr[i].id);
                                    $("#right ul").eq(i).find("img").attr("src","../avatorImg/"+this.arr[i].username+".jpg");
                                }
                            }
                        }
                    });
                    /*
                    * wqt:动态循环渲染
                    * */
                    vm.f();
                }
            },
            error:function (xhr) {
                alert(xhr.status);
            }
        });
    });
}