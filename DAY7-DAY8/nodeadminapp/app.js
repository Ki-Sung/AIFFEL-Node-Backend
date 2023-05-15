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


var app = express();

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
