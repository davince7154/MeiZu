"use strict";$(function(){var s=location.search.split("=")[1];$.ajax({type:"post",url:"../server/getGoods.php",data:{goods_id:s},dataType:"json",success:function(s){$("head title").text("".concat(s.goods_name," -魅族官网"));var o=s.goods_color1.split("||").map(function(s,o){return'<li class="'.concat(0===o?"active":"",'"> <img src="').concat(s,'" alt=""></li>')}).join(""),a='<div class="img-box">\n                                <div class="showimg-box">\n                                    <div class="showImg" style="background-image:url(\''.concat(s.goods_color1.split("||")[0],'\')" data-name="').concat(s.goods_color1_name,'"></div>\n                                    <div class="hidImg" style="background-image:url(\'').concat(s.goods_color1.split("||")[0],'\')"</div>\n                                </div>\n                                <ul class="img-list">').concat(o,"</ul>\n                        </div>");$('<div class="img-box">'.concat(a,"</div>")).appendTo($(".goods-wrap"));for(var t='<dl class="clear-fix set-sale goods-color"><dt>颜色分类</dt><dd class="clear-fix">',i=1;i<=4&&s["goods_color".concat(i)];i++)t+='<div class="'.concat(1===i?"active":"","  ").concat(i%3==0?"marginRight_none":"",' "  data-imageUrl="').concat(s["goods_color".concat(i)],'"><img src=').concat(s["goods_color".concat(i)].split("||")[0]," ><span>").concat(s["goods_color".concat(i,"_name")],"</span></div>");t+="</dd></dl>",s.size&&(t+='<dl class="clear-fix set-sale">\n                                    <dt>内 存</dt>\n                                    <dd class="clear-fix">\n                                        '.concat(s.size.split("/").map(function(s,o){return'<div class="'.concat(0===o?"active":""," ").concat((o+1)%3==0?"marginRight_none":"",' "><span>').concat(s,"</span></div>")}).join(""),"\n                                        </dd>\n                                        </dl>"));var n=' <div class="desc-box">\n                                <h3>'.concat(s.goods_name,'</h3>\n                                <p class="goods-desc">').concat(s.goods_desc,'</p>\n                                <p class="goods-price">￥').concat(s.goods_price,'</p>\n                                <div class="check-list">\n                                    ').concat(t,'\n                                    <dl id="goods-num-box" class="set-sale clear-fix">\n                                        <dt>数 量</dt>\n                                        <dd class="clear-fix">\n                                            <span id="lessen-quantity" class="goods-min-num">-</span>\n                                            <input type="text" value="1" id="goods-num">\n                                            <span id="add-quantity">+</span></dd>\n                                    </dl>\n                                </div>\n                                <div id="container-box">\n                                    <div id="buyNow">立即购买</div>\n                                    <div id="addShopingCart">加入购物车</div>\n                                </div>\n                            </div>');$('<div class="desc-box">'.concat(n,"</div>")).appendTo($(".goods-wrap")),new Fangdajing({showDom:$(".showImg"),hidDom:$(".hidImg"),multiple:2,parentDom:$(".showimg-box")}),$(".check-list .goods-color dd div").click(function(){var a=$(this).attr("data-imageUrl").split("||");$(".img-list li").each(function(s,o){$(o).find("img").attr("src",a[s])}),$(".showImg,.hidImg").css("background-image","url('".concat(a[0],"')")),$(".showImg").attr("data-name",$(this).find("span").text())}),$(".check-list  dd div").click(function(){$(this).addClass("active").siblings().removeClass("active")}),$("#goods-num-box span").click(function(){var s,o;"lessen-quantity"===$(this).attr("id")?((s=parseInt($(this).next().val())-1)<=1&&(s=1,$(this).addClass("goods-min-num")),$(this).next().val(s)):"add-quantity"===$(this).attr("id")&&(o=parseInt($(this).prev().val())+1,$(this).prev().val(o).prev().removeClass("goods-min-num"))}),$(".img-list li").click(function(){$(this).addClass("active").siblings().removeClass("active"),$(".showImg,.hidImg").css("background-image","url('".concat($(this).find("img").attr("src"),"')"))}),$("#addShopingCart,#buyNow").click(function(){var s;void 0!==(new Cookie).getValue("user")?(s={userphone:(new Cookie).getValue("user"),goodsId:location.search.split("=")[1],goodsName:$(".desc-box h3").text(),goodsPrice:parseInt($(".goods-price").text().split("￥")[1]),goodsCount:parseInt($("#goods-num").val()),goodsColorName:$(".showImg").attr("data-name"),goodsColor:$(".img-list li").eq(0).find("img").attr("src")},$.ajax({data:s,url:"../server/addGoods2Shoppingcart.php",type:"post",dataType:"json",success:function(s){alert(s.msg),"success"==s.status&&(window.dataLength=window.dataLength+1,$("#shoppingcart-box em").eq(1).text(window.dataLength))},async:!0}),"buyNow"===$(this).attr("id")&&(location.href="shoppingcart.html")):alert("请登录在进行购买！！！")})}})});