const record = require('../models/recordingsModel.js');

exports.recordedVideo = async (req, res) => {
    const data = req.body;
    // console.log(data.url);

    const video = new record({
        url: data.url,
        thumbnail: data.thumbnail,
        Name: data.name,
    })
    video.save();
    res.status(200).send({
        code: 200,
        error: false,
        message: 'Video uploaded successfully',
        response: data.url
    })
}