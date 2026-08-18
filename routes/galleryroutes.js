import express from 'express'
import { createGallery, deleteGallery, getadminGallery, getwebGallery } from '../controllers/gallerycontrollers.js'
import { verifyToken } from '../middlewares/verifyToken.js'
import { verfyRole } from '../middlewares/verfyrole.js'
import upload from '../middlewares/upload.js'

const galleryRouter = express.Router()

galleryRouter.post('/create', verifyToken, verfyRole, upload.array("images", 10), createGallery)
galleryRouter.get('/admGallery', verifyToken, verfyRole, getadminGallery)
galleryRouter.get('/webGallery', getwebGallery)
galleryRouter.delete('/:id', verifyToken, verfyRole, deleteGallery)

export default galleryRouter