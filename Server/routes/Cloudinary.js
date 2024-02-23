const express = require('express')
const routes = express.Router()

// controllers

const {
    list,
    createImage,
    removeImage,
    uploadSlip,
    removeSlip,

} = require('../controllers/Cloudinary')
const { auth, adminCheck } = require('../Middleware/auth')

routes.post('/images', auth, adminCheck, createImage)
routes.post('/uploadsilp', auth, uploadSlip)
routes.post('/removesilp', auth, removeSlip)
routes.post('/removeimages', auth, adminCheck, removeImage)


module.exports = routes;