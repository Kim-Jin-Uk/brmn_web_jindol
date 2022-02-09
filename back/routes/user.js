const express = require('express')
const {User,Profile,ProfileDetail,Report,Notice,Log} = require('../models')
const {isNotLoggendIn, isLoggendIn} = require("./middlewares");
const passport = require("passport");
const multer = require('multer')
const path = require("path");
const fs = require("fs");
const multerS3 = require('multer-s3')
const AWS = require('aws-sdk')
const requestIp = require('request-ip');

const router = express.Router()

try{
    fs.accessSync('profileImages')
}catch (e) {
    fs.mkdirSync('profileImages')
}
AWS.config.update({
    accessKeyId: process.env.S3_ACCESS_KEY_ID,
    secretAccessKey: process.env.S3_SECRET_ACCESS_KEY,
    region:'ap-northeast-2'
})
const upload = multer({
    storage: multerS3({
        s3: new AWS.S3(),
        bucket: 'brmnmusic-image-s3',
        key(req, file, cb){
            cb(null,`profile/${Date.now()}_${path.basename(file.originalname)}`)
        }
    }),
    limits:{fileSize:20*1024*1024},
})

router.post('/', async (req,res,next) => {
    try{
        const userData = await User.findOne({
            where:{
                email:req.body.id
            },
            include: [{
                model: User,
                as: 'Followings',
                attributes: ['id'],
            }, {
                model: User,
                as: 'Followers',
                attributes: ['id'],
            }]
        })
        let ip = requestIp.getClientIp(req);
        await Log.create({
            UserId:null,
            ip:ip,
            type:"get user",
            contents:req.body.id,
        })
        res.status(200).json(userData)
    }catch (err){
        try{
            let ip = requestIp.getClientIp(req);
            await Log.create({
                UserId:req.user.dataValues.id,
                ip:ip,
                type:"get user error",
                contents:err.message,
            })
            console.error(err)
            next(err)
        }catch (err) {
            console.error(err)
            next(err)
        }
    }
})

router.get('/login',async (req,res,next) => {
    if (req.isAuthenticated()){
        try{
            const userData = await User.findOne({
                where:{id:req.user.dataValues.id},
                attributes: ['email','agreement'],
                include: [{
                    model: User,
                    as: 'Followings',
                    attributes: ['id'],
                }, {
                    model: User,
                    as: 'Followers',
                    attributes: ['id'],
                }]
            })
            if (userData.agreement){
                let ip = requestIp.getClientIp(req);
                await Log.create({
                    UserId:req.user.dataValues.id,
                    ip:ip,
                    type:"login user (agreement)",
                    contents:req.user.dataValues.id,
                })
                return res.status(200).json(userData)
            }
            let ip = requestIp.getClientIp(req);
            await Log.create({
                UserId:null,
                ip:ip,
                type:"login user (not agreement)",
                contents:req.user.dataValues.id,
            })
            return res.status(200).json('not agreement')
        }catch (err){
            try{
                let ip = requestIp.getClientIp(req);
                await Log.create({
                    UserId:req.user.dataValues.id,
                    ip:ip,
                    type:"get login user error",
                    contents:err.message,
                })
                console.error(err)
                next(err)
            }catch (err) {
                console.error(err)
                next(err)
            }
        }
    }
    res.status(400).send('not login')
})

router.post('/logout',isLoggendIn,async (req,res,next) => {
    try{
        let ip = requestIp.getClientIp(req);
        await Log.create({
            UserId:req.user.dataValues.id,
            ip:ip,
            type:"logout user",
            contents:null,
        })
        req.logout()
        req.session.destroy()
        res.status(200).send('ok')
    }catch (err) {
        try{
            let ip = requestIp.getClientIp(req);
            await Log.create({
                UserId:req.user.dataValues.id,
                ip:ip,
                type:"logout user error",
                contents:err.message,
            })
            console.error(err)
            next(err)
        }catch (err) {
            console.error(err)
            next(err)
        }
    }

})

