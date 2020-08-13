function profileshow(x,arr){
    $("#information").children().remove();
    $("#information").append(
        `
        <ul>
            <li>昵称:</li>
            <li>姓名:</li>
            <li>性别:</li>
            <li>生日:</li>
            <li>公司:</li>
            <li>职位:</li>
            <li>学历:</li>
            <li>学校:</li>
            <li>行业:</li>
            <li>简介:</li>
        </ul>
        <span>修改资料></span>
    `
    );
    $("#information>ul>li").eq(0).text("昵称: "+window.sessionStorage.getItem("username"));
    for(var i=0;i<x.length;i++){
        var t=window.sessionStorage.getItem(x[i])
        if(t){
            $("#information>ul>li").eq(i+1).text(arr[i]+t);
        }
    }
}