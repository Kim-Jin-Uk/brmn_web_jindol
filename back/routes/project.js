const express = require('express')
const {isNotLoggendIn, isLoggendIn} = require("./middlewares");
const multer = require('multer')
const path = require("path");
const fs = require("fs");
const multerS3 = require('multer-s3')
const AWS = require('aws-sdk')
const {Project,ProjectDetail,Tag} = require("../models");

const router = express.Router()

try{
    fs.accessSync('projectImages')
}catch (e) {
    console.log('make profileImages directory')
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
    console.log(req.file.location)
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
            UserId:req.user.dataValues.id
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
                ProjectId:project.id
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

        //hashList lower case 처리하기
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

        const fullProject = await Project.findOne({
            where:{id:project.id},
            include:[{
                model:ProjectDetail,
            },{
                model:Tag
            }]
        })
        console.log(fullProject)
        res.status(200).send("ok")

    }catch (err){
        console.error(err)
        next(err)
    }

})


module.exports = router
