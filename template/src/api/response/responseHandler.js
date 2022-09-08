const constant = require('../v1/utils/constant'),
    customException = require('../v1/utils/customException'),
    logger = require('../../logger/index'),
    APIResponse = require('./APIResponse');    

function _sendResponse(response, result) {
    return response.send(result);
}

function sendError(response, error,request) {
    if ( error.errorCode == undefined || error.errorCode == 'undefined') {
        logger.error("Unhandled error.  ",error,error.at);
        error = customException.intrnlSrvrErr(error);
    }
    const result = new APIResponse(constant.STATUS_CODE.ERROR, error,request);
    _sendResponse(response, result);
}

function handleError(error, request, response, next) {
    // unhandled error
    sendError(response, error,request);
}

function sendSuccess(response, result,request) {
    result = new APIResponse(constant.STATUS_CODE.SUCCESS, result,request);
    _sendResponse(response, result);
}

module.exports = {
    sendError,
    handleError,
    sendSuccess,
}
