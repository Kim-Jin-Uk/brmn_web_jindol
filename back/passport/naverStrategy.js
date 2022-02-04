const passport = require('passport');
const NaverStrategy = require('passport-naver-v2').Strategy;
const {User,Profile} = require('../models');
const dotenv = require('dotenv')
dotenv.config()

module.exports = () => {
    passport.use(new NaverStrategy({
        clientID: process.env.NAVER_API_KEY,
        clientSecret:process.env.NAVER_API_SECRET_KEY,
        callbackURL: 'http://api.brmnmusic.com/naver/oauth',
    }, async (accessToken, refreshToken, profile, done) => {
        try {
            console.log("naverprofilereq",profile)
            if (profile.email === undefined){
                done("error!!!!!!!!!!!!!!!!","error!!!!!!!!!")
            }else {
                const kakaoUser = await User.findOne({
                    where: { email: profile.email, provider: 'kakao'},
                })
                if (kakaoUser){
                    done(null,'kakao')
                }else {
                    const exUser = await User.findOne({
                        where: { email: profile.email, provider: 'naver'},
                    });
                    if (exUser) {
                        done(null, exUser);
                    } else {
                        const newUser = await User.create({
                            email: profile.email,
                            age: profile.age,
                            gender: profile.gender,
                            provider: 'naver',
                        });
                        await Profile.create({
                            userId:newUser.dataValues.id,
                            nickname:newUser.dataValues.email
                        })
                        done(null, newUser);
                    }
                }
            }
        } catch(error) {
            console.error(error);
            done(error);
        }
    }));
}
