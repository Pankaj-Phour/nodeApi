const express = require('express');
// const bodyParser = require('body-parser')
require('dotenv').config();
require('./connection/db.js')
const cors = require('cors');
const app = express();
const PORT = process.env.PORT || 3000;
app.use(cors())
app.use(express.json({limit:"200mb"}));


// Importing the controllers of different routes 
const { videos } = require('./controllers/videos.js');
const { lessData } = require('./controllers/lessData.js');
const { graphData } = require('./controllers/graphData.js');
const { singleVideo } = require('./controllers/singleVideo.js');
const { createUser } = require('./controllers/createUser.js');
const { getUserData } = require('./controllers/getUserData.js');
const { userData } = require('./controllers/userData.js');
const { signUp } = require('./controllers/signUp.js');
const { updateProfile } = require('./controllers/updateProfile.js');
const { signIn } = require('./controllers/signIn.js');
const { singleUserVideo } = require('./controllers/singleUserVideo.js');
const { recordings } = require('./controllers/recordings.js');
const { selectedRecording } = require('./controllers/selectedRecording.js');
const { recordedVideo } = require('./controllers/recordedVideo.js');
const { countryList } = require('./controllers/countryList.js');
// app.use(express.urlencoded({ limit: "200mb", extended: true, parameterLimit: 50000 }))
// const bodyParser = require('body-parser');




// app.use(bodyParser.urlencoded({ extended: true }));


// app.use('/', require('./app.js'))
app.use(express.static('./pages'))

app.get('/lessData', lessData)

app.get('/videos', videos)

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

// API for getting the countries list 
app.get('/getCountry', countryList)

// Api for getting the usersData 
app.get('/userData', userData)

// Api for getting all the data included videos of all the users on faceDetection project (frontEnd) 
app.get('/recordings', recordings)

// Api for getting the video of a selected user for face detection project 
app.get('/selectedRecording', selectedRecording)

// Api for posting user's video to backend database (used for faceDetection project) 
app.post('/recordedVideo', recordedVideo)

// Api for getting the graphData (used for dummy eemo project) 
app.post('/graphData', graphData)

// Api for getting the single video from dashboard (used for dummy eemo project) 
app.post('/singleVideo', singleVideo)

// Api for creating a user ( used for dummy eemo project)
app.post('/create-user', createUser);

// api for getting the data for a selected account ( used for dummy eemo project)
app.post('/getUserData', getUserData)

// Api for signup ( used for dummy eemo project) 
app.post('/signup', signUp);

// Api for updating the profile of the user ( used for dummy eemo project) 
app.post('/updateProfile', updateProfile)

// Api for signing in ( used for dummy eemo project) 
app.post('/signIn', signIn)

// Api for updating the user's video (used for a dummy project) 
app.post('/userVideo', singleUserVideo)





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



app.listen(PORT,()=> console.log(`Your app is live on http://localhost:${PORT}`))