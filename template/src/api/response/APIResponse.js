const config = require('../../config');
const constant = require('../v1/utils/constant')

class APIResponse {
    constructor(statusCode, result,request){
        this.statusCode = statusCode;
        if(statusCode == 1){
            result.message=result.message?result.message:"Api Result";
            result ? this.responseData = result : constant.EMPTY;
        }else{
            result ? this.error = result : constant.EMPTY;
        }
        if (config.cfg.debug===true||config.cfg.debug==="true") {
            this.requestParams=request.body;
        }
        this.time = new Date();
    }
}


module.exports = APIResponse;
