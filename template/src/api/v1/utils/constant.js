const STATUS_CODE = {
    ERROR: 0,
    SUCCESS: 1,
};

const MESSAGES = {
    KEY_CANT_EMPTY: "{{key}} cannot be empty",
    INTERNAL_SERVER_ERROR: "Please try after some time.",
    INVALID_EMAIL: "Please fill valid email address.",
    INVALID_PASSWORD: "Password needs to have at least one lower case, one uppercase, one number, one special character, and must be at least 8 characters but no more than 35.",
    VALIDATION_ERROR: "Validation error.",
    UNAUTHORIZED_ACCESS_EXCEPTION: "Unauthorized access.",
    INVALID_PHONE: "Please fill valid phone number.",
    TOKEN_EXPIRED: "Token link has been expired.",
    INCORRECT_PASS: "Invalid email or passoword",
    ALREADY_REGISTERED: "Email already registered !!",
    UNMATCHED_PASSWORD: "Password and Confirm Password Unmatched !!",
    EMAIL_NOT_REGISTERED: "Email not registered !!",
    INCORRECT_PASSWORD: "Incorrect Password !!",
    SESSION_EXPIRED: "Accesstoken Expired !!",
    INVALID_ZIPCODE: "Invalid zipcode !!",
    INVALID_DOB: "Invalid DOB !!",
    INVALID_DATE: "Invalid date !!",
    ADMIN_NOT_FOUND: "Admin not found",
    USER_NOT_FOUND: "Id not found ",
    INACTIVE_USER: "Your account is inactive",
    INVALID_IMAGE_TYPE: "Invalid image type",
    ACCESSTOKEN_MISSING:"Accesstoken missing !!",
    REPEATED_PREVIOUS_PASSWORD:"New password cannot be same as previous password ",
    INVALID_STATUS_VALUE:"Invalid Status Value",
};

const EMAIL = {
    subject: {
        VERIFY_EMAIL: "Confirm Email Address",
        FORGOT_PWD_EMAIL: "Reset Password Request",
    },
};

module.exports = Object.freeze({
    STATUS_CODE: STATUS_CODE,
    MESSAGES: MESSAGES,
    EMAIL: EMAIL,
});
