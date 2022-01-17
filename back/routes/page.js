const express = require('express');
const passport = require('passport');

const router = express.Router();

// 카카오 개발 앱 설정 중 Redirect URI에 적는 주소
// GET /ouath
// 카카오 로그인 페이지에서 로그인 후 아래에서 카카오 Strategy가 실행되며,
// kakao.js 모듈 실행
router.get('/ouath', passport.authenticate('kakao', {
    failureRedirect: '/',
}), (req, res) => {
    res.redirect('http://localhost:3060'); // 다 완료되면 리다이렉트 URL
});

module.exports = router;
