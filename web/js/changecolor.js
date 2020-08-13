function changeColor($li){
    $li.hover(function(){
        if($(this).css("background-color")!="rgb(227, 62, 51)"){
            $(this).css("background-color","rgba(253, 227, 228, 1)").css("color","rgba(202, 12, 22, 1)");
            $(this).children().css("background-color","rgba(253, 227, 228, 1)").css("color","rgba(202, 12, 22, 1)");
        }
    },function(){
        if($(this).css("background-color")!="rgb(227, 62, 51)"){
            $(this).css("background-color","white").css("color","black");
            $(this).children().css("background-color","white").css("color","black");
        }
    });
    $li.click(function(){
        $(this).css("background-color","rgba(227, 62, 51, 1)").css("color","white");
        $(this).children().css("background-color","rgba(227, 62, 51, 1)").css("color","white");
        $(this).siblings().css("background-color","white").css("color","black");
        $(this).siblings().children().css("background-color","white").css("color","black");
    });
}