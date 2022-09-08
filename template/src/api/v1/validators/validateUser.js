const _ = require("lodash");
const appUtils = require("../utils/appUtils");
const constant = require("../utils/constant");
const exceptions = require("../utils/customException");

let validateRegister = (req, res, next) => {
  let { email, name, password } = req.body;
  let errors = [];
  if (_.isEmpty(email)) {
    errors.push({
      fieldName: "email",
      message: constant.MESSAGES.KEY_CANT_EMPTY.replace(
        "{{key}}",
        "email"
      ),
    });
  }if (_.isEmpty(name)) {
    errors.push({
      fieldName: "name",
      message: constant.MESSAGES.KEY_CANT_EMPTY.replace(
        "{{key}}",
        "name"
      ),
    });
  }if (_.isEmpty(password)) {
    errors.push({
      fieldName: "password",
      message: constant.MESSAGES.KEY_CANT_EMPTY.replace(
        "{{key}}",
        "password"
      ),
    });
  }
  if (email) {
    if (!appUtils.isValidEmail(email)) {
      errors.push({
        fieldName: "email",
        message: constant.MESSAGES.INVALID_EMAIL,
      });
    }
  }
  if (errors && errors.length > 0) {
    validationError(errors, next);
  }
  next();
};

let validateLogin = (req, res, next) => {
  let { email, password } = req.body;
  let errors = [];

  if (_.isEmpty(email)) {
    errors.push({
      fieldName: "email",
      message: constant.MESSAGES.KEY_CANT_EMPTY.replace("{{key}}","email"),
    });
  }

  if (email) {
    if (!appUtils.isValidEmail(email)) {
      errors.push({
        fieldName: "email",
        message: constant.MESSAGES.INVALID_EMAIL,
      });
    }
  }

  if (_.isEmpty(password)) {
    errors.push({
      fieldName: "password",
      message: constant.MESSAGES.KEY_CANT_EMPTY.replace("{{key}}", "password"),
    });
  }

  if (errors && errors.length > 0) {
    validationError(errors, next);
  }
  next();
};

let validateForgotPassword = (req, res, next) => {
  let { email } = req.body;
  let errors = [];

  if (_.isEmpty(email)) {
    errors.push({
      fieldName: "email",
      message: constant.MESSAGES.KEY_CANT_EMPTY.replace("{{key}}", "email"),
    });
  } else if (!appUtils.isValidEmail(email)) {
    errors.push({
      fieldName: "email",
      message: constant.MESSAGES.INVALID_EMAIL,
    });
  }

  if (errors && errors.length > 0) {
    validationError(errors, next);
  }
  next();
};

let validateResetPassword = (req, res, next) => {
  let { email, newPassword, confirmPassword } = req.body;
  let errors = [];

  if (_.isEmpty(email)) {
    errors.push({
      fieldName: "email",
      message: constant.MESSAGES.KEY_CANT_EMPTY.replace("{{key}}", "Email id"),
    });
  } 
  if (email){ 
    if(!appUtils.isValidEmail(email)) {
    errors.push({
      fieldName: "email",
      message: constant.MESSAGES.INVALID_EMAIL,
    });
  }
}
  if (_.isEmpty(newPassword)) {
    errors.push({
      fieldName: "newPassword",
      message: constant.MESSAGES.KEY_CANT_EMPTY.replace(
        "{{key}}",
        "newPassword"
      ),
    });
  }
  if (_.isEmpty(confirmPassword)) {
    errors.push({
      fieldName: "confirmPassword",
      message: constant.MESSAGES.KEY_CANT_EMPTY.replace(
        "{{key}}",
        "confirmPassword"
      ),
    });
  }
  if (newPassword && confirmPassword) {
    if (newPassword != confirmPassword) {
      errors.push({
        fieldName: "confirmPassword",
        message: constant.MESSAGES.UNMATCHED_PASSWORD,
      });
    }
  }

  if (errors && errors.length > 0) {
    validationError(errors, next);
  }
  next();
};

let validateChangePassword = (req, res, next) => {
  let { newPassword, oldPassword } = req.body;
  let errors = [];

  if (_.isEmpty(newPassword)) {
    errors.push({
      fieldName: "newPassword",
      message: constant.MESSAGES.KEY_CANT_EMPTY.replace(
        "{{key}}",
        "newPassword"
      ),
    });
  }
  if (_.isEmpty(oldPassword)) {
    errors.push({
      fieldName: "oldPassword",
      message: constant.MESSAGES.KEY_CANT_EMPTY.replace(
        "{{key}}",
        "newPassword"
      ),
    });
  }

  if (newPassword && oldPassword) {
    if (oldPassword == newPassword) {
      errors.push({
        fieldName: "oldPassword",
        message: constant.MESSAGES.REPEATED_PREVIOUS_PASSWORD,
      });
    }
  }

  if (errors && errors.length > 0) {
    validationError(errors, next);
  }
  next();
};

let validationError = (errors, next) => {
  if (errors && errors.length > 0) {
    return next(exceptions.getCustomErrorException( constant.MESSAGES.VALIDATION_ERROR, errors ))
  }
  next();
};

module.exports = {
  validateRegister,
  validateLogin,
  validateForgotPassword,
  validateResetPassword,
  validateChangePassword
};