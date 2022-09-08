const mongoose = require("mongoose");
const AdminSchema = new mongoose.Schema({
  name: {
    type: String,
  },
  email: {
    type: String,
    required: true,
    unique:true,
    index:true
  },
  password: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  updatedAt: {
    type: Date,
    default: Date.now,
  },
  isDeleted: {
    type:Number,
    default: 0
  },
  status: {
    type:Number,
    default: 1 //0= inactive, 1 = active
  },
  role: {
    type: Number,
    default: 1
  }
});
const Admin = mongoose.model("Admin", AdminSchema);

module.exports = Admin;