function getDate(){
    var date=new Date();
    var str=date.getFullYear();
    str+="-";
    if(parseInt(date.getMonth()+1)<10) str+="0"+(date.getMonth()+1);
    else str+=date.getMonth()+1;
    str+="-"
    if(parseInt(date.getDate())<10) str+="0"+date.getDay();
    else str+=date.getDate();
    return str;
}