const express = require('express')
const plant_router = require('./plant')

const router = express.Router()

router.use('/plant', plant_router)

module.exports = router
