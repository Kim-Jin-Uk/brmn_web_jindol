const express = require('express')
const {User} = require('../models')

const router = express.Router()

router.post('/', (req,res,next) => {
    res.status(200).send('ok')
})

module.exports = router

