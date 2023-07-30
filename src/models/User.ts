import mongoose, { Document, model, Schema } from "mongoose";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

interface IUser {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  createdAt: Number;
}

export interface TUser extends IUser, Document {
  getSignedJwtToken: () => string;
  matchPassword: (password: string) => Promise<boolean>;
}

const UserSchema: Schema<TUser> = new mongoose.Schema({
  firstName: {
    type: String,
    required: [true, "Plesae Enter first name"],
  },
  lastName: {
    type: String,
    required: [true, "Plesae Enter Last name"],
  },

  email: {
    type: String,
    required: [true, "Please add an email"],
    unique: true,
    match: [
      /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
      "Please use a vaild Email adrees",
    ],
  },
  password: {
    type: String,
    required: [true, "Please add a password"],
    minlength: 6,
    select: false,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

UserSchema.pre("save", async function (next) {
  if (!this.isModified("password")) {
    next();
  }
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
});

UserSchema.methods.getSignedJwtToken = function () {
  return jwt.sign({ id: this._id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRE,
  });
};

UserSchema.methods.matchPassword = async function (enterdPassword) {
  return await bcrypt.compare(enterdPassword, this.password);
};

const User = model<TUser>("User", UserSchema);

export default User;
