const express = require('express')
const {isNotLoggendIn, isLoggendIn} = require("./middlewares");
const multer = require('multer')
const path = require("path");
const fs = require("fs");
const {Op} = require('sequelize')
const multerS3 = require('multer-s3')
const AWS = require('aws-sdk')
const {Project,ProjectDetail,Tag, User, Profile} = require("../models");

const router = express.Router()

try{
    fs.accessSync('projectImages')
}catch (e) {
    fs.mkdirSync('projectImages')
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
            cb(null,`project/${Date.now()}_${path.basename(file.originalname)}`)
        }
    }),
    limits:{fileSize:20*1024*1024},
})

router.post('/upload/image',isLoggendIn, upload.single('projectImage'), (req,res,next)=>{
    res.send({
        fileName: req.file.location
    });
})

router.post('/upload',isLoggendIn,async (req,res,next) => {
    try{
        const mainText = req.body.mainText
        const title = req.body.title
        const field = req.body.field
        const thumb_img = req.body.image
        const copyright = req.body.copyright
        const hashList = req.body.hashList
        const techList = req.body.techList

        const project = await Project.create({
            title:title,
            thumb_img:thumb_img,
            copyright:copyright,
            view_count:0,
            userId:req.user.dataValues.id
        })

        for (let i = 0; i < mainText.length; i++) {
            let text = mainText[i]
            let type = "text"
            if (text.substring(0,6) === "image:"){
                type = "image"
                text = text.substring(6)
            }
            if (text.substring(0,8) === "youtube:"){
                type = "youtube"
                text = text.substring(8)
            }
            await ProjectDetail.create({
                contents:text,
                detail_type:type,
                projectId:project.id
            })
        }

        Array.from(new Set(field))
        const result1 = await Promise.all(field.map((tag) => Tag.findOrCreate({
            where:{
                tag_name:tag.toLowerCase(),
                tag_type:"field"
            },
        })))
        await project.addTags(result1.map((v) => v[0]))

        Array.from(new Set(hashList))
        const result2 = await Promise.all(hashList.map((tag) => Tag.findOrCreate({
            where:{
                tag_name:tag.toLowerCase(),
                tag_type:"hash"
            },
        })))
        await project.addTags(result2.map((v) => v[0]))

        Array.from(new Set(techList))
        const result3 = await Promise.all(techList.map((tag) => Tag.findOrCreate({
            where:{
                tag_name:tag.toLowerCase(),
                tag_type:"tech"
            },
        })))
        await project.addTags(result3.map((v) => v[0]))

        res.status(200).send("ok")

    }catch (err){
        console.error(err)
        next(err)
    }

})

