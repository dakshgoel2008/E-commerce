const path = require('path')
const express = require('express')
const router = express.Router()
const shopController = require('../controller/shop')
router.get('/', shopController.getHome)
router.get('/product/all', shopController.getProductAll)
router.get('/product/details/:id', shopController.getProductDetails)
router.get('/cart', shopController.getCart)
router.get('/cart/add/:id', shopController.getCartAdd)
router.get('/cart/buy/', shopController.getCartBuy)
router.get('/cart/increase/:id', shopController.getCartIncrease)
router.get('/cart/decrease/:id', shopController.getCartDecrease)

module.exports = router
