var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');

// 1. 개발자 정의 라우터의 파일을 참조한다. 
// 1-1. 회원정보 관리 웹페이지 요청과 응답 전용 라우터파일 참조 
var memberRouter = require('./routes/member');

// 1-2. 게시글 정보처리 전용 REST API 라우터 참조 
var articleAPIRouter = require('./routes/article-api');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

// 2. 각종 라우터파일의 기본 주소체계를 정의하는 곳
app.use('/', indexRouter);
app.use('/users', usersRouter);

// 2-1. memberRouter파일의 기본주소 체계를 locahost:3000/members/...로 정의 
app.use('/members', memberRouter);

// 2-2. 게시글 데이터 처리 전용 라우터파일의 기본 주소 설정하기 
// localhost:3000/api/articles/...
app.use('/api/articles', articleAPIRouter);

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
