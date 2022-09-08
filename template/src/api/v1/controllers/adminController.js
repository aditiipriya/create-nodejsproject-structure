const config = require("../../../config");
const adminService = require("../services/adminService");
const customException = require("../utils/customException");
const redisSession = require("../utils/redisSession");
const mail = require("../utils/mail");
const appUtils = require("../utils/appUtils");
const ipAddress = config.cfg.ip;
const constant = require("../utils/constant");

module.exports = {

 adminLogin : (params) => {  params.email = params.email.toLowerCase();
  return adminService.isEmailExist(params).then(async (emailExist) => {
    if (!emailExist) {
      throw customException.EMAIL_NOT_REGISTERED();
    }
    params.password = appUtils.createHashSHA256(params.password);
    if (emailExist.password !== params.password) {
      throw customException.INCORRECT_PASSWORD();
    }
    let tokenObj = appUtils.buildUserTokenGenObj(emailExist)
    let userObj = {
      userId: emailExist._id.toString(),
      userObj: tokenObj,
      ip: ipAddress,
    };
    emailExist.accessToken = (await redisSession.create(userObj)).token;
    delete emailExist.password;
    let result = {};
    result.message = "Logined successfully !!";
    result.data = emailExist;
    return result;
  })
  
},

 forgotPassword : (params) => { params.email = params.email.toLowerCase();
  return adminService.isEmailExist(params).then(async ( emailExist )=> {
    if (!emailExist) {
      throw customException.EMAIL_NOT_REGISTERED();
    }
    let tokenObj = appUtils.buildUserTokenGenObj(emailExist)
    let userObj = {
      userId: emailExist._id.toString(),
      userObj: tokenObj,
      ip: ipAddress,
    };
    let accessToken = await redisSession.create(userObj);
    let payload = {
        token: accessToken.token,
        email: emailExist.email,
        subject: constant.EMAIL.subject.FORGOT_PWD_EMAIL,
        template: "forgot",
      };
      await mail.sendForgetEmailUser(payload);
      return { message: "Reset link in email sent Successfully " }
  })
  
},

 resetPassword :  (params) => {  params.email = params.email.toLowerCase();
  return adminService.isEmailExist(params).then((emailExist)=> {
    if (!emailExist) {
      throw customException.EMAIL_NOT_REGISTERED();
    }
    params.newPassword = appUtils.createHashSHA256(params.newPassword);
    return adminService.resetPassword(params).then((data)=>{
      delete data.password;
      return { message : "Password reset successfully !!", data : data };
    })
  })
},

 changePassword : (params) => {
  return adminService.isUserExist(params).then((userExist)=>{
    if (!userExist) {
      throw customException.USER_NOT_FOUND();
    }
    params.oldPassword = appUtils.createHashSHA256(params.oldPassword);
    params.newPassword = appUtils.createHashSHA256(params.newPassword);
  
    if (params.oldPassword !== userExist.password) {
      throw customException.INCORRECT_PASSWORD();
    }
    return adminService.changePassword(params)}).then((data)=> { 
      delete data.password;
      return { message : "Password changed successfully !!", data : data};
    })
},

 listUser : (params) => {
  return adminService.listUser(params);
},

 logout : (params) => {
  return redisSession.expireByUserId(params.userId).then(() => {
    return adminService.deleteDeviceToken(params).then(() => {
      return { message : "Logged out successfully !!" };
    });
  });
},

 changeUserStatus :  (params) => {
  return adminService.isUserExist(params).then((userExist)=>{
    if (!userExist) {
      throw customException.ADMIN_NOT_FOUND();
    }
    return adminService.changeUserStatus(params)
  }).then((data)=>{
    delete data.password;
    return {
      message : "User status changed successfully !!",
      data : data
    }; 
  })
},


};
