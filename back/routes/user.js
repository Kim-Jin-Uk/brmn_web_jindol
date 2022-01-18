const express = require('express')
const {User,Profile,ProfileDetail} = require('../models')
const {isNotLoggendIn} = require("./middlewares");
const passport = require("passport");

const router = express.Router()

router.post('/', (req,res,next) => {
    res.status(200).send('ok')
})

router.get('/login',(req,res,next) => {
    if (req.isAuthenticated()){
        return res.status(200).json({email:req.user.dataValues.email})
    }
    res.status(400).send('not login')
})

router.post('/myprofile',async (req,res,next) => {
    try{
        const userData = await User.findOne({
            where:{email:req.body.id}
        })
        const userProfile = await Profile.findOne({
            where:{UserId:userData.dataValues.id},
            include:[
                {
                    model:ProfileDetail
                }
            ]
        })
        res.status(200).json(userProfile)
    }catch (err){
        console.error(err)
        next(err)
    }

})

module.exports = router

