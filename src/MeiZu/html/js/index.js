$(function () {

    // 获取轮播图
    $.ajax({
        url: "../server/getBanner.php",
        dataType: "JSON",
        success(data) {
            let a = new Banner({
                imgs: data,
                dom: $("#banner"),
                moveTime: 500,
                isLogin: new Cookie().getValue("user") ? true : false,
                cutTime: 3000,
                whiteUser: "./images/whiteUser.png",
                blackUser: "./images/blackUser.png",
                userDom: $("#user-box>img"),
                navDom: $("#header .header-show").find("nav").find("a"),
                carDom: $("#shoppingcart-box a").children().eq(0)
            })

        }
    })

    // 获取内容板块

    function makeP(data, url) {
        return new Promise((resolve, reect) => {
            $.ajax({
                url: url,
                data: data,
                dataType: "json",
                type: "post",
                success(data) {
                    resolve(data)
                },
            })
        })
    }
    let phone = makeP({ 'goods_type': '手机' }, "../server/getTypeBannerAndGoods.php")
    let listen = makeP({ 'goods_type': '声学' }, "../server/getTypeBannerAndGoods.php")
    let peijian = makeP({ 'goods_type': '配件' }, "../server/getTypeBannerAndGoods.php")
    let live = makeP({ 'goods_type': '生活' }, "../server/getTypeBannerAndGoods.php")
    Promise.all([phone, listen, peijian, live]).then(data => {


        // 中心内容区域
        let contentHtml = data.map(item => {
            if (item.length > 12) {
                item.length = 12
            }
            let goodsListStr = item.map((ele, index) => {
                return `<li class="goods-box ${(index + 1) % 4 === 0 ? "marginRight_none" : ""}" data-goodsId="${ele["goods_id"]}">
                            <img src="${ele["goods_color1"].split("||")[0]}" alt="">
                            <p class="goods-name">${ele["goods_name"]}</p>
                            <span class="goods-desc">${ele["goods_desc"]}</span>
                            <span class="goods-price"><em>￥</em>${ele["goods_price"]}</span>
                        </li>`
            }).join("")
            return `    <div class="section">
                            <div class="section-title">
                                <h2>${item[0]["goods_type"]}</h2>
                            </div>
                            <div class="section-banner">
                                <a href="goodsType.html?type=${encodeURI(item[0]["goods_type"])}"><img src="${item[0]["image"]}" alt=""></a></div>
                            <div class="section-list index-wrap">
                                <ul class="clear-fix">${goodsListStr}</ul>
                            </div>
                        </div>`
        })

        $("#content").html(contentHtml)
        // 点击跳转事件
        $("#content .goods-box").click(function () {
            open(`goods.html?goodsId=${$(this).data("goodsid")}`)
        })
    })

    
})