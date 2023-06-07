const mongoose = require('mongoose')

const categorySchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
        unique: true,
        trim: true
    },
    desc: {
        type: String,
        required: true
    },
    isActive: {
        type: Boolean,
        default: true
    }

},{ 
    collection: "category",
    timeStamps: true   
})


module.exports = mongoose.model("category", categorySchema)