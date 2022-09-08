"use strict";
const mongoose = require("mongoose");
const redisSession = require("../utils/redisSession");
const customException = require("../utils/customException");

const __verifyTok = function (acsTokn) {
    return redisSession.getByToken(acsTokn)
        .then(function (tokenPayload) {
            return tokenPayload;
        })
        .catch(function (err) {
            throw err
        })
};

const expireToken = function (req, res, next) {
    let acsToken = req.get('accessToken');
    return redisSession.expire(acsToken)
        .then(function () {
            //return result;
            next();
        })
        .catch(function (err) {
            next(err)
        })
}

const autntctTkn = function (req, res, next) {
    let acsToken = req.get('accessToken');

    __verifyTok(acsToken)
        .bind({})
        .then(function (tokenPayload) {
            //console.log('tokenPayload: ', tokenPayload);
            if (tokenPayload.d) {
                let userId=mongoose.Types.ObjectId(tokenPayload.d.userId)
                req.user = tokenPayload.d;
                req.user.userId=userId;
                next()
            } else {
               throw customException.unauthorizeAccess();
            }
        })
        .catch(function (err) {
            next(err)
        })
}

module.exports = {
    autntctTkn,
    expireToken,
};

