const mongoose = require('mongoose');

mongoose.connect('mongodb+srv://' + (process.env.MONGO).toString(),(req,res)=>{

    console.log("MongoDB connected",process.env.MONGO);
    console.log(process.env.NAME);
})

