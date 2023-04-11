const express = require('express');
// const bodyParser = require('body-parser')
require('dotenv').config();

const mongoose = require('mongoose')
const multer  = require('multer')
const cors = require('cors');
// const { Binary } = require('mongodb');
// const ThumbnailGenerator = require('video-thumbnail-generator');
const app = express();
const PORT = 8000;
app.use(cors())
app.use(express.json({limit:"200mb"}));
// app.use(express.urlencoded({ limit: "200mb", extended: true, parameterLimit: 50000 }))
// const bodyParser = require('body-parser');

// const upload = multer({ dest: './uploads/' })
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, 'uploads')
    },
    filename: function (req, file, cb) {
      const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
      cb(null, file.fieldname + '-' + uniqueSuffix)
    }
  })
  const upload = multer({ storage: storage })


// mongoose.connect('mongodb+srv://' + (process.env.MONGO).toString(),(req,res)=>{

    // console.log("MongoDB connected",process.env.MONGO);
    // console.log(process.env.NAME);
// })

const video = mongoose.Schema({
    data: {
         type: String,
         require: true,
    },
    channel : {
        type: String,
        require:true
    },
    name : {
        type:String,
        require:true
    },
    type:{
        type:Array,
        require:true
    },
   emotion : {
      type:Array,
      require:true
    },
    complete : {
        type:Number,
        require:true
    },
    score:{
        type:Number,
        require:true
    },
    user:{
        type:String,
        require:true
    },
    image:{
        type:String,
        require:true
    }
    
})

const countryList = mongoose.Schema({
    country_code:{
        type:String,
        require:true
    },
    country_id:{
        type:Number,
        require:true
    },
    country_name:{
        type:String,
        require:true
    },
  
})
const userDetails = mongoose.Schema({
    
    
    email:{
        type:String,
        require:true
    },
    password:{
        type:String,
        require:true
    },
    country:{
        type:String,
        require:true
    },
    plan:{
        type:String,
        require:true
    },
    days:{
        type:Number,
        require:true
    },
    monetPanels:{
        type:Number,
        require:true
    },
    ownPanels:{
        type:Number,
        require:true
    },
    url:{
        type:String,
        require:false
    },
    videos:[String]
    
})

const recordings = mongoose.Schema({
    url:{
        type:String,
        require:true
    }
   
})

const model = mongoose.model('video',video);
const model2 = mongoose.model('country',countryList);
const users = mongoose.model('usersData',userDetails);
const record = mongoose.model('recodedVideo',recordings);



// app.use(bodyParser.urlencoded({ extended: true }));


// app.use('/', require('./app.js'))
app.use(express.static('./pages'))

app.get('/lessData', async(req,res)=>{
    let response = await model.find().lean();
//     let lowerCaseChannel = response.map((data)=>{
//     let obj={
//         channel: data.channel.toLowerCase(),
//         name: data.name,
//         type: data.type,
//     }
  
//     return obj
//  })

//  console.log("lowerCase+++++++++++++++++++++++++++",lowerCaseChannel)

    let responseData = await model.find({
        // "channel" : {$regex : "Av"}
        // channel: {$match:"Av"},
        // complete: { $gt: 50 }
    }).select('channel complete emotions name score type').limit(20).lean()
    // console.log("responseData--------------------------",responseData);
    res.status(200).send({
        code:200,
        error:false,
        message:'Success',
        response:responseData
    })
    
})

app.get('/videos', async (req,res)=>{
    let response = await model.find().lean();
    console.log(response);
    res.status(200).send({
        code:200,
        error:false,
        message:'Success',
        response:response
    })
})

app.get('/getTableData', async(req,res)=>{
    res.status(200).send({
        code:200,
        error:false,
        message:'Success',
        response:{
            heading:[{name:'eemo score',views:'Views',shares:'Shares per 1000 views',follower:'Views per follower'}],
            data:[ {name:'Top 20%',views:'134 M',shares:'3.4',follower:'14.8',index:1},
            {name:'Middle 60%',views:'47 M',shares:'1.7',follower:'8.9',index:2},
            {name:'Bottom 20%',views:'7 M',shares:'1',follower:'2.8',index:3}]
        }
    })
})


// Api for Country names 

