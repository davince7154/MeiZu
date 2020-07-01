$(() => {
    // 获取购物车信息
    function getShoppingCart() {
        $.ajax({
            url: "../server/getShoppingcart.php",
            data: { userphone: cookie.getValue("user") },
            dataType: "json",
            type: "post",
            success(data) {
                window.dataLength = data.length
                $("#shoppingcart-box em").eq(1).text(window.dataLength)
                data.reverse()
                if (data.length === 0) {
                    let html = `<h3>您的购物车空空如也</a></h3>`
                    $("#shoppingcart-box .hidden-box").html(html)
                    return
                } else if (data.length >= 5) {
                    data.length = 5
                }
                let shoppingcartHtml = data.map((item, index) => {
                    return ` <li class="${index == data.length - 1 ? "border_none" : ""}">
                                    <dl>
                                        <dt><img src="${item["goods_color"]}" alt=""></dt>
                                        <dd>
                                            <p data-goodsId="${item["goods_id"]}" class="goods-name" data-color="${item["goods_color_name"]}">${item["goods_name"]}</p>
                                            <em>￥${item["goods_price"]}</em>
                                            <button>删除</button>
                                        </dd>
                                    </dl>
                                </li>`
                }).join("")
                $("#shoppingcart-box .hidden-box").html(shoppingcartHtml)

                // 点击删除，删除商品
                $("#shoppingcart-box .hidden-box li").click(function () {
                    let data = {
                        goodsId: $(this).find(".goods-name").attr("data-goodsId"),
                        goodsColorName: $(this).find(".goods-name").attr("data-color"),
                        userphone: new Cookie().getValue("user")
                    }
                    $.ajax({
                        data,
                        url: "../server/deleteShoppingcart.php",
                        dataType: "json",
                        type: "post",
                    }).done((data) => {
                        alert(data.msg)
                        if (data.status === "success") {
                            window.dataLength = window.dataLength - 1
                            $("#shoppingcart-box em").eq(1).text(window.dataLength)
                        }
                    })
                })
            }
        })

    }

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

        // 二级菜单内容区域

        let navStr = data.map((item, index) => {
            if (item.length > 6) {
                item.length = 6
            }
            return `<ul>${item.map((e, i) => `<li data-goodsid="${e["goods_id"]}"><img src="${e["goods_color1"].split("||")[0]}" alt=""><span>${e["goods_name"]}</span><i>￥</i><em>${e["goods_price"]}</em></li>`).join("")}</ul>`
        }).join("")

        $("#header .index-wrap .header-hid").html(navStr)



        //  鼠标在导航栏上，根据不同的类型，显示不同的内容
        $("#header .index-wrap .header-show nav li").each((i, e) => {


            $(e).mouseenter(function () {

                $("#header .index-wrap .header-hid").css("display", "block").children().eq(i).css("display", "block").siblings().css("display", "none")

                $("#header").css({ "background": "#fff", "border-bottom": "solid 1px #e9e9e9" }).animate({ "height": "265px" }, 300)


                // 如果 a标签 的 nowColor属性 是undefined或者false 就让 a标签 的 nowColor属性 赋值等于 现在的颜色
                // 然后让 a标签 的 change属性 赋值等于 true
                // 最后再让 所有的 a标签 的 color属性 都等于 #333 ,呈现白纸黑字的效果
                $(e).parent().find("a").prop({ "nowColor": $(e).find("a").prop("change") === undefined || $(e).find("a").prop("change") === false ? $(e).find("a").css("color") : $(e).find("a").prop("nowColor"), "change": true })
                    .css("color", "#333")

                // 让鼠标停留在上方的 a标签 的 color属性 变成 #008cff 呈现被选中的效果
                $(e).find("a").css("color", "#008cff")

            })

        })
        $("#header .index-wrap .header-hid").mouseleave(function () {
            let navList = $("#header .index-wrap .header-show nav li")
            navList.find("a").css("color", navList.find("a").prop("nowColor")).prop({ "nowColor": "none", "change": false })


            $(this).css("display", "none")

            $("#header").stop(true).css({ "height": "80px", "background": "none", "border-bottom": "none" })

        })



        $("#header .index-wrap .header-show nav li").mouseenter(function () {
            if ($(this).index() > 3) {
                let navList = $("#header .index-wrap .header-show nav li")
                navList.find("a").css("color", navList.find("a").prop("nowColor")).prop({ "nowColor": "none", "change": false })


                $("#header .index-wrap .header-hid").css("display", "none")

                $("#header").stop(true).css({ "height": "80px", "background": "none", "border-bottom": "none" })

            }
        })
        // 点击二级菜单的商品，跳转到对应的商品页面
        $(".header-hid ul li").click(function () {
            open(`goods.html?goodsId=${$(this).data("goodsid")}`)
        })

    })


    // 鼠标在用户头像事件 

    let cookie = new Cookie
    let userListHtml = ""
    if (cookie.getValue("user")) {
        userListHtml = `<li id="loginBtn"><a href="login.html"> 登录</a></li>
                    <li id="regBtn"><a href="reg.html"> 注册</a></li>
                    <li id="reBtn"><a href="">注销</a></li>`
        $("#user-box img").prop("src", "./images/user.png")
    } else {
        userListHtml = `<li id="loginBtn"><a href="login.html"> 登录</a></li><li id="regBtn"><a href="reg.html"> 注册</a></li>`
    }
    $("#userList").html(userListHtml)

    // 注销按钮
    $("#reBtn").click(function () {
        cookie.removeCookie("user")
    })

    $("#user-box").mouseenter(function () { $(this).children("#userList").css("display", "block") })
    $("#user-box").mouseleave(function () { $(this).children("#userList").css("display", "none") })


    getShoppingCart()

    // 购物车下拉列表事件
    $("#shoppingcart-box").mouseenter(function () {
        $(this).find(".hidden-box").css("display", "block")
        if (cookie.getValue("user")) {
            getShoppingCart()
        } else {
            let html = `<h3>您还没有登录，请<a href="login.html">登录</a></h3>`
            $(this).find(".hidden-box").html(html)
        }

    })
    $("#shoppingcart-box ").mouseleave(function () {
        $(this).find(".hidden-box").css("display", "none")
    })



    // 点击导航栏商品类型跳转相关页面

    let goodsType = ["手机", "声学", "配件", "生活"]
    $("#header .index-wrap .header-show nav li").each((i, e) => {
        if (i <= goodsType.length - 1) {
            $(e).find("a").attr("href", `goodsType.html?type=${encodeURI(goodsType[i])}`)
        }
    })

})