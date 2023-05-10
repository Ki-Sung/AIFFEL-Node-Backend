// 게시글 정보 관리 웹페이지 요청과 응답을 처리하기 위한 라우터파일 정의 
// 기본 라우팅 주소: localhost:3000/article/...

// express 웹프레임워크를 참조 
var express = require('express');
const { route } = require('../../../DAY5-DAY6/noderoutingapp/routes/member');
// express 객체의 Router()메소드(기능)을 호출해서 사용자 요청과 응답을 처리할 라우터 객체를 생성
var router = express.Router();


// 게시글 정보조회 및 조회결과 웹페이지 요청 및 응답 처리 라우팅 메소드 
// localhost:3000/article/list
router.get('/list', async(req, res) => {

    // 전체 게시글 정보를 DB에서 조회해옴.
    var articles = [
        {
            aid: "1",
            title: "HelloWord 1",
            contents: "게시글 내용 1",
            view_cnt: 40,
            display_yn: "Y",
            ip_address: "111.111.111.111",
            regist_date: Date.now(),
            regist_user: "Gilbert"
        },
        {
            aid: "2",
            title: "HelloWord 2",
            contents: "게시글 내용 2",
            view_cnt: 20,
            display_yn: "Y",
            ip_address: "111.111.111.112",
            regist_date: Date.now(),
            regist_user: "Gilbert"
        },
        {
            aid: "3",
            title: "HelloWord 3",
            contents: "게시글 내용 3",
            view_cnt: 0,
            display_yn: "N",
            ip_address: "111.111.111.113",
            regist_date: Date.now(),
            regist_user: "Gilbert"
        }
    ];

    res.render('article/list.ejs', {articles:articles});

});

// 게시글 조회 선택옵션에 따른 게시글 데이터 조회 처리 요청 및 응답 라우팅 메소드 
//사용자가 조회 옵션 정보를 입력/선택 후 조회버튼을 클릭하면 전달되는 조회옵션 데이터를 추출해 DB에서 데이터를 조회 후 다시 list.ejs 조회 목록 데이터를 전달함.
// localhost:3000/article/list
router.post('/list', async(req, res) => {

    // step 1. 사용자가 입려/선택한 조회옵션 데이터를 추출함.
    var title = req.body.title;
    var ipaddress = req.body.ipaddress;
    var displayyn = req.body.displayyn;

    // step 2. 추출된 조회옵션 데이터기반으로 게시글 테이블에서 해당 게시글 목록을 조회해옴. 
    var articles = [
        {
            aid: "1",
            title: "HelloWord 1",
            contents: "게시글 내용 1",
            view_cnt: 40,
            ip_address: "111.111.111.111",
            display_yn: "Y",
            regist_date: Date.now(),
            regist_user: "Gilbert"
        }
    ];

    // step 3. 조회 결과 목록 데이터를 list.ejs view에 전달함.
    res.render('article/list', {articles});

});



// 게시글 등록 웹페이지 요청 및 응답 처리 라우팅 메소드 
// localhost:3000/article/create
router.get('/create', async(req, res) => {

    res.render('article/create');

});


// 사용자가 입력한 게시글 등록 데이터 처리 요청 및 응답 라우팅 메소드 
// router.post();



// 단일 게시글 수정 웹페이지 요청 및 응답 처리 라우팅 메소드 
// localhost:3000/article/modify/1 -> 파라미터 방식의 경우 와일드카드로 값을 추출함.
router.get('/modify/:aid', async(req, res) => {

    // step1. 해당 게시글 고유번호를 url 에서 추출함.
    var articleId = req.params.aid;

    // step2. 해당 게시글 번호에 해당하는 데이터를 게시글 테이블에서 조회해옴.
    var article = {
        aid: "1",
        title: "HelloWord",
        contents: "게시글 내용",
        view_cnt: 1,
        display_yn: "Y",
        regist_date: Date.now(),
        regist_user: "Gilbert"
    }

    // 게시글 수정 웹페이지 뷰에 단일게시글 데이터를 전달함.
    res.render('article/modify', {article:article});

});

// 사용자가 수정한 게시글 정보처리 요청 및 응답 라우팅 메소드 정의
// router.post();



// 선택 게시글 삭제처리 요청 및 응답 라우팅 메소드 정의 
// router.get();


// Router file은 해당 Router file에 정의된 router를 외부로 반환
module.exports = router;
