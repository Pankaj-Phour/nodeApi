const record = require('../models/recordingsModel.js');

exports.recordings =  async (req,res)=>{
    const responseData = await record.find().select("thumbnail createdAt Name").lean();
    res.status(200).send({
        code:200,
        error:false,
        message:"Success",
        response:responseData
    })
}