const passport = require('passport')
const kakao = require('./kakaoStrategy')
const {User} = require('../models')

module.exports = () => {
    passport.serializeUser((user, done) => {
        done(null, user.id)
    })

    passport.deserializeUser(async (id, done) => {
        try{
            const user = await User.findOne({where:{id}})
            done(null, user)
        }catch (err){
            console.error(err)
            done(err)
        }
    })

    kakao()
}
