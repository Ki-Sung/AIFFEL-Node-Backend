// 게시글 정보 관리 웹페이지 요청과 응답을 처리하기 위한 라우터파일 정의 
// 기본 라우팅 주소: localhost:3000/article/...

// express 웹프레임워크를 참조 
var express = require('express');
const { route } = require('../../../DAY5-DAY6/noderoutingapp/routes/member');
// express 객체의 Router()메소드(기능)을 호출해서 사용자 요청과 응답을 처리할 라우터 객체를 생성
var router = express.Router();

// url 주소에서 특정 파라미터(쿼리스트링) 값이 있고 없고를 체크하는 미들웨어
const {checkParams,checkQueryKey} = require('./middleware.js');

//라우터 미들웨어테스트용 라우팅 메소드 
router.get('/sample/:id',checkParams,function(req, res, next) {
    res.render('index', { title: 'Express' }); 
    });

// 라우터 미들웨어 샘플1 
router.use(function (req, res, next) {
    console.log('Index 라우터 미들웨어 샘플1 :', Date.now());
    next(); });


// 게시글 정보조회 및 조회결과 웹페이지 요청 및 응답 처리 라우팅 메소드 
// localhost:3000/article/list
// localhost:3000/article/list?category=테스트
router.get('/list', checkQueryKey ,async(req, res) => {

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
// localhost:3000/article/create
router.post('/create', async(req, res) => {

    // step 1. 사용자 입력한 게시글 데이터를 폼요소에서 추출함.
    var title = req.body.title;
    var contents = req.body.contents;
    var display_yn = req.body.display_yn;

    // step 2. 폼에서 전달된 사용자 입력 값을 DB에 게시글 테이블에 저장함.
    // 모든 RDBMS(DB) 테이블에 데이터를 저장하면 실제 저장된 해당 데이터를 백앤드 호출 메소드로 반환해 줌.

    var article = {
        aid: "1",
        title: "HelloWord 1",
        contents: "게시글 내용 1",
        view_cnt: 40,
        display_yn: "Y",
        ip_address: "111.111.111.111",
        regist_date: Date.now(),
        regist_user: "Gilbert"
    };

    // 등록이 완료되면 게시글 목록페이지로 사용자 브라우저로 이동시킴.
    // res.redirect('뷰 경로가 절대아닌 이동시키고자 하는 url 주소(도메인 제외)')
    res.redirect('/article/list');
    
});

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
router.post('/modify/:aid', async(req, res) => {

    // step 1. 수정하려는 게시글 고유번호를 추출함.
    // 방법 1. parameter 값을 추출하는 방법 
    var aid = req.params.aid;

    // 방법 2. form 태그내 hidden 요소가 있으면 hidden 요소의 name 값으로 추출함.
    // var aid = req.body.aid;
    
    // step 2. 사용자가 수정한 게시글 폼 태그내 요소값을 추출.
    var title = req.body.title;
    var contents = req.body.contents;
    var display_yn = req.body.display_yn;

    // step 3. DB에 게시글 정보 수정처리 
    // DB에 전달할 수정 데이터를 정의함.
    var article = {
        title,
        contents,
        display_yn
    };

    // step 4. 수정데이터가 DB에 반영 완료되면 게시글 목록페이지로 이동시킴.
    res.redirect('/article/list');

});

// 선택 게시글 삭제처리 요청 및 응답 라우팅 메소드 정의 
// localhost/article/delete?aid=1
router.get('/delete', async(req, res) => {

    // 게시글 고유번호를 추출함.
    var aid = req.query.aid;

    // DB에서 해당 게시글을 영구 삭제 처리함.
    

    // 게시글 목록 페이지로 이동
    res.redirect('/article/list')

});


// Router file은 해당 Router file에 정의된 router를 외부로 반환
module.exports = router;