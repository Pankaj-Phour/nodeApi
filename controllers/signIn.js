const users = require('../models/userDetailsModel.js');

exports.signIn = async(req,res)=>{
    const data = req.body;
    const alldata =await users.find().lean();
  const found =   alldata.filter((e)=>{
        return e.email===data.email && e.password===data.password
    })
    const find =await users.find({
        'email': {$regex:data.email},
        'password':{$regex:data.password}
    }).lean();
    const findEmail = await users.find({
        'email':{$regex:data.email}
    })
if(find.length===0 && findEmail.length === 0){
res.status(200).send({
    code:404,
    error:false,
    message:"Your email is not registered with us. Please Sign up to use this product"
})
}
else if(find.length===0 && findEmail.length>0){
    res.status(200).send({
        code:404,
        error:true,
        message:"Wrong Password. Please Try Again"
    })
}else{
    res.status(200).send({
        code:200,
        error:false,
        message:"Success",
        response:find
    })
}
}