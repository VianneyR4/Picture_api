import asyncLib from "async";
import models from "../../models";
import jwt from "../../token/jwt";

// export functions as models ...
module.exports = {
    uploadFIle: function (req, res) {

        // get token from client params...
        let headersAuth = req.headers['authorization'];

        // call the jwt func to check if the token is still valid ...
        let myUserId = jwt.getUserId(headersAuth); // the token expire after 1h ...

        if (myUserId < 0) {
            // status 404...
            return res.status(200).json({ 'error': 'You must be connected first...' });
        }

        // Parameters...
        let title = req.body.title;
        let description = req.body.description;
        let image = (req.file.path).indexOf("public\\") > -1 ? (req.file.path).replace("public\\", "") : (req.file.path).replace("public/", "");;
        let myBody = req.body;

        // verification of variables ...
        if (title == null) {
            // status 400...
            return res.status(200).json({ 'error' : `missing parameters title... ${image}`, myBody });
        } else if (title.length <= 4 || title.length >= 225) {
            // status 400...
            return res.status(200).json({ 'error': `title must contain betwen 4 and 225 chars! == ${title.length}` });
        }  else if (req.newFileName == undefined){
            // status 400...
            return res.status(200).json({ 'error' : 'upload an image with type: jpeg/jpg/png' });
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
                    image       : image,
                    isActive    : true,
                })
                .then((newImage) => {
                    return res.status(201).json({
                        'message' : 'Image uploaded successfully',
                        'userId' : newImage
                    })
                })
                .catch((err) => {
                    // status 500...
                    return res.status(200).json({ 'error': `[ERROR:: ${err}]` });
                })
            }
        ], (err) => {
            // status 400...
            return res.status(200).json({ 'error': `An arror has occured when  upload image... \n [ERROR:: ${err}]` });
        })
    },
    getImages: function (req, res) {

        // get token from client params...
        let headersAuth = req.headers['authorization'];

        // call the jwt func to check if the token is still valid ...
        let myUserId = jwt.getUserId(headersAuth); // the token expire after 1h ...

        if (myUserId < 0) {
            // status 400...
            return res.status(200).json({ 'error': 'You must be connected first...' });
        }

        let filter = req.params.filter;

        asyncLib.waterfall([
            () => {
                models.Images.findAll({
                    where: { isActive : true },
                    include: [{model: models.Users}],
                    order: [ ['createdAt', filter!='asc'?'DESC':'ASC'] ]
                })
                .then((imageData) => {
                    if (imageData) {
                        return res.status(200).json({ 
                            'message' : 'successful',
                            'filter' : `${filter !== 'desc' && filter !== 'asc' ? `Invalid filter! [applying defaul filter 'desc']` : filter} `,
                            imageData
                        })
                    } else {
                        // status 400...
                        return res.status(200).json({ 'error' : 'imageData is null...' })
                    }
                })
                .catch((err) => {
                    // status 500...
                    return res.status(200).json({ 'error': `An arror has occured when getting user data... \n [ERROR:: ${err}]` });
                })
            }
        ], (err) => {
            // status 500...
            return res.status(200).json({ 'error': `An arror has occured when getting user data... \n [ERROR:: ${err}]` });
        })
    },
    getImagesByUserConnected: function (req, res) {

        // get token from client params...
        let headersAuth = req.headers['authorization'];

        // call the jwt func to check if the token is still valid ...
        let myUserId = jwt.getUserId(headersAuth); // the token expire after 1h ...

        if (myUserId < 0) {
            // status 400...
            return res.status(200).json({ 'error': 'You must be connected first...' });
        }

        let filter = req.params.filter;

        asyncLib.waterfall([
            () => {
                models.Images.findAll({
                    where: { UserId: myUserId, isActive : true },
                    include: [{model: models.Users}],
                    order: [ ['createdAt', filter!='asc'?'DESC':'ASC'] ]
                })
                .then((imageData) => {
                    if (imageData) {
                        return res.status(200).json({ 
                            'message' : 'successful',
                            'filter' : `${filter !== 'desc' && filter !== 'asc' ? `Invalid filter! [applying defaul filter 'desc']` : `By date of upload '${filter}'`} `,
                            imageData
                        })
                    } else {
                        // status 400...
                        return res.status(200).json({ 'error' : 'imageData is null...' })
                    }
                })
                .catch((err) => {
                    // status 400...
                    return res.status(200).json({ 'error': `An arror has occured when getting user data... \n [ERROR:: ${err}]` });
                })
            }
        ], (err) => {
            // status 400...
            return res.status(200).json({ 'error': `An arror has occured when getting user data... \n [ERROR:: ${err}]` });
        })
    }
}