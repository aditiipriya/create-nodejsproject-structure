const userRouter = require("express").Router();
const validators = require("../validators/validateUser");
const userController = require("../controllers/userController");
const resHndlr = require("../../response/responseHandler");
const middleware = require("../middleware");

userRouter.route("/register").post([validators.validateRegister], (req, res) =>  {
  userController.userRegister({ ...req.body })
    .then( (result) =>{
      resHndlr.sendSuccess(res, result, req);
    })
    .catch( (err) =>{
      resHndlr.sendError(res, err, req);
    });
});

userRouter.route("/login").post([validators.validateLogin], (req, res) => {
  userController.userLogin({ ...req.body })
    .then( (result) =>{
      resHndlr.sendSuccess(res, result, req);
    })
    .catch( (err) =>{
      resHndlr.sendError(res, err, req);
    });
});

userRouter.route("/listUser").get([middleware.authenticate.autntctTkn], (req, res) => {
  userController.listUser({ userId:req.user.userId , ...req.query })
    .then( (result) =>{
      resHndlr.sendSuccess(res, result, req);
    })
    .catch( (err) =>{
      resHndlr.sendError(res, err, req);
    });
});

userRouter.route("/forgotPassword").post([], (req, res) => {
  userController.forgotPassword({ ...req.body })
    .then( (result) =>{
      resHndlr.sendSuccess(res, result, req);
    })
    .catch( (err) =>{
      resHndlr.sendError(res, err, req);
    });
});

userRouter.route("/resetPassword").post([validators.validateResetPassword], (req, res) => {
  userController.resetPassword({...req.body}).then( (result) =>{
      resHndlr.sendSuccess(res, result, req);
    }).catch( (err) =>{
      resHndlr.sendError(res, err, req);
    });
});

userRouter.route("/changePassword").post([middleware.authenticate.autntctTkn ,validators.validateChangePassword],  (req, res) =>{
  userController.changePassword({ userId: req.user.userId, ...req.body })
    .then( (result) =>{
      resHndlr.sendSuccess(res, result, req);
    })
    .catch( (err) =>{
      resHndlr.sendError(res, err, req);
    });
});

userRouter.route("/deleteProfile").delete([middleware.authenticate.autntctTkn ],  (req, res) =>{
  userController.deleteProfile({ userId:req.user.userId  })
    .then( (result) =>{
      resHndlr.sendSuccess(res, result, req);
    })
    .catch( (err) =>{
      resHndlr.sendError(res, err, req);
    });
});

userRouter.route("/updateProfile").put([middleware.authenticate.autntctTkn,middleware.multer.single('profilePhoto'), middleware.mediaUpload.uploadSingleMediaToS3()],(req, res) =>{
  if (req.body.interests) { req.body.interests = JSON.parse(req.body.interests) }
  req.body.profilePhoto = req.body.location;
  userController.userUpdate({ userId : req.user.userId, ...req.body  })
    .then( (result) =>{
      resHndlr.sendSuccess(res, result, req);
    })
    .catch( (err) =>{
      resHndlr.sendError(res, err, req);
    });
});

userRouter.route("/logout").post([middleware.authenticate.autntctTkn],  (req, res) =>{
  userController.logout({ userId:req.user.userId })
    .then( (result) =>{
      resHndlr.sendSuccess(res, result, req);
    })
    .catch( (err) =>{
      resHndlr.sendError(res, err, req);
    });
});

module.exports = userRouter;
