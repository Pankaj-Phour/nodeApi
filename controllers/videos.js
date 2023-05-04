const model = require('../models/videoModel.js');

exports.videos =   async (req,res)=>{
    let response = await model.find().lean();
    // console.log(response);
    res.status(200).send({
        code:200,
        error:false,
        message:'Success',
        response:response
    })
}