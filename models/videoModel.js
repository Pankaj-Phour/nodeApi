const mongoose = require('mongoose')

const video = new mongoose.Schema({
    data: {
         type: String,
         require: true,
    },
    channel : {
        type: String,
        require:true
    },
    name : {
        type:String,
        require:true
    },
    type:{
        type:Array,
        require:true
    },
   emotion : {
      type:Array,
      require:true
    },
    complete : {
        type:Number,
        require:true
    },
    score:{
        type:Number,
        require:true
    },
    user:{
        type:String,
        require:true
    },
    image:{
        type:String,
        require:true
    }
});

module.exports = mongoose.model('video', video, 'videos')



