exports.checkParams = (req, res, next) => {
    if(req.params.id == undefined){
        console.log("id 파라메터가 전달되지 않았습니다.")
    }else{
        console.log("id 파라메터 값이 전달되었습니다.",req.params.id)
    }
    next();
};

exports.checkQueryKey = (req, res, next) => {
    if(req.query.category == undefined){
        console.log("category 키가 전달되지 않았습니다.")
    }
    next();
};