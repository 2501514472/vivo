define(["jquery"],function($){
    function registerSend(){
        $("#register").click(function(){
            $.ajax({
                type:"post",
                url:"./php/register.php",
                data:{
                    username:$(".item_account").eq(0).val(),
                    password:$(".item_account").eq(2).val(),
                    repassword:$(".item_account").eq(3).val(),
                    createTime:(new Date()).getTime()
                },
                success:function(ressult){
                    console.log(ressult)
                    var obj=JSON.parse(ressult);
                    console.log(obj.message)
                    if(obj.code){
                        $(".tip").attr("class","false")
                        $(".false").html(obj.message)
                    }else{
                        // $(".tip").attr("class","success")
                        setTimeout(function(){
                            location.assign("login.html");
                        }, 1000);
                    }
                    
                   
                },
                error:function(msg){
                    console.log(msg)
                }
    
            })
        })
       
    }

    return {
        registerSend:registerSend
    }
})