const users = require('../models/userDetailsModel.js')

exports.updateProfile = (req,res)=>{
    const update = req.body;
    // console.log("Update---------",update);
    const find = users.findByIdAndUpdate({_id:update.id},{url:update.url},{new:true},(err,doc)=>{
        if(err){
            console.log("Error---------------",err);
        }
        else{
            // console.log("updated+++++++++++++++",doc);
        }
    }).lean();
    res.status(200).send({
        code:200,
        error:false,
        message:"Success",
        response:update
    })
}