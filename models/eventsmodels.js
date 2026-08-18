import mongoose from "mongoose";

const eventScheme = new mongoose.Schema({
    month: {type: String, required: true},
    day: {type: Number, required: true},
    year: {type: Number, required: true},
    description: {type: String, required: true},
    time: {type: String, required: true},
    occation: {type: String, required: true},
    location: {type: String, required: true},
    image: {type: String, required: true},
    imagePublicId: {type: String, required: true}
}, {timestamps: true})

const Event = mongoose.model('Event', eventScheme)

export default Event