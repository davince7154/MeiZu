"use strict";$(function(){function e(n,a){return new Promise(function(o,e){$.ajax({url:a,data:n,dataType:"json",type:"post",success:function(e){o(e)}})})}var o=e({goods_type:"手机"},"../server/getTypeBannerAndGoods.php"),n=e({goods_type:"声学"},"../server/getTypeBannerAndGoods.php"),a=e({goods_type:"配件"},"../server/getTypeBannerAndGoods.php"),r=e({goods_type:"生活"},"../server/getTypeBannerAndGoods.php");Promise.all([o,n,a,r]).then(function(e){var o=e.map(function(e,o){return 8<e.length&&(e.length=8),"<ul>".concat(e.map(function(e,o){return'<li data-goodsid="'.concat(e.goods_id,'"><img src="').concat(e.goods_color1.split("||")[0],'" alt=""><span>').concat(e.goods_name,"</span><i>￥</i><em>").concat(e.goods_price,"</em></li>")}).join(""),"</ul>")}).join("");$("#header .index-wrap .header-hid").html(o),$("#header .index-wrap .header-show nav li").each(function(e,o){$(o).mouseenter(function(){$("#header .index-wrap .header-hid").css("display","block").children().eq(e).css("display","block").siblings().css("display","none"),$("#header").css({background:"#fff","border-bottom":"solid 1px #e9e9e9"}).animate({height:"265px"},300),$(o).parent().find("a").prop({nowColor:void 0===$(o).find("a").prop("change")||!1===$(o).find("a").prop("change")?$(o).find("a").css("color"):$(o).find("a").prop("nowColor"),change:!0}).css("color","#333"),$(o).find("a").css("color","#008cff")})}),$("#header .index-wrap .header-hid").mouseleave(function(){var e=$("#header .index-wrap .header-show nav li");e.find("a").css("color",e.find("a").prop("nowColor")).prop({nowColor:"none",change:!1}),$(this).css("display","none"),$("#header").stop(!0).css({height:"80px",background:"none","border-bottom":"none"})}),$("#header .index-wrap .header-show nav li").mouseenter(function(){var e;3<$(this).index()&&((e=$("#header .index-wrap .header-show nav li")).find("a").css("color",e.find("a").prop("nowColor")).prop({nowColor:"none",change:!1}),$("#header .index-wrap .header-hid").css("display","none"),$("#header").stop(!0).css({height:"80px",background:"none","border-bottom":"none"}))}),$(".header-hid ul li").click(function(){open("goods.html?goodsId=".concat($(this).data("goodsid")))})});var s=new Cookie,t="";s.getValue("user")?(t='<li id="loginBtn"><a href="login.html"> 登录</a></li>\n                    <li id="regBtn"><a href="reg.html"> 注册</a></li>\n                    <li id="reBtn"><a href="">注销</a></li>',$("#user-box img").prop("src","./images/user.png"),$.ajax({data:"userphone=".concat(s.getValue("user")),type:"post",url:"../server/getUser.php",success:function(){}})):t='<li id="loginBtn"><a href="login.html"> 登录</a></li><li id="regBtn"><a href="reg.html"> 注册</a></li>',$("#userList").html(t),$("#reBtn").click(function(){s.removeCookie("user")}),$("#user-box").mouseenter(function(){$(this).children("#userList").css("display","block")}),$("#user-box").mouseleave(function(){$(this).children("#userList").css("display","none")}),$("#shoppingcart-box").mouseenter(function(){$(this).find(".hidden-box").css("display","block"),s.getValue("user")?$.ajax({url:"../server/getShoppingcart.php",data:{userphone:s.getValue("user")},dataType:"json",type:"post",success:function(n){n.reverse(),5<=n.length&&(n.length=5);var e=n.map(function(e,o){return' <li class="'.concat(o==n.length-1?"border_none":"",'">\n                                            <dl>\n                                                <dt><img src="').concat(e.goods_color,'" alt=""></dt>\n                                                <dd>\n                                                    <p data-goodsId="').concat(e.goods_id,'" class="goods-name" data-color="').concat(e.goods_color_name,'">').concat(e.goods_name,"</p>\n                                                    <em>￥").concat(e.goods_price,"</em>\n                                                    <button>删除</button>\n                                                </dd>\n                                            </dl>\n                                        </li>")}).join("");$("#shoppingcart-box .hidden-box").html(e),$("#shoppingcart-box .hidden-box li").click(function(){var e={goodsId:$(this).find(".goods-name").attr("data-goodsId"),goodsColorName:$(this).find(".goods-name").attr("data-color"),userphone:(new Cookie).getValue("user")};$.ajax({data:e,url:"../server/deleteShoppingcart.php",dataType:"json",type:"post"}).done(function(e){alert(e.msg)})})}}):$(this).find(".hidden-box").html('<h3>您还没有登录，请<a href="login.html">登录</a></h3>')}),$("#shoppingcart-box ").mouseleave(function(){$(this).find(".hidden-box").css("display","none")});var d=["手机","声学","配件","生活"];$("#header .index-wrap .header-show nav li").each(function(e,o){e<=d.length-1&&$(o).find("a").attr("href","goodsType.html?type=".concat(encodeURI(d[e])))})});