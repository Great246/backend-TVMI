import cloudinary from "../config/cloudinary.js"
import Gallery from "../models/gallerymodels.js"

export const createGallery = async (req, res) => {
    try {
        if (!req.files) {
            return res.status(400).json({success: false, message: "Select at least one image"})
        }

        const uploadtoCloudinary = (buffer) => {
            return new Promise((resolve, reject)=> {
                const uploadstream = cloudinary.uploader.upload_stream({folder: "church-gallery"}, (error, result)=> {
                if(error) {
                    reject(error)
                } else {
                    resolve(result)
                }
                })
                uploadstream.end(buffer)
                })
        }

        for(const file of req.files) {
         const result = await uploadtoCloudinary(file.buffer)
         await Gallery.create({
            image: result.secure_url,
            imagePublicId: result.public_id
         })
        }
        return res.status(201).json({success: true, message: "Pictures added successfully"})

    } catch (error) {
        console.log(error)
        return res.status(500).json({success: false, message: "Internal server Error"})
    }
}
export const getwebGallery = async (req, res) => {
    try {
     const images = await Gallery.find() 
     if (!images) {
       return res.status(400).json({success: false, message: "No gallery"})
     }
     return res.status(200).json(images)
    } catch (error) {
        console.log(error)
        return res.status(500).json({success: false, message: "Internal server Error"})
    }
    
}
export const getadminGallery = async (req, res) => {
    try {
        const images = await Gallery.find()
    if (!images) {
       return res.status(400).json({success: false, message: "No gallery"})
     }
     return res.status(200).json(images)
    } catch (error) {
        console.log(error)
        return res.status(500).json({success: false, message: "Internal server Error"})
    }
}
export const deleteGallery = async (req, res) => {
    try {
        const { id } = req.params
        const image = await Gallery.findById(id)
        if (!image) {
            return res.status(404).json({success: false, message: "Image not found"})
        }
        await cloudinary.uploader.destroy(image.imagePublicId)
        await Gallery.findByIdAndDelete(id)
        return res.status(200).json({success: true, message: "Image deleted successfully"})
    } catch (error) {
        console.log(error)
        return res.status(500).json({success: false, message: "Internal server Error"})
    }
}