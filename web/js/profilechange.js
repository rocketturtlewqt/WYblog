function profilechange(){
    $("#information").children().remove();
    $("#information").append(
        `
        <label id="name">姓名: </label><input name="name" type="text"><br>
        <label>性别: </label><label for="">男</label><input name="sex" type="radio" value="male"><label for="">女</label><input name="sex" type="radio" value="female"><br>
        <label id="birth">生日: </label><input name="birth" type="date"><br>
        <label id="company">公司: </label><input name="company" type="text"><br>
        <label id="position">职位: </label><input name="position" type="text"><br>
        <label id="degree">学历: </label>
        <select name="degree">
            <option value="xx">小学</option>
            <option value="cz">初中</option>
            <option value="gz">高中</option>
            <option value="bk">本科</option>
            <option value="ss">硕士</option>
            <option value="bs">博士</option>
        </select>
        <br>
        <label id="school">学校: </label><input name="school" type="text"><br>
        <label id="industry">行业: </label>
        <select name="industry">
            <option value="hlw">互联网</option>
            <option value="jr">金融</option>
            <option value="ds">电商</option>
            <option value="ed">教育</option>
        </select>
        <br>
        <label id="introduction">简介: </label><textarea name="introduction" id="" cols="30" rows="10" placeholder='拥有十年以上开发经验'></textarea><br>
        <button>取消</button><button>确认</button>
    `
    );
}