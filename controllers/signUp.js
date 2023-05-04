const users = require('../models/userDetailsModel.js');

exports.signUp = async(req,res)=>{
    const data = req.body;
    const find =await users.find({
        'email': {$regex:data.email}
    }).lean();
    if(find.length>0){
        res.status(200).send({
            code:404,
            error:true,
            message:"Your email is registered with us. Please Sign in to Continue",
            response:find
        })
    }
    else{
    const user = new users({
        email:data.email,
        password:data.password,
        country:data.country,
        plan:data.plan,
        days:data.days,
        monetPanels:data.monetPanels,
        ownPanels:data.ownPanels
    })
    user.save();
    res.status(200).send({
        error:false,
        code:200,
        message:"Success",
        response:data
    })
}
}