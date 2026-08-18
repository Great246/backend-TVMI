import User from "../models/usermodels.js"

export const getLatestusers = async (req, res) => {
    try {
        const users = await User.find().select("-password").sort({createdAt: -1}).limit(4)
        res.json(users)
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
}

export const getallUsers = async (req, res) => {
    try {
        const users = await User.find().select("-password").sort({createdAt: -1})
        res.json(users)
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
}

export const deleteUser = async (req, res) => {
    try {
        const id = req.params.id
        const deleteuser = await User.findByIdAndDelete(id)
        
       return res.status(200).json({success: true, message: "Deleted Successfully"})
    } catch (error) {
        console.log(error)
    }
}

export const getTotalUsers = async (req, res) => {
    try {
        const totalUsers = await User.countDocuments()
        res.status(200).json(totalUsers)
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
}