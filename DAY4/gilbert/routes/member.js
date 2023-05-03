// 회원 정보 관리용 모든 웹페이지에 대한 요청과 응답을 처리하는 라우팅 파일 
// member.js 라우터 파일의 기초 호출주소체게는 "localhost:3000/member"

// express 웹프레임워크를 참조
var express = require('express');

// express 객체의 Router()메소드(기능)을 호출해서 사용자 요청과 응답을 처리할 라우터 객체를 생성
var router = express.Router();

// 회원 신규가입 웹페이지 요청 및 응답 처리 라우팅 메소드 
// http://localhost:3000/member/entry
router.get('/entry', function(req, res){

     // res 객체는 웹서버에서 웹브라우저로 전달할 기능을 정의 
    res.render('entry.ejs');

});

// 회원 로그인 웹페이지 
// http://localhost:3000/member/login
router.get('/login', function(req, res){

     // res 객체는 웹서버에서 웹브라우저로 전달할 기능을 정의 
    res.render('login.ejs');
});

// 회원 정보 확인 웹페이지 요청 및 응답 라우팅 
// http://localhost:3000/member/profile
router.get('/profile', function(req, res){

     // res 객체는 웹서버에서 웹브라우저로 전달할 기능을 정의 
    res.render('memberprofile.ejs');
});


// Router file은 해당 Router file에 정의된 router를 외부로 반환
module.exports = router;