app.get('/getCountry', async (req,res)=>{
    const responseData =await model2.find().lean();
    // console.log("Countries++++++++++++++++",responseData);
    res.status(200).send({
        code:200,
        error:false,
        message:"Success",
        response:responseData
    })
})

app.get('/userData', async(req,res)=>{
    const responseData = await users.find().lean();
    // console.log(responseData);
    res.status(200).send({
        code:200,
        error:false,
        message:"Success",
        response:responseData
    })
})

app.get('/recordings', async (req,res)=>{
    const responseData = await record.find().lean();
    res.status(200).send({
        code:200,
        error:false,
        message:"Success",
        response:responseData
    })
})

app.post('/graphData', async(req,res)=>{
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
})

app.post('/singleVideo', async(req,res)=>{
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
})

app.post('/create-user',upload.single('avatar'), (req, res) => {


     console.log("req.file-----------------------",req.file)
    const data =  req.body;
    const video = new model({
        data: data.avatar,
        channel:data.channel,
        name:data.name,
        type:data.type,
        emotion:data.feel,
        complete:data.complete,
        score:data.score,
        url:data.url,
        user:data.user,
        image:data.image,
    })
    // console.log("data-----------------",data);
    // console.log("user-----------------",video);
    video.save();
    res.status(200).send({
        code:200,
        error: false,
        messsage: "success",
        response:data
    })
});
app.post('/getUserData', async(req, res)=>{
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
})
app.post('/signup', async(req,res)=>{
    const data = req.body;

    const find =await users.find({
        'email': {$regex:data.email}
    }).lean();
    // console.log(find);
    if(find.length>0){
        res.status(200).send({
            code:404,
            error:true,
            message:"Your email is registered with us. Please Sign in to Continue",
            response:find
        })
    }
    else{

    
    // console.log(data);
    const user = new users({
        email:data.email,
        password:data.password,
        country:data.country,
        plan:data.plan,
        days:data.days,
        monetPanels:data.monetPanels,
        ownPanels:data.ownPanels
    })
    // console.log("User-------------",user);
    user.save();
    res.status(200).send({
        error:false,
        code:200,
        message:"Success",
        response:data
    })
}
});

app.post('/updateProfile', (req,res)=>{
    const update = req.body;
    // console.log("Update---------",update);
    const find = users.findByIdAndUpdate({_id:update.id},{url:update.url},{new:true},(err,doc)=>{
        if(err){
            console.log("Error---------------",err);
        }
        else{
            // console.log("updated+++++++++++++++",doc);
        }
    }).lean();
    res.status(200).send({
        code:200,
        error:false,
        message:"Success",
        response:update
    })
})


app.post('/signIn', async(req,res)=>{
    const data = req.body;
    // console.log("Data++++++",data);
    const alldata =await users.find().lean();
    // console.log(alldata);
  const found =   alldata.filter((e)=>{
        return e.email===data.email && e.password===data.password
    })
    // console.log("Found+++++++++",found);
    const find =await users.find({
        'email': {$regex:data.email},
        'password':{$regex:data.password}
    }).lean();
    const findEmail = await users.find({
        'email':{$regex:data.email}
    })
    // console.log(findEmail);
    // console.log(find);
    // console.log(find.length);


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
})

app.post('/userVideo',async (req,res)=>{
    const update = req.body;
    // console.log("Update+++++++++",update);
  const find = await users.findOne({_id:update.id});
// console.log("Find++++++++++++++++++++",find);
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

})

app.post('/recordedVideo',async (req,res)=>{
    const data = req.body;
    // console.log(data.url);
    
    const video = new record({
        url:data.url
    })
    video.save();
    res.status(200).send({
        error:false,
        message:'Video uploaded successfully',
        response:data.url
    })
})
// This Api was used to post data to database the array of countries

// app.post('/getCountry', async (req,res)=>{
//     const data = req.body;
//     // console.log("Data-----------",data);
//   const countries = await model2.insertMany(data,{ordered :true});
//   console.log("countries+++++++++++++++++++++++++++",countries);
// //   countries.save();
//   res.status(200).send({
//     code:200,
//     error: false,
//     messsage: "success",
//     response:data
// })
// })



app.listen(
    PORT,
    ()=> console.log(`Your app is live on http://localhost:${PORT}`)
)