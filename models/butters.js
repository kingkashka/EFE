const mongoose = require('mongoose')
const Schema = mongoose.Schema

const butterSchema = new Schema(
    {
        title:
        {
            type: String,
            required: true
        },
        description: {
            type: String
        },
        image: {
            type: String,
        },
        price: {
            type: Number,
        },
        id: {
            type: Number,
        },
        userId: {
            type: String,
            default: ""
        },
    }
    )
    
    module.exports = mongoose.model("Butter", butterSchema)
    // wishlistUsers: [{
    //     type: Schema.Types.ObjectId,
    //     ref: 'User'
    // }],