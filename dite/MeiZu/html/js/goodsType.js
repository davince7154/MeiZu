"use strict";$(function(){var n=decodeURI(location.search.split("=")[1]);$("head title").text("".concat(n," -魅族官网")),$.ajax({data:{goods_type:n},url:"../server/getTypeBannerAndGoods.php",dataType:"json",type:"post",success:function(o){var s=o.map(function(o,s){return'<li class="goods-box '.concat((s+1)%3==0?"marginRight_none":"",'" data-goodsId="').concat(o.goods_id,'">\n                            <div class="img-box"><img src="').concat(o.goods_color1.split("||")[0],'" alt=""></div>\n                            <p class="goods-name">').concat(o.goods_name,'</p>\n                            <span class="goods-desc">').concat(o.goods_desc,'</span>\n                            <p class="goods-price-box"><i>￥</i><em class="goods-price">').concat(o.goods_price,"</em></p>\n                        </li>")}).join(""),c='<div id="goodsTypeBanner"><img src="'.concat(o[0].image,'" alt=""></div>\n                <div class="section goodsType-wrap">\n                    <h2>').concat(n,'</h2>\n                    <ul class="goods-list clear-fix">').concat(s,"</ul>\n                </div>");$("#content").html(c),$("#content .goods-box").click(function(){open("goods.html?goodsId="+$(this).data("goodsid"))})}})});