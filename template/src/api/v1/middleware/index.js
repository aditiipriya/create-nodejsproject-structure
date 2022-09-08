const  multer          = require('./multer');
const  authenticate    = require('./authenticate');
const  basicAuth       = require('./basicAuth');
const  mediaUpload     = require('./mediaUpload');
    
module.exports = {
	multer,
	authenticate,
    basicAuth,
    mediaUpload
}
