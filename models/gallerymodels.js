import mongoose from 'mongoose'

const galleryScheme = new mongoose.Schema({
    image: {type: String, required: true},
    imagePublicId: {type: String, required: true}
}, {timestamps: true})

const Gallery = mongoose.model('Gallery', galleryScheme)
export default Gallery