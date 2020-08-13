function change(dat) {
    let res = [];
    for(let key in dat){
        /*
        encodeURIComponent(key) encodeURIComponent(obj[key])用来处理中文的问题
         */
        res.push(encodeURIComponent(key)+"="+encodeURIComponent(dat[key]));
    }
    return res.join("&");
}
function ajax(option) {
    let str = change(option.data);
    let xmlhttp,timer;
    if(window.XMLHttpRequest){
        xmlhttp = new XMLHttpRequest();
    }else{
        xmlhttp = new ActiveXObject("Microsoft.XMLHTTP")
    }
    if(option.type === "GET"){
        xmlhttp.open("GET",option.url+"?"+str,true);
        xmlhttp.send();
    }else{
        xmlhttp.open("POST",option.url,true);
        xmlhttp.setRequestHeader("Content-type","application/x-www-form-urlencoded");
        xmlhttp.send(str);
    }
    xmlhttp.onreadystatechange=function () {
        if(xmlhttp.readyState === 4){
            clearInterval(timer);
            if(xmlhttp.status >= 200 && xmlhttp.status < 300 || xmlhttp.status === 304){
                option.success(xmlhttp);
            }else{
                option.error(xmlhttp);
            }
        }
    }
    /*
    判断外界是否传入了超时时间
     */
    if(option.timeout){
        timer = setInterval(function () {
            alert("请求超时");
            /*
            终止请求
             */
            xmlhttp.abort();
            clearInterval(timer);
        },option.timeout);
    }
}