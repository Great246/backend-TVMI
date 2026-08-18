import { prayers } from "../models/prayerRequest.js"

export const getLasterPrayerrequest = async (req, res) => {
   try {
    const alllastest = await prayers.find().sort({createdAt: -1}).limit(4)
    return res.status(200).json({success:true, alllastest})
   } catch (error) {
    console.log(error)
    res.status(500).json({success: false, message: "Server internal error"})
   }
}
export const postPrayerrequest = async (req, res) => {
   const { name, email, subject, messag } = req.body

   try {
    if (!name || !email || !subject || !messag) {
        return res.status(400).json({success: false, message: "All fileds are required"})
    }
    await prayers.create({
        name, email, subject, messag
    })
    return res.status(201).json({success: true, message: "Your prayers has been sent, we will keep praying for you"})
   } catch (error) {
    console.log(error)
    return res.status(500).json({success: false, message: "Server internal error"})
   }
}
export const getPrayerrequest = async (req, res) => {
  try {
    const allprayers = await prayers.find().sort({createdAt: -1})
    return res.status(200).json({success: true, allprayers})
  } catch (error) {
    console.log(error)
    return res.status(500).json({success: false, message: "Server internal error"})
  }
}
export const deletePrayerrequest = async (req, res) => {
    try {
      const id = req.params.id
      await prayers.findByIdAndDelete(id)

      return res.status(200).json({success: true, message: "Deleted Successfully"})
    } catch (error) {
      console.log(error)
    return res.status(500).json({success: false, message: "Server internal error"})
    }
}
export const geteachprayer = async (req, res) => {
  try {
    const id = req.params.id
    const user = await prayers.findById(id)
    return res.status(200).json(user)
  } catch (error) {
    console.log(error)
    return res.status(500).json({success: false, message: "Server internal error"})
  }
}

export const totalPrayer = async (req, res) => {
  try {
    const totalPrayer = await prayers.countDocuments()
    return res.status(200).json(totalPrayer)
  } catch (error) {
    console.log(error)
    return res.status(500).json({success: false, message: "Server internal error"})
  }
}