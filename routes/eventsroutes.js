import express from "express";
import { createEvent, deleteevents, editevent, getlatestevent, getspectailEvents, getwebEvent, geteachEvent } from "../controllers/eventscontrollers.js";
import upload from "../middlewares/upload.js";
import { verifyToken } from "../middlewares/verifyToken.js";
import { verfyRole } from '../middlewares/verfyrole.js'

const eventroutes = express.Router()

eventroutes.post('/create', verifyToken, verfyRole, upload.single("image"), createEvent)
eventroutes.put('/:id', verifyToken, verfyRole, upload.single("image"), editevent)
eventroutes.get('/', getwebEvent)
eventroutes.get('/latest', verifyToken, verfyRole, getlatestevent)
eventroutes.get('/allspecialeventes', verifyToken, verfyRole, getspectailEvents)
eventroutes.delete('/:id', verifyToken, verfyRole, deleteevents)
eventroutes.get('/each/events/:id', verifyToken, verfyRole, geteachEvent)

export default eventroutes 