const mongoose  = require('mongoose');

const countryList = new mongoose.Schema({
    country_code:{
        type:String,
        require:true
    },
    country_id:{
        type:Number,
        require:true
    },
    country_name:{
        type:String,
        require:true
    },
});

module.exports = mongoose.model('Country', countryList);