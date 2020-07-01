$(() => {
    // 获取数据，渲染页面
    let user = new Cookie().getValue("user")
    if (user) {
        $.ajax({
            data: { userphone: user },
            url: "../server/getShoppingcart.php",
            dataType: "json",
            type: "post",
            success(data) {
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
                                    class="goods-count"><span class="add-q">+</span></td>
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
        // 添加事件

        function addEvent() {
            // 商品数量增加，总价增加

            $(".add-q").click(function () {
                let num = $(this).prev().val() * 1 + 1
                $(this).prev().val(num).prev().css({ "cursor": "pointer", "color": "#000" })

                let onePrice = $(this).parent().prev().text().split("￥")[1] * 1

                $(this).parent().next().children(".goods-all-price").text(`￥${(num * onePrice).toFixed(2)}`)

                if ($(this).parents("tr").find(".one-check").prop("checked")) {
                    getAllPrice()
                }
            })
            $(".less-q").click(function () {
                let num = $(this).next().val() * 1 - 1
                if (num <= 1) {
                    num = 1
                    $(this).css({ "cursor": "no-drop", "color": "#e0e0e0" })
                }
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
                    $(this).parents("tr").remove()
                    getAllPrice()
                })
            })
        }
    } else {
        let html = `<h3>您还没有登录，请<a href="login.html">登录</a></h3>`
        $(".shopping-wrap").html(html)
    }

})