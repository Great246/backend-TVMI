import mongoose from "mongoose";

const prayerScheme = new mongoose.Schema({
    name: {type: String, required: true},
    email: {type: String, required: true},
    subject: {type: String, required: true},
    messag: {type: String, required: true}
}, {timestamps: true})

export const prayers = mongoose.model("Prayer", prayerScheme)