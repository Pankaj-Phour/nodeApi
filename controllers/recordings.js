const record = require('../models/recordingsModel.js');

exports.recordings =  async (req,res)=>{
    const responseData = await record.find().lean();
    res.status(200).send({
        code:200,
        error:false,
        message:"Success",
        response:responseData
    })
}