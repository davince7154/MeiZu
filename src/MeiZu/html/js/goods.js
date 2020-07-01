$(() => {
    // ajax请求，获取数据
    let goodsId = location.search.split("=")[1]
    $.ajax({
        type: "post",
        url: "../server/getGoods.php",
        data: { "goods_id": goodsId },
        dataType: "json",
        success(data) {

            $("head title").text(`${data["goods_name"]} -魅族官网`)


            // 图片区域
            let imgListBoxStr = data["goods_color1"].split("||").map((item, index) => `<li class="${index === 0 ? "active" : ""}"> <img src="${item}" alt=""></li>`).join("")
            let imgBoxStr = `<div class="img-box">
                                <div class="showimg-box">
                                    <div class="showImg" style="background-image:url('${data["goods_color1"].split("||")[0]}')" data-name="${data["goods_color1_name"]}"></div>
                                    <div class="hidImg" style="background-image:url('${data["goods_color1"].split("||")[0]}')"</div>
                                </div>
                                <ul class="img-list">${imgListBoxStr}</ul>
                        </div>`
            $(`<div class="img-box">${imgBoxStr}</div>`).appendTo($(".goods-wrap"))

            // 信息区域  
            let goodsColorStr = `<dl class="clear-fix set-sale goods-color"><dt>颜色分类</dt><dd class="clear-fix">`
            for (let i = 1; i <= 4; i++) {
                if (!data[`goods_color${i}`]) {
                    break
                }
                goodsColorStr += `<div class="${i === 1 ? "active" : ""}  ${i % 3 === 0 ? "marginRight_none" : ""} "  data-imageUrl="${data[`goods_color${i}`]}"><img src=${data[`goods_color${i}`].split("||")[0]} ><span>${data[`goods_color${i}_name`]}</span></div>`
            }
            goodsColorStr += `</dd></dl>`

            if (data.size) {
                let sizeStr = `<dl class="clear-fix set-sale">
                                    <dt>内 存</dt>
                                    <dd class="clear-fix">
                                        ${data.size.split("/").map((item, index) => `<div class="${index === 0 ? "active" : ""} ${(index + 1) % 3 === 0 ? "marginRight_none" : ""} "><span>${item}</span></div>`).join("")}
                                        </dd>
                                        </dl>`
                goodsColorStr += sizeStr
            }
            let descBoxStr = ` <div class="desc-box">
                                <h3>${data["goods_name"]}</h3>
                                <p class="goods-desc">${data["goods_desc"]}</p>
                                <p class="goods-price">￥${data["goods_price"]}</p>
                                <div class="check-list">
                                    ${goodsColorStr}
                                    <dl id="goods-num-box" class="set-sale clear-fix">
                                        <dt>数 量</dt>
                                        <dd class="clear-fix">
                                            <span id="lessen-quantity" class="goods-min-num">-</span>
                                            <input type="text" value="1" id="goods-num">
                                            <span id="add-quantity">+</span></dd>
                                    </dl>
                                </div>
                                <div id="container-box">
                                    <div id="buyNow">立即购买</div>
                                    <div id="addShopingCart">加入购物车</div>
                                </div>
                            </div>`
            $(`<div class="desc-box">${descBoxStr}</div>`).appendTo($(".goods-wrap"))

            addEvent()
        }
    })

    // 添加事件（动画）
    function addEvent() {
        new Fangdajing({
            showDom: $(".showImg"),
            hidDom: $(".hidImg"),
            multiple: 2,
            parentDom: $(".showimg-box"),
        })
        $(".check-list .goods-color dd div").click(function () {
            let imageUrl = $(this).attr("data-imageUrl").split("||")
            $(".img-list li").each((index, ele) => {
                $(ele).find("img").attr("src", imageUrl[index])
            })
            $(".showImg,.hidImg").css("background-image", `url('${imageUrl[0]}')`)
            $(".showImg").attr("data-name",$(this).find("span").text())
        })
        $(".check-list  dd div").click(function () {
            $(this).addClass("active").siblings().removeClass("active")
        })
        $("#goods-num-box span").click(function () {
            if ($(this).attr("id") === "lessen-quantity") {
                let num = parseInt($(this).next().val()) - 1
                if (num <= 1) {
                    num = 1
                    $(this).addClass("goods-min-num")
                }
                $(this).next().val(num)
            } else if ($(this).attr("id") === "add-quantity") {
                let num = parseInt($(this).prev().val()) + 1
                $(this).prev().val(num).prev().removeClass("goods-min-num")
            }
        })

        $(".img-list li").click(function () {
            $(this).addClass("active").siblings().removeClass("active")
            $(".showImg,.hidImg").css("background-image", `url('${$(this).find("img").attr("src")}')`)
        })

        $("#addShopingCart").click(function () {
            if (new Cookie().getValue("user") !== undefined) {
                let data = {
                    userphone: new Cookie().getValue("user"),
                    goodsId: location.search.split("=")[1],
                    goodsName:$(".desc-box h3").text(),
                    goodsPrice:parseInt($(".goods-price").text().split("￥")[1]),
                    goodsCount: parseInt($("#goods-num").val()),
                    goodsColorName:$(".showImg").attr("data-name"),
                    goodsColor:$(".img-list li").eq(0).find("img").attr("src"), 
                }
                $.ajax({
                    data,
                    url: "../server/addGoods2Shoppingcart.php",
                    type: "post",
                    dataType: "json",
                    success(data) {
                        alert(data.msg)
                    }
                })
            }else{
                alert("请登录在进行购买！！！")
            }
        })
    }
})