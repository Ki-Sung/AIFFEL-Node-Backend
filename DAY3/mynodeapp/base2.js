// 1. 해당 모듈에서 다른 모듈을 불러(참조)할 때는, node import 예약어보다, require 예약어를 주로 사용한다.

// base1.js 모듈을 참조한다.
const {odd, even, test} = require('./base1.js');        // base1에 있는 const {odd, even, test} = {odd, even, test};를 의미한다.

// 숫자를 매개변수로 전달받ㅇ서 홀수인지 짝수인지 판단해서 홀,짝 문자열(odd, even)을 반환함.
function checkOddOrEven(num){
    // 전달된 num 숫자를 2로 나눈 나머지 값(num % 2)
    // if(0이면 false, 1이면 true를 의미)
    if(num % 2){
        return odd;     // 홀수 출력
    }
    return even;       // 짝수 출력 
}

var resultMsg1 = checkOddOrEven(2);
console.log("resultMsg1 홀짝 출력결과: ", resultMsg1)

var resultMsg2 = checkOddOrEven(3);
console.log("resultMsg2 홀짝 출력결과: ", resultMsg2)

// base2.js(이 파일)모듈에서는 checkOddOrEven함수 기능만 노출.
module.exports = checkOddOrEven;
