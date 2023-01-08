const mongoose = require("mongoose");

const User = require("../models/user");
const { hashPassword } = require("../helpers/encryptPassword")

const registerUser = async (userData) => {
    const { email, firstName, lastName, password } = userData;
    const passwordHash = await hashPassword(password);
    const newUser = new User({
        _id: new mongoose.Types.ObjectId,
        email,
        firstName,
        lastName,
        password: passwordHash
    });
    return newUser.save()
}

const findUserByEmail = async (email) => {
    return User.findOne({ email }).select("-__v");
}

const updateUserDetails = async (user, userData) => {
    return User.findByIdAndUpdate(user, userData)
}

const findUserById = async (id) => {
    return User.findById(id).select("-password").select("-__v");
}

module.exports = {
    registerUser,
    findUserByEmail,
    findUserById,
    updateUserDetails
}