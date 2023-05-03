var express = require('express');
var router = express.Router();

/* GET home page. */
// http://localhost:300/
router.get('/', function(req, res, next) {
  
  var test = req.query.uid;

  console.log("메인페이지 라우팅 메소드가 호출되었습니다.")

  console.log("view 폴더내에 index.ejs파일 내용(html)이 브라우저로 전달되었습니다.")
  
  res.render('index', { title: 'Gilbert' });

});

module.exports = router;
