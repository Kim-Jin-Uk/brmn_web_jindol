const express = require('express');
const passport = require('passport');

const router = express.Router();

router.get('/kakao', passport.authenticate('kakao', {
    failureRedirect: '/', // 실패했을 경우 리다이렉트 경로
}));

router.get('/naver', passport.authenticate('naver', {
    authType: 'reprompt',
    failureRedirect: '/', // 실패했을 경우 리다이렉트 경로
}));

module.exports = router;
