$(function () {
    $("#username").val(123456)
    $("#userphone").val(13245678910)
    $("#password").val("123asd")
    $("#password2").val("123asd")
    $("#image-code").val(1234)
    let regObj = {
        "userphone": {
            "regJs": "/^1[3-9]\\d{9}$/.test(val)",
            "msg": "电话号码格式错误，请重新填写",
            "isNull": "电话号码不能为空，请填写",
        },
        "password": {
            "regJs": "/^\\w{6,12}$/.test(val)",
            "msg": "密码格式错误，请重新填写",
            "isNull": "密码不能为空，请填写",
        },
        "image-code": {
            "regJs": "true",
            "msg": "验证码填写错误，请重新填写",
            "isNull": "验证码不能为空，请填写",
        }
    }
    $("form[name=regForm] input[type=text],input[type=password]").blur(function () {
        // 定义正则
        // 获取val
        //  匹配
        // 如果正
        // 如果负
        let val = $.trim($(this).val())
        let domId = $(this).attr("id")
        if ($(this).val() === "") {
            $(this).next().text(regObj[domId].isNull)
            $(this).addClass("active")
        } else if (!eval(regObj[domId].regJs)) {
            $(this).next().text(regObj[domId].msg)
            $(this).addClass("active")
        } else {
            $(this).next().text("")
            $(this).removeClass("active")
        }
    })
    $("#loginBtn").click(function () {
        if ($("form[name=regForm]").find(".active").length === 0) {
            let data = {
                userphone: $("#userphone").val(),
                userpass: $("#password").val()
            }
            $.ajax({
                data,
                url: "../server/login.php",
                dataType: "json",
                type: "post"
            }).done(function (data) {
                if (data.status === "success") {
                    let cookie = new Cookie
                    if($("#checkbox").prop("checked")){
                        cookie.setCookie("user",$("#userphone").val(),7)
                    }else{
                        cookie.setCookie("user",$("#userphone").val())
                    }
                    let s = 3
                    $("h3").css("font-size", "18px").text(`登录成功，${s}秒后跳转主页`)
                    let myTimer = setInterval(() => {
                        s--
                        $("h3").text(`登录成功，${s}秒后跳转主页`)
                        if (s == 0) {
                            location.href = "index.html"
                            clearInterval(myTimer)
                            myTimer = null
                        }
                    }, 1000)
                } else {
                    alert(data.msg)
                }
            })
        } else {
            return
        }
    })
})