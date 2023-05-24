var express = require('express');
var router = express.Router();

// 단방향 암호화 패키지 bcryptjs 참조 
const bcrypt = require('bcryptjs');

// DB ORM 객체 정의 
var db = require('../models/index');

/* 관리자 계정 목록 페이지 라우팅 메소드. 
    - http:localhost:3001/admin/list
*/
router.get('/list', async(req, res, next) => {
    res.render('admin/list.ejs');
});

/* 신규 관리자 계정 목록 페이지 라우팅 메소드. 
    - http:localhost:3001/admin/create
*/

router.get('/create', async(req, res, next) => {
    res.render('admin/create.ejs');
});

/* 신규 관리자 게정 등록 처리 요청 및 응답 라우팅 메소드
    - http:localhost:3001/admin/create
*/
router.post('/create', async(req, res, next) => {
    
    // step1: 관리자 계정정보를 form 태그에서 추출한다. 
    var admin_id = req.body.admin_id;
    var admin_password = req.body.admin_password;
    var admin_name = req.body.admin_name;

    // 단방향 암호화 문자열 생성하기 
    // bcrypt.hash('당방향암호화할 일반 텍스트', 암호화 적용 횟수)
    const encryptedPassword = await bcrypt.hash(admin_password,12);

    // step2: 관리자 정보를 관리자 계정 테이블에 저장한다. 
    var admin = {
        admin_id,
        admin_password:encryptedPassword,
        admin_name,
        reg_date:Date.now(),
        reg_member_id:1
    };

    // 관리자 게정 등록 처리 
    var registedAdmin = await db.Admin.create(admin);

    // step3: 관리자 목록 페이지로 이동 한다.
    res.redirect('/admin/list');
});


module.exports = router;