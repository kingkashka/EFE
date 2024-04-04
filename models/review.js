const mongoose = require('mongoose')
const Schema = mongoose.Schema

const reviewSchema = new Schema(
    {
        text:
        {
            type: String,
            required: true
        },
        user: {
            type: Schema.Types.ObjectId,
            ref: 'User', // Reference to the user who posted the comment
            required: true
        },
    }
)

module.exports = mongoose.model("Review", reviewSchema)