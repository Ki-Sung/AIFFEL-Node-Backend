var express = require('express');
var router = express.Router();

/* 메인페이지 */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

// 모든사용자 채팅하기 
router.get('/chat', function(req, res, next) {
  res.render('chat.ejs');
});

// 채팅방 기준 채팅하기 
router.get('/groupchat', function(req, res, next) {
  res.render('groupchat.ejs');
});

module.exports = router;
