// 게시글 정보처리 전용 RESTFul API 라우터 파일 
// 기본주소 경로는 localhost:3000/api/articles

// express 웹프레임워크를 참조
var express = require('express');
const { route } = require('./member');

// express 객체의 Router()메소드(기능)을 호출해서 사용자 요청과 응답을 처리할 라우터 객체를 생성
var router = express.Router();

// 1. 게시글 전체 목록 조회 요청/응답 API 라우팅 메소드 
// 주소체계: localhost:3000/api/articles/list
// 비동기 방식 사용
router.get('/list', async(req, res) => {
    
    // step1: DB에서 해당 테이블에 대한 모든 데이터 목록을 조회한다. 
    var articles = [
        {
            aid: 1,                          // 게시글 고유 번호 
            title: "게시글 제목 1",             //  게시글 제볼
            contents: "게시글 내용1",           // 게시글 내용     
            view_cnt: 10,                    // 조회수
            display_yn: "Y",                 // 게시여부 옵션
            ip_address: "111.111.111.111",   // 수정한 유저 ip 주소 정보 
            modify_date:Date.now(),          // 수정일자 
            modify_userid: "Gilbert",        // 수정 유저 id 및 name
        },
        {
            aid: 2,                          // 게시글 고유 번호 
            title: "게시글 제목 2",             //  게시글 제볼
            contents: "게시글 내용2",           // 게시글 내용     
            view_cnt: 12,                    // 조회수
            display_yn: "Y",                 // 게시여부 옵션
            ip_address: "122.111.111.111",   // 수정한 유저 ip 주소 정보 
            modify_date:Date.now(),          // 수정일자 
            modify_userid: "Gilbert",        // 수정 유저 id 및 name
        },
        {
            aid: 3,                          // 게시글 고유 번호 
            title: "게시글 제목 3",             //  게시글 제볼
            contents: "게시글 내용3",           // 게시글 내용     
            view_cnt: 13,                    // 조회수
            display_yn: "N",                 // 게시여부 옵션
            ip_address: "123.111.111.111",   // 수정한 유저 ip 주소 정보 
            modify_date:Date.now(),          // 수정일자 
            modify_userid: "Gilbert",        // 수정 유저 id 및 name
        },
    ];

    // 클라이언트에 JSON 데이터 응답 처리  
    res.json(articles);

});

// 2. 단일 게시글 등록처리 요청/응답 API 라우팅 메소드
// 주소체계: localhost:3000/api/articles/create
// 비동기 방식 사용
router.post('/create', async(req, res) => {

    // 프론트앤드에서 단일 게시글 JSON 데이터 전달 
    // 단일 게시글 JSON 데이터에서 속성값으로 데이터를 추출 

    console.log("제목값을 추출해보자.", req.body.title);
    var title = req.body.title;
    var contents = req.body.contents;
    var display_yn = req.body.display_yn;

    // DB에 저장할 단일 게시글 data 정의 
    var article = {
        aid: 10,                          // 게시글 고유 번호 
        title,                            //  게시글 제볼
        contents,                         // 게시글 내용     
        view_cnt: 0,                      // 조회수
        display_yn,                       // 게시여부 옵션
        ip_address: "111.111.111.111",    // 수정한 유저 ip 주소 정보 
        modify_date:Date.now(),           // 수정일자 
        modify_userid: "Gilbert",         // 수정 유저 id 및 name
    };

    // DB에 해당 article 데이터를 저장처리 함.
    // 지정 완료 후 지정된 데이터를 프론트앤드에 반환
    res.json(article);

});

// 3. 단일 게시글 정보조회 요청/응답 API 라우팅 메소드 
// 주소체계: localhost:3000/api/articles/modify?aid=1
// 와일드카드 형식으로 정의되는 라우팅메소드는 항상 라우터 파일의 최하단에 정의한다.
router.get('/modify', async(req, res) => {

    // 게시글 고유번호 추출하기, 쿼리스트링방식으로 전달되는 경우
    var articleIdx = req.query.aid;

    // DB로부터 해당 게시글 고유번호로 단일게시글 정보를 조회 
    var article = {
        aid: 20,                          // 게시글 고유 번호 
        title: "게시글 제목 20",             //  게시글 제볼
        contents: "게시글 내용20",           // 게시글 내용     
        view_cnt: 5,                      // 조회수
        display_yn: "Y",                  // 게시여부 옵션
        ip_address: "111.111.111.111",    // 수정한 유저 ip 주소 정보 
        modify_date: Date.now(),          // 수정일자 
        modify_userid: "Gilbert",         // 수정 유저 id 및 name
    };

    // DB에서 조회해온 단일 JSON데이터를 클라이언트로부터 반환.
    res.json(article);

});


// 4. 단일 게시글 수정처리 요청/응답 API 라우팅 메소드 
// 주소체계: localhost:3000/api/articles/modify
router.post('/modify', async(req, res) => {

    // 수정하려는 데이터를 추출
    // 프론트앤드에서 전달되는 단일 수정 JSON 데이터를 추출함.
    var articleIdx = req.body.aid;

    var title = req.body.title;
    var contents = req.body.contents;
    var display_yn = req.body.display_yn;

    // DB에 수정할 JSON 데이터 정의 
    var article = {
        aid:articleIdx,
        title,
        contents,
        display_yn,
        modify_date: Date.now(),
        modify_userid: "Gilbert"
    };

    // DB에 수정처리 함.
    // DB 수정 처리 결과 데이터를 반환함.
    var result = {
        code: 200,
        message: "수정완료",
        date: null
    };

    res.json(result);

});

// 단일 게시글 삭제처리 요청/응답 API 라우팅 메소드 
// 주소체계: localhost:3000/api/articles/delete
// router.post();



// Router file은 해당 Router file에 정의된 router를 외부로 반환
module.exports = router;
