import jwt from "jsonwebtoken"

export const verifyToken = async (req, res, next) => {
    try {
        const token = req.cookies.accessToken
    if(!token) {
        return res.json({success: false, message: "User not logged in"})
    }
    const decoded = jwt.verify(token, process.env.JWT_SECRET)
    req.user = decoded
    next()
    } catch (error) {
        console.log("JWT ERROR:", error.message)
        return res.status(401).json({success: false, message: "Login in"})
    }
}