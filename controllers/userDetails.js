const users  = require('../models/userDetailsModel.js')

exports.userDetails = async(req,res)=>{
    try {

        const responseData = await users.find().lean();
        // console.log(responseData);
        res.status(200).send({
            code:200,
            error:false,
            message:"Success",
            response:responseData
        })
    }
    catch(err){
        console.log("Error ++++++++++++++++++++++++++++++++",err);
    }
}
