define(['jquery'], function($){
    function loginSend(){
        $("#login").click(function(){
            $.ajax({
                type: "post",
                url: "./php/login.php",
                data: {
                    username: $(".item_account").eq(0).val(),
                    password: $(".item_account").eq(2).val()
                },
                success: function(result){
                    // console.log(result)
                    var obj=JSON.parse(result);
                    console.log(obj)
                    if(obj.code!=6){
                        $(".tip").attr("class","false")
                        $(".false").html(obj.message)
                    }else{
                        // $(".tip").attr("class","success")
                        setTimeout(function(){
                            location.assign("index.html");
                        }, 1000);
                    }
                    
                },
                error: function(msg){
                    console.log(msg);
                }
    
            })
        })
        
    }
    return {
        loginSend: loginSend
    }
})