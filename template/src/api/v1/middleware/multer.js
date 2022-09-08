const multer = require('multer'),
	fs = require('fs'),
	config = require('../../../config');

const init = function(){
	if(!fs.existsSync(config.cfg.uploadDir)){
		fs.mkdir(config.cfg.uploadDir, 0744);
	}
}

let fileName;
const storage = multer.diskStorage({
	destination: function(request, file, callback){
		callback(null, config.cfg.uploadDir);
	},
	filename: function(request, file, callback){
		const time = new Date().getTime();
		fileName = file.fieldname + '_' + time + '_' + file.originalname;
		callback(null, fileName);
	}
});

const upload = multer({storage : storage});

function _singleFile(key){
	// init();
	return upload.single(key);
}

function _fileArray(key, count){
	// init();
	return upload.array(key, count);
}

// ========================== Export Module Start ==========================
module.exports = {
	single: _singleFile,
	array: _fileArray
}
// ========================== Export Module End ============================
