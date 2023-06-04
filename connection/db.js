const mongoose = require('mongoose');

mongoose.connect('mongodb+srv://' + (process.env.MONGO).toString(),(req,res)=>{
    console.log("MongoDB connected");
})

