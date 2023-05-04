const mongoose = require('mongoose');

const userDetails = new mongoose.Schema({
    email:{
        type:String,
        require:true
    },
    password:{
        type:String,
        require:true
    },
    country:{
        type:String,
        require:true
    },
    plan:{
        type:String,
        require:true
    },
    days:{
        type:Number,
        require:true
    },
    monetPanels:{
        type:Number,
        require:true
    },
    ownPanels:{
        type:Number,
        require:true
    },
    url:{
        type:String,
        require:false
    },
    videos:[String]
});

module.exports = mongoose.model('userDetails', userDetails, 'userdetails');