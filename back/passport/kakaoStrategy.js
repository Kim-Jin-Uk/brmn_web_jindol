const passport = require('passport');
const KakaoStrategy = require('passport-kakao').Strategy;
const {User,Profile} = require('../models');

module.exports = () => {
    passport.use(new KakaoStrategy({
        clientID: process.env.KAKAO_API_KEY,
        callbackURL: 'http://localhost:3065/oauth',
    }, async (accessToken, refreshToken, profile, done) => {
        try {
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
                    UserId:newUser.id
                })
                console.log(newUser)
                done(null, newUser);
            }
        } catch(error) {
            console.error(error);
            done(error);
        }
    }));
}
