const mongoose = require('mongoose')
const Schema = mongoose.Schema

const wishlistSchema = new Schema(
    {
        title:
        {
            type: String,
            required: true
        },
        image: {
            type: String,
            required: true
        },
        price: {
            type: Number,
            required: true
        }
    }
)

module.exports = mongoose.model("Wishlist", wishlistSchema)