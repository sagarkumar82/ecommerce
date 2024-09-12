const mongoose = require('mongoose');

const RegisterSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  token: {
    type: String,
    default:null
  },
  isLogin:{
    type:Boolean,
    default:false
  },
  created_at: {
    type: Date,
    default: Date.now
  },
  updated_at: {
    type: Date,
    default: Date.now
  }

});
// Middleware to update 'updated_at' before each save
RegisterSchema.pre('save', function (next) {
  this.updated_at = Date.now();
  next();
});
const UserRegister  = mongoose.model('user-register', RegisterSchema);
module.exports =UserRegister