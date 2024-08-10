```
module.exports.getCartIncrease = (req, res, next) => {
    let { id } = req.params;
    let data = req.user.cart
    data.forEach((item) => {
        if (item.id == id) {
            item.quantity++
        }
    })

    req.user.save()
    res.send(data)
}
```
