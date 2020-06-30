class Banner {
    constructor(obj) {
        let myObj = {
            imgs: null,
            dom: null,
            moveTime: 300,
            cutTime: 1000,
            userDom: null,
            navDom: null,
            carDom: null,
        }

        for (let key in obj) {
            this[key] = obj[key] == undefined ? myObj[key] : obj[key]
        }
        this.index = 0
        this.cutTimer = null
        this.moveTimer = null
        this.addDom()
        this.addEvent()
    }
    addDom() {
        // 图片框
        let imgBoxStr = `<a href=""><img src="${this.imgs[this.imgs.length - 1].image}"alt="" data-isWhite="${this.imgs[this.imgs.length - 1].isWhite}"></a>`
        imgBoxStr += this.imgs.map(item => `<a href=""><img src="${item.image}"alt="" data-isWhite="${item.isWhite}"></a>`).join("") + `<a href=""><img src="${this.imgs[0].image}"alt="" data-isWhite="${this.imgs[0].isWhite}"></a>`
        this.imgBox = $(`<div class="banner-content">${imgBoxStr}</div>`)
        this.imgBox.css({ "width": (this.imgs.length + 2) * 100 + "%" })
        this.imgBox.find("a").css("width", (1 / (this.imgs.length + 2)) * 100 + "%")
        this.imgBox.appendTo(this.dom)

        // 豆豆
        let douStr = this.imgs.map(item => "<p></p>").join("")
        this.douBox = $(`<div class="dou-list">${douStr}</div>`)
        this.douBox.appendTo(this.dom)

        // 箭头
        this.jiantouL = $(`<div class="jiantou jiantouL"><em class="iconfont icon-left"></em></div>`)
        this.jiantouR = $(`<div class="jiantou jiantouR"><em class="iconfont icon-left"></em></div>`)

        this.jiantouL.appendTo(this.dom)
        this.jiantouR.appendTo(this.dom)


        // 根据轮播图第一张修改颜色
        this.douBox.children().eq(0).css({ "background-color": "transparent", "border-color": this.imgBox.find("img").eq(1).data("iswhite") ? "#fff" : "#666" })

        this.navDom.css({ "color": this.imgBox.find("img").eq(1).data("iswhite") ? "#fff" : "#666" })

        this.carDom.css({ "color": this.imgBox.find("img").eq(1).data("iswhite") ? "#fff" : "#666" })

        if (!this.isLogin) {
            this.userDom.prop("src", this.imgBox.find("img").eq(1).data("iswhite") ? this.whiteUser : this.blackUser)
        }
    }

    moveFn() {


        let isWoB = this.imgBox.find("img").eq(this.index + 1).data("iswhite")

        // 导航栏部分
        this.navDom.css({ "color": isWoB ? "#fff" : "#666" })

        // 购物车部分   
        this.carDom.css({ "color": isWoB ? "#fff" : "#666" })

        // 头像部分
        if (!this.isLogin) {
            this.userDom.prop("src", isWoB ? this.whiteUser : this.blackUser)
        }

        // 轮播部分
        let boxW = parseInt(this.dom.width())
        this.imgBox.animate({ "left": `-${boxW * (this.index + 1)}px` }, this.moveTime, () => {
            if (parseInt(this.imgBox.css("left")) < -boxW * (this.imgs.length)) {

                this.imgBox.css("left", `-${boxW}px`)
            } else if (parseInt(this.imgBox.css("left")) > -boxW) {
                this.imgBox.css("left", `-${this.imgs.length * boxW}px`)
            }
            if (this.index >= this.imgs.length) {
                this.index = 0
            } else if (this.index < 0) {
                this.index = this.imgs.length - 1
            }

            // 豆豆部分
            this.douBox.children().eq(this.index).css({ "background-color": "transparent", "border-color": isWoB ? "#fff" : "#666" })
                .siblings().css({ "background-color": isWoB ? "#fff" : "#666", "border-color": isWoB ? "#fff" : "#666" })

        })
    }

    autoPlay() {
        if (!this.cutTimer) {
            this.cutTimer = setInterval(() => {
                this.index += 1
                this.moveFn()
            }, this.cutTime)
        }
    }
    stopPlay() {
        clearInterval(this.cutTimer)
        this.cutTimer = null
    }
    addEvent() {
        this.autoPlay()
        window.onblur = () => {
            this.stopPlay()
        }
        window.onfocus = () => {
            this.autoPlay()
        }
        this.dom.mouseover(() => {
            this.stopPlay()
        })
        this.dom.mouseleave(() => {
            this.autoPlay()
        })
        this.navDom.mouseover(()=>{
            this.stopPlay()
        })
        this.jiantouR.click(() => {
            if (!this.moveTimer) {
                this.index += 1
                this.moveFn()
                this.moveTimer = setTimeout(() => {
                    clearTimeout(this.moveTimer)
                    this.moveTimer = null
                }, this.moveTime + 100)
            }
        })
        this.jiantouL.click(() => {
            if (!this.moveTimer) {
                this.index -= 1
                this.moveFn()
                this.moveTimer = setTimeout(() => {
                    clearTimeout(this.moveTimer)
                    this.moveTimer = null
                }, this.moveTime + 100)
            }
        })
        let self = this
        this.douBox.children().click(function () {
            self.index = $(this).index()
            self.moveFn()
        })
    }
}
