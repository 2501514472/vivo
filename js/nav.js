// 导航栏  控制顶部导航栏 侧边导航栏 轮播图
// // json数据 banner 图片轮播    data navigateVos 侧边导航栏
define(["jquery"], function($){
    function download(){
        // 数据下载
        $.ajax({
            // type:"get",
            url:"../data/nav.json",
            
            success:function(result){
                // console.log(result);
                var bannerArr=result.banner;
                // console.log(bannerArr)
                // 通过循环添加数据
                for(var i=0;i<bannerArr.length;i++){
                    $(`<img src="${bannerArr[i].img}" alt="">`).appendTo(".banner-bg")
                    var node=$(`<div class></div>`)
                    if(i==0){
                        node.addClass("active")
                    }
                    node.appendTo(".icon")
                }
            },
            error:function(msg){
                console.log(msg);
            }
        })
        leftNavDownload()
        topNavDownload()
    }
    banner()
    // 轮播效果
    function banner(){
        var iNow=0;
        var aImgs=null;
        var aBtns=null;
        var timer=setInterval(function(){
            iNow++;
            tab();
        },2500);

        function tab(){
            if(!aImgs){
                aImgs=$(".banner-bg").find("img");
            }
            if(!aBtns){
                aBtns=$(".icon").find("div")
            }
            if(iNow == 5){
                iNow = 0;
            }
             //图片切换
             aImgs.hide().css("opacity", 0.2).eq(iNow).show().animate({opacity: 1}, 500);
             //对应的小圆圈指定当前是哪张图片显示
             aBtns.removeClass("active").eq(iNow).addClass("active");
        }
        // 添加移入移出
        $(".banner").mouseenter(function(){
            clearInterval(timer);
        });
        $(".banner").mouseleave(function(){
            timer=setInterval(function(){
                iNow++;
                tab();
            },2500)
        });
        $(".icon").on("click", "div", function(){
            iNow = $(this).index();
            console.log("aaa")
            tab();
            return false;
        })
    }
    
    // 侧边导航栏加载
    function  leftNavDownload(){
        $.ajax({
            url:"../data/nav.json",
            success:function(result){
                var d=result.data
                var sideArr=d.navigateVos
                // console.log(sideArr);
                for(var i=0;i<sideArr.length;i++){
                    // console.log(sideArr[i].firstCategory.name)//侧边栏
                   var node=$(`<li>${sideArr[i].firstCategory.name}<span>&gt;</span>
                        <div class="classification clear " style="display: none">
                           
                            
                        </div>
                    
                    </li>`);    
                    node.appendTo(".banner-ul")
                    var nodeShang=$(` <div class="classification-shang clear">
                                  
                    </div>`)
                    nodeShang.appendTo(node.find("div.classification"))
                    var classificationShang=sideArr[i].subCategories
                    // console.log(classificationShang)
                    for(var j=0;j<classificationShang.length;j++){
                       
                       
                        $(`<div class='box' style='background-image: url(${classificationShang[j].imgUrl})'>
                        <p><a href="./list.html" style="color: black;">${classificationShang[j].name}</a></p>
                    </div>`).appendTo(nodeShang)
                    }
                    var nodeXia=$(` <div class="classification-xia clear">
                                  
                    </div>`)
                    var classificationXia=sideArr[i].commoditySpus
                    nodeXia.appendTo(node.find("div.classification"))
                //    console.log(classificationXia)
                    for(var k=0;k<classificationXia.length;k++){
                        $(`<div class="box">
                        <img src="${classificationXia[k].imgUrl}" alt="">
                        <p>${classificationXia[k].name}</p>
                    </div>`).appendTo(nodeXia)
                    }
                }
               
               
            },
            error:function(msg){
                console.log(msg)
            }
        })
    }
    // 切换效果
       //给侧片导航添加移入切换效果
    function leftNavTab(){
        // bannerUl=$(".banner-ul")
        // console.log(bannerUl)
        $(".banner-ul").on("mouseenter", "li", function(){
            $(this).addClass("hover");
            $(this).find(".classification").css("display", 'block');
            // console.log(this)
           
            
            $(".icon").css("display", 'none');
        })
        $(".banner-ul").on("mouseleave", "li", function(){
            $(this).removeClass("hover");
            $(this).find(".classification").css("display", 'none');
            // console.log(this)
            $(".icon").css("display", 'block');
           
        })
    }
    function topNavDownload(){
        $.ajax({
            url:"../data/indexTop.json",
            success:function(result){
                var topNavArr=result.topNav
                // console.log(topNavArr)
                // topNavArr.push({title:"商城"},{title:"服务"})
                for(var i=0;i<topNavArr.length;i++){
                    $(`<li data-index="${i}"><a href="./list.html">${topNavArr[i].title}</a></li>`).appendTo(".logo-show ul")
                    var node=$(`
                        <div class="item clear" style = "display: ${i == 0 ? 'block' : 'none'}" >
                            
                        </div> 
                     `)
                    node.appendTo(".logo .logo-hidden")
                    // console.log(topNavArr[i])
                    if(topNavArr[i].childs){
                        var childsArr = topNavArr[i].childs;
                        // console.log(childsArr)
                        for(var j=0;j< childsArr.length;j++){
                            
                            $(`<div class="itemBox">
                            <img src="${childsArr[j].img}" alt="">
                            <p>${childsArr[j].a}</p>
                        </div>`).appendTo(node)
                        }
                    }
                   
                }
            },
            eerror:function(msg){
                console.log(msg)
            }
        })
    }
    //顶部导航添加移入移出效果
    function topNavTab(){
        
        $(".logo-show ul").on("mouseenter", "li", function(){
            // console.log(this)
            var index = $(this).index() ;
          if(index>=0&&index<=7){
            $(".logo-hidden").css("display","block")
            $(".logo-hidden").find(".item").eq(index).css("display", 'block').siblings("div").css("display", "none");   
          }else{
            $(".logo-hidden").css("display","none")
          }
            
        })
        
        // 移出的时候取消下拉菜单
        $(".logo").mouseleave(function(){
            // console.log("hidden")
            $(".logo-hidden").css({display: "none"});
        })
        
    }
    return {
        banner: banner,
        download: download,
        leftNavTab: leftNavTab,
        topNavTab: topNavTab,
        topNavDownload:topNavDownload,
        leftNavDownload:leftNavDownload
    }
})

// 顶部导航栏