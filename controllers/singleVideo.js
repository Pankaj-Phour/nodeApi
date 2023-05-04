const model = require('../models/videoModel.js');

exports.singleVideo = async(req,res)=>{
    const data = req.body;
    // console.log(data);
    const video =await  model.findById({_id:data._id})
    // const filter = await video.filter((e)=>{
    //     return e._id === data._id;
    // })
    // console.log("Filter++++++++++++++++++++++++++++++++++++++++++++++++",video);
    res.status(200).send({
        code:200,
        error:false,
        message:"Success",
        response:video
    })
}