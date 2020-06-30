function demo(doms) {
    let arr = []
    Array.from(doms).forEach((item, index) => {
        let obj = {}
        obj["goods_name"] = item.querySelector(".item-title").innerText
        obj["goods_desc"] = item.querySelector(".item-desc").innerText
        obj["goods_price"] = item.querySelector(".item-price").querySelector(".vm-price").innerText
        // obj["goods_type"] = "手机"
        // obj["goods_type"] = "声学"
        // obj["goods_type"] = "配件"
        obj["goods_type"] = "生活"
        // obj["goods_id"] = `010${(index+1) < 10 ? "0" + (index+1) : (index+1)}`
        // obj["goods_id"] = `020${(index+1) < 10 ? "0" + (index+1) : (index+1)}`
        // obj["goods_id"] = `030${(index+1) < 10 ? "0" + (index+1) : (index+1)}`
        obj["goods_id"] = `040${(index + 1) < 10 ? "0" + (index + 1) : (index + 1)}`
        arr.push(obj)
    })
    return arr
}


let a = demo(document.querySelector("#goodsListWrap").querySelectorAll(".gl-item"))
console.log(JSON.stringify(a))