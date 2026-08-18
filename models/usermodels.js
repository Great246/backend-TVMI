import mongoose from "mongoose";

const userScheme = new mongoose.Schema({
    fullname: {
        type: String,
        required: true
    },
    Username: {
        type: String,
        required: true
    },
    Email: {
        type: String,
        required: true
    },
    phonenumber: {
        type: Number,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    role: {
        type: String,
        enum: ["user", "admin"],
        default: "user"
    },
    resetPasswordToken: {type: String, default: null},
    resetPasswordTokenExpires: {type: String, default: Date}
}, {timestamps: true})

const User = mongoose.model("User", userScheme)

export default User