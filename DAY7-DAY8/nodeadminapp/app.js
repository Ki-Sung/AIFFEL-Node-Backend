var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

// 레이아웃 패키지 참조하기
var expressLayouts = require('express-ejs-layouts');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');

// 개발자 정의 부분 - 개발자 정의 라우터 파일 참조 및 기본 호출 주소 설정 처리 
var articleRouter = require('./routes/article');

// 관리자 계정관리 라우터 파일참조하기 
var adminRouter = require('./routes/admin');

// 회원정보관리 RESTAPI 라우터 파일 참조하기 
var memberAPIRouter = require('./routes/memberAPI');

// dotenv 환경설정 패키지를 참조하고 환경구성정보를 불러옴 (from .env파일)
require('dotenv').config();

//express기반 서버세션 관리 팩키지 참조하기
var session = require('express-session');

// 모델 index.js를 참조해서 sequelizeORM 객체를 참조 
// node application이 최초 실행시 Mysql DB 서버와 연결하고 테이블들을 자동으로 생성 
// model 폴더내 각종 model.js 파일들을 이용해 연결된 해당 DB에 물리적인 테이블을 생성 (만약 테이블이 있다면 재생성하지 않음.)
var sequelize = require('./models/index.js').sequelize;

var app = express();

//mysql과 자동연결처리 및 모델기반 물리 테이블 생성처리제공
sequelize.sync();

// 서버 세션환경 구성하기 
app.use(
  session({
    resave: false,             // 세션값이 변경되지 않아도 언제든지 저장할지 여부 선택 
    saveUninitialized: true,   // 사용자가 로그인후 서버 리소스를 요청할 때 마다, 세션 타임아웃 값이 자동증가 
    secret: "testsecret",      // 보안 키값
    // 쿠키 발급 
    cookie: {
      httpOnly: true,          // 발금된 쿠키가 http 환경에서도 사용되게 설정 
      secure: false,           // 보안쿠키생성 옵션(쿠키안에 값을 난독화 또는 암호화처리 여부)
      maxAge:1000 * 60 * 30  // 30분 동안 서버세션을 유지하겠다.(1000은 1초)
    },
  }),
);

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

//레이아웃 설정
app.set('layout', 'layout');               // 모든 ejs 파일의 기본 레이아웃 ejs 파일명을 지정함.
app.set("layout extractScripts", true);    // 오리지널 콘텐츠 ejs 파일내역의 script 태그를 레이아웃페이지에 적용여부
app.set("layout extractStyles", true);     
app.set("layout extractMetas", true); 
app.use(expressLayouts);

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

// 어플리케이션 미들웨어 샘플1 
app.use(function(req, res, next) {
  console.log('어플리케이션 미들웨어 호출:', Date.now());
  next(); 
});



// 어플리케이션 미들웨어 샘플2 
// app.use('/user/:id', function (req, res, next) {
//   const uid = req.params.id;
//   console.log('어플리케이션 미들웨어 호출2 요청유형:', req.method); res.send("사용자정보:"+uid);
//   });


app.use('/', indexRouter);
app.use('/users', usersRouter);

// 개발자 정의 부분 - 게시글 요청/응답 라우터의 기본주소 설정하기
app.use('/article', articleRouter);

// 개발자 정의 부분 - 회원정보 관리 RESTAPI 라우터 기본호출 주소 설정
app.use('/api/members', memberAPIRouter);

// 관리자 계정 관리 라우터 기본 주서 설정하기 
app.use('/admin', adminRouter);


// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
