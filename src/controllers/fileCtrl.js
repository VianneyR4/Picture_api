import asyncLib from "async";
import models from "../../models";
import jwt from "../../token/jwt";
import uploadFile from "../middlewares/uploadFile";

// export functions as models ...
module.exports = {
    uploadFIle: function (req, res) {

        // get token from client params...
        let headersAuth = req.headers['authorization'];

        // call the jwt func to check if the token is still valid ...
        let myUserId = jwt.getUserId(headersAuth); // the token expire after 1h ...

        if (myUserId < 0) {
            return res.status(400).json({ 'error': 'You must be connected first...' });
        }

        // Parameters...
        let title = req.body.title;
        let description = req.body.description;
        let image = req.files.image;
        let isActive = true;

        // verification of variables ...
        if (title == null) {
            return res.status(400).json({ 'error' : 'missing parameters (title or image)...' });
        } else if (title.length <= 4 || title.length >= 225) {
            return res.status(400).json({ 'error': `title must contain betwen 4 and 225 chars! == ${title.length}` });
        } else if (req.files == undefined){
            return res.status(400).json({ 'error' : 'upload an image' });
        }

        // Authantification with waterfall ...
        // remove idUSERS from models/images.js => rename it in migration (userId) => in creation use UserId ...
        // sensitive case for relations !!!!
        asyncLib.waterfall([
            (done) => {
                models.Images.create({ 
                    UserId     : myUserId,
                    title       : title,
                    description : description,
                    image       : "/static/uploads/"+image.name,
                    isActive    : true,
                })
                .then((newImage) => {
                    return res.status(201).json({
                        'message' : 'Image uploaded successfully',
                        'userId' : newImage
                    })
                })
                .catch((err) => {
                    return res.status(500).json({ 'error': `[ERROR:: ${err}]` });
                })
            }
        ], (err) => {
            return res.status(500).json({ 'error': `An arror has occured when  upload image... \n [ERROR:: ${err}]` });
        })
    },
}