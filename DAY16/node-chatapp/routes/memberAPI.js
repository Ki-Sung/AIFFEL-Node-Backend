var express = require('express');
var router = express.Router();

// bcryptjs 참조 
var bcrypt = require('bcryptjs');

// jsonwebtoken 참조 
var jwt = require('jsonwebtoken');

// db 객체 참조 
var db = require('../models/index');

// 신규 회원가입 처리 REST API 라우팅 메소드
// localhost:3000/api/member/signup
router.post('/signup', async(req, res, next) => {
    
    // api 프로트로 반환하는 결과값 형식 정의
    var result = {
        code:200,
        msg:"",
        data:null
    };

    var email = req.body.email;
    var name = req.body.name;
    var password = req.body.password;
    var telephone = req.body.telephone;

    try{

        // step1. 사용자 암호를 해시알고리즘으로 단방향 암호화 적용 
        var encrytPassword = await bcrypt.hash(password, 12);

        // step2. 등록할 사용자 데이터 정의 
        var member = {
            email,
            name,
            password:encrytPassword,
            telephone
        };

        var registedMember = await db.Member.create(member);

        result.code = 200;
        result.msg = "OK";
        result.data = registedMember;

    }catch(Error){

        // 서버파일시스템에 로깅파일로 저장함.
        result.code = 500;
        result.msg = "서버에러 발생 관리자에게 문의하세요.";

    }

    res.json(result);

});

// 회원 로그인 REST API 라우팅 메소드 
// localhost:3000/api/member/login
router.post('/login', async(req, res) => {

    // api 프로트로 반환하는 결과값 형식 정의
    var result = {
        code:200,
        msg:"",
        data:null
    };

    try{

        // step1. 사용자 메일주소와 암호를 추출 
        var email = req.body.email;
        var password = req.body.password;

        // step2. 사용자 메일주소가 존재하는지 체크
        var member = await db.Member.findOne({where:{email:email}});

        // 메일주소가 존재하지 않는 경우
        if(member == null){
            result.code = 400;
            result.msg = "메일주소가 존재하지 않습니다.";
            return res.json(result);
        };

        // step3. 사용자 메일주소가 존재하는 경우 암호가 동일한지 체크
        var isCorrect = await bcrypt.compare(password, member.password);

        // 암호가 일치하지 않는 경우 
        if(isCorrect == false){
            result.code = 400;
            result.msg = "암호가 일치하지 않습니다.";
            return res.json(result);
        };

        // step4. 메일주소와 암호가 동일한 경우 JWT 토큰에 담을 사용자 주요 JSON 데이터를 만들기
        var tokenData = {
            member_id: member.member_id,
            email: member.email,
            name: member.name,
            telephone: member.telephone
        };

        // step5. 사용자 JSON 데이터를 JWT 토큰문자열로 만들기
        var jwtToken = await jwt.sign(tokenData, process.env.JWT_KEY, {
            expiresIn: '60m',                         // 60m, 10s, 24h, - 60분, 10분, 24시간
            issuer: 'aiperfact'
        });

        // step6. 프론트엔드 전달 데이터값으로 JWT 토큰 문자열을 전달
        result.code = 200;
        result.msg = "OK";
        result.data = jwtToken;

        }catch(Error){

            // 서버파일시스템에 로깅파일로 저장함.
            result.code = 500;
            result.msg = "서버에러 발생 관리자에게 문의하세요.";

        }

    res.json(result);

});

module.exports = router;