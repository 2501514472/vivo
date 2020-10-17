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
        "goodDesc":"goodDesc",
        "slide": "slide",
       
    },
    shim: {
        //设置依赖关系  先引入jquery.js  然后在隐去jquery-cookie
        "jquery-cookie": ["jquery"],
        //声明当前模块不遵从AMD
        // "parabola": {
		// 	exports: "_"
		// }
    }
})

require(["nav","goodDesc","slide"], function(nav,goodDesc,slide){
    nav.topNavDownload();
    nav.topNavTab();
 
    //获取当前加载的商品详情数据
    goodDesc.download();
    // goodsDesc.banner();
    slide.download();
    slide. slideTab();
    goodDesc.banner();
})