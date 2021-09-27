import multer from 'multer';
import fs from 'fs';
import randomstring from 'randomstring';
import path from 'path';

function getType(src) {
    let mp3 = ["mpeg"];
    if (mp3.indexOf(src) > -1) {
        return "mp3";
    }
    return src;
}
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        // send file path ...
        // req.newFilePath= '/public/uploads';
        cb(null, 'public/uploads');
    },
    filename: function (req, file, cb) {
        let mime = file.originalname;
        let getTypeExtension = mime.split(".");
        let CountPoint = getTypeExtension.length;
        let newFileName = randomstring.generate() + `.${getTypeExtension[CountPoint-1]}`;
        // send file name ...
        req.newFileName = newFileName;
        cb(null, newFileName);
    }
});

const fileFilter = (req, file, cb) => {
    if (file.mimetype === 'image/jpeg' || file.mimetype === 'image/JPEG' || file.mimetype === 'image/jpg' || file.mimetype === 'image/JPG' || file.mimetype === 'image/png' || file.mimetype === 'image/PNG' ) {
        cb(null, true);
    } else {
        cb(null, false);
    }

    console.log("__Uploaded_file___=>", file);
};

export default multer({
    "storage": storage,
    "limits": {
        fileSize: 1024 * 1024 * 20
    },
    "fileFilter": fileFilter
});