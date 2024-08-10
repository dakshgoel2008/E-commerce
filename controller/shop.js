const Product = require('../models/product')
const Users = require('../models/user')

// ! the `user` that we are using is the middleware that we have created in app.js to select a person to be given the cart authentication.

module.exports.getProductAll = async (req, res, next) => {
    try {
        let products = await Product.find({})
        const { categorySegregation } = require('../utils/categoryWise')
        products = categorySegregation(products)
    } catch (err) {
        next(err)
    }
}
module.exports.getHome = async (req, res, next) => {
    try {
        let products = await Product.find({})
        const { categorySegregation } = require('../utils/categoryWise')
        products = categorySegregation(products)
        res.render('shop/home', { products: products })
    } catch (err) {
        next(err)
    }
}

module.exports.getCartAdd = async (req, res, next) => {
    try {
        let id = req.params.id
        let { cart } = req.user
        let indx = -1
        cart.forEach((el, i) => {
            if (el.id == id) {
                indx = i // store that index of the current item.
            }
        })
        if (indx == -1) {
            cart.unshift({
                id: id,
                quantity: 1,
            })
        } else {
            cart[indx].quantity += 1 // increase the quantity of the current item.
        }
        res.redirect('/shop/cart')
        req.user.save()
    } catch (err) {
        next(err)
    }
}

module.exports.getCart = async (req, res, next) => {
    try {
        const { id } = req.params
        let user = await Users.findOne({ _id: req.user._id }).populate('cart.id')

        res.render('shop/cart', {
            cart: user.cart,
        })
    } catch (err) {
        next(err)
    }
}

module.exports.getProductDetails = async (req, res, next) => {
    try {
        const product = await Product.findById(req.params.id)
        res.render('shop/productDetails', { product })
    } catch (err) {
        next(err)
    }
}

module.exports.getCartBuy = async (req, res) => {
    try {
        let user = await Users.findById(req.user._id).populate('cart.id')
        res.render('shop/cartBuy', {
            cart: user.cart,
        })
    } catch (err) {
        alert(err.message)
    }
}

module.exports.getCartIncrease = (req, res, next) => {
    let { id } = req.params
    let data = req.user.cart
    data.forEach((item) => {
        if (item.id == id) {
            item.quantity++
        }
    })

    req.user.save()
    res.send(data)
}
module.exports.getCartDecrease = (req, res) => {
    let { id } = req.params
    let data = req.user.cart
    data.forEach((item) => {
        if (item.id == id) {
            if (item.quantity > 1) {
                item.quantity--
            }
        }
    })

    req.user.save()
    res.send(data)
}