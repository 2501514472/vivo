define(['jquery', "jquery-cookie"], function($){
    
	function download(){
		var id=valueByName(location.search,"id");
		// alert(id);
		$.ajax({
			type:"get",
			url:"../data/goodsList.json",
			success:function(result){
				
				arr=result.data.dataList
				// console.log(arr)
				var goodsMsg=arr.find(item=>item.id==id)
				// console.log(goodsMsg)
				images=goodsMsg.images
				// console.log(images)
				var node=$(` <div class="phone-l">
				<div class="big-img">
					
                </div>
                
                <ul>
                    <li><img src="${images[0].smallPic}" alt=""></li>
                    <li><img src="${images[1].smallPic}" alt=""></li>
                    <li><img src="${images[2].smallPic}" alt=""></li>
                    <li><img src="${images[3].smallPic}" alt=""></li>
                </ul>
            
        </div>
        <div class="phone-r">
            <h2>${goodsMsg.skuName}</h2>
            <p><span>【①限时优惠200元，到手价3298；②下单享12期免息；③vivo老用户咨询客服赠天猫精灵方糖音箱】</span> 超薄柔性屏|超感光夜摄|超稳运动拍摄|定制IMX598传感器</p>
            <div class="price">
                <div class="price-l">
                     <p class="new-price">￥${goodsMsg.salePrice}</p>
                    <p class="old-price">￥${goodsMsg.marketPrice}</p>
                </div>
                <div class="price-r">
                    <p><span>积分</span>${goodsMsg.points}</p>
                </div>
            </div>
           
            <p>商品支持：<span>分期花呗</span><span>以旧换新</span><span>积分抵现</span></p>
            <h3>版本</h3>
            <div class="banben">
                <div>5G全网通版 8GB+128GB</div>
                <div>5G全网通版 8GB+256GB</div>
            </div>
            <div class="color">
                <div> <div class="circle" style="background-color: blue;"></div>黑镜</div>
                <div> <div class="circle" style="background-color: blue;"></div>浅醺</div>
                <div> <div class="circle" style="background-color: blue;"></div>液氧</div>
            </div>
            <h3>选择套餐</h3>
            <div class="taocan">
                <div>官方标配</div>
                <div>TWS Neo耳机套餐￥3947，节省￥50</div>
                <div>VIVO  WATCH套餐 ￥4697 节省￥100</div>
                <div>保护壳套餐￥3537 省￥20</div>
            </div>
            <h3>手机服务</h3>
            <div class="service">
                <div>一年碎屏宝 ￥139 <span>限时优惠</span><input type="radio"></div>
                <div>
                    <div>
                        半年延保 ￥69<input type="radio" name="a">
                    </div>
                    <div>
                        一年延保 ￥129<input type="radio" name="a">
                    </div>
                </div>
                <div>
                    一年后盖宝￥79<input type="radio">
                </div>
                <div>【爆款】换新宝 ￥359 ￥299 <span>立省￥60</span><input type="radio"></div>
                <input type="checkbox">我已阅读并同意《vivo服务条款》
                
            </div>
            <h3>数量</h3>
            <div class="num">
                <div>-</div>
                <div>1</div>
                <div>+</div>
                <span>仅限购5件</span>
            </div>
            <h3>支持分期付款</h3>
            <div class="pay"> 
                <div>￥1099.3*3期 免息<input type="radio" name="pay"></div>
                <div>￥549.66*6期 免息<input type="radio" name="pay"></div>
                <div>￥274.83*12期 免息<input type="radio" name="pay"></div>
                <div>￥154.58*24期 手续费17.17元/期<input type="radio" name="pay"></div>
            </div>
            <h2>￥3298</h2>
            <div class="total">
                <div id="${id}" class="shopcar">加入购物车</div>
                <div>立即购买</div>
            </div>
		</div>`)
				node.appendTo(".phone")
				for(var i=0;i<images.length;i++){
					
					$(`<img src="${images[i].bigPic}" alt="" style="display:${i==0?'block':'none'}">`).appendTo(node.find(".big-img"))
                }
               
			},
			error:function(msg){
				console.log(msg)
			}
		})
	}
    function banner(){
	    var iNow=0;
	    var aBtns=null;
      //    var aImgs=$(".phone").find(".phone-l .big-img ")
      //    console.log(aImgs)
	    $(".phone").on("click",".phone-l ul li",function(){
         var aImgs=$(".phone").find(".phone-l .big-img img")
         // console.log(aImgs)
		
            iNow=$(this).index()
            aImgs.hide().eq(iNow).show()
		
		   
        })
       
   }
    // 购物车 
    $(".phone").on("click",".phone-r .total .shopcar",function(){
        // console.log(this)
        var id=this.id;
        var first=$.cookie("goods")==null?true:false;
        if(first){
            var cookieStr=`[{"id":${id},"num":1}]`
            $.cookie("goods",cookieStr,{
                expires:7
            })
           
        }else{
            var same=false
            var cookieStr=$.cookie("goods")
            var cookieArr=JSON.parse(cookieStr);
            console.log(cookieArr)
            for(var i=0;i<cookieArr.length;i++){
                if(cookieArr[i].id==id){
                    cookieArr[i].num++;
                    same=true;
                    break
                }
            }
            if(!same){
                var obj={id:id,num:1}
                
                cookieArr.push(obj)
            }
            $.cookie("goods",JSON.stringify(cookieArr),{
                expires:7
    
            })
        }
        console.log($.cookie("goods"))
        
    })
   
	function valueByName(search, name){
        // 查找开始位置
		var start = search.indexOf(name + "=");
		if(start == -1){
			return null;
		}else{
			var end = search.indexOf("&", start);
			if(end == -1){
				end = search.length;
			}
			//提取出想要键值对 name=value
			var str = search.substring(start, end);
			var arr = str.split("=");
			return arr[1];
		}
	}
    
    

    return {
		download:download,
		banner:banner
	}

    
   
})