router.get('/agreement',isLoggendIn,async (req,res,next) => {
    try{
        const userData = await User.findOne({
            where:{id:req.user.dataValues.id}
        })
        let ip = requestIp.getClientIp(req);
        await Log.create({
            UserId:req.user.dataValues.id,
            ip:ip,
            type:"get agreement user",
            contents:req.user.dataValues.id,
        })
        res.status(200).json(userData.agreement)
    }catch (err){
        try{
            let ip = requestIp.getClientIp(req);
            await Log.create({
                UserId:req.user.dataValues.id,
                ip:ip,
                type:"get agreement user error",
                contents:err.message,
            })
            console.error(err)
            next(err)
        }catch (err) {
            console.error(err)
            next(err)
        }
    }
})

router.post('/agreement',isLoggendIn,async (req,res,next) => {
    try{
        let agreements = []
        if (req.body.c1){
            agreements.push("c1")
        }
        if (req.body.c2){
            agreements.push("c2")
        }
        if (req.body.c3){
            agreements.push("c3")
        }
        await User.update({
            agreement:agreements.join(", ")
        },{
            where:{id:req.user.dataValues.id}
        })
        let ip = requestIp.getClientIp(req);
        await Log.create({
            UserId:req.user.dataValues.id,
            ip:ip,
            type:"update agreement user",
            contents:agreements.join(", "),
        })
        res.status(200).send(agreements.join(", "))
    }catch (err){
        try{
            let ip = requestIp.getClientIp(req);
            await Log.create({
                UserId:req.user.dataValues.id,
                ip:ip,
                type:"update agreement user error",
                contents:err.message,
            })
            console.error(err)
            next(err)
        }catch (err) {
            console.error(err)
            next(err)
        }
    }
})

router.post('/profile',async (req,res,next) => {
    try{
        const userData = await User.findOne({
            where:{
                email:req.body.id
            },
            include: [{
                model: User,
                as: 'Followings',
                attributes: ['id'],
            }, {
                model: User,
                as: 'Followers',
                attributes: ['id'],
            }]
        })
        const userProfile = await Profile.findOne({
            where:{
                userId:userData.dataValues.id
            }
        })
        let ip = requestIp.getClientIp(req);
        await Log.create({
            UserId:null,
            ip:ip,
            type:"get profile user",
            contents:userData.dataValues.id,
        })
        res.status(200).json(userProfile)
    }catch (err){
        try{
            let ip = requestIp.getClientIp(req);
            await Log.create({
                UserId:null,
                ip:ip,
                type:"get profile user error",
                contents:err.message,
            })
            console.error(err)
            next(err)
        }catch (err) {
            console.error(err)
            next(err)
        }
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
                userId:userData.dataValues.id
            },
            include:[
                {
                    model:ProfileDetail,
                    where:{visible_type:null}
                }
            ]
        })
        let ip = requestIp.getClientIp(req);
        await Log.create({
            UserId:null,
            ip:ip,
            type:"get profile detail user",
            contents:userData.dataValues.id,
        })
        res.status(200).json(userProfile)
    }catch (err){
        try{
            let ip = requestIp.getClientIp(req);
            await Log.create({
                UserId:null,
                ip:ip,
                type:"get profile detail user error",
                contents:err.message,
            })
            console.error(err)
            next(err)
        }catch (err) {
            console.error(err)
            next(err)
        }
    }

})

router.post('/update/myprofile',isLoggendIn,async (req,res,next) => {
    try{
        const userData = await User.findOne({
            where:{email:req.body.email}
        })
        const ProfileData = await Profile.findOne({
            where:{
                userId:userData.dataValues.id
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
            where:{userId:userData.dataValues.id}
        })

        await ProfileDetail.update({
            visible_type: "none"
        },{
            where:{profileId:ProfileData.dataValues.id}
        })

        if (req.body.tech){
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
                    profileId: ProfileData.dataValues.id
                })
            }
        }
        if (req.body.equip){
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
                    profileId: ProfileData.dataValues.id
                })
            }
        }
        if (req.body.career){
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
                    profileId: ProfileData.dataValues.id
                })
            }
        }
        if (req.body.award){
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
                    profileId: ProfileData.dataValues.id
                })
            }
        }
        if (req.body.edu){
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
                    profileId: ProfileData.dataValues.id
                })
            }
        }
        if (req.body.create){
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
                    profileId: ProfileData.dataValues.id
                })
            }
        }
        if (req.body.show){
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
                    profileId: ProfileData.dataValues.id
                })
            }
        }
        let ip = requestIp.getClientIp(req);
        await Log.create({
            UserId:req.user.dataValues.id,
            ip:ip,
            type:"update profile user",
            contents:"nickname: " + req.body.name +
                ",job: " + req.body.job +
                ",location: " + req.body.location +
                ",introduce: " + req.body.introduce +
                ",field: " + req.body.field +
                ",instagram_link: " + req.body.instagram +
                ",youtube_link: " + req.body.youtube +
                ",soundcloud_link: " + req.body.soundcloud +
                ",facebook_link: " + req.body.facebook +
                ",twitter_link: " + req.body.twitter
        })
        res.status(200).send("ok")

    }catch (err){
        try{
            let ip = requestIp.getClientIp(req);
            await Log.create({
                UserId:req.user.dataValues.id,
                ip:ip,
                type:"update profile user error",
                contents:err.message,
            })
            console.error(err)
            next(err)
        }catch (err) {
            console.error(err)
            next(err)
        }
    }

})

