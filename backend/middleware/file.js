const multer = require('multer')

const MIME_TYPE_MAP = {
    'image/png' : 'png',
    'image/jpeg' : 'jpg',
    'image/jpg' : 'jpgs'
}

const storage = multer.diskStorage({
    destination: (req,file,cb) => {
        const isInvalid = MIME_TYPE_MAP[file.mimetype]
        let error = new Error("Invlid File Type");
        if(isInvalid){
            error = null;
        }
        cb(error,"backend/images")
    },
    filename : (req,file,cb) => {
        const name = file.originalname.toLowerCase().split(' ').join('_');
        const ext = MIME_TYPE_MAP[file.mimetype];
        //console.log(name + '_' + Date.now() + '.' + ext+"---------------------------------------")
        cb(null,name + '_' + Date.now() + '.' + ext);
    }
})

module.exports = multer({storage:storage}).single("image")
