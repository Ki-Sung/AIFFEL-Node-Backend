
const {odd, even} = require('./base1.js');
const checkOddOrEven = require('./base2');

// 문자열을 파라미터로 받아서 문자열 길이가 홀수 인지 짝수인지 판단 후 홀, 짝 문자열을 반환하는 함수 
function checkStringOddOrEven(str){
    if(str.length%2){
        return odd;    // 홀수
    }else{
        return even;   // 짝수
    }
}

// 최종 소비처 모듈 - 여기서는 기능 노출 X
console.log("숫자 홀짝 여부[base 2에 정의된 기능]: ", checkOddOrEven(10));
console.log("문자열 홀짝 여부[base 2에 정의된 기능]: ", checkStringOddOrEven("살려줘요!!"));
