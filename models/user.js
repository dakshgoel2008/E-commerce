const mongoose = require('mongoose')

const { Schema } = mongoose
const userSchema = new Schema({
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    role: { type: String, default: 'user' },
    cart: [
        {
            id: { type: Schema.Types.ObjectId, ref: 'Product' },
            quantity: { type: Number, required: true },
        },
    ],
    order: [{
        product: [],
        totalPrice: Number,
        date: {
            type: Date,
            default: Date.now,
        }
    }]
})

module.exports = mongoose.model('user', userSchema)