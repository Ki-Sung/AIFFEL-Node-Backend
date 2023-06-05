var express = require('express');
var router = express.Router();

// bcryptjs 참조 
var bcrypt = require('bcryptjs');

// jsonwebtoken 참조 
var jwt = require('jsonwebtoken');

// db 객체 참조 
var db = require('../models/index');
const member = require('../models/member');

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

// 이미 로그인한 사용자의 기본 프로필 정보 조회 REST API 라우팅 메소드 
// localhost:3000/api/member/profile
// 로그인시 서버에서 발급된 JWt 인증 토큰에서 사용자 메일주소를 추출해서 해당 사용자 정보를 조회 데이터 반환함.
router.get('/profile', async(req, res) => {

    // api 프로트로 반환하는 결과값 형식 정의
    var result = {
        code:200,
        msg:"",
        data:null
    };

    try{

        // step 1. JWT 인증 토큰이 존재하는지 체크한다. 
        const token = req.headers.authorization.split('Bearer ')[1];

        console.log("프론트제공 JTW 토큰", token);

        // 클라이언트에서 JWT 인증 토큰이 제공되지 않았으면(비로그인상태)
        if(token == undefined){
            result.code = 404;
            result.data = null;
            result.msg = "Not Exist Token!";

            return res.json(result);
        };

        // step 2. JWT 인증 토큰에서 메일 주소를 추출한다. 
        var currentMember = jwt.verify(token, process.env.JWT_KEY);
        console.log("JWT 토큰내 실제 로그인 사용자 정보: ", currentMember);

        // 현재 로그인한 사용자 메일주소 추출하기 
        var loginMemberEmail = currentMember.email;

        // step 3. 메일주소기반 사용자 정보를 테이블에서 조회한다. 
        var memberData = await db.Member.findOne({where:{email:loginMemberEmail}});

        // 사용자 암호 암호화 문자열을 빈 문자열로 변경해서 클라이언트에서 전송(보안이 신경쓰인다면)
        memberData.password = "";

        result.code = 200;
        result.data = memberData;
        result.msg = "OK";

    }catch(Error){

    // 서버파일시스템에 로깅파일로 저장함.
    result.code = 500;
    result.msg = "서버에러 발생 관리자에게 문의하세요.";

    };

    // step 4. 조회결과 데이터를 반환한다. 
    res.json(result);

});

// 모든 회원정보를 조회함.
// CORS 테스트용 REST API 메소드 
// localhost:3000/api/member/all
router.get('/all', async(req, res) => {

    var members = await db.Member.findAll();
    res.json(members);

});

module.exports = router;