const mongoose = require('mongoose')

const recordings = new mongoose.Schema({
    url:{
        type:String,
        require:true
    },
    thumbnail:{
        type:String,
        require:true
    },
    createdAt:{
        type:Date,
        default:Date.now()
    },
    Name:{
        type:String,
        required:true
    }
   
})

module.exports = mongoose.model('Recording', recordings, 'recordings')