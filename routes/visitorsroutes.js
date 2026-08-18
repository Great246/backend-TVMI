import express from 'express'
import { createvisitors, getMonthlyvisitors } from '../controllers/visitorscontrollers.js'
const visitorrouter = express.Router()

visitorrouter.post('/', createvisitors)
visitorrouter.get('/get', getMonthlyvisitors)

export default visitorrouter