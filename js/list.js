console.log("加载完成");
/* 
    配置当前项目引入的模块
*/
require.config({
    paths: {
        "jquery": "jquery-1.11.3",
        "jquery-cookie": "jquery.cookie",
        
        //引入banner图效果
        "nav": "nav",
        "goodsList": "goodsList"
    },
    shim: {
        //设置依赖关系  先引入jquery.js  然后在隐去jquery-cookie
        "jquery-cookie": ["jquery"],
        //声明当前模块不遵从AMD
        
    }
})

require(["nav","goodsList"], function(nav,goodsList){
    nav.banner();
    nav.topNavDownload();
    nav. topNavTab();
    // //侧边栏加载
    nav.leftNavDownload();
    // //给侧边栏添加移入移出效果
    nav.leftNavTab();

    //加载列表商品
    
    goodsList.download();

})