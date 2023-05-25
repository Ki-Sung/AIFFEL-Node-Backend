var express = require('express');
var router = express.Router();

// 단방향 암호화 패키지 bcryptjs 참조 
var bcrypt = require('bcryptjs');

// DB ORM 객체 정의 
var db = require('../models/index');

// 권한 체크 미들웨어 참조 
var { isLoggedIn } = require('./authorizeMiddleware');

/* 
기본 메인 페이지 
localhost:3001/
*/
router.get('/', isLoggedIn, function(req, res, next) {

  // 수동으로 모든 라우팅 메소드에서 권한체크
  // 각각의 라우팅 메소드 콜백함수가 실행되기전에 권한체크를 해주는 함수가 있으면 더욱 편함.
  // 여기서 라우팅 메소드 권한 체크 미들웨어함수를 하나 만들면 된다.
  // if(req.session.isLogined == undefined){
  //   res.redirect('/login');
  // }else{
  //   res.render('index', { title: 'Express' });
  // }

  res.render('index', { title: 'Express' });

});

/* 괸리자 사잍 로그인 웹페이지 요청/응답 라우팅 메소드. 
localhost:3001/login
*/
router.get('/login', async(req, res, next) => {
  
  // 로그인 전용 레이아웃 ejs 파일 적용
  res.render('login.ejs', {layout:'loginLayout.ejs', loginResult:""});
});

router.post('/login', async(req, res, next) => {

  // step1: 로그인 폼에서 사용자 아이디/암호 추출 
  var admin_id = req.body.admin_id;
  var admin_password = req.body.admin_password;

  // step2: 동일한 사용자 아이디가 존재하는지 체크
  var admin = await db.Admin.findOne({where:{admin_id:admin_id}});
  
  if(admin == null){
    // 동일한 아이디의 관리자정보가 존재하지 않은 경우 - 로그인 페이지 다시 로드 
    res.render('login.ejs', {layout:'loginLayout.ejs', loginResult:"아이디가 일치하지 않습니다!"});

    }else{
      // 동일한 아이다의 관리자 정보가 존재하는 경우 
      // step3: 동일한 아이디가 존재하면 암호가 동일한지 체크 (단방향 암호화값 비교체크하기)

      // bcrypt.compare('form에서 넘어온 사용자 암호값', db에 저장된 암호화된 문자열값)
      // bcrypt.compare() 메소드는 결곽 값을 boolean 형으로 변환
      var isCorrectPwd = await bcrypt.compare(admin_password, admin.admin_password);
      
      if(isCorrectPwd == true){

        // 서버 세션 정의 및 저장 
        // login한 사용자 정보중 중요 정보를 서버 세션(서버 메모리)으로 저장하고, 세션 아이디 값을 쿠키에 담아 브라우저에 전달.
        // 브라우저는 인증(로그인)시 발금된 쿠키를 가지고 다시 로그인 없이 서버에서 사용자를 인식하게 됨.
        // 브라우저는 서버에 서비스를 요청할때 마다 발급된 쿠키를 서버에 전달하고 서버는 쿠키안에 있는 세션 아이값을 기준으로 서버 메모리에 저장된 세션목록에서 사용자정보를 추출해 사용자를 인식

        // 세션이란 사용자 단위로 가각의 사용자정보를 관리하는 단위 
        //req.session객체에 동적속성 추가
        req.session.isLogined = true;
        
        // loginUser라는 동적속성을 세션객체에 정의하고 현재 로그인한 사용자의 고유번호, 아이다, 이름을 각각의 속성으로 저장
        req.session.loginUser ={
          userSeq:admin.admin_member_id,
          userId:admin.admin_id,
          userName:admin.admin_name,
        };

        //세션에 추가한 동적속성과 값을 최종 저장한다. 
        // req.session.save() 메소드가 호출되면 동적속성값을 session 객체에 최종저장하고 세션 아이디 값을 기준으로
        // 서버에서 쿠키를 웹브라우저 발급해서 저장시킨다
        req.session.save(function(){
        // 사용자 암호까지 일치하는 경우
        // step:4 장성작으로 로그인 된 경우 메인페이지로 이동 
        res.redirect('/');
        });

      }else{
      // 사용자 암호가 일치하지 않는 경우 
      res.render('login.ejs', {layout:'loginLayout.ejs', loginResult:"암호가 일치하지 않습니다!"});
    }
  }
  
});

// 로그인한 사용자의 프로필 소개 페이지 요청/응답  라우팅 메소드
// http://localhost:3001/profile
router.get('/profile', isLoggedIn, async(req, res) => {

  // req.session객체에 isLogined 속성이 정의가 안되어 있다면(즉, 미로그인 시)
  // 만약 로그인 속성이 없다면,
  // if (req.session.isLogined == undefined){
  //   // 로그인 페이지로 다시 이동
  //   res.redirect('/login')
  // }else{
    // 현재 로그인 사용자 세션 정보 추출하기 
  //   var userSession = req.session.loginUser;

  //   // 프로필 웹페이지 제공 
  //   res.render('profile.ejs', {userData:userSession});
  // }
  // 현재 로그인 사용자 세션 정보 추출하기 
  var userSession = req.session.loginUser;

  // 프로필 웹페이지 제공 
  res.render('profile.ejs', {userData:userSession});

});

// 로그아웃처리 라우팅 메소드
router.get('/logout', async(req, res) => {

  req.session.destroy(function(err){
    res.redirect('/login');
  })

});

module.exports = router;
