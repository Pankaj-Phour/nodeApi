const model = require('../models/videoModel.js')

exports.lessData = async(req,res)=>{
    let responseData = await model.find({
        // "channel" : {$regex : "Av"}
        // channel: {$match:"Av"},
        // complete: { $gt: 50 }
    }).select('channel complete emotions name score type').limit(20).lean()
    res.status(200).send({
        code:200,
        error:false,
        message:'Success',
        response:responseData
    })
    
}