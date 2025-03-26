const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  name: String,
  email: { type: String, unique: true,required:true},
  password: String,
  googleId: String,
  githubId:String,
},{
  timestamps:true
});

module.exports = mongoose.model("User", userSchema);