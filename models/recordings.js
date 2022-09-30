const mongoose = require('mongoose')

const recordings = new mongoose.Schema({
    url:{
        type:String,
        require:true
    }
   
})

module.exports = mongoose.model('Recording', recordings)