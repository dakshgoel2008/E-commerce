module.exports.categorySegregation = function (products) {
    let data = {}
    products.forEach((product) => {
        let arr = data[product.category] || [] // means if product.category exits so arr = data[product.category] else arr = [];
        arr.push(product)
        data[product.category] = arr
    })
    return data
}
