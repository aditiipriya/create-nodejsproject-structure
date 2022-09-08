const Admin = require("../models/adminModel");
const User = require("../models/userModel");

module.exports = {

 adminRegister : (adminInfo) => {
  return Admin.findOne({email:adminInfo.email})
      .then( (result) => {
          if (!result) {
              return Admin.create(adminInfo);
          }else {
              return result;
          }
      })
},

 isEmailExist : (params) => {
  return Admin.findOne({email:params.email , isDeleted:0 }).lean()
},

 resetPassword : (params) => {
  return Admin.findOneAndUpdate({email:params.email},{password:params.newPassword}).lean()
},

 isUserExist : (params) => {
  return Admin.findOne({_id: params.userId, isDeleted : 0 })
},

 changePassword : (params) => {
  return Admin.findOneAndUpdate({_id:params.userId},{password:params.newPassword}).lean()
},

 listUser : (params) => {
  let query = {};
  query.isDeleted =0;
  if(params.search){
    query["$or"] = [{ email: { $regex: params.search, $options: "i" } }, { name: { $regex: params.search, $options: "i" } }];
  }
  return User.find(query).select('-password' )
},

 deleteDeviceToken : (params) => {
  return Admin.findOneAndUpdate(
    { _id: params.userId },
    { deviceToken: "", updated: Date.now() },
    { new: true }
  );
},

 changeUserStatus : (params) => {
  return User.findOneAndUpdate({_id:params.user},{status:params.status},{new:true}).lean()
}

};
