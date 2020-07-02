$(() => {


    let imgCode;
    /*不传值，统一走默认值*/
    let captcha = new Captcha({
        lineWidth: 1, //线条宽度
        lineNum: 2, //线条数量
        // dotR: 200, //点的半径
        // dotNum: 1000, //点的数量
        preGroundColor: [10, 80], //前景色区间
        backGroundColor: [120, 250], //背景色区间
        fontSize: 40, //字体大小
        fontFamily: ['Georgia', '微软雅黑', 'Helvetica', 'Arial'], //字体类型
        fontStyle: 'stroke', //字体绘制方法，有fill和stroke
        content: '0123456789', //验证码内容
        length: 4 //验证码长度
    });

    captcha.draw(document.querySelector('#captcha'), r => {
        imgCode = r;

        /* 自动触发标签的事件 */
        $("#image-code").trigger("blur");

    });


    $("#username").val("zs")
    $("#userphone").val(13245678910)
    $("#password").val("123asd")
    $("#password2").val("123asd")
    let regObj = {
        "username": {
            "regJs": "/^[a-zA-Z0-9]{3,9}$/.test(val)",
            "msg": "用户名格式错误，请重新填写",
            "isNull": "用户名不能为空，请填写",
        },
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
        "password2": {
            "regJs": "val === $('#password').val()",
            "msg": "两次密码不相同，请重新填写",
            "isNull": "需要再次输入密码",
        },
        "image-code": {
            "regJs": "val === imgCode",
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
    $("#regBtn").click(function () {
        if ($("form[name=regForm]").find(".active").length === 0 && $("#checkbox").prop("checked")) {
            let data = {
                userphone: $("#userphone").val(),
                userpass: md5($("#password").val()).slice(0, 15),
                username: $("#username").val(),
            }
            $.ajax({
                data,
                url: "../server/reg.php",
                type: "post",
                dataType: "JSON",
            }).done(function (data) {
                if (data.status === "success") {
                    let s = 3
                    $("h3").css("font-size", "18px").text(`注册成功，${s}秒后跳转登录页面`)
                    let myTimer = setInterval(() => {
                        s--
                        $("h3").text(`注册成功，${s}秒后跳转登录页面`)
                        if (s == 0) {
                            location.href = "login.html"
                            clearInterval(myTimer)
                            myTimer = null
                        }

                    }, 1000)
                } else {
                    alert(data.msg)
                    $("#captcha").trigger("click")
                    $("#password").val("")
                }
            })
        } else {
            return
        }
    })
})