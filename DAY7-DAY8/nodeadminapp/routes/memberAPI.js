// 회원 정보 관리 RESTful API 전용 라우터 파일 
// 데이터 처리 요청과 응답을 전문으로 처리 함 
// 기본 주소 체계 localhost:3000/api/meembers/...

var express = require('express');
var router = express.Router();

// ORM DB 프로그램을 위한 DB 객체 참조하기 
// models/index.js 모듈을 호출하면 해당 모듈은 db라는 객체를 반환 
var db = require('../models/index');

// 모든 회원 목록 조회 요청, 반환 라우팅 메소드 
// localhost:3000/api/meembers/
router.get('/', async(req, res) => {

    // member 모델을 통해 members 테이블의 모든 사용자 목록을 조회해 옴.
    // sequelize ORM의 모델명 .findAll()은 맵핑된 물리 테이블에서 모든 데이터를 조회해 옴. 
    // findAll() 메소드는 ORM Framework에 의해 SELECT * FROM members; SQL 문장으로 변환되어 Mysql 서버에 SQL 구문이 전달되어 실행 
    var members = await db.Member.findAll();

    // DB 조회 결과물인 members를 JSON 형식으로 클라이언트에 변환함.
    res.json(members);
});


// 신규 회원 정보등록 요청 및 응답 라우팅 메소드 
// localhost:3000/api/meembers/create
router.post('/create', async(req, res) => {

    // step 1. 클라이언트에서 전달된 신규회원정보를 추출.
    var email = req.body.email;

    // step2. membets 테이블에 저장할 실제 단일 데이터를 생성 
    // DB에 저장할 데이터 구조는 반드시 해당 모델의 구조를 이용해서 처리함.
    var member = {
        email:email
    };

    // step3. Member 모델을 이용해 create("등록할 모델구조의 데이터") 메소드를 호출하여 members 테이블에 신규 데이터를 등록함.
    // 모델명 ".create()" 메소드는 SQL의 INSERT INTO 테이블명(컬럼명1, 컬러명2, ...)VALUES(값1, 값2,...);
    // "INSERT INTO members(email, createdAt, updatedAt)VALUES('gilber@test.co.kr', now(), now());"의 의미와 동일
    // INSERT 쿼리는 반드시 테이블에 저장완료한 데이터를 다시 반환해주는 특성이 있다. 그래서 create()메서드를 호출하여 데이터를 등록하면, 등록된 실제 데이터가 반환됨.
    var registedMember = await db.Member.create(member);

    // step4. 실제 db에 저장된 결과값을 클라이언트에 반환함.
    res.json(registedMember);

});


// 기존회원 정보 수정 요청 및 응답 라우팅 메소드 
// localhost:3000/api/meembers/update
router.post('/update', async(req, res) => {

    // step1. 클라이언트에서 전달된 회원 수정 정보를 추출함.
    var memberId = req.body.memberId;
    var email = req.body.email;

    // step2. 모델구조 기반으로 수정할 실제 데이터를 정의함.
    var member = {
        email:email
    };

    // step3. Member 모델의 update()메소드를 이용해 members 테이블의 해당 회원 정보를 수정함.
    // update("수정할 데이터,{조건절:{조건 항목:조건 값}}")
    // ORM 프레임워크에 의해 아래 update 메소드는 UPDATE member SET email='수정할 메일 주소' WHERE member_id=1;의 SQL 구문으로 변환되어 mysql 서버에 전달되어 실행되고 수정 적용건수가 반환됨.
    var updatedCnt = await db.Member.update(member, {where:{member_id:memberId}});

    var result = {
        code:200,
        message:"Update Complete!",
        data:updatedCnt[0]
    };

    // 수정결과를 던짐 
    res.json(result);

});


// 기존 단일회원 정보 삭제처리 요청 및 응답 라우팅 메소드 
// localhost:3000/api/meembers/delete
router.post('/delete', async(req, res) => {

    var memberId = req.body.memberId;
    
    var deletedCnt = await db.Member.destroy({where:{member_id:memberId}});

    var result = {
        code:200,
        message:"Delete Complete!",
        data:deletedCnt[0]
    };

    res.json(result)
});


// 특정 단일 회원 정보 조회 요청 및 응답 라우팅 메소드 
// 쿼리스트링 방식으로 호출 - 주소체계는 localhost:3000/api/meembers/detail?mid=1
router.get('/detail', async(req, res) => {

    var memberId = req.query.mid;

    // SELECT * FROM members WHERE member_id = 1;
    var member = await db.Member.findOne({where:{member_id:memberId}});

    res.json(member);
});


// 특정 단일 회원 정보 조회 요청 및 응답 라우팅 메소드 
// 쿼리스트링 방식으로 호출 - 주소체계는 localhost:3000/api/meembers/1 (a.k.a 와일드카드 방식 )
router.get('/:mid', async(req, res) => {

    var memberId = req.params.mid;
    var member = await db.Member.findOne({where:{member_id:memberId}});

    res.json(member);

});

module.exports = router;