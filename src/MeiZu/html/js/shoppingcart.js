$(() => {
    // 获取数据，渲染页面
    let user = new Cookie().getValue("user")
    if (user) {
        getShoppingcartData()


        // 获取购物车信息，并渲染成表格
        function getShoppingcartData() {
            $.ajax({
                data: { userphone: user },
                url: "../server/getShoppingcart.php",
                dataType: "json",
                type: "post",
                success(data) {
                    // 如果购物车里面没有商品
                    if (data.length === 0) {
                        let html = `<h3>您的购物车空空如也，去<a href="index.html">购买</a></h3>`
                        $(".shopping-wrap").html(html)
                        return
                    }



                    let trHtml = data.map((item, i) => {
                        return `<tr>
                                    <td class="${i == data.length - 1 ? "border_none" : ""}">
                                        <input type="checkbox"  class="one-check">
                                        <dl class="clear-fix">
                                            <dt><img src="${item["goods_color"]}" alt=""></dt>
                                            <dd>
                                                <p class="goods-name" data-goodsId="${item["goods_id"]}">${item["goods_name"]}</p>
                                                <p class="goods-color">${item["goods_color_name"]}</p>
                                            </dd>
                                        </dl>
                                    </td>
                                    <td class="${i == data.length - 1 ? "border_none" : ""}">
                                        <p class="goods-price">￥${parseFloat(item["goods_price"]).toFixed(2)}</p>
                                    </td>
                                    <td class="${i == data.length - 1 ? "border_none" : ""}"><span class="less-q" style="${item["goods_count"] == 1 ? `cursor: no-drop; color: #e0e0e0` : ''}">-</span><input type="text" value="${item["goods_count"]}" maxlength="2"
                                            class="goods-count" pattern="[0-9]{0,3}" oninput="validity.valid||(value='');"><span class="add-q">+</span></td>
                                    <td class="goods-all-price-box ${i == data.length - 1 ? "border_none" : ""}">
                                        <p class="goods-all-price">￥${parseFloat(item["goods_price"] * parseInt(item["goods_count"])).toFixed(2)}</p>
                                    </td>
                                    <td class="${i == data.length - 1 ? "border_none" : ""}">
                                        <p class="delete-goods">删除</p>
                                    </td>
                                </tr>`
                    }).join("")
                    let tableHtml = `<tr>
                                    <td><input type="checkbox" id="allCheck"><span>全选</span></td>
                                    <td>单价(元)</td>
                                    <td>数量</td>
                                    <td>小计(元)</td>
                                    <td>编辑</td>
                                </tr>
                                ${trHtml}`
                    $("table").html(tableHtml)

                    addEvent()
                }
            })
        }
        // 添加事件

        function addEvent() {
            // 商品数量增加，总价增加

            $(".add-q").click(function () {
                let num = $(this).prev().val() * 1 + 1
                $(this).prev().val(num).prev().css({ "cursor": "pointer", "color": "#000" })


                updateGoodsCount(num, this)


                let onePrice = $(this).parent().prev().text().split("￥")[1] * 1

                $(this).parent().next().children(".goods-all-price").text(`￥${(num * onePrice).toFixed(2)}`)

                if ($(this).parents("tr").find(".one-check").prop("checked")) {
                    getAllPrice()
                }
            })
            $(".less-q").click(function () {
                let num = $(this).next().val() * 1 - 1
                if ($(this).css("cursor") === "no-drop") {
                    return
                } else if (num <= 1) {
                    num = 1
                    $(this).css({ "cursor": "no-drop", "color": "#e0e0e0" })
                }
                updateGoodsCount(num, this)

                $(this).next().val(num)

                let onePrice = $(this).parent().prev().text().split("￥")[1] * 1

                $(this).parent().next().children(".goods-all-price").text(`￥${(num * onePrice).toFixed(2)}`)

                if ($(this).parents("tr").find(".one-check").prop("checked")) {
                    getAllPrice()
                }
            })

            // 获取所用和小计，并计算总价
            function getAllPrice() {
                let allPrices = 0
                $(".one-check").each(function () {
                    if ($(this).prop("checked")) {
                        allPrices += $(this).parent().siblings(".goods-all-price-box").text().split("￥")[1] * 1
                    }
                })
                $("#containerNum").text(`￥${allPrices.toFixed(2)}`)
            }

            // 点击加减号，更新数据库商品数量
            function updateGoodsCount(AoL, dom) {
                let data = {
                    goodsId: $(dom).parents("tr").find(".goods-name").attr("data-goodsId"),
                    goodsColorName: $(dom).parents("tr").find(".goods-color").text(),
                    userphone: new Cookie().getValue("user"),
                    goodsCount: AoL,
                }
                $.ajax({
                    url: "../server/updateGoodsCount.php",
                    data,
                    type:"post",
                })
            }

            // 全选事件
            $("#allCheck").click(function () {
                $(".one-check").prop("checked", $(this).prop("checked"))
                getAllPrice()
            })
            $(".one-check").click(function () {
                let allCheck = true
                $(".one-check").each((i, e) => {
                    if (!$(e).prop("checked")) {
                        allCheck = false
                        $("#allCheck").prop("checked", false)
                    }
                })
                getAllPrice()
                $("#allCheck").prop("checked", allCheck)
            })
            $(".one-check,#allCheck").click(function () {
                let allCheck = false
                $(".one-check").each(function () {
                    if ($(this).prop("checked")) {
                        allCheck = true
                        $("#containerBtn").removeClass("cantBuy")
                    }
                })
                if (!allCheck) {
                    $("#containerBtn").addClass("cantBuy")
                }
            })

            // 点击删除，删除商品
            $(".delete-goods").click(function () {
                let data = {
                    goodsId: $(this).parents("tr").find(".goods-name").attr("data-goodsId"),
                    goodsColorName: $(this).parents("tr").find(".goods-color").text(),
                    userphone: new Cookie().getValue("user")
                }
                $.ajax({
                    data,
                    url: "../server/deleteShoppingcart.php",
                    dataType: "json",
                    type: "post",
                }).done((data) => {
                    alert(data.msg)
                    location.reload()
                })

            })

            // 点击结算，删除所用被选中的商品
            $("#containerBtn").click(function () {
                if ($(this).css("cursor") === "pointer") {
                    let goodsIds = []
                    let goodsColorNames = []
                    $("table tr").eq(0).siblings().each(function (i, e) {
                        if ($(this).find(".one-check").prop("checked")) {
                            goodsIds.push($(this).find(".goods-name").attr("data-goodsId"))
                            goodsColorNames.push($(this).find(".goods-color").text())
                        }
                    })
                    let data = {
                        goodsId: goodsIds,
                        goodsColorName: goodsColorNames,
                        userphone: new Cookie().getValue("user")
                    }
                    $.ajax({
                        data,
                        url: "../server/deleteAllGoods.php",
                        dataType: "json",
                        type: "post"
                    }).done(function (data) {
                        alert(data.msg)
                        window.location.reload()
                    })
                }
            })

        }
    } else {
        let html = `<h3>您还没有登录，请<a href="login.html">登录</a></h3>`
        $(".shopping-wrap").html(html)
    }

})