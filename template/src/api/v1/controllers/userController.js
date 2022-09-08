const config = require("../../../config");
const mail = require("../utils/mail");
const sha256 = require("sha256");
const ipAddress = config.cfg.ip;
const userService = require("../services/userService");
const redisSession = require("../utils/redisSession");
const customException = require("../utils/customException");
const appUtils = require("../utils/appUtils");
const constant = require("../utils/constant");

module.exports = {
  userRegister: async (params) => {
    let alreadyRegistered = await userService.emailExist(params);
    if (alreadyRegistered) {
      throw customException.ALREADY_REGISTERED();
    }
    params.password = sha256(params.password);
    const data = (await userService.userRegister(params)).toObject();
    delete data.password;

    let result = {};
    result.message = "Registered successfully !!";
    result.data = data;
    return result;
  },

  userLogin: (params) => {
    params.password = sha256(params.password);
    return userService
      .emailExist(params)
      .then((userExist) => {
        if (!userExist) {
          throw customException.EMAIL_NOT_REGISTERED();
        }
        return userService.userLogin(params);
      })
      .then(async (data) => {
        if (!data) {
          throw customException.INCORRECT_PASSWORD();
        }
        let tokenObj = appUtils.buildUserTokenGenObj(data);
        let userObj = {
          userId: data._id.toString(),
          userObj: tokenObj,
          ip: ipAddress,
        };
        data.accessToken = (await redisSession.create(userObj)).token;

        let result = {};
        result.message = "Logined successfully !!";
        result.data = data;
        return result;
      });
  },

  listUser: (params) => {
    return userService.listUser(params).then((data) => {
      return { count: data.length, users: data };
    });
  },

  forgotPassword: (params) => {
    return userService.emailExist(params).then(async (emailExist) => {
      if (!emailExist) {
        throw customException.EMAIL_NOT_REGISTERED();
      }
      let tokenObj = appUtils.buildUserTokenGenObj(emailExist);
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
      return { message: "Reset link in email sent Successfully " };
    });
  },

  resetPassword: (params) => {
    return userService
      .emailExist(params)
      .then((emailExist) => {
        if (!emailExist) {
          throw customException.EMAIL_NOT_REGISTERED();
        }
        params.newPassword = sha256(params.newPassword);
        return userService.resetPassword(params);
      })
      .then((data) => {
        delete data.password;
        let result = {};
        result.message = "Password reset successfully !!";
        result.data = data;
        return result;
      });
  },

  changePassword: (params) => {
    return userService.isUserExist(params).then((userExist) => {
        if (!userExist) {
          throw customException.USER_NOT_FOUND();
        }
        params.oldPassword = sha256(params.oldPassword);
        params.newPassword = sha256(params.newPassword);

        if (params.oldPassword !== userExist.password) {
          throw customException.INCORRECT_PASSWORD();
        }
        return userService.changePassword(params);
      })
      .then((data) => {
        delete data.password;
        let result = {};
        result.message = "Password changed successfully !!";
        result.data = data;
        return result;
      });
  },

  deleteProfile: (params) => {
    return userService.isUserExist(params)
      .then((userExist) => {
        if (!userExist) {
          throw customException.USER_NOT_FOUND();
        }
        let fakeData = appUtils.generateFakeEmail();
        params.email = fakeData.gmail;
        params.name = fakeData.name;
        return userService.deleteProfile(params);
      })
      .then((data) => {
        let result = {};
        result.message = "Profile deleted successfully !!";
        result.data = data;
        return result;
      });
  },

  logout: (params) => {
    return redisSession.expireByUserId(params.userId).then(() => {
      return userService.deleteDeviceToken(params).then(() => {
        let result = {};
        result.message = "Logged out successfully !!";
        return result;
      });
    });
  },

  userUpdate: (params) => {
    return userService.isUserExist(params).then((userExist) => {
      if (!userExist) {
        throw customException.USER_NOT_FOUND();
      }
      return userService.userUpdate(params).then((data) => {
        delete data.password;
        return data;
      });
    });
  },
  
};
