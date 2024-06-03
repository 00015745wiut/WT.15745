const express = require('express')
const home_router = require('./home')

const router = express.Router()

router.use('/', home_router)
module.exports = router
