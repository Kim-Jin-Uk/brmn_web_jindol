const passport = require('passport');
const KakaoStrategy = require('passport-kakao').Strategy;
const User = require('../models/user');

// 카카옥 로그인 전략
module.exports = () => {
    passport.use(new KakaoStrategy({
        clientID: process.env.KAKAO_API_KEY, // 이것이 REST API KEY
        callbackURL: 'http://localhost:3065/oauth', // Redirect URI
    }, async (accessToken, refreshToken, profile, done) => {
        // accessToken, refreshToken - OAUTH2 를 공부해야한다.
        // 그래서 여기선 사용하지 않는다.
        console.log(accessToken)
        console.log(refreshToken)
        console.log('kakao profile', profile); // 꼭 확인해보자!
        try {
            const exUser = await User.findOne({ // 카카오 가입자 찾기.
                where: { email: profile._json.kakao_account.email, provider: 'kakao'},
            });
            if (exUser) { // 가입자 있으면? 로그인 성공
                done(null, exUser);
            } else { // 없으면? 생성 후 로그인 시키기
                const newUser = await User.create({
                    // id - Number이며, 사용자의 kakao id
                    // _json - 사용자 정보 조회로 얻은 json 원본 데이터
                    email: profile._json && profile._json.kakao_account.email,
                    provider: 'kakao', // 새로 추가한 가입 출처 컬럼
                });
                done(null, newUser);
            }
        } catch(error) {
            console.error(error);
            done(error);
        }
    }));
}
