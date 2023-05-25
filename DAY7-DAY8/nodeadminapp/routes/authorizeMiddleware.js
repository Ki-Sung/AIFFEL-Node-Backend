// 현재 사용자가 로그인상태인지 체크하는 미들웨어 함수 
exports.isLoggedIn = (req, res, next) => {
    // 세션객체에 isLogined 속성이 없으면 비로그인 상태이기 때문에 로그인 페이지로 ㅇ이동
    if (req.session.isLogined == undefined) {
        res.redirect('/login');
    }else{
        // isLogined 속성값이 존재하면 로그인된 상태이니 다음 호출 프로세스로 이동
        next();
    }

};