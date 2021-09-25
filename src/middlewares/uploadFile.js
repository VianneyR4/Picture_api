import multer from 'multer';
const maxSize = 2 * 1024 * 1024;

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, '/static/uploads');
    },
    filename: function (req, file, cb) {
        cb(null, Date.now() + "--UJATCARE--" + file.originalname);
    }
});  

const fileFilter = (req, file, cb) => {
    if((file.mimetype).includes('jpeg') || (file.mimetype).includes('png') || (file.mimetype).includes('jpg')){
        cb(null, true);
    } else{
        cb(null, false);
    }
};

let upload = multer({ storage: storage, limits: { fileSize: maxSize }, fileFilter: fileFilter });

export default upload;