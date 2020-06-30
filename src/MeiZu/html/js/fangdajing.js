class Fangdajing {
    constructor(obj) {
        let myObj = {
            showDom: null,
            hidDom: null,
            multiple: 2,
            parentDom: null,
        }
        for (let key in myObj) {
            this[key] = myObj[key]
        }
        for (let key in obj) {
            this[key] = obj[key]
        }
        this.hidDom.css("backgroundSize", `${this.multiple * 100}% ${this.multiple * 100}%`)
        this.domWidth = this.showDom[0].offsetWidth
        this.domHeight = this.showDom[0].offsetHeight
        this.enter()
        this.out()
    }

    enter() {
        this.showDom.mouseover(() => {
            this.hidDom.css("display", "block")
            this.showDom.mousemove(() => {
                this.fangda()
            })
        })
    }

    fangda(event) {
        let e = event || window.event

        let offLeft = -this.multiple * e.offsetX + this.domWidth / 2
        let offTop = -this.multiple * e.offsetY + this.domHeight / 2

        if (offLeft >= 0) {
            offLeft = 0

        } else if (offLeft <= -this.multiple * this.domWidth + this.domWidth) {
            offLeft = -this.multiple * this.domWidth + this.domWidth
        }
        if (offTop >= 0) {
            offTop = 0
        } else if (offTop <= -this.multiple * this.domHeight + this.domHeight) {
            offTop = -this.multiple * this.domHeight + this.domHeight
        }
        this.hidDom.css("background-position", `${offLeft}px ${offTop}px`)
    }

    out() {
        this.showDom.mouseleave(() => {
            this.hidDom.css("display", "none")
        })
    }

}