import Contact from "../models/contactmodels.js"

export const createcontact = async (req, res) => {
 try {
    const { email, name, subject, message } = req.body
    if (!email || !name || !subject || !message) {
        return res.status(404).json({success: false, message: "All field are required before submit"})
    }
    await Contact.create({
        email, name, subject, message
    })
    return res.status(201).json({success: true, message: "Contact saved successfully and has been received thanks, for your patience"})

 } catch (error) {
    console.log(error)
    return res.status(500).json({success: false, message: "internal server error"})
 }
}
export const getContacts = async (req, res) => {
    try {
        const contacts = await Contact.find().sort({createdAt: -1})
        res.status(200).json({success: true, contacts})
    } catch (error) {
        console.log(error)
    return res.status(500).json({success: false, message: "internal server error"})
    }
}
export const deleteContact = async (req, res) => {
    try {
        const id = req.params.id
    await Contact.findByIdAndDelete(id)
    return res.status(200).json({success: true, message: "Message deleted successfully"})
    } catch (error) {
       console.log(error)
    return res.status(500).json({success: false, message: "internal server error"})
    }
}
export const getContactbyid = async (req, res) => {
    try {
        const id = req.params.id
        const message = await Contact.findById(id)
        if (!message) {
            return res.status(404).json({success: false, message: "No message found"})
        }
        return res.status(200).json(message)
    } catch (error) {
        console.log(error)
    return res.status(500).json({success: false, message: "internal server error"})
    }
}
export const getNumbercontact = async (req, res) => {
    try {
       const Totalmessage = await Contact.countDocuments()
    return res.status(200).json(Totalmessage) 
    } catch (error) {
        console.log(error)
        return res.status(500).json({success: false, message: "internal server error"})
    }
}
export const getLatestMessage = async (req, res) => {
    try {
        const fourmessage = await Contact.find().sort({createdAt: -1}).limit(4)
        return res.status(200).json(fourmessage)
    } catch (error) {
        console.log(error)
        return res.status(500).json({success: false, message: "internal server error"})
    }
}
export const fivehoursagomess = async (req, res) => {
    try {
        const fivehoursago = new Date(Date.now() - 5 * 60 * 60 * 1000)
        const recentcontact = await Contact.countDocuments({createdAt: { $gte: fivehoursago}})
        return res.status(200).json(recentcontact)
    } catch (error) {
        console.log(error)
        return res.status(500).json({success: false, message: "internal server error"})
    }
}