const mongoose = require('mongoose')
const Schema = mongoose.Schema

const soapSchema = new Schema(
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
        },
        id: {
            type: Number,
            required: true
        },
    }
)

module.exports = mongoose.model("Soap", soapSchema)