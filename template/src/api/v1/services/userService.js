const User = require("../models/userModel");

module.exports = {
  userRegister: (params) => {
    let user = new User(params);
    const data = User.create(user);
    return data;
  },

  userLogin: (params) => {
    return User.findOne(
      {
        email: params.email,
        password: params.password,
      },
      { password: 0 }
    ).lean();
  },

  emailExist: (params) => {
    return User.findOne({ email: params.email, isDeleted: 0, status:1 });
  },

  listUser: (params) => {
    let query = {};
    query.isDeleted = 0;
    if (params.search) {
      query["$or"] = [
        { email: { $regex: params.search, $options: "i" } },
        { name: { $regex: params.search, $options: "i" } },
      ];
    }
    return User.find(query, { password: 0 });
  },

  resetPassword: (params) => {
    return User.findOneAndUpdate(
      { email: params.email },
      { password: params.newPassword }
    ).lean();
  },

  isUserExist: (params) => {
    return User.findOne({ _id: params.userId, isDeleted: 0 });
  },

  changePassword: (params) => {
    return User.findOneAndUpdate(
      { _id: params.userId },
      { password: params.newPassword }
    ).lean();
  },

  deleteProfile: (params) => {
    params.updated = Date.now();
    params.isDeleted = 1;
    params.status = 0;
    params.password = "";
    params.contactNumber = "";
    return User.findOneAndUpdate({ _id: params.userId }, params, { new: true });
  },

  userUpdate: (params) => {
    params.updated = Date.now();
    return User.findOneAndUpdate({ _id: params.userId }, params, {
      new: true,
    }).lean();
  },

  deleteDeviceToken: (params) => {
    return User.findOneAndUpdate(
      { _id: params.userId },
      { deviceToken: "", updated: Date.now() },
      { new: true }
    );
  },
};