router.post('/update/profile/default',isLoggendIn,async (req,res,next) => {
    try{
        const userData = await User.findOne({
            where:{
                email:req.body.id
            }
        })

        await Profile.update({
            profile_img:"https://brmnmusic-image-s3.s3.ap-northeast-2.amazonaws.com/brmn/profimg_default.svg"
        },{
            where:{userId:userData.dataValues.id}
        })

        const userProfile = await Profile.findOne({
            where:{
                userId:userData.dataValues.id
            }
        })
        let ip = requestIp.getClientIp(req);
        await Log.create({
            UserId:req.user.dataValues.id,
            ip:ip,
            type:"update profile image default",
            contents:null,
        })
        res.status(200).json(userProfile)
    }catch (err){
        try{
            let ip = requestIp.getClientIp(req);
            await Log.create({
                UserId:req.user.dataValues.id,
                ip:ip,
                type:"update profile image default error",
                contents:err.message,
            })
            console.error(err)
            next(err)
        }catch (err) {
            console.error(err)
            next(err)
        }
    }

})

router.post('/upload/profile/image',isLoggendIn, upload.single('profileImage'), async (req,res,next)=>{
    try{
        let ip = requestIp.getClientIp(req);
        await Log.create({
            UserId:req.user.dataValues.id,
            ip:ip,
            type:"upload profile image",
            contents:req.file.location,
        })
        res.send({
            fileName: req.file.location
        });
    }catch (err) {
        try{
            let ip = requestIp.getClientIp(req);
            await Log.create({
                UserId:req.user.dataValues.id,
                ip:ip,
                type:"upload profile image error",
                contents:err.message,
            })
            console.error(err)
            next(err)
        }catch (err) {
            console.error(err)
            next(err)
        }
    }

})

router.post('/update/profile/image',isLoggendIn, upload.none(), async (req,res,next)=>{
    try{
        await Profile.update({
            profile_img:req.body.fileName
        },{
            where:{userId:req.user.dataValues.id}
        })

        const userProfile = await Profile.findOne({
            where:{
                userId:req.user.dataValues.id
            }
        })
        let ip = requestIp.getClientIp(req);
        await Log.create({
            UserId:req.user.dataValues.id,
            ip:ip,
            type:"update profile image error",
            contents:req.body.fileName,
        })
        res.status(200).json(userProfile)
    }catch (err){
        try{
            let ip = requestIp.getClientIp(req);
            await Log.create({
                UserId:req.user.dataValues.id,
                ip:ip,
                type:"update profile image error",
                contents:err.message,
            })
            console.error(err)
            next(err)
        }catch (err) {
            console.error(err)
            next(err)
        }
    }
})

router.patch('/:userId/follow',isLoggendIn,async (req, res, next) => {
    try{
        const user = await User.findOne({
            where:{id:req.params.userId}
        })
        if (!user){
            return res.status(400).send('no user')
        }
        await user.addFollowers(req.user.id)
        let ip = requestIp.getClientIp(req);
        await Log.create({
            UserId:req.user.dataValues.id,
            ip:ip,
            type:"add follow user",
            contents:req.params.userId + " - " + req.user.id,
        })
        res.status(200).json({UserId:parseInt(req.params.userId,10)})
    }catch (err){
        try{
            let ip = requestIp.getClientIp(req);
            await Log.create({
                UserId:req.user.dataValues.id,
                ip:ip,
                type:"add follow user error",
                contents:err.message,
            })
            console.error(err)
            next(err)
        }catch (err) {
            console.error(err)
            next(err)
        }
    }
})

