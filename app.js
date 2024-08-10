const express = require('express')
const path = require('path')
const mongoose = require('mongoose')
const hbs = require('hbs')
const User = require('./models/user')
const PORT = 3000
const app = express()

app.set('view engine', 'hbs')
hbs.registerPartials(path.join(__dirname + '/views/partials'))
app.use(express.urlencoded({ extended: true }))
app.use(express.static(path.join(__dirname, 'public')))
app.use(express.json())

// middleware to decide the user : LOGIN type:
app.use(async (req, res, next) => {
    try {
        let user = await User.findOne({
            _id: '66826faddfd35b474c72a441',
        })
        req.user = user
        next()
    } catch (err) {
        next(err)
    }
})

// opening hbs files:
const homeRouter = require('./routes/home');
app.get('/', homeRouter)

// ROUTES:
const adminRouter = require('./routes/admin')
app.use('/admin', adminRouter)

const shopRouter = require('./routes/shop')
app.use('/shop', shopRouter)

mongoose
    .connect('mongodb://localhost:27017/e-commerce-DB')

    .then(() => {
        app.listen(PORT, () => {
            console.log(`Server is running on http://localhost:${PORT}`)
        })
        console.log('MongoDB connected')
    })
    .catch((err) => console.log(err))
