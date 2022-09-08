const adminRouter = require("express").Router();
const adminController = require("../controllers/adminController");
const resHndlr=require('../../response/responseHandler');
const validators =require('../validators/validateAdmin')
const middleware= require('../middleware')

adminRouter.route("/login").post([validators.validateAdminLogin], (req, res) => {
  adminController.adminLogin({ ...req.body })
  .then( (result)=> {
    resHndlr.sendSuccess(res, result, req);
  })
  .catch( (err)=> {
    resHndlr.sendError(res, err, req);
  });
});

adminRouter.route("/forgotPassword").post([], (req, res) =>{
  adminController.forgotPassword({ ...req.body })
    .then( (result) => {
      resHndlr.sendSuccess(res, result, req);
    })
    .catch( (err)=> {
      resHndlr.sendError(res, err, req);
    });
}); 

adminRouter.route("/resetPassword").post([validators.validateResetPassword], (req, res)=> {
  adminController.resetPassword({...req.body}).then( (result) =>{
      resHndlr.sendSuccess(res, result, req);
    })
    .catch( (err) =>{
      resHndlr.sendError(res, err, req);
    });
});

adminRouter.route("/changePassword").post([middleware.authenticate.autntctTkn ,validators.validateChangePassword],  (req, res) =>{
  adminController.changePassword({ userId:req.user.userId, ...req.body })
    .then( (result) =>{
      resHndlr.sendSuccess(res, result, req);
    })
    .catch( (err) =>{
      resHndlr.sendError(res, err, req);
    });
});

adminRouter.route("/listUser").get([middleware.authenticate.autntctTkn],  (req, res) =>{
  adminController.listUser({ userId:req.user.userId , ...req.query })
    .then( (result)=> {
      resHndlr.sendSuccess(res, result, req);
    })
    .catch( (err)=> {
      resHndlr.sendError(res, err, req);
    });
});

adminRouter.route("/logout").post([middleware.authenticate.autntctTkn],  (req, res) =>{
  adminController.logout({ userId:req.user.userId })
    .then( (result)=> {
      resHndlr.sendSuccess(res, result, req);
    })
    .catch( (err)=> {
      resHndlr.sendError(res, err, req);
    });
});

adminRouter.route("/changeUserStatus").post([middleware.authenticate.autntctTkn ,validators.validateChangeUserStatus],  (req, res) =>{
  adminController.changeUserStatus({ userId:req.user.userId, ...req.body })
    .then( (result)=> {
      resHndlr.sendSuccess(res, result, req);
    })
    .catch( (err)=> {
      resHndlr.sendError(res, err, req);
    });
});

module.exports = adminRouter;
