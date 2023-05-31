// socket.io 패키지 참조 
const SoketIO = require("socket.io");

// socket.js 모듈 기능 정의 
module.exports = (server) => {

    // 클라이언트와 서버 소켓간의 통신(input/ouput)을 담당하는 io 객체
    const io = SoketIO(server, {path:"/socket.io"});

    // io 객체의 connection이벤트가 발생하면 클라이언트와 서버소켓이 연결이 완료된 상태를 말함(중요)
    // 모든 클라이언트와 서버소켓간의 통신처리는 connection 이벤트 안에서 구현한다.
    io.on("connection", (socket) => {

        // socket.on("서버 이벤트 수신기명", 클라이언트에서 서버이벤트로 전달되는 파라미터 처리 콜백함수)
        socket.on("broadcast", function(msg){
            
            // io.emit("클라이언트 이벤트 수신기명 정의", 클라이언트 이벤트 수신기에 전달할 데이터)
            // io.emit() 메소드는 서버소켓(socket.js)와 연결된 모든 클라이언트에게 메시지가 발송된다.
            // 예를들면 100명의 사용자가 브라우저(사용자)가 socket.js서버 소켓과 연결이 되어 있다면 100명에 동일한 메세지가 전송됨.
            io.emit("receiveAll", msg);
            console.log("클라이언트 receiveAll 이벤트 수신기 호출")
            //socket.broadcast.emit("receive",msg);
        });

        // 샘플용 서버 이벤트 수신기 정의 1 - 비동기 방식 
        socket.on("test1", async(data1, data2) => {
            var msg = `${data1}:${data2}`;
            console.log("클라이언트에서 보내준 메시지 출력: ", msg)
            io.emit("clientEvent1", data1, data2);
        });
        
        // 샘플용 서버 이벤트 수신기 정의 2 - 비동기 방식
        socket.on("test2", async(jsonData) => {
            io.emit("clientEvent2", jsonData.nickName, jsonData.msg);
        });

    });

};