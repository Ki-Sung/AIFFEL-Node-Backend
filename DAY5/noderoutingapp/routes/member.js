// member.js 라우터 파일 용도 - 각종 회원 정보 관리용 웹페이지에 대한 사용자 요청과 응답 처리 전용 라우터 파일 
// member.js 라우터 파일의 기본 접속주소경로는 localhost:3000/members/...
// member.js 라우터 파일내에 정의된 라우팅 메소드의 기본 주소경로는 localhost:3000/members/...

// express 웹프레임워크를 참조
var express = require('express');

// express 객체의 Router()메소드(기능)을 호출해서 사용자 요청과 응답을 처리할 라우터 객체를 생성
var router = express.Router();

// 라우팅 메소드 구현하기 

// 1. 회원가입 웹페이지 요청과 응답처리 라우팅 메소드
// localhost:3000/members/regist
// 클라이언트에서 get 방식으로 요청이 오면, 라우팅 메소드도 get() 메소드로 받아야함.
// 클라이언트에서 post 방식으로 요청이 오면, 라우팅 메소드도 post() 메소드로 받아야함.
// 클라이언트가 get 방식으로 요청한다는 것은 최초로 웹브라우저 주소창에 직접 url 주소를 입력해서 요청하는 경우 
router.get('/regist', function(req, res){

    // res 객체는 웹서버에서 웹브라우저로 전달할 기능을 정의 
    res.render('member/regist.ejs');
});

// 2. 회원 로그인 웹페이지 요청과 응답처리 라우팅 메소드
// ocalhost:3000/members/login
router.get('/login', function(req, res){

    // res 객체는 웹서버에서 웹브라우저로 전달할 기능을 정의 
    res.render('member/login');
});

// 3. 로그인 후 보여줄 사용자 프로필 웹페이지 요청과 응답처리 라우팅 메소드
// ocalhost:3000/members/profile
router.get('/profile', function(req, res){

    // res 객체는 웹서버에서 웹브라우저로 전달할 기능을 정의 
    res.render('member/profile');
});



// Router file은 해당 Router file에 정의된 router를 외부로 반환
module.exports = router;