const users = require('../models/userDetailsModel.js');

exports.singleUserVideo = async (req,res)=>{
    const update = req.body;
  const find = await users.findOne({_id:update.id});
if(find){
    find.videos.push(update.video);
    find.save();
    res.status(200).send({
        code:200,
        error:false,
        message:"Success",
    
    })
}else{
    res.status(200).send({
        code:200,
        error:true,
        message:"User not Found",
    })
}

}