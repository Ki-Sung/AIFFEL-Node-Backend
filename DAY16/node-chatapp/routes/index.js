var express = require('express');
var router = express.Router();

// JWT 토큰 참조하기
var jwt = require("jsonwebtoken");

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

// 채팅 웹페이지 요청과 응답 라우팅 메소드 
// localhost:3000/chat
router.get('/chat', function(req, res, next) {
  res.render('chat.ejs');
});

// 사용자 웹사이트 로그인 페이지 요청과 응답 처리 라우팅 메소드
// localhost:3000/login
router.get('/login', function(req, res, next) {
  res.render('login');
});

// 사용자 웹사이트 신규 회원가입 웹페이지 요청과 응답 처리 라우팅 메소드 
// localhost:3000/signup
router.get('/signup', function(req, res, next) {
  res.render('signup');
});


// JWT 토큰 데이터 형식 정의 웹페이지
// localhost:3000/token
router.get('/token', function(req, res, next) {
  res.render('token');
});

// JWT 토큰 생성 라우팅 메소드
// localhost:3000/token
router.post('/token', function(req, res, next) {

  var email = req.body.email;
  var name = req.body.name;
  var telephone = req.body.telephone;
  var usertype = req.body.usertype;

  // step1. JWT 토큰에 담을 JSON 데이터 
  var userData = {
    email,
    name,
    telephone,
    usertype
  };

  // step2. userdata Json 객체를 JWT 토큰으로 생성
  //  jwt.sign('토큰화할 json 데이터', '토큰을 생성시 사용한 인증키 값-복호하시 필요', 옵션:파기일시, 생성자 정보)
  var token = jwt.sign(userData, process.env.JWT_KEY, {
    expiresIn: '60m',                         // 60m, 10s, 24h, - 60분, 10분, 24시간
    issuer: 'aiperfact'
  });


// step 3 생성된 JWT 토큰값을 JSON 형태로 출력
  res.json({token:token});
});


// JWT 토큰 문자열에서 JSON 데이터 값 추출하기 
// localhost:3000/verify?token=sdfsdsa...
router.get('/verify', function(req, res, next) {

  // step1. 전달된 JWT 토큰 문자열을 추출 
  var jwtToken = req.query.token;

  // step2. 토큰문자열에서 JSON 데이터를 추출함.
  var result = {
    msg: "",
    data:null
  }

  try{
    // jwt.verify('추출된 jwt 토큰 문자열', '토큰생성시사용한 인증키 값')
    // JWT 토큰의 상태가 정상적인 경우(만료일시와 변조가 되지 않고, 인증키값이 동일한 케이스)에만,
    //json 데이터를 반환하고 그렇지 않으면 Error 발생을 시킴
    var jsonData = jwt.verify(jwtToken, process.env.JWT_KEY);

    result.msg = "Ok";
    result.data = jsonData;

  }catch(Error){
    result.msg = "제공된 토큰에 문제가 있습니다."
  }

  res.json(result);
});

module.exports = router;
