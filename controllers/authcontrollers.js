import bcrypt from "bcryptjs"
import validator from "validator"
import User from "../models/usermodels.js"
import jwt from "jsonwebtoken"
import crypto from 'crypto'
import transporter from "../config/email.js"


export function createAccessToken(user) {
    try {
    const accesstoken = jwt.sign({id: user._id, role: user.role}, process.env.JWT_SECRET, {expiresIn: "15m"})
    return accesstoken  
    } catch (error) {
        return res.status(500).json({success: false, message: "Internal server error"})
    }
}
export function createRefreshToken(user) {
    try {
        const refreshToken = jwt.sign({id: user._id}, process.env.JWT_REFRESH_SECRET, {expiresIn: "7d"})
        return refreshToken
    } catch (error) {
        return res.status(500).json({success: false, message: "Internal server error"})
    }
}

export const register = async (req, res) => {
  const { fullname, Username, Email, password, phonenumber, confirmPassword } = req.body

  if (!fullname || !Username || !Email || !phonenumber || !password || !confirmPassword) {
    return res.json({success: false, message: "All fields are required"})
}
   try {
    const user = await User.findOne({Email})

    if (user) {
        return res.json({success: false, message: "User already exists"})
    }
    const vaildemail = validator.isEmail(Email)
    if (!vaildemail) {
        res.json({success: false, message: "Please input a valid email"})
    }
    if (password !== confirmPassword) {
        return res.json({success: false, message: "Password doesn't match"})
    }
    if (password.length < 8) {
        return res.json({success: false, message: "Password must be at least 8 characters"})
    }
    const hashedPassword = await bcrypt.hash(password, 10)
    const newUser = await User.create({
      fullname, Username, Email, phonenumber, password: hashedPassword
    })
    await newUser.save()
    res.json({success: true, message: "User registered successfully"})

   } catch (error) {
     return res.status(500).json({success: false, message: "Internal server error"})
   }
}


export const login = async (req, res) => {
 try {
    const { Email, password } = req.body

    if (!Email || !password) {
        return res.json({success: false, message: "All fields are required"})
    }
    const user = await User.findOne({Email})
    if (!user) {
        return res.json({success: false, message: "User not found"})
    }
    const ismatch = await bcrypt.compare(password, user.password)

    if (!ismatch) {
        return res.json({success: false, message: "Password is not correct"})
    }
    const accessToken = createAccessToken(user)
    const refreshToken = createRefreshToken(user)

    res.cookie("accessToken", accessToken, {
        httpOnly: true,
        secure: true,
        sameSite: "none",
        maxAge: 15 * 60 * 1000
    })
    res.cookie("refreshToken", refreshToken, {
        httpOnly: true,
        secure: true,
        sameSite: "none",
        maxAge: 7 * 24 * 60 * 60 * 1000
    })

    return res.status(200).json({success: true, message: "login successful", user: {
        id: user._id,
        role: user.role
    }})
 } catch (error) {
    return res.status(500).json({success: false, message: "Internal server error"})
 }
}

export const refresh = async (req, res) => {
    try {
        const refreshToken = req.cookies.refreshToken
        if (!refreshToken) {
            return res.status(401).json({message: "no refreshtoken found"})
        }
        const decoded = jwt.verify(refreshToken, process.env.JWT_REFRESH_SECRET)
        const user = await User.findById(decoded.id)
        if (!user) {
            return res.status(401).json({message: "user not found"})
        }

       const newAccessToken = createAccessToken(user)
       res.cookie("accessToken", newAccessToken, {
        httpOnly: true,
        secure: true,
        sameSite: "none",
        maxAge: 15 * 60 * 1000
       })

      return res.json({message: "Access token refreshed "})
    } catch (error) {
        console.log(error)
    }
}

export const getUser = async (req, res) => {
    try {
        const user = await User.findById(req.user.id).select("-password")
    if (!user) {
        return res.status(404).json({success: false, message: "User not logged in"})
    }
    return res.json({success: true, user})
    } catch (error) {
        return res.json({success: false, message: error.message})
    }}

export const logout = (req, res) => {
    res.clearCookie("refreshToken", {
        httpOnly: true,
        secure: true,
        sameSite: "none",
    })
    res.clearCookie("accessToken", {
        httpOnly: true,
        secure: true,
        sameSite: "none",
    })

    res.status(200).json({success: true, message: "Logged out successfully"})
}

export const forgotPassword = async (req, res) => {
    const { Email } = req.body
    if (!Email) {
        res.status(400).json({success: false, message: "Email is required"})
    }
    const user = await User.findOne({ Email })
    if (!user) {
        return res.json({success: false, message: "Email not found"})
    }
    const resetToken = crypto.randomBytes(32).toString("hex")
    const hashedToken = crypto.createHash("sha256").update(resetToken).digest("hex")

    user.resetPasswordToken = hashedToken
    user.resetPasswordTokenExpires = Date.now() + 15 * 60 * 1000;

    await user.save()

    const resetLink = `${process.env.FRONTEND_URL}/auth/resetpassword.html?token=${resetToken}`

    await transporter.sendMail({
        from: `${process.env.EMAIL_USER}`,
        to: user.Email,
        subject: "Reset your Password",
        html: `<div style="font-family: Arial, sans-serif;
        max-width: 600px;
        margin: auto;
        padding: 30px;">
        <h2>Password Reset</h2>
        <p>Hello ${user.fullname},</p>
        <p>We received a request to reset your password. Click the button below to reset it:</p>
        <a href="${resetLink}" style="display: inline-block;
        padding: 12px 20px;
        background: #2563eb;
        color: white;
        text-decoration: none;
        border-radius: 6px;">Reset Password</a>
        <p>This link expires in 15 minutes.</p>
        <p>If you did not request this password reset, you can safely ingore this email.</p>
        </div>
        `
    })
    return res.status(200).json({success: true, message: "Reset password link sent to your email"})
}

export const resetPassword = async (req, res) => {
    try {
      const { token } = req.params
    const { password } = req.body
    
    if (!token) {
        return res.status(400).json({success: false, message: "invalid token or Token not found"})
    }
    if (!password) {
       return res.status(400).json({success: false, message: "Password is reqired"})
    }
    if (password.length < 8) {
      return res.status(400).json({success: false, message: "Password must be up to 8 characters"})
    }

    const hashedToken = crypto.createHash("sha256").update(token).digest("hex")

    const user = await User.findOne({resetPasswordToken: hashedToken, resetPasswordTokenExpires: { $gt: Date.now()}})

    if (!user) {
        return res.status(400).json({success: false, message: "reset Link is invalid or Expired"})
    }

    const hashedPassword = await bcrypt.hash(password, 10)

    user.password = hashedPassword
    user.resetPasswordToken = null
    user.resetPasswordTokenExpires = null
 
    await user.save()

    return res.status(200).json({success: true, message: "Password reset successfully"})
  } catch (error) {
        console.log(error)
       return res.status(500).json({success: false, message: "Internal server rror"})
    }
    
    
}
