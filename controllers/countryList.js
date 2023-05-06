const model2 = require('../models/countryModel.js')

exports.countryList = async (req,res)=>{
    const responseData =await model2.find().lean();
    // console.log("Countries++++++++++++++++",responseData);
    res.status(200).send({
        code:200,
        error:false,
        message:"Success",
        response:responseData
    })
}