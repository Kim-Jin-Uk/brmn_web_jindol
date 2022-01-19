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

router.post('/profile',async (req,res,next) => {
    try{
        const userData = await User.findOne({
            where:{
                email:req.body.id
            }
        })
        const userProfile = await Profile.findOne({
            where:{
                UserId:userData.dataValues.id
            }
        })

        res.status(200).json(userProfile)
    }catch (err){
        console.error(err)
        next(err)
    }

})

router.post('/profile/detail',async (req,res,next) => {
    try{
        const userData = await User.findOne({
            where:{
                email:req.body.id
            }
        })
        const userProfile = await Profile.findOne({
            where:{
                UserId:userData.dataValues.id
            },
            include:[
                {
                    model:ProfileDetail,
                    where:{visible_type:null}
                }
            ]
        })
        console.log(userProfile)
        res.status(200).json(userProfile)
    }catch (err){
        console.error(err)
        next(err)
    }

})

router.post('/update/myprofile',async (req,res,next) => {
    try{
        const userData = await User.findOne({
            where:{email:req.body.email}
        })
        const ProfileData = await Profile.findOne({
            where:{
                UserId:userData.dataValues.id
            }
        })
        await Profile.update({
            nickname:req.body.name,
            job:req.body.job,
            location:req.body.location,
            introduce:req.body.introduce,
            field:req.body.field,
            instagram_link:req.body.instagram,
            youtube_link:req.body.youtube,
            soundcloud_link:req.body.soundcloud,
            facebook_link:req.body.facebook,
            twitter_link:req.body.twitter,
        },{
            where:{UserId:userData.dataValues.id}
        })

        await ProfileDetail.update({
            visible_type: "none"
        },{
            where:{ProfileId:ProfileData.dataValues.id}
        })

        for (let i = 0; i < req.body.tech.length; i++) {
            let start_date = null
            let end_date = null
            if (req.body.tech[i].date.length > 1){
                if (req.body.tech[i].date.includes(" - ")){
                    start_date = req.body.tech[i].date.split(" - ")[0]
                    end_date = req.body.tech[i].date.split(" - ")[1]
                }else {
                    start_date = req.body.tech[i].date
                }
            }
            await ProfileDetail.create({
                title:req.body.tech[i].title,
                start_date:start_date,
                end_date:end_date,
                sub_title:req.body.tech[i].info,
                contents:req.body.tech[i].detail,
                detail_type:"technic",
                visible_type: null,
                ProfileId: ProfileData.dataValues.id
            })
        }
        for (let i = 0; i < req.body.equip.length; i++) {
            let start_date = null
            let end_date = null
            if (req.body.equip[i].date.length > 1){
                if (req.body.equip[i].date.includes(" - ")){
                    start_date = req.body.equip[i].date.split(" - ")[0]
                    end_date = req.body.equip[i].date.split(" - ")[1]
                }else {
                    start_date = req.body.equip[i].date
                }
            }
            await ProfileDetail.create({
                title:req.body.equip[i].title,
                start_date:start_date,
                end_date:end_date,
                sub_title:req.body.equip[i].info,
                contents:req.body.equip[i].detail,
                detail_type:"equipment",
                visible_type: null,
                ProfileId: ProfileData.dataValues.id
            })
        }
        for (let i = 0; i < req.body.career.length; i++) {
            let start_date = null
            let end_date = null
            if (req.body.career[i].date.length > 1){
                if (req.body.career[i].date.includes(" - ")){
                    start_date = req.body.career[i].date.split(" - ")[0]
                    end_date = req.body.career[i].date.split(" - ")[1]
                }else {
                    start_date = req.body.career[i].date
                }
            }
            await ProfileDetail.create({
                title:req.body.career[i].title,
                start_date:start_date,
                end_date:end_date,
                sub_title:req.body.career[i].info,
                contents:req.body.career[i].detail,
                detail_type:"career",
                visible_type: null,
                ProfileId: ProfileData.dataValues.id
            })
        }
        for (let i = 0; i < req.body.award.length; i++) {
            let start_date = null
            let end_date = null
            if (req.body.award[i].date.length > 1){
                if (req.body.award[i].date.includes(" - ")){
                    start_date = req.body.award[i].date.split(" - ")[0]
                    end_date = req.body.award[i].date.split(" - ")[1]
                }else {
                    start_date = req.body.award[i].date
                }
            }
            await ProfileDetail.create({
                title:req.body.award[i].title,
                start_date:start_date,
                end_date:end_date,
                sub_title:req.body.award[i].info,
                contents:req.body.award[i].detail,
                detail_type:"award",
                visible_type: null,
                ProfileId: ProfileData.dataValues.id
            })
        }
        for (let i = 0; i < req.body.edu.length; i++) {
            let start_date = null
            let end_date = null
            if (req.body.edu[i].date.length > 1){
                if (req.body.edu[i].date.includes(" - ")){
                    start_date = req.body.edu[i].date.split(" - ")[0]
                    end_date = req.body.edu[i].date.split(" - ")[1]
                }else {
                    start_date = req.body.edu[i].date
                }
            }
            await ProfileDetail.create({
                title:req.body.edu[i].title,
                start_date:start_date,
                end_date:end_date,
                sub_title:req.body.edu[i].info,
                contents:req.body.edu[i].detail,
                detail_type:"education",
                visible_type: null,
                ProfileId: ProfileData.dataValues.id
            })
        }
        for (let i = 0; i < req.body.create.length; i++) {
            let start_date = null
            let end_date = null
            if (req.body.create[i].date.length > 1){
                if (req.body.create[i].date.includes(" - ")){
                    start_date = req.body.create[i].date.split(" - ")[0]
                    end_date = req.body.create[i].date.split(" - ")[1]
                }else {
                    start_date = req.body.create[i].date
                }
            }
            await ProfileDetail.create({
                title:req.body.create[i].title,
                start_date:start_date,
                end_date:end_date,
                sub_title:req.body.create[i].info,
                contents:req.body.create[i].detail,
                detail_type:"create",
                visible_type: null,
                ProfileId: ProfileData.dataValues.id
            })
        }
        for (let i = 0; i < req.body.show.length; i++) {
            let start_date = null
            let end_date = null
            if (req.body.show[i].date.length > 1){
                if (req.body.show[i].date.includes(" - ")){
                    start_date = req.body.show[i].date.split(" - ")[0]
                    end_date = req.body.show[i].date.split(" - ")[1]
                }else {
                    start_date = req.body.show[i].date
                }
            }
            await ProfileDetail.create({
                title:req.body.show[i].title,
                start_date:start_date,
                end_date:end_date,
                sub_title:req.body.show[i].info,
                contents:req.body.show[i].detail,
                detail_type:"show",
                visible_type: null,
                ProfileId: ProfileData.dataValues.id
            })
        }

        res.status(200).send("ok")

    }catch (err){
        console.error(err)
        next(err)
    }

})

module.exports = router