router.delete('/:userId/follow',isLoggendIn,async (req, res, next) => {
    try{
        const user = await User.findOne({
            where:{id:req.params.userId}
        })
        if (!user){
            return res.status(400).send('no user')
        }
        await user.removeFollowers(req.user.id)
        let ip = requestIp.getClientIp(req);
        await Log.create({
            UserId:req.user.dataValues.id,
            ip:ip,
            type:"remove follow user",
            contents:req.params.userId + " - " + req.user.id,
        })
        res.status(200).json({UserId:parseInt(req.params.userId,10)})
    }catch (err){
        try{
            let ip = requestIp.getClientIp(req);
            await Log.create({
                UserId:req.user.dataValues.id,
                ip:ip,
                type:"remove follow user error",
                contents:err.message,
            })
            console.error(err)
            next(err)
        }catch (err) {
            console.error(err)
            next(err)
        }
    }
})

router.post('/report',async (req,res,next) => {
    try{
        await Report.create({
            type:"report",
            name:req.body.name,
            phone_num:req.body.phone_num,
            email:req.body.email,
            contents:req.body.contents,
        })
        let ip = requestIp.getClientIp(req);
        await Log.create({
            UserId:null,
            ip:ip,
            type:"report user",
            contents:"name: " + req.body.name + ",phone_num: " + req.body.phone_num + ",email: " + req.body.email + ",contents: " + req.body.contents
        })
        res.status(200).send("ok")
    }catch (err){
        try{
            let ip = requestIp.getClientIp(req);
            await Log.create({
                UserId:null,
                ip:ip,
                type:"report user error",
                contents:err.message,
            })
            console.error(err)
            next(err)
        }catch (err) {
            console.error(err)
            next(err)
        }
    }

})

router.post('/question',async (req,res,next) => {
    try{
        await Report.create({
            type:"question",
            name:req.body.name,
            phone_num:req.body.phone_num,
            email:req.body.email,
            contents:req.body.contents,
        })
        let ip = requestIp.getClientIp(req);
        await Log.create({
            UserId:null,
            ip:ip,
            type:"question user",
            contents:"name: " + req.body.name + ",phone_num: " + req.body.phone_num + ",email: " + req.body.email + ",contents: " + req.body.contents
        })
        res.status(200).send("ok")
    }catch (err){
        try{
            let ip = requestIp.getClientIp(req);
            await Log.create({
                UserId:null,
                ip:ip,
                type:"question user error",
                contents:err.message,
            })
            console.error(err)
            next(err)
        }catch (err) {
            console.error(err)
            next(err)
        }
    }

})

router.post('/notice',async (req,res,next) => {
    try{
        const noticeList = await Notice.findAll({
            where:{type:"notice"},
            order: [
                ['updatedAt', 'DESC'],
            ],
        })
        let ip = requestIp.getClientIp(req);
        await Log.create({
            UserId:null,
            ip:ip,
            type:"get notice user",
            contents:null,
        })
        res.status(200).json(noticeList)
    }catch (err){
        try{
            let ip = requestIp.getClientIp(req);
            await Log.create({
                UserId:null,
                ip:ip,
                type:"get notice user error",
                contents:err.message,
            })
            console.error(err)
            next(err)
        }catch (err) {
            console.error(err)
            next(err)
        }
    }

})

router.post('/frequency',async (req,res,next) => {
    try{
        const frequencyList = await Notice.findAll({
            where:{type:"frequency"},
            order: [
                ['updatedAt', 'DESC'],
            ],
        })
        let ip = requestIp.getClientIp(req);
        await Log.create({
            UserId:null,
            ip:ip,
            type:"get frequency user",
            contents:null,
        })
        res.status(200).json(frequencyList)
    }catch (err){
        try{
            let ip = requestIp.getClientIp(req);
            await Log.create({
                UserId:null,
                ip:ip,
                type:"get frequency user error",
                contents:err.message,
            })
            console.error(err)
            next(err)
        }catch (err) {
            console.error(err)
            next(err)
        }
    }

})


module.exports = router

