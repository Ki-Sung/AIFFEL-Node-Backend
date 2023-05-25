var express = require('express');
var router = express.Router();

/* 메인페이지 */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

/* 전체 서버 접속 사용자간 채팅 페이지 */
router.get('/chat', function(req, res, next) {
  res.render('chat.ejs');
});

/* 채팅방 사용자간 채팅 페이지  */
router.get('/groupchat', function(req, res, next) {
  res.render('groupchat.ejs');
});

module.exports = router;
