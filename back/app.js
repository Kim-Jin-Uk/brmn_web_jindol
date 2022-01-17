const express = require('express');
const userRouter = require('./routes/user')
const authRouter = require('./routes/auth')
const db = require('./models')
const cors = require('cors')
const passport = require('passport')
const passportConfig = require('./passport')
const session = require('express-session')
const cookieParser = require('cookie-parser')

const app = express()

db.sequelize.sync()
    .then(() => {
        console.log('db connect')
    })
    .catch(console.error)

passportConfig()

app.use(cors({
    origin:true,
    credentials: false,
}))
app.use(express.json())
app.use(express.urlencoded({extended:true}))
app.use(cookieParser(process.env.COOKIE_SECRET))
app.use(session({
    saveUninitialized:false,
    resave:false,
    secret:process.env.COOKIE_SECRET,
}));
app.use(passport.initialize())
app.use(passport.session())


app.use('/user',userRouter)
app.use('/auth',authRouter)

app.listen(3065,() => {
    console.log("server open")
})
