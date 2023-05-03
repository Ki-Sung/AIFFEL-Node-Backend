// router file(index.js) - 기본적인 메인페이지 / 사이트 공통기능에 대한 사용자 웹페이지 요청과 응답을 처리.
// router file의 사용자 요청과 응답 기능 설계는 백엔드 개발자가 담당함.
// 예를들어 상품에 대한 웹페이지/데이터에 대한 요청과 응답은 product.js router file을 만듬.
// 예를들어 회원에 대한 웹페이지/데이터에 대한 요청과 응답은 member.js router file을 만듬.
// 사용자는 URL(웹주소체계)을 통해서 서버에 요청함.
// 사용자가 요청할 주소체계에 대한 설계/구현은 백엔드 개발자가 담당함.
// ** 모든 Router 파일은 기초 주소체계를 가진다.
// ** index.js Router 파일은 무조건 http://localhost:3000/ 주소를 기본으로 사용함.
// ** 모든 Router 파일의 기초주소체계 정의는 app.js 파일내에서 설정함.

// express 웹프레임워크를 참조
var express = require('express');   

// express 객체의 Router()메소드(기능)을 호출해서 사용자 요청과 응답을 처리할 라우터 객체를 생성
var router = express.Router();  

// 실질적인 해당 Router file에 Routing 메소드를 통해 개발 사용자 요청/응답기능을 구현 
// Routing 메소드를 통해 실제 사용자 요청과 응답을 구현

/* GET home page. */
// http://localhost:300/
router.get('/', function(req, res, next) {
  
  var test = req.query.uid;

  console.log("메인페이지 라우팅 메소드가 호출되었습니다.")

  console.log("view 폴더내에 index.ejs파일 내용(html)이 브라우저로 전달되었습니다.")
  
  res.render('index', { title: 'Gilbert' });

});

// 웹사이트 공통기능중에 문의하기 웹페이지에 대한 요청과 응담을 처리하는 Routing 메소드 
// URL: http://localhost:3000/라우터의 기본주소체계/contact
// router.get('호출주소체계', 호출될 때 실행되는 callback function);
router.get('/contact', function(req, res){

  // http://localhost:3000/라우터의 기본주소체계/contact 주소에 의해 Routing 메소드가 호출되면, 실행돌 콜백함수의 기능르로 구현함.

  // res 객체는 웹서버에서 웹브라우저로 전달할 기능을 정의 
  // res 객체는 HTTPResponse 객체로 서버에서 클라이언트(웹브라우저)로 정보를 전달하는 객체.
  // res.render('view file path + view file')메소드는 views 폴더내에 있는 지정된 view 파일(.ejs)을 웹브루아저로 반환.
  res.render('index');

});

// http://localhost:3000/라우터의 기본주소체계/test
router.get('/test1', function(req, res){
  
  res.render('index.ejs');

})

// http://localhost:3000/라우터의 기본주소체계/sample/test/test1
router.get('/sample/test/test1', function(req, res){
  
  res.render('index.ejs');

})

// Router file은 해당 Router file에 정의된 router를 외부로 반환
module.exports = router;
