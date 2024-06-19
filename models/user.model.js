import mongoose from "mongoose";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

const userSchema = new mongoose.Schema({
  firstName: {
    type: String,
    required: true,
  },
  lastName: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    unique: true,
    required: true,
    match: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
  },

  password: {
    type: String,
    required: true,
  },
});

userSchema.methods.isValidPassword = async function (password) {
  try {
    return await bcrypt.compare(password, this.password);
  } catch (error) {
    throw new Error(error);
  }
};

userSchema.static.findOrCreate = function findOrCreate(profile, cb) {
  var userObj = new this();
  this.findOne({ email: profile.email }, function (err, result) {
    if (!result) {
      // userObj.username = profile.displayName;
      // //....
      // userObj.save(cb);
    } else {
      // cb(err, result);
    }
  });
};

userSchema.methods.generateAuthToken = function () {
  const token = jwt.sign({ _id: this._id }, process.env.JWT_SECRET);
  return token;
};

export default mongoose.model("User", userSchema);
