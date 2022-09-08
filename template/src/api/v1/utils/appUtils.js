"use strict";

const sha256 = require("sha256");
const bcrypt = require("bcrypt");
const randomstring = require("randomstring");

const getUserHome = () => {
  return process.env.HOME || process.env.HOMEPATH;
};

const getNodeEnv = () => {
  return process.env.NODE_ENV;
};

const isValidEmail = (email) => {
  const pattern = /(([a-zA-Z0-9\-?\.?]+)@(([a-zA-Z0-9\-_]+\.)+)([a-z]{2,3}))+$/;
  return new RegExp(pattern).test(email);
};

const isValidZipCode = (zipcode) => {
  const pattern = /^\d{5}(-\d{4})?$/;
  return new RegExp(pattern).test(zipcode);
};

//  returns if zipCode is valid or not (for US only)
const createHashSHA256 = (pass) => {
  return sha256(pass);
};

// returns random number for password
const getRandomPassword = () => {
  return getSHA256(Math.floor(Math.random() * 1000000000000 + 1));
};

const getSHA256 = (val) => {
  return sha256(val + "password");
};

const encryptHashPassword = (password, salt) => {
  return bcrypt.hashSync(password, salt);
};

const generateSaltAndHashForPassword = (password) => {
  const encryptPassword = { salt: "", hash: "" };
  encryptPassword["salt"] = bcrypt.genSaltSync(10);
  encryptPassword["hash"] = bcrypt.hashSync(password, encryptPassword["salt"]);
  return encryptPassword;
};

const stringToBoolean = (string) => {
  switch (string.toLowerCase().trim()) {
    case "true":
    case "yes":
    case "1":
      return true;
    case "false":
    case "no":
    case "0":
    case null:
      return false;
    default:
      return Boolean(string);
  }
};

// get random 6 digit number
const getRandomOtp = () => {
  //Generate Random Number
  return randomstring.generate({
    charset: "numeric",
    length: 6,
  });
};

const isValidPhone = (phone, verifyCountryCode) => {
  const reExp = verifyCountryCode ? /^\+\d{6,16}$/ : /^\d{6,16}$/;
  return reExp.test(phone);
};

const generateFakeEmail = () => {
  let chars = "abcdefghijklmnopqrstuvwxyz1234567890";
  let string = "";
  let result = {};
  for (let i = 0; i < 15; i++) {
    string += chars[Math.floor(Math.random() * chars.length)];
  }
  result.gmail = string + "@@gmail.com";
  result.name = string;
  return result;
};

const buildUserTokenGenObj = (data) => {
  let userObj = {};
  (userObj.email = data.email ? data.email : ""),
    (userObj.name = data.name ? data.name : ""),
    (userObj.userId = data._id.toString());
  return userObj;
};

module.exports = {
  getUserHome,
  getNodeEnv,
  isValidEmail,
  isValidZipCode,
  createHashSHA256,
  getRandomPassword,
  encryptHashPassword,
  generateSaltAndHashForPassword,
  stringToBoolean,
  getRandomOtp,
  isValidPhone,
  generateFakeEmail,
  buildUserTokenGenObj,
};
