import express from 'express'
import { createcontact, deleteContact, getContactbyid, getContacts, getNumbercontact, getLatestMessage, fivehoursagomess } from '../controllers/contactcontrollers.js'
import { verifyToken } from '../middlewares/verifyToken.js'
import { verfyRole } from '../middlewares/verfyrole.js'
const contactRouter = express.Router()

contactRouter.post('/createcontact', createcontact)
contactRouter.get('/getcontact', verifyToken, verfyRole, getContacts)
contactRouter.get('/get/:id', verifyToken, verfyRole, getContactbyid)
contactRouter.delete('/:id', verifyToken, verfyRole, deleteContact)
contactRouter.get('/number', verifyToken, verfyRole, getNumbercontact)
contactRouter.get('/latest', verifyToken, verfyRole, getLatestMessage)
contactRouter.get('/fivehours', verifyToken, verfyRole, fivehoursagomess)

export default contactRouter