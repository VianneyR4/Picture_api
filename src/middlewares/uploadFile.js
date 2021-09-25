import multer from 'multer';
import fs from 'fs';
import randomstring from 'randomstring';
import path from 'path';


// function destination(file) {
//     let mime = file.mimetype;
//     let arr = mime.split('/');
//     let type = arr[0];
//     let start = `/static/uploads/${type}/`;
//     let midlle = start + (new Date().getFullYear()) + "/";
//     let final = midlle + (new Date().getMonth() + 1);
//     let dest = [start, midlle, final];
//     for (var i = 0; i < dest.length; i++) {
//         if (!fs.existsSync(dest[i])) {
//             fs.mkdir(dest[i], e => {
//                 if (e) throw e;
//             });
//         }
//     }

//     return final;
// }

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
        req.newFilePath= path.join(__dirname, '../../static/uploads');
        cb(null, req.newFilePath);
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
    if (file.mimetype === 'image/jpeg' || file.mimetype === 'image/JPEG' || file.mimetype === 'image/png' || file.mimetype === 'image/PNG' ) {
        cb(null, true);
    } else if (file.mimetype === 'audio/mp3' || file.mimetype === 'audio/wav' || file.mimetype === 'audio/mpeg') {
        cb(null, true);
    } else {
        cb(null, true);
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