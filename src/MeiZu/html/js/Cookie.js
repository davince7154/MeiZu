class Cookie {
    constructor() {

    }
    getAllCookie() {
        return document.cookie.split("; ")
    }
    getAllKey() {
        let allArr = this.getAllCookie()
        return Array.from(allArr.map(item => item.split("=")[0]))

    }
    getValue(key) {
        let allArr = this.getAllCookie()
        for (let i = 0; i < allArr.length; i++) {
            if (allArr[i].indexOf(`${key}=`) === 0) {
                return allArr[i].split("=")[1]
            }
        }
    }
    setCookie(key, value, day) {
        let date = new Date
        date.setDate(date.getDate() + day)
        document.cookie = `${key}=${value};expires=${day === undefined ? "session" : date}`
    }
    removeCookie(key) {
        this.setCookie(key, null, -1)
    }
    clearCookie() {
        let arr = this.getAllKey()
        arr.forEach(itme => this.removeCookie(itme))
    }
}