import mongoose from 'mongoose'

const visitorsSchema = new mongoose.Schema({
    visitorId: {type: String, required: true}, visitDate:{type: String, required: true}, visitedAt: {type: Date, default: Date.now}
}, {timestamps: true})
visitorsSchema.index({visitorId: 1, visitDate: 1}, {unique: true})
const Visitor = mongoose.model("Visitor", visitorsSchema)
export default Visitor