router.post('/load',async (req,res,next) => {
    try{
        let fullProjectList = []
        if (req.body.email){
            const userData = await User.findOne({
                where:{
                    email:req.body.email
                }
            })
            const userProfile = await Profile.findOne({
                where:{userId:userData.dataValues.id}
            })
            let where ={
                userId:userData.dataValues.id,
                visible_type:null
            }

            if (req.body.lastId){
                console.log("LAST_ID",req.body.lastId)
                if (parseInt(req.body.lastId, 10)) {
                    where.id = { [Op.lt]: parseInt(req.body.lastId, 10)}
                }else {
                    console.log('else')
                }
            }

            const projectList = await Project.findAll({
                where,
                limit:50,
                order: [
                    ['createdAt', 'DESC'],
                    ['id', 'DESC'],
                ],
            })
            for (let i = 0; i < projectList.length; i++) {
                const project = projectList[i].dataValues
                const user = userProfile.dataValues
                const projectItem = {
                    id:project.id,
                    title:project.title,
                    imgUrl:project.thumb_img,
                    profImg:user.profile_img,
                    nickname:user.nickname,
                    email:req.body.email
                }
                fullProjectList.push(projectItem)
            }
        return res.status(200).json(fullProjectList)
        }
        else if (req.body.checker){
            if (req.body.checker === 'n1'){
                let where = {
                    visible_type:null
                }
                if (req.body.lastId){
                    console.log("LAST_ID",req.body.lastId)
                    if (parseInt(req.body.lastId, 10)) {
                        where.id = { [Op.lt]: parseInt(req.body.lastId, 10)}
                    }else {
                        console.log('else')
                    }
                }

                const projectList = await Project.findAll({
                    where,
                    limit:50,
                    order: [
                        ['createdAt', 'DESC'],
                        ['id', 'DESC'],
                    ],
                    include: [{
                        model: User,
                        attributes: ['email'],
                        include: [{
                            model: Profile,
                            attributes: ['nickname','profile_img'],
                        }]
                    }]
                })
                for (let i = 0; i < projectList.length; i++) {
                    const project = projectList[i].dataValues
                    try{
                        const projectItem = {
                            id:project.id,
                            title:project.title,
                            imgUrl:project.thumb_img,
                            profImg:project.user.dataValues.profile.dataValues.profile_img,
                            nickname:project.user.dataValues.profile.dataValues.nickname,
                            email:project.user.dataValues.email
                        }
                        fullProjectList.push(projectItem)
                    }catch (e){
                        continue
                    }
                }
                return res.status(200).json(fullProjectList)
            }
            if (req.body.checker === 'n2'){
                let where = {
                    visible_type:null
                }
                if (req.body.lastId){
                    console.log("LAST_ID",req.body.lastId)
                    if (parseInt(req.body.lastId, 10)) {
                        where.id = { [Op.lt]: parseInt(req.body.lastId, 10)}
                    }else {
                        console.log('else')
                    }
                }

                const projectList = await Project.findAll({
                    where,
                    limit:50,
                    order: [
                        ['createdAt', 'DESC'],
                        ['id', 'DESC'],
                    ],
                    include: [{
                        model: User,
                        attributes: ['email'],
                        include: [{
                            model: Profile,
                            attributes: ['nickname','profile_img'],
                        }]
                    },{
                        model:Tag
                    }]
                })
                for (let i = 0; i < projectList.length; i++) {
                    const project = projectList[i].dataValues
                    try{
                        let check = false
                        for (let j = 0; j < project.tags.length; j++) {
                            const tag = project.tags[j]
                            if (tag.dataValues.tag_type === 'field'){
                                if (tag.dataValues.tag_name === "보컬"){
                                    check = true
                                }
                            }
                        }
                        if (check){
                            const projectItem = {
                                id:project.id,
                                title:project.title,
                                imgUrl:project.thumb_img,
                                profImg:project.user.dataValues.profile.dataValues.profile_img,
                                nickname:project.user.dataValues.profile.dataValues.nickname,
                                email:project.user.dataValues.email
                            }
                            fullProjectList.push(projectItem)
                        }
                    }catch (e){
                        continue
                    }
                }
                return res.status(200).json(fullProjectList)
            }
            if (req.body.checker === 'n3'){
                let where = {
                    visible_type:null
                }
                if (req.body.lastId){
                    console.log("LAST_ID",req.body.lastId)
                    if (parseInt(req.body.lastId, 10)) {
                        where.id = { [Op.lt]: parseInt(req.body.lastId, 10)}
                    }else {
                        console.log('else')
                    }
                }

                const projectList = await Project.findAll({
                    where,
                    limit:50,
                    order: [
                        ['createdAt', 'DESC'],
                        ['id', 'DESC'],
                    ],
                    include: [{
                        model: User,
                        attributes: ['email'],
                        include: [{
                            model: Profile,
                            attributes: ['nickname','profile_img'],
                        }]
                    },{
                        model:Tag
                    }]
                })
                for (let i = 0; i < projectList.length; i++) {
                    const project = projectList[i].dataValues
                    try{
                        let check = false
                        for (let j = 0; j < project.tags.length; j++) {
                            const tag = project.tags[j]
                            if (tag.dataValues.tag_type === 'field'){
                                if (tag.dataValues.tag_name === "촬영편집"){
                                    check = true
                                }
                            }
                        }
                        if (check){
                            const projectItem = {
                                id:project.id,
                                title:project.title,
                                imgUrl:project.thumb_img,
                                profImg:project.user.dataValues.profile.dataValues.profile_img,
                                nickname:project.user.dataValues.profile.dataValues.nickname,
                                email:project.user.dataValues.email
                            }
                            fullProjectList.push(projectItem)
                        }
                    }catch (e){
                        continue
                    }
                }
                return res.status(200).json(fullProjectList)
            }
            if (req.body.checker === 'n4'){
                let where = {
                    visible_type:null
                }
                if (req.body.lastId){
                    console.log("LAST_ID",req.body.lastId)
                    if (parseInt(req.body.lastId, 10)) {
                        where.id = { [Op.lt]: parseInt(req.body.lastId, 10)}
                    }else {
                        console.log('else')
                    }
                }

                const projectList = await Project.findAll({
                    where,
                    limit:50,
                    order: [
                        ['createdAt', 'DESC'],
                        ['id', 'DESC'],
                    ],
                    include: [{
                        model: User,
                        attributes: ['email'],
                        include: [{
                            model: Profile,
                            attributes: ['nickname','profile_img'],
                        }]
                    },{
                        model:Tag
                    }]
                })
                for (let i = 0; i < projectList.length; i++) {
                    const project = projectList[i].dataValues
                    try{
                        let check = false
                        for (let j = 0; j < project.tags.length; j++) {
                            const tag = project.tags[j]
                            if (tag.dataValues.tag_type === 'field'){
                                if (tag.dataValues.tag_name === "사운드"){
                                    check = true
                                }
                            }
                        }
                        if (check){
                            const projectItem = {
                                id:project.id,
                                title:project.title,
                                imgUrl:project.thumb_img,
                                profImg:project.user.dataValues.profile.dataValues.profile_img,
                                nickname:project.user.dataValues.profile.dataValues.nickname,
                                email:project.user.dataValues.email
                            }
                            fullProjectList.push(projectItem)
                        }
                    }catch (e){
                        continue
                    }
                }
                return res.status(200).json(fullProjectList)
            }
            if (req.body.checker === 'n5'){
                let where = {
                    visible_type:null
                }
                if (req.body.lastId){
                    console.log("LAST_ID",req.body.lastId)
                    if (parseInt(req.body.lastId, 10)) {
                        where.id = { [Op.lt]: parseInt(req.body.lastId, 10)}
                    }else {
                        console.log('else')
                    }
                }

                const projectList = await Project.findAll({
                    where,
                    limit:50,
                    order: [
                        ['createdAt', 'DESC'],
                        ['id', 'DESC'],
                    ],
                    include: [{
                        model: User,
                        attributes: ['email'],
                        include: [{
                            model: Profile,
                            attributes: ['nickname','profile_img'],
                        }]
                    },{
                        model:Tag
                    }]
                })
                for (let i = 0; i < projectList.length; i++) {
                    const project = projectList[i].dataValues
                    try{
                        let check = false
                        for (let j = 0; j < project.tags.length; j++) {
                            const tag = project.tags[j]
                            if (tag.dataValues.tag_type === 'field'){
                                if (tag.dataValues.tag_name === "기획"){
                                    check = true
                                }
                            }
                        }
                        if (check){
                            const projectItem = {
                                id:project.id,
                                title:project.title,
                                imgUrl:project.thumb_img,
                                profImg:project.user.dataValues.profile.dataValues.profile_img,
                                nickname:project.user.dataValues.profile.dataValues.nickname,
                                email:project.user.dataValues.email
                            }
                            fullProjectList.push(projectItem)
                        }
                    }catch (e){
                        continue
                    }
                }
                return res.status(200).json(fullProjectList)
            }
            if (req.body.checker === 'n6'){
                let where = {
                    visible_type:null
                }
                if (req.body.lastId){
                    console.log("LAST_ID",req.body.lastId)
                    if (parseInt(req.body.lastId, 10)) {
                        where.id = { [Op.lt]: parseInt(req.body.lastId, 10)}
                    }else {
                        console.log('else')
                    }
                }

                const projectList = await Project.findAll({
                    where,
                    limit:50,
                    order: [
                        ['createdAt', 'DESC'],
                        ['id', 'DESC'],
                    ],
                    include: [{
                        model: User,
                        attributes: ['email'],
                        include: [{
                            model: Profile,
                            attributes: ['nickname','profile_img'],
                        }]
                    },{
                        model:Tag
                    }]
                })
                for (let i = 0; i < projectList.length; i++) {
                    const project = projectList[i].dataValues
                    try{
                        let check = false
                        for (let j = 0; j < project.tags.length; j++) {
                            const tag = project.tags[j]
                            if (tag.dataValues.tag_type === 'field'){
                                if (tag.dataValues.tag_name === "디자인"){
                                    check = true
                                }
                            }
                        }
                        if (check){
                            const projectItem = {
                                id:project.id,
                                title:project.title,
                                imgUrl:project.thumb_img,
                                profImg:project.user.dataValues.profile.dataValues.profile_img,
                                nickname:project.user.dataValues.profile.dataValues.nickname,
                                email:project.user.dataValues.email
                            }
                            fullProjectList.push(projectItem)
                        }
                    }catch (e){
                        continue
                    }
                }
                return res.status(200).json(fullProjectList)
            }
            if (req.body.checker === 'n7'){
                let where = {
                    visible_type:null
                }
                if (req.body.lastId){
                    console.log("LAST_ID",req.body.lastId)
                    if (parseInt(req.body.lastId, 10)) {
                        where.id = { [Op.lt]: parseInt(req.body.lastId, 10)}
                    }else {
                        console.log('else')
                    }
                }

                const projectList = await Project.findAll({
                    where,
                    limit:50,
                    order: [
                        ['createdAt', 'DESC'],
                        ['id', 'DESC'],
                    ],
                    include: [{
                        model: User,
                        attributes: ['email'],
                        include: [{
                            model: Profile,
                            attributes: ['nickname','profile_img'],
                        }]
                    },{
                        model:Tag
                    }]
                })
                for (let i = 0; i < projectList.length; i++) {
                    const project = projectList[i].dataValues
                    try{
                        let check = true
                        for (let j = 0; j < project.tags.length; j++) {
                            const tag = project.tags[j]
                            if (tag.dataValues.tag_type === 'field'){
                                if (
                                    tag.dataValues.tag_name === "보컬" ||
                                    tag.dataValues.tag_name === "촬영편집" ||
                                    tag.dataValues.tag_name === "사운드" ||
                                    tag.dataValues.tag_name === "기획" ||
                                    tag.dataValues.tag_name === "디자인"
                                ){
                                    check = false
                                }
                            }
                        }
                        if (check){
                            const projectItem = {
                                id:project.id,
                                title:project.title,
                                imgUrl:project.thumb_img,
                                profImg:project.user.dataValues.profile.dataValues.profile_img,
                                nickname:project.user.dataValues.profile.dataValues.nickname,
                                email:project.user.dataValues.email
                            }
                            fullProjectList.push(projectItem)
                        }
                    }catch (e){
                        continue
                    }
                }
                return res.status(200).json(fullProjectList)
            }
        }
        res.status(200).send("ok")
    }catch (err){
        console.error(err)
        next(err)
    }

})

