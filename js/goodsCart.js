define(["jquery", "jquery-cookie"], function($){
    // 加载商品信息
    function loadCarDate(){
        
        $(".body-table tbody").html("");
        new  Promise(function(resove,reject){
            // 下载喜欢商品数据
            $.ajax({
                url:"../data/goodsCarList.json",
                success:function(obj){
                    resove(obj.data)
                    // console.log(obj.data)
                },
                erroe:function(msg){
                    reject(msg)
                }
            })
        }).then(function(arr1){
            // 下载列表商品信息
            // console.log(arr1)
            return new Promise(function(resove,reject){
                $.ajax({
                    url:"../data/goodsList.json",
                    success:function(arr){
                        arr2=arr.data.dataList
                        // console.log(arr2)
                        var newArr=arr1.concat(arr2)
                        // console.log(newArr)
                        resove(newArr)
                    },
                    error:function(msg){
                        console.log(msg)
                    }
                })
            })
        }).then(function(arr){
            // 获取购物车中信息
            // console.log(arr)
            var cookieStr=$.cookie("goods");
          
            if(cookieStr){
                var cookieArr=JSON.parse(cookieStr)
                // console.log(cookieArr)
                var newArr=[];
                for(var i=0;i<cookieArr.length;i++){
                    for(var j=0;j<arr.length;j++){
                        if(cookieArr[i].id==arr[j].id){
                            arr[j].num=cookieArr[i].num
                            newArr.push(arr[j])
                        }
                        
                    }
                }
            }
            // console.log(newArr)
            for(var l=0;l<newArr.length;l++){
                $(`<tr id="${newArr[l].id}"><td class="col-check"><i class="iconfont icon-checkbox " id="J_selectAll">√</i></td>
                <td class="name">
                    <div class="img"><img src="${newArr[l].images[0].smallPic}" alt=""></div>
                    <p>${newArr[l].skuName}</p>
                </td>
                <td>${newArr[l].marketPrice}</td>
               
                <td class="num">
                   <div class="num-div">
                        <div class="jian">-</div> 
                        <div class="number">${newArr[l].num}</div>
                        <div class="jia">+</div> 
                    </div>
                    
                </td> 
                <td>${newArr[l].salePrice-newArr[l].marketPrice}</td>
                <td class="price">${newArr[l].salePrice}</td>
                <td class="item-total">${newArr[l].salePrice *newArr[l].num}</td>
                <td class="del"><button>删除</button></td></tr>`).appendTo(".body-table tbody")
            }
            isCheckAll()
        })
    }
    // 加载喜欢商品
    function download(){
        $.ajax({
            url:"../data/goodsCarList.json",
            success:function(obj){
                // console.log(obj)
                var arr = obj.data;
                for(var i=0;i<arr.length;i++){
                    $(` <li id="${arr[i].id}">
                    <img src="${arr[i].imgUrl}" alt="">
                    <p>${arr[i].skuName}</p>
                    <p>${arr[i].brief}</p>
                     <p class="price">￥${arr[i].salePrice}</p>
                    <button id="${arr[i].id}">加入购物车</button>
                </li>`).appendTo(".like-ul")
                }
            },
            error:function(msg){
                console.log(msg)
            }
        })
    }

    function addCar(){
        $(".like-ul").on("click","button" ,function(){
            // console.log(this.id)
            var id=this.id;
            var first=$.cookie("goods")==null?true:false
            
            if(first){
                var cookieStr= `[{"id":${id},"num":1}]`;
                $.cookie("goods",cookieStr,{
                    expires:7
                })
            }else{
              
                var same=false
                var cookieStr=$.cookie("goods");
                // console.log(cookieStr)
                var cookieArr=JSON.parse(cookieStr)
                for(var i=0;i<cookieArr.length;i++){
                    if(cookieArr[i].id==id){
                        cookieArr[i].num++
                        same=true;
                        break;
                    }
                }
                if(!same){
                    var obj={id:id,num:1}
                    console.log(cookieArr)
                    cookieArr.push(obj)
                }
                $.cookie("goods", JSON.stringify(cookieArr), {
                    expires: 7
                })
            }
            // $(".body-table tbody").find("tr").html("");
            alert("加入成功")
            loadCarDate()
            // console.log($.cookie("goods"))

        })
    }

    // 选项框单击
    function checkFunc(){
        $(".body-table thead tr th i").click(function(){
            // console.log(this)
            var allChecks=$(".body-table tbody").find("tr i")
            // console.log(allChecks)
            if($(this).hasClass("icon-checkbox-selected")){
                $(this).add(allChecks).removeClass("icon-checkbox-selected")
            }else{
                $(this).add(allChecks).addClass("icon-checkbox-selected")
            }
            isCheckAll()
        })
        $(".body-table tbody").on("click","tr i",function(){
            if($(this).hasClass("icon-checkbox-selected")){
                $(this).removeClass("icon-checkbox-selected")
            }else{
                $(this).addClass("icon-checkbox-selected")
            }
             isCheckAll()
        })
       
    }
    // 是否全选中
    function isCheckAll(){
        var allChecks=$(".body-table tbody").find("tr")
        // console.log(allChecks)
        var isAll=true;
        var total=0;//总价
        var count=0;//选中件数
        var totalCount=0//总数量
        allChecks.each(function(index,item){
            if(!$(item).find(".col-check i").hasClass("icon-checkbox-selected")){
                // console.log(this)
                isAll=false;
                
            }else{
                // total=$(item).find(".price").html()
                // console.log(total)
                // count=$(item).find(".number").html()
                // console.log(total)
                total+=$(item).find(".price").html()*$(item).find(".number").html()
               
                count+=parseInt($(item).find(".number").html()) 
                // console.log(total,count)

            }
            totalCount+=parseInt($(item).find(".number").html())
        })
        $("#J_cartTotalPrice").html(total);
        $("#J_selTotalNum").html(count);
        $("#J_cartTotalNum").html(totalCount);
        // console.log(total,totalCount,count)

        if(isAll){
            $(".body-table thead").find("tr i").addClass("icon-checkbox-selected");
        }else{
            $(".body-table thead").find("tr i").removeClass("icon-checkbox-selected");
        }

    }

    // 商品删除 和数量增加减少
    function changeCars(){
        $(".body-table tbody").on("click","tr button",function(){
            var id=$(this).closest("tr").remove().attr("id")
            // alert(id)
            // 删除cookie
            var cookieStr=$.cookie("goods")
            var cookieArr=JSON.parse(cookieStr)
            for(var i=0;i<cookieArr.length;i++){
                if(cookieArr[i].id==id){
                    cookieArr.splice(i,1)
                    break;
                }
            }
            cookieArr.length==0?$.cookie("goods",null):$.cookie("goods",JSON.stringify(cookieArr),{ expires:7 })
               isCheckAll()
           
        })

        $(".body-table tbody").on("click",".jia,.jian",function(){
            var   id = $(this).closest("tr").attr("id");
            var cookieStr=$.cookie("goods")
            var cookieArr=JSON.parse(cookieStr)
            for(var i=0;i<cookieArr.length;i++){
                if(cookieArr[i].id==id){
                    if(this.className=="jian"){
                        cookieArr[i].num==1?alert("不能再减少了"): cookieArr[i].num--;
                        console.log(cookieArr[i].num)
                    }
                    else{
                        cookieArr[i].num++;
                        console.log(cookieArr[i].num)
                    }
                      break
                }
            }
            $(this).siblings(".number").html(cookieArr[i].num)
            var price =  $(this).closest("td").siblings(".price").html()
            var count= $(".body-table tbody").find(".number").html()
            $(this).closest("td").siblings(".item-total").html(price*count)

            $.cookie("goods", JSON.stringify(cookieArr), {
                expires: 7
            })
            isCheckAll();
        })
    }


    return {
        download:download,
        addCar:addCar,
        loadCarDate:loadCarDate,
        checkFunc: checkFunc,
        changeCars:changeCars
    }
})