<%--
  Created by IntelliJ IDEA.
  User: ASUS
  Date: 2020/7/8
  Time: 17:09
  To change this template use File | Settings | File Templates.
--%>
<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<html>
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <script src="../js/jquery-1.12.4.min.js"></script>
    <script src="../js/ajax.js"></script>
    <script src="../js/changecolor.js"></script>
    <script src="../js/profileshow.js"></script>
    <script src="../js/profilechange.js"></script>
    <script src="../js/createLoginImg_judge.js"></script>
    <script src="../js/profile.js"></script>
    <link rel="stylesheet" href="../css/header.css">
    <link rel="stylesheet" href="../css/footer.css">
    <link rel="stylesheet" href="../css/profile.css">
    <title>个人资料-个人中心-WYblog</title>
</head>
<body>
<div id="header">
    <ul class="list1">
        <li>博客</li>
        <li title="论坛">论坛</li>
        <li title="问答">问答</li>
        <li title="招聘">招聘</li>
    </ul>
    <span class="WYblog"><img src="../img/WYblog.png" ></span>
    <input type="text" placeholder="搜WYblog">
    <span class="searchImg"></span>
    <span class="write"><a href="../md/artical.html">创作中心</a></span>
</div>
<div id="body">
    <ul>
        <li>个人资料</li>
        <li><a href="../console/articallist.html">我的博客</a></li>
        <li>我的粉丝</li>
    </ul>
    <div id="right">
        <h3>个人资料</h3>
        <hr width="96%">
        <div id="selfheader">
            <div id="img"><img src=""></div>
            <span>ID:</span>
            <ul>
                <li>关注 <span>0</span></li>
                <li>|</li>
                <li>粉丝 <span>0</span></li>
            </ul>
            <span><input type="file" id="myFile"></span>
            <button disabled>确定</button>
            <span><a href="https://kt.fkw.com/caijian.html?_ta=5675&kw=152181&renqun_youhua=2043201" target="_blank">裁剪图像</a></span>
        </div>
        <hr width="96%">
        <div id="information">
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
        </div>
    </div>
</div>
<div id="footer">
    <ul>
        <li><a href="#">关于我们</a></li>
        <li>|</li>
        <li><a href="#">客服论坛</a></li>
        <li>|</li>
        <li><span><img src="../img/email.png"></span><a href="#">1600639146@qq.com</a></li>
    </ul>
</div>
<script>
    profile();
</script>
</body>
</html>
