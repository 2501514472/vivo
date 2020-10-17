define(["jquery"], function($){
    // 下载数据
    function download(){
        $.ajax({
            url:"../data/slide.json",
            success:function(result){
                // console.log(result)
                var slideArr=result.data.actSkuInfoVos
                // console.log(slideArr)
                for(var i=0;i<slideArr.length;i++){
                    $(` <li>
                    <img src="${slideArr[i].skuImg}" alt="">
                    <p>${slideArr[i].skuName}</p>
                    <p>${slideArr[i].promotion}</p>
                    <p>
                        <span class="new-price">${slideArr[i].actPrice}</span>
                        <span class="old-price">${slideArr[i].marketPrice}</span>
                    </p>
                </li>`).appendTo(".buy-xia ul")
                }
            },
            error:function(msg){
                console.log(msg)
            }
        })
    }
    
    function slideTab(){
        var aSpans = $(".buy-xia").find("div");
        // console.log(aSpans.size())
        var iNow = 0;
        var count = Math.ceil(13 / 4) - 1;

        //启动定时器，让其一开始自己滚动
        var timer = setInterval(function(){
            iNow++;
            tab();
            if(iNow == count){
                clearInterval(timer);
            }
        }, 4000);

        aSpans.click(function(){
            console.log($(this).index())
            if($(this).index() == 1){
                iNow--;
                iNow = Math.max(0, iNow);
                console.log(this)
            }else{
                iNow++;
                iNow = Math.min(count, iNow)
                console.log(this)
            }
            tab();
        })
        function tab(){
            // iNow == 0 ? aSpans.eq(0).addClass("swiper-button-disabled") : aSpans.eq(0).removeClass("swiper-button-disabled");
            // iNow == count ? aSpans.eq(1).addClass("swiper-button-disabled") : aSpans.eq(1).removeClass("swiper-button-disabled")
            
            var iTarget = iNow == count ? iNow * -900 + 600 : iNow * -900;
            $(".buy-xia ul").css({
                transform: `translate3d(${iTarget}px, 0px, 0px)`,
                transitionDuration: "2000ms"
            })
        }
        
    }
    return {
        download:download,
        slideTab:slideTab
    }

     
})