// 1. 모듈 파일안에 변수와 기능등을 구현
const odd = "홀수 입니다.";
const even = "짝수 입니다.";

function test(){
    console.log("테스트 함수가 호출되었습니다.");
}

// 2. 모듈 파일의 정의된 변수/상수/기능을 외부 모듈에서도 사용하게끔 하려면, module.exportㄴ = {}를 이용해서 해당 모듈내 기능과 변수등을 노출해줘야 함.
// 외부 노출하는 방법은 객체{}의 속성과 함수로 노출할 수 있다.
module.exports = {
    odd,
    even,
    test
}
