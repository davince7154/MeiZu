"use strict";$(function(){var n,o=(new Cookie).getValue("user");o?(n=function(){function n(){var o=0;$(".one-check").each(function(){$(this).prop("checked")&&(o+=+$(this).parent().siblings(".goods-all-price-box").text().split("￥")[1])}),$("#containerNum").text("￥".concat(o.toFixed(2)))}function e(o,t){var e={goodsId:$(t).parents("tr").find(".goods-name").attr("data-goodsId"),goodsColorName:$(t).parents("tr").find(".goods-color").text(),userphone:(new Cookie).getValue("user"),goodsCount:o};$.ajax({url:"../server/updateGoodsCount.php",data:e,type:"post"})}$(".add-q").click(function(){var o=+$(this).prev().val()+1;$(this).prev().val(o).prev().css({cursor:"pointer",color:"#000"}),e(o,this);var t=+$(this).parent().prev().text().split("￥")[1];$(this).parent().next().children(".goods-all-price").text("￥".concat((o*t).toFixed(2))),$(this).parents("tr").find(".one-check").prop("checked")&&n()}),$(".less-q").click(function(){var o,t=$(this).next().val()-1;"no-drop"!==$(this).css("cursor")&&(t<=1&&(t=1,$(this).css({cursor:"no-drop",color:"#e0e0e0"})),e(t,this),$(this).next().val(t),o=+$(this).parent().prev().text().split("￥")[1],$(this).parent().next().children(".goods-all-price").text("￥".concat((t*o).toFixed(2))),$(this).parents("tr").find(".one-check").prop("checked")&&n())}),$("#allCheck").click(function(){$(".one-check").prop("checked",$(this).prop("checked")),n()}),$(".one-check").click(function(){var e=!0;$(".one-check").each(function(o,t){$(t).prop("checked")||(e=!1,$("#allCheck").prop("checked",!1))}),n(),$("#allCheck").prop("checked",e)}),$(".one-check,#allCheck").click(function(){var o=!1;$(".one-check").each(function(){$(this).prop("checked")&&(o=!0,$("#containerBtn").removeClass("cantBuy"))}),o||$("#containerBtn").addClass("cantBuy")}),$(".delete-goods").click(function(){var o={goodsId:$(this).parents("tr").find(".goods-name").attr("data-goodsId"),goodsColorName:$(this).parents("tr").find(".goods-color").text(),userphone:(new Cookie).getValue("user")};$.ajax({data:o,url:"../server/deleteShoppingcart.php",dataType:"json",type:"post"}).done(function(o){alert(o.msg),location.reload()})}),$("#containerBtn").click(function(){var e,n,o;"pointer"===$(this).css("cursor")&&(e=[],n=[],$("table tr").eq(0).siblings().each(function(o,t){$(this).find(".one-check").prop("checked")&&(e.push($(this).find(".goods-name").attr("data-goodsId")),n.push($(this).find(".goods-color").text()))}),o={goodsId:e,goodsColorName:n,userphone:(new Cookie).getValue("user")},$.ajax({data:o,url:"../server/deleteAllGoods.php",dataType:"json",type:"post"}).done(function(o){alert(o.msg),window.location.reload()}))})},$.ajax({data:{userphone:o},url:"../server/getShoppingcart.php",dataType:"json",type:"post",success:function(e){var o,t;0!==e.length?(o=e.map(function(o,t){return'<tr>\n                                    <td class="'.concat(t==e.length-1?"border_none":"",'">\n                                        <input type="checkbox"  class="one-check">\n                                        <dl class="clear-fix">\n                                            <dt><img src="').concat(o.goods_color,'" alt=""></dt>\n                                            <dd>\n                                                <p class="goods-name" data-goodsId="').concat(o.goods_id,'">').concat(o.goods_name,'</p>\n                                                <p class="goods-color">').concat(o.goods_color_name,'</p>\n                                            </dd>\n                                        </dl>\n                                    </td>\n                                    <td class="').concat(t==e.length-1?"border_none":"",'">\n                                        <p class="goods-price">￥').concat(parseFloat(o.goods_price).toFixed(2),'</p>\n                                    </td>\n                                    <td class="').concat(t==e.length-1?"border_none":"",'"><span class="less-q" style="').concat(1==o.goods_count?"cursor: no-drop; color: #e0e0e0":"",'">-</span><input type="text" value="').concat(o.goods_count,'" maxlength="2"\n                                            class="goods-count" pattern="[0-9]{0,3}" oninput="validity.valid||(value=\'\');"><span class="add-q">+</span></td>\n                                    <td class="goods-all-price-box ').concat(t==e.length-1?"border_none":"",'">\n                                        <p class="goods-all-price">￥').concat(parseFloat(o.goods_price*parseInt(o.goods_count)).toFixed(2),'</p>\n                                    </td>\n                                    <td class="').concat(t==e.length-1?"border_none":"",'">\n                                        <p class="delete-goods">删除</p>\n                                    </td>\n                                </tr>')}).join(""),t='<tr>\n                                    <td><input type="checkbox" id="allCheck"><span>全选</span></td>\n                                    <td>单价(元)</td>\n                                    <td>数量</td>\n                                    <td>小计(元)</td>\n                                    <td>编辑</td>\n                                </tr>\n                                '.concat(o),$("table").html(t),n()):$(".shopping-wrap").html('<h3>您的购物车空空如也，去<a href="index.html">购买</a></h3>')}})):$(".shopping-wrap").html('<h3>您还没有登录，请<a href="login.html">登录</a></h3>')});