router.post('/load/detail',async (req,res,next) => {
    try{
        const project = await Project.findOne({
            where:{
                id:req.body.id,
                visible_type:null
            },
            attributes: ['id', 'title','view_count','copyright','updatedAt','thumb_img'],
            include:[{
                model:ProjectDetail,
                where:{visible_type:null},
                order:['id','ASC'],
                attributes: ['contents', 'detail_type'],
            },{
                model:Tag,
                where:{visible_type:null},
                attributes: ['tag_name', 'tag_type'],
            },{
                model:User,
                attributes: ['id', 'email'],
                include:{
                    model:Profile,
                    attributes: ['nickname', 'profile_img','job'],
                }
            }]
        })
        console.log("errorCheck",project)
        res.status(200).json(project.dataValues)
    }catch (err){
        console.error(err)
        next(err)
    }

})

router.post('/add/viewcount',async (req,res,next) => {
    try{
        const project = await Project.findOne({
            where:{id:req.body.id}
        })
        const viewcount = project.view_count + 1
        await Project.update({
            view_count:viewcount,
        },{
            where:{id:req.body.id}
        })
        res.status(200).send("ok")
    }catch (err){
        console.error(err)
        next(err)
    }

})

router.post('/delete',async (req,res,next) => {
    try{
        await Project.update({
            visible_type: "none",
        },{
            where:{id:req.body.id}
        })
        await ProjectDetail.update({
            visible_type: "none",
        },{
            where:{projectId:req.body.id}
        })
        res.status(200).send("ok")
    }catch (err){
        console.error(err)
        next(err)
    }

})

