import cloudinary from "../config/cloudinary.js"
import Event from "../models/eventsmodels.js"

export const createEvent = async (req, res) => {
    try {
        const {month, day, year, description, time, occation, location} = req.body

        if (!month || !day || !year || !description || !time || !occation || !location) {
            return res.status(400).json({success: false, message: "All inputs must be filled"})
        }
        if (!req.file) {
            return res.status(400).json({success: false, message: "Please select an image"})
        }
        const result = await new Promise((resolve, reject)=> {
            const uploadStream = cloudinary.uploader.upload_stream({
                folder: "church-events"
            }, (error, result) => {
                if(error) {
                    reject(error)
                } else {
                    resolve(result)
                }
            })

            uploadStream.end(req.file.buffer)
        })
        const event = await Event.create({
            month, day, year, description, time, occation, location, image: result.secure_url,
            imagePublicId: result.public_id
        })
        return res.status(201).json({success: true, message: "Events Created Successfully"})
    } catch (error) {
        return res.status(500).json({success: false, message: "internal server error"})
    }
}
export const getwebEvent = async (req, res) => {
    try {
        const user = await Event.find()

        return res.status(200).json(user)
    } catch (error) {
        return res.status(500).json({success: false, message: "internal server error"})
    }
}
export const editevent = async (req, res) => {
    const id = req.params.id
    const event = await Event.findById(id)
    if (!event) {
        return res.status(400).json({success: false, message: "No event found"})
    }
    const { month, day, year, description, time, occation, location } = req.body
    if (!req.file) {
        event.month = month,
        event.day = day,
        event.year = year,
        event.description = description,
        event.time = time,
        event.occation = occation,
        event.location = location
        await event.save()

        return res.status(200).json({success: true, message: "Event Updated successfully", event})
    }
    const result = await new Promise((resolve, reject)=> {
    const uploadstream = cloudinary.uploader.upload_stream({folder: "church-events"}, (error, result)=> {
    if(error) {
        reject(error)
    } else {
        resolve(result)
    }
    })
    uploadstream.end(req.file.buffer)
    })

    await cloudinary.uploader.destroy(event.imagePublicId)

    event.month = month,
        event.day = day,
        event.year = year,
        event.description = description,
        event.time = time,
        event.occation = occation,
        event.location = location,
        event.image = result.secure_url,
        event.imagePublicId = result.public_id
        await event.save()

        return res.status(200).json({success: true, message: "Event Updated successfully", event})
}
export const getlatestevent = async (req, res) => {
    try {
      const user = await Event.find().sort({createdAt: -1}).limit(4) 
      return res.status(200).json(user) 
    } catch (error) {
        return res.status(500).json({success: false, message: "internal server error"})
    }
    

}
export const getspectailEvents = async (req, res) => {
        try {
        const user = await Event.find()

        return res.status(200).json(user)
    } catch (error) {
        return res.status(500).json({success: false, message: "internal server error"})
    }
}
export const deleteevents = async (req, res) => {
    try {
        const id = req.params.id
    const deleteevent = await Event.findByIdAndDelete(id)
    
    return res.status(200).json({success: true, message: "Deleted successfully"})
    } catch (error) {
        return res.status(500).json({success: false, message: "internal server error"})
    }
    
}
export const geteachEvent = async (req, res) => {
    try {
        const { id } = req.params
        if (!id) {
            res.status(400).json({success: false, message: "No Events selected"})
        }
        const event = await Event.findById(id)
        if (!event) {
            return res.status(400).json({success: false, message: "No event found"})
        }
        return res.status(200).json({success: true, event})
    } catch (error) {
        
    }
}