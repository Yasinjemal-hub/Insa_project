const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
  fullName: String,
  username: { type: String, required: true, unique: true },
  phone: { type: String, required: true },
  email: { type: String, unique: true },
  password: { type: String, required: true }, 
  location: String,
  birthday: Date
});

module.exports = mongoose.model('User', UserSchema);