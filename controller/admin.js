const Product = require('../models/product')

exports.getAdminHome = (req, res, next) => {
    res.render('admin/home', { title: 'Admin Home' })
}

exports.getProductAll = async (req, res, next) => {
    try {
        const products = await Product.find()
        // code to create a category defined user experience:
        let data = {}
        products.forEach((product) => {
            let arr = data[product.category] || [] // means if product.category exits so arr = data[product.category] else arr = [];
            arr.push(product)
            data[product.category] = arr
        })
        res.render('admin/viewProduct', { products: data, isAdmin: true })
    } catch (error) {
        res.status(500).send('Error fetching products')
    }
}

exports.postProductAdd = async (req, res, next) => {
    const { name, description, price, image, category, seller } = req.body
    const formattedCategory = category.charAt(0).toUpperCase() + category.slice(1).toLowerCase()
    try {
        await Product.create({
            name,
            description,
            price,
            image,
            category: formattedCategory,
            seller,
        })
        res.redirect('/admin/product/all')
    } catch (error) {
        console.error(error)
        res.status(500).send('Error adding product')
    }
}

exports.getProductAdd = (req, res, next) => {
    res.render('admin/addProduct')
}

exports.getProductUpdate = async (req, res, next) => {
    const { id } = req.params
    try {
        const product = await Product.findById(id)
        res.render('admin/updateProduct', { product, isAdmin: true })
    } catch (err) {
        next(err)
    }
}

exports.postProductUpdate = async (req, res, next) => {
    const { name, description, price, image, category, seller, id } = req.body
    try {
        const formattedCategory = category.charAt(0).toUpperCase() + category.slice(1).toLowerCase()
        const updatedProduct = await Product.findByIdAndUpdate(
            id,
            {
                name,
                description,
                price,
                image,
                category: formattedCategory,
                seller,
            },
            { new: true },
        )
        res.redirect('/admin/product/all')
    } catch (error) {
        console.error(error)
        res.status(500).send('Error updating product')
    }
}

exports.getProductDelete = async (req, res) => {
    const { id } = req.params
    try {
        let product = await Product.deleteOne({ _id: id })
        res.redirect('/admin/product/all')
    } catch (err) {
        next(err)
    }
}
