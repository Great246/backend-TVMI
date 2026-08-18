import crypto from 'crypto'
import Visitor from '../models/visitorsmodel.js'

export const createvisitors = async (req, res) => {
    try {
        let visitorId = req.cookies.visitorId
    if (!visitorId) {
            visitorId = crypto.randomUUID()
            res.cookie("visitorId", visitorId, {
                httpOnly: true,
                secure: false,
                samSite: "lax",
                maxAge: 1000 * 60 * 60 * 24 * 365
            })
        }
        const now = new Date()
        const visitDate = now.toISOString().split("T")[0]
        try {
            await Visitor.create({
                visitorId, visitDate
            })
            res.status(201).json({counted: true})
        } catch (error) {
            if (error.code === 11000) {
                return res.status(200).json({counted: false})
            }
            throw error
        }

    } catch (error) {
        console.log(error)
        res.status(500).json({success: false, message: "Internal server error"})
    }
}
export const getMonthlyvisitors = async (req, res) => {
    try {
        const now = new Date()
        const year = now.getFullYear()
        const month = String(now.getMonth() + 1).padStart(2, "0")
        const startofmonth = `${year}-${month}-01`
        const nextofmonth = new Date(year, now.getMonth() + 1)
        const nextyear = nextofmonth.getFullYear()
        const nextofmonthnumber = String(nextofmonth.getMonth() + 1).padStart(2, "0")
        const startofnextofmonth = `${nextyear}-${nextofmonthnumber}-01`
        const monthlyVisitors = await Visitor.countDocuments({
            visitDate: {
                $gte: startofmonth,
                $lt: startofnextofmonth
            }
        })
        return res.status(200).json(monthlyVisitors)
    } catch (error) {
        console.log(error)
        res.status(500).json({success: false, message: "Internal server error"})
    }
}