const model = require('../models/videoModel.js');
const multer = require('multer');


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

  
exports.createUser = upload.single('avatar'), (req, res) => {


    // console.log("req.file-----------------------",req.file)
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
}