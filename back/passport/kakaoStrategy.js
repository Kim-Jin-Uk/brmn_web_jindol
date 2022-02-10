const passport = require('passport');
const KakaoStrategy = require('passport-kakao').Strategy;
const {User,Profile} = require('../models');
const dotenv = require('dotenv')
dotenv.config()

module.exports = () => {
    passport.use(new KakaoStrategy({
        clientID: process.env.KAKAO_API_KEY,
        callbackURL: 'https://api.brmnmusic.com/oauth',
    }, async (accessToken, refreshToken, profile, done) => {
        try {
            console.log("kakaoprofile",profile)
            if (profile._json.kakao_account.email === undefined){
                done("error!!!!!!!!!!!!!!!!","error!!!!!!!!!")
            }else {
                const naverUser = await User.findOne({
                    where: { email: profile._json.kakao_account.email, provider: 'naver'},
                })
                if (naverUser){
                    done(null,'naver')
                }else {
                    const exUser = await User.findOne({
                        where: { email: profile._json.kakao_account.email, provider: 'kakao'},
                    });
                    if (exUser) {
                        done(null, exUser);
                    } else {
                        const newUser = await User.create({
                            email: profile._json && profile._json.kakao_account.email,
                            age: profile._json && profile._json.kakao_account.age_range,
                            gender: profile._json && profile._json.kakao_account.gender,
                            provider: 'kakao',
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
