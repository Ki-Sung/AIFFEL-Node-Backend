// 설치된 moment Node 패키지 불러오기 
// 설치된 Node 패키지를 사용하려면 require라는 예약어를 참조함.
const moment = require('moment');

// 터미널에 log 출력 
console.log("Record log information to terminal!");

// 날짜 및 시간 정보 출력 - moment 패키지 적용 X 
console.log("Print today date and time", Date.now());

// moment 패키지 적용 후 날짜 및 시간 정보 출력 
console.log("Use moment package for today date and time", moment(Date.now()).format("YYYY-MM-DD HH:mm:ss"));
