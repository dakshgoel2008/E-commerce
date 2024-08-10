const express = require('express')
const path = require('path')
const router = express.Router()
const adminController = require('../controller/admin')

router.get('/', adminController.getAdminHome)
router.get('/product/all', adminController.getProductAll)
// Additional routes can be added similarly
// router.get("/product/:id", adminController.getProductById);
// router.get("/product/delete/:id", adminController.deleteProductById);
router.post('/product/add', adminController.postProductAdd)
// router.post("/product/update", adminController.updateProduct);
router.get('/product/add', adminController.getProductAdd)

// updating the product added by the admin
// get request:
router.get('/product/update/:id', adminController.getProductUpdate)
router.post('/product/update', adminController.postProductUpdate)

router.get('/product/delete/:id', adminController.getProductDelete)
module.exports = router
