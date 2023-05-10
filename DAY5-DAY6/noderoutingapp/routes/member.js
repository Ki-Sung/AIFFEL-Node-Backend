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

// 회원가입 페이지에서 전달되는 회원가입 정보를 추출해서 회원정보를 등록처리요청에 응답하는 라우팅 메소드
// localhost:3000/members/regist
// 라우팅 메소드는 반드시 호출주소체계와 호출방식의 조합으로 중복 정의 하면 안됨. -> 호출 주소가 같다면 호출 방식은 무조건 다르게 해야함.
router.post('/regist', function(req, res){

    // 사용자가 회원가입 form에서 입력한 데이터를 추출해서, DB에 저장하고, 
    // 저장을 완료하면, 특정 웹페이지로 브라우저 웹페이지를 이동시킨다.


    // form 태그에 post 방식으로 전달되넌 form 데이터는 req 객체의 body 속성으로 추출할 수 있다.
    // req는 httpRequest 객체로 웹브라우저에서 넘어오는 모든 정보를 서버에서 추출할 수 있다.
    // req.body.form태그내 html 요소의 name 속성값으로 해당 html 요소의 입력값을 추출한다. 
    // req.body.email = <input type="text" name="email" />
    var email = req.body.email;
    var name = req.body.name;
    var password = req.body.password;

    // 현재 DB에 저장은 모델을 통해 DB에 저장했다고 가정한다. 

    // 회원가입 후에는 메인페이지로 사용자 브라우저를 이동시키려고 함.
    // res 객체의 redirect('이동시킬 url주소정의' -> 주의: 여기에 절대 뷰파일주소를 넣으면 안됨!!)
    res.redirect('/');
    // res.redirect('https://www.naver.com');

});

// 가입회원 목록 웹페이지 요청 및 응답 처리 라우팅 메소드 
router.get('/list', function(req, res){
    res.render('member/list');
});

// 2. 회원 로그인 웹페이지 요청과 응답처리 라우팅 메소드
// ocalhost:3000/members/login
router.get('/login', function(req, res){

    // res 객체는 웹서버에서 웹브라우저로 전달할 기능을 정의 
    res.render('member/login');
});

// 3. 로그인 후 보여줄 사용자 프로필 웹페이지 요청과 응답처리 라우팅 메소드 - 쿼리스트링방식
// localhost:3000/members/profile?uid=1&test=테스트
router.get('/profile', function(req, res){

    // req.query라는 속성을 통해 url내 쿼리스트링방식으로 전달되는 키의 값을 추출함.
    var userId = req.query.uid;
    var test = req.query.test;

    // res 객체는 웹서버에서 웹브라우저로 전달할 기능을 정의 

    // res.render('뷰파일의경로')
    // res.render('뷰파일의경로', '뷰파일에 전달할 JSON 데이터객체')
    res.render('member/profile', {uid:userId, userName:"Gilbert", email:"test@test.co.kr"});

});


// 로그인 후 보여줄 사용자 프로필 웹페이지 요청 및 응답처리 라우팅 메소드 정의 - 파라미터 방식
// localhost:3000/members/profile/1
// 파리미터 방식으로 url을 통해 데이터가 전달되는 경우 와일드 카드를 정의해서 데이터를 추출 
// 와일드 카드란 주소 체계안에 /: 키명을 정의하는 방식을 말함.
router.get('/profile/:uid', function(req, res){

    // 와일드 카드에 정의된 키갑으로 url에 전달된 1이란 값을 추출
    // 파라미터 방식으로 값이 전달되면 req.params라는 속성에 와일드카드 키명으로 값을 추출 
    var uid = req.params.uid;
    var userName = "Gilbert";
    var email = "gib@test.co.kr";

    res.render('member/profile', {uid,userName,email});

});


// 단일 회원정보 데이터 요청과 응답을 처리하는 REST API 라우팅 메소드 정의 
// localhost:3000/members/data/profile/?uid=1
router.get('/data/profile', function(req, res){

    var uid = req.query.uid;

    // DB에서 uid 기준으로 조회해 온 단일 사용자 JSON 데이터
    var userData = {
        uid: uid,
        userName: "Gilber",
        email: "gib@tesg.co.kr",
    };

    // DB에서 가져온 userData를 클라이언트에게 응답 결과물로 제공함.
    res.json(userData);

});

// 모든 회원목록 데이터 요청과 응답을 처리하는 REST API 라우팅 메소드 정의 
// localhost:3000/members/data/users/all
router.get('/data/users/all', function(req, res){

    // DB에서 ORM 통해 전체 회원 데이터를 조회
    var userList = [
        {
            uid: 1,
            userName: "Gilber",
            email: "gib@tesg.co.kr",
        },
        {
            uid: 2,
            userName: "Kisung",
            email: "kks@tesg.co.kr",
        },
        {
            uid: 3,
            userName: "Jjoco",
            email: "jjoco@tesg.co.kr",
        }
    ];

    res.json(userList);
    
});

// Router file은 해당 Router file에 정의된 router를 외부로 반환
module.exports = router;