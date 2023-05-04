const model = require('../models/videoModel.js');

exports.graphData = async(req,res)=>{
    const data = req.body;
    // console.log("Data+++++++++++++++++",data);
    const scoreData =await model.find({}).select('complete score user').lean();
//    console.log("ScoreData-----------------",scoreData);
    const filter = await scoreData.filter((e)=>{
        return e.user === data.email
    })
    // console.log("Filter__________",filter);
    res.status(200).send({
        code:200,
        error:false,
        message:"Success",
        response:filter
    })
}