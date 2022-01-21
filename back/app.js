const express = require('express');
const userRouter = require('./routes/user')
const authRouter = require('./routes/auth')
const db = require('./models')
const cors = require('cors')
const passport = require('passport')
const passportConfig = require('./passport')
const session = require('express-session')
const cookieParser = require('cookie-parser')
const dotenv = require('dotenv')
const path = require("path");
const morgan = require('morgan')
const hpp = require('hpp')
const helmet = require('helmet')
const bodyParser = require("express");
dotenv.config()

const app = express()

db.sequelize.sync()
    .then(() => {
        console.log('db connect')
    })
    .catch(console.error)

passportConfig()

app.use(helmet())

app.use(cors({
    origin:['http://localhost:3060','http://3.38.232.129','http://brmnmusic.com'],
    credentials: true,
}))
app.use('/',express.static(path.join(__dirname,'profileImages')))
app.use(express.json())
app.use(express.urlencoded({extended:true}))
app.use(cookieParser(process.env.COOKIE_SECRET))
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
if (process.env.NODE_ENV === 'production'){
    app.use(morgan('combined'))
    app.use(hpp())
}else{
    app.use(morgan('dev'))
}
app.use(session({
    saveUninitialized:false,
    resave:false,
    secret:process.env.COOKIE_SECRET,
    cookie:{
        httpOnly:true,
        secure:false,
        domain: process.env.NODE_ENV === 'production' && '.brmnmusic.com'
    }
}));
app.use(passport.initialize())
app.use(passport.session())

app.get('/',(req,res) => {
    res.send('hello brmn')
})


app.use('/user',userRouter)
app.use('/auth',authRouter)

app.get('/oauth', passport.authenticate('kakao'), function (req, res) {
    // 로그인 시작시 state 값을 받을 수 있음
    res.redirect('http://brmnmusic.com/project')
})

app.listen(80,() => {
    console.log("server open")
})
