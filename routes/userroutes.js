import express from "express";
import { getallUsers, getLatestusers, deleteUser, getTotalUsers } from "../controllers/userscotrollers.js";
import { verifyToken } from "../middlewares/verifyToken.js";
import { verfyRole } from "../middlewares/verfyrole.js";
const Userroutes = express.Router()

Userroutes.get('/', verifyToken, verfyRole, getLatestusers)
Userroutes.get('/all', verifyToken, verfyRole, getallUsers)
Userroutes.delete('/:id', verifyToken, verfyRole, deleteUser)
Userroutes.get('/count', verifyToken, verfyRole, getTotalUsers)
export default Userroutes