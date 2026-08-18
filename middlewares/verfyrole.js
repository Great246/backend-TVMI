import jwt from 'jsonwebtoken'

export const verfyRole = async (req, res, next) => {
    
    try {
      const user = req.user 

      if (!user) {
        return res.status(404).json({success: false, message: "User not found, Login"})
      }
      if (user.role !== "admin") {
        return res.status(403).json({success:false, message: "User is Forbidden"})
      }
      next()
    } catch (error) {
        console.log(error)
        return res.status(500).json({success: false, message: "Server internal error"})
    }
}