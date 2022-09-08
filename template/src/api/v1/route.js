const express = require("express");
const router = express.Router();
const basicAuth = require("./middleware/basicAuth");
const responseHandler = require('../response/responseHandler');
const userRoute = require("../v1/routes/userRoute");
const adminRoute= require("../v1/routes/adminRoute");

router.use("/user", userRoute);
router.use("/admin",adminRoute);

module.exports = function (app) {
  app.use(basicAuth.basicAuthentication);
  app.use('/',router);
  app.use(responseHandler.handleError)
};