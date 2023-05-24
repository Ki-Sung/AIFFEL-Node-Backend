var express = require('express');
var router = express.Router();

// 단방향 암호화 패키지 bcryptjs 참조 
var bcrypt = require('bcryptjs');

// DB ORM 객체 정의 
var db = require('../models/index');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

/* 괸리자 사잍 로그인 웹페이지 요청/응답 라우팅 메소드. 
localhost:3001/login
*/
router.get('/login', async(req, res, next) => {
  
  // 로그인 전용 레이아웃 ejs 파일 적용
  res.render('login.ejs', {layout:'loginLayout.ejs'});
});

router.post('/login', async(req, res, next) => {

  // step1: 로그인 폼에서 사용자 아이디/암호 추출 
  var admin_id = req.body.admin_id;
  var admin_password = req.body.admin_password;

  // step2: 동일한 사용자 아이디가 존재하는지 체크
  var admin = await db.Admin.findOne({where:{admin_id:admin_id}});
  
  if(admin == null){
    // 동일한 아이디의 관리자정보가 존재하지 않은 경우 - 로그인 페이지 다시 로드 
    res.render('login.ejs', {layout:'loginLayout.ejs'});

    }else{
      // 동일한 아이다의 관리자 정보가 존재하는 경우 
      // step3: 동일한 아이디가 존재하면 암호가 동일한지 체크 (단방향 암호화값 비교체크하기)

      // bcrypt.compare('form에서 넘어온 사용자 암호값', db에 저장된 암호화된 문자열값)
      // bcrypt.compare() 메소드는 결곽 값을 boolean 형으로 변환
      var isCorrectPwd = await bcrypt.compare(admin_password, admin.admin_password);
      
      if(isCorrectPwd == true){
      // step:4 장성작으로 로그인 된 경우 메인페이지로 이동 
      res.redirect('/');
    }else{
      // 사용자 암호가 일치하지 않는 경우 
      res.render('login.ejs', {layout:'loginLayout.ejs'});
    }
  }
  

});

module.exports = router;
