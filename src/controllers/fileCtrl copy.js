import asyncLib from "async";
import models from "../../models";
import jwt from "../../token/jwt";
import uploadFile from "../middlewares/uploadFile";

// export functions as models ...
module.exports = {
    uploadFIle: function (req, res) {

        // get token from client params...
        let headersAuth = req.headers['authorization'];

        // other params ...
        let title       = req.body.title;
        let description = req.body.description;


        // call the jwt func to check if the token is still valid ...
        let currentUser = jwt.getUserId(headersAuth); // the token expire after 1h ...
        // Verif ...
        if (currentUser < 0) {
            return res.status(400).json({ 'error': 'You mast be connected first...' });
        } else if (title == null){
            return res.status(400).json({ 'error': 'missing parameter...'});
        } else if (title.lenght <= 4 && title.lenght >= 225) {
            return res.status(400).json({ 'error': 'the title must contain betwen 4 and 225 chars!' });
        } 
        // else if (req.files.image == undefined) {
        //     return res.status(400).json({ 'error': "Please upload a file!" });
        // } 

        // return res.status(201).json({ 'file': req.files.path });

        // let imagePath   = req.file.path.replace(/\\/g, "/");
        // console.log('imagePath_______', imagePath);

        // try {
        //     uploadFile.single('Image');
        //     console.log("image image")
        // } 
        // catch (err) {
        //     if (err.code == "LIMIT_FILE_SIZE") {
        //         return res.status(500).json({
        //             'message': "File size cannot be larger than 2MB!",
        //         });
        //     }
    
        //     res.status(500).json({
        //         'message': `Could not upload the file: ${req.file.originalname}. ${err}`,
        //     });
        // }

        asyncLib.waterfall([
            (done) => {
                models.Images.create({
                    idUSERS     : currentUser,
                    title       : title,
                    description : description,
                    imagePath   : "/static/uploads",
                    isActive    : true,
                })
                .then((createdImage) => {

                    return res.status(201).json({
                        'message' : 'Image created succefuly!',
                        'createdImage' : createdImage,
                        'file' : req.files
                    })
                })
                .catch((err) => {
                    return res.status(500).json({ 'error1': `[ERROR:: ${err}]` });
                })
            }
        ], (err) => {
            return res.status(500).json({ 'error2': `An arror has occured when uploading image informations 2... \n [ERROR:: ${err}]` });
        })
    },
}