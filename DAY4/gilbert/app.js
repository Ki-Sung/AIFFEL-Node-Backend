var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

// Router 폴더내에 있는 각종 라우터 파일을 참조함.
// 모든 Router 파일은 생성후 해당줄에 Router 파일을 참조해줘야 함.
var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
// 개발자정의 라우터 파일 참조 - 회원정보 요청/응답 전용 라우터 파일 참조.
var memberRouter = require('./routes/member');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

// 상단에서 참조한 Router파일의 기초호출주소체계를 정의함.

// index.js Router 파일의 기본주소체계는 "localhost:3000/"로 기본 주소를 가짐.
app.use('/', indexRouter);
// user.js Router 파일은 무조건 기본주소체계는 "localhost:3000/users"라는 기본주소체계를 가짐.
app.use('/users', usersRouter);
// member.js Router 파일의 기본주소체계 설정 - localhost:3000/member"
app.use('/member', memberRouter);

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
