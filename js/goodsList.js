//遵从AMD规范
define(["jquery"], function($){
    
    function download(){
        
       
        $.ajax({
            type:"get",
            url:"../data/goodsList.json",
           
            success:function(result){

                arr=result.data.dataList
               console.log(arr)
              
             
               for(var i=0;i<12;i++){
                var img=arr[i].images[0].smallPic
                // var desc=arr[i]
                   $(`<a href="./gooddesc.html?id=${arr[i].id}"><li>
                   <div><img src="${img}" alt=""></div>
                   <p>${arr[i].skuName}</p>
                   <p>${arr[i].promotion}</p>
                   <p class="price">￥${arr[i].salePrice}</p>
               </li></a>`).appendTo(".body-ul")
                   
               }
               
            },
            error:function(msg){
                console.log(msg)
            }
        })
    }  
//     var page=1;
//     var limit=12
    
//     var left=document.querySelector(".last")
//     var right=document.querySelector(".next")
//     left.onclick=function(){
//          if(page==1){
//             return
//         }
//         page--
//         download()
//     }
//     right.onclick=function(){
//         if(page==4){
//            return
//        }
//        page++
//        download()
//    }
  
//     console.log(left,right)

    return {
        download:download
        
        
    }
  });