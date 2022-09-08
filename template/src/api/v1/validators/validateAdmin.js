const _ = require("lodash");

const appUtils = require("../utils/appUtils");
const exceptions = require("../utils/customException");
const constant = require("../utils/constant");

let validateAdminLogin = (req, res, next) => {
  let { email, password } = req.body;
  const errors = [];
  // email = _.toLower(email);
  if (_.isEmpty(email) || !email) {
    errors.push({
      fieldName: "email",
      message: constant.MESSAGES.KEY_CANT_EMPTY.replace("{{key}}", "email"),
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
  if (email) {
    if (!appUtils.isValidEmail(email)) {
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

let validateEmail = (req, res, next)=> {
  let { email } = req.body;
  const errors = [];

  email = _.toLower(email);
  if (_.isEmpty(email)) {
    errors.push({
      fieldName: "email",
      message: constant.MESSAGES.KEY_CANT_EMPTY.replace("{{key}}", "email"),
    });
  }
  if (!appUtils.isValidEmail(email)) {
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

const validateChangeUserStatus = (req, res, next) => {
  const errors = [];
  const { userId, status } = req.body;

  if (status != 0 && status != 1) {
    errors.push({
      fieldName: "status",
      message: constant.MESSAGES.KEY_CANT_EMPTY.replace("{{key}}", "status"),
    });
  }
  if (_.isEmpty(userId)) {
    errors.push({
      fieldName: "userId",
      message: constant.MESSAGES.KEY_CANT_EMPTY.replace("{{key}}", "userId"),
    });
  }
  if (errors && errors.length > 0) {
    validationError(errors, next);
  }
  next();
};

let validationError = (errors, next) => {
  if (errors && errors.length > 0) {
    return next(
      exceptions.getCustomErrorException(
        constant.MESSAGES.VALIDATION_ERROR,
        errors
      )
    );
  }
  next();
};

module.exports = {
  validateAdminLogin,
  validateEmail,
  validateForgotPassword,
  validateResetPassword,
  validateChangePassword,
  validateChangeUserStatus,
};