router.post('/update',isLoggendIn,async (req,res,next) => {
    try{
        const id = req.body.id
        const mainText = req.body.mainText
        const title = req.body.title
        const field = req.body.field
        const thumb_img = req.body.image
        const copyright = req.body.copyright
        const hashList = req.body.hashList
        const techList = req.body.techList

        const originProject = await Project.findOne({
            where:{id:id}
        })

        await Project.update({
            visible_type: "none",
        },{
            where:{id:req.body.id}
        })
        await ProjectDetail.update({
            visible_type: "none",
        },{
            where:{projectId:req.body.id}
        })

        const project = await Project.create({
            title:title,
            thumb_img:thumb_img,
            copyright:copyright,
            view_count:originProject.dataValues.view_count,
            userId:req.user.dataValues.id,
            createdAt:originProject.dataValues.createdAt
        })

        for (let i = 0; i < mainText.length; i++) {
            let text = mainText[i]
            let type = "text"
            if (text.substring(0,6) === "image:"){
                type = "image"
                text = text.substring(6)
            }
            if (text.substring(0,8) === "youtube:"){
                type = "youtube"
                text = text.substring(8)
            }
            await ProjectDetail.create({
                contents:text,
                detail_type:type,
                projectId:project.id
            })
        }

        Array.from(new Set(field))
        const result1 = await Promise.all(field.map((tag) => Tag.findOrCreate({
            where:{
                tag_name:tag.toLowerCase(),
                tag_type:"field"
            },
        })))
        await project.addTags(result1.map((v) => v[0]))

        Array.from(new Set(hashList))
        const result2 = await Promise.all(hashList.map((tag) => Tag.findOrCreate({
            where:{
                tag_name:tag.toLowerCase(),
                tag_type:"hash"
            },
        })))
        await project.addTags(result2.map((v) => v[0]))

        Array.from(new Set(techList))
        const result3 = await Promise.all(techList.map((tag) => Tag.findOrCreate({
            where:{
                tag_name:tag.toLowerCase(),
                tag_type:"tech"
            },
        })))
        await project.addTags(result3.map((v) => v[0]))

        let fullProjectList = []
        const userData = await User.findOne({
            where:{
                email:req.body.email
            }
        })
        const userProfile = await Profile.findOne({
            where:{userId:userData.dataValues.id}
        })

        const projectList = await Project.findAll({
            where:{
                userId:userData.dataValues.id,
                visible_type:null
            },
            order: [
                ['createdAt', 'DESC'],
            ],
        })
        for (let i = 0; i < projectList.length; i++) {
            const project = projectList[i].dataValues
            const user = userProfile.dataValues
            const projectItem = {
                id:project.id,
                title:project.title,
                imgUrl:project.thumb_img,
                profImg:user.profile_img,
                nickname:user.nickname,
                email:req.body.email
            }
            fullProjectList.push(projectItem)
        }
        return res.status(200).json(fullProjectList)
    }catch (err){
        console.error(err)
        next(err)
    }

})


module.exports = router
