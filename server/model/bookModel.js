const mongoose = require('mongoose')

const bookSchema = new mongoose.Schema({
    title:{
        type: String,
        required:true,
        trim:true
    },
    desc:{
        type: String,
        required:true,
        trim:true
    },
    price: {
        type: Number,
        required:true
        
    },
    author: {
        type: String,
        required:true
       
    },
    category: {
        type: String,
        required:true
        
    },
    pages: {
        type: Number,
        required:true
       
    },
    rentCost:{
        type: Number,
        required: true
    },
    isAvailable: {
        type:Boolean,
        default:true
    },
    numberOfCopy:{
        type:Number,
        required: true
    },
    rentedCopies:{
        type: Number,
        default:0

    },

    isbn: {
        type: String,
        default:""
    },
    image: {
        type: Object,
        default: {
            url:"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT24INOvwoqegoHzBwJzA8YgZzyPRoGg03RT_n66EbX&s"
        }

    },
    isActive:{
        type: String,
       default:true
    }
    
},{
   collection: 'books',
   timestamps:true

})

module.exports= mongoose.model("Books", bookSchema) 