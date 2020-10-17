// 主页数据加载
define(["jquery"], function($){
    function download(){
        $.ajax({
            type:"get",
            url:"../data/data.json",
            success:function(result){
                console.log(result)
                var hotData=result.hot
                var phoneData=result.phone
                var partData=result.part
                // console.log(hotData)
                // console.log(phoneData)
                // console.log(partData)
                // 热卖专区
                for(var i=0;i<hotData.length;i++){
                    $(`<div>
                    <img src="${hotData[i].img}" alt="">
                    <h3>${hotData[i].name}</h3>
                    <p> ${hotData[i].desc}</p>
                    <p class="price">${hotData[i].price}</p>
                </div>`).appendTo(".hot-ul")
                }
                for(var j=1;j<phoneData.length;j++){
                    $(` <li>
                    <img src="${phoneData[j].img}" alt="">
                    <h3>${phoneData[j].name}</h3>
                    <p>${phoneData[j].desc}</p>
                    <p class="goods-price">${phoneData[j].price}</p>
                </li>`).appendTo(".phoneList-ul")
                }
                for(var k=0;k<partData.length;k++){
                    $(`<div>
                    <img src="${partData[k].img}" alt="">
                    <h3>${partData[k].name}</h3>
                    <p> ${partData[k].desc}</p>
                    <p class="goods-price">${partData[k].price}</p>
                
                </div>`).appendTo(".goods-ul")
                }
            },
            error:function(msg){
                console.log(msg)
            }
        })
    }
    return {
        download:download
    }
})