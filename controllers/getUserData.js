const model = require('../models/videoModel.js');

exports.getUserData = async(req, res)=>{
    const data = req.body;
    // console.log(data);
    let responseData = await model.find().select("channel complete emotions name score type image user").lean();
   const userVideo = await responseData.filter((e)=>{
        return e.user === data.email;
    })
    // userVideo.find().select("channel complete emotions name score type image user")
    // console.log("USer Video-----------------",userVideo);
    // console.log("responseData--------------------------",responseData);
    res.status(200).send({
        code:200,
        error:false,
        message:'Success',
        response:userVideo
    }) 
}