function articallist() {
    var $li=$("#body>ul>li");
    changeColor($li);
    $("#header>.list1>li").eq(0).click(function () {
        var str=window.location.href;
        str=str.substr(0,str.indexOf("console"))+"blogindex.html";
        window.location.href=str;
    });
    var username=window.sessionStorage.getItem("username");
    $("#header>div>img").eq(0).attr("src","../avatorImg/"+username+".jpg");
    var arr;
    if(username){
        ajax({
            url:"../GetArtical",
            type:"POST",
            data:{
                username:username
            },
            success:function(xhr) {
                var str=xhr.responseText;
                if(str){
                    arr=str.split(";");
                    console.log(arr);
                    for(var i=0;i<arr.length;i++){
                        arr[i]=JSON.parse(arr[i]);
                    }
                    Vue.component('paragraph',{
                        props:['obj'],
                        methods:{
                            check:function(event){
                                var loc=window.location.href.substr(0,window.location.href.indexOf('console'));
                                var str=$(event.target).parent().parent().find("a").eq(0).attr("href");
                                loc+="md/artical.html"+str.substr(str.indexOf('?'));
                                window.location.href=loc;
                            },
                            del:function(event){
                                var href=$(event.target).parent().parent().find("a").attr("href");
                                var id=href.split("?")[1].split("=")[1];
                                ajax({
                                    url:"../DeleteArtical",
                                    type:"GET",
                                    data:{
                                        id:id
                                    },
                                    success:function(xhr) {
                                        if(xhr.responseText=='success'){
                                            $(event.target).parent().parent().remove();
                                        }else{
                                            alert("服务端修改出错")
                                        }
                                    },
                                    error:function (xhr) {
                                        alert(xhr.status);
                                    }
                                });
                            }
                        },
                        template:
                            `
                            <div>
                                <span title="编辑"><a href="../room/room.html">{{obj.title}}</a></span><br>
                                <span>原创</span><span></span>
                                <ul>
                                    <li @click="check">编辑</li>
                                    <li>|</li>
                                    <li @click="del">删除</li>
                                </ul>
                            </div>
                            `
                    });
                    var vm=new Vue({
                        el:"#right",
                        data:{
                            arr:arr
                        },
                        methods: {
                            f:function(){
                                for(var i=0;i<this.arr.length;i++){
                                    $("#right>div").eq(i).find("span").eq(2).text(this.arr[i].time);
                                    var a=$("#right>div>span>a").eq(i);
                                    var href=a.attr("href");
                                    href+="?id="+this.arr[i].id;
                                    a.attr("href",href);
                                }
                            }
                        }
                    });
                    vm.f();
                }
            },
            error:function (xhr) {
                alert(xhr.status);
            }
        });
    }
}