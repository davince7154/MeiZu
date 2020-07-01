$(() => {
    let goodsType = decodeURI(location.search.split("=")[1])
    $("head title").text(`${goodsType} -魅族官网`)

    $.ajax({
        data: { "goods_type": goodsType },
        url: "../server/getTypeBannerAndGoods.php",
        dataType: "json",
        type: "post",
        success(data) {
            let goodsListStr = data.map((item, index) => {
                return `<li class="goods-box ${(index + 1 )% 3 === 0 ?"marginRight_none":""}" data-goodsId="${item["goods_id"]}">
                            <div class="img-box"><img src="${item["goods_color1"].split("||")[0]}" alt=""></div>
                            <p class="goods-name">${item["goods_name"]}</p>
                            <span class="goods-desc">${item["goods_desc"]}</span>
                            <p class="goods-price-box"><i>￥</i><em class="goods-price">${item["goods_price"]}</em></p>
                        </li>`
            }).join("")
            let htmlStr =
                `<div id="goodsTypeBanner"><img src="${data[0]["image"]}" alt=""></div>
                <div class="section goodsType-wrap">
                    <h2>${goodsType}</h2>
                    <ul class="goods-list clear-fix">${goodsListStr}</ul>
                </div>`

            $("#content").html(htmlStr)

            // 商品点击跳转事件

            $("#content .goods-box").click(function(){
                open("goods.html?goodsId="+$(this).data("goodsid"))
            })
        }
    })
})