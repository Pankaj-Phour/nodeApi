const record = require('../models/recordingsModel.js');

exports.recordedVideo = async (req, res) => {
    const data = req.body;
    // console.log("Data---------------------->>>>>>>>>>",data);

    const response = await record.create({
        url: data.url,
        thumbnail: data.thumbnail,
        Name: data.name,
    })
    // video.save();
    res.status(200).send({
        code: 200,
        error: false,
        message: 'Video uploaded successfully',
        response: response
    })
}