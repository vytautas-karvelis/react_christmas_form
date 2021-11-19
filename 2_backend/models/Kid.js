const mongoose = require('mongoose')
const {Schema} = mongoose

const kidSchema = new Schema({
    name: {
        type:String,        
    },
    surname: {
        type:String,      
    },
    gifts:[{
        gift:{type:String } 
    }]       
})

const Kid = mongoose.model('Kid', kidSchema)
module.exports = Kid