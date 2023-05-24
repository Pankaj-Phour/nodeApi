const record = require('../models/recordingsModel.js');

exports.selectedRecording =  async (req,res)=>{
    const responseData = await record.findById(req.query.id).select("url").lean();
    res.status(200).send({
        code:200,
        error:false,
        message:"Success",
        response:responseData
    })
}