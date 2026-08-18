import express from 'express'
import { deletePrayerrequest, totalPrayer, geteachprayer, getLasterPrayerrequest, getPrayerrequest, postPrayerrequest } from '../controllers/praycontollers.js'
import { verifyToken } from '../middlewares/verifyToken.js'
import { verfyRole } from '../middlewares/verfyrole.js'

const prayerRouter = express.Router()

prayerRouter.post('/creatprayer', postPrayerrequest)
prayerRouter.get('/getLatest', verifyToken, verfyRole, getLasterPrayerrequest)
prayerRouter.get('/getallprayer', verifyToken, verfyRole, getPrayerrequest)
prayerRouter.delete('/:id', verifyToken, verfyRole, deletePrayerrequest)
prayerRouter.get('/each/:id', verifyToken, verfyRole, geteachprayer)
prayerRouter.get('/totalprayer', verifyToken, verfyRole, totalPrayer)

export default prayerRouter