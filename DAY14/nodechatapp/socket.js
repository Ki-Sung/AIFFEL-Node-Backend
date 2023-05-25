// socket.io 패키지 참조 
const SocketIO = require("socket.io");

//socket.js모듈 기능정의
module.exports =(server)=>{

    // 서버에서 IO(input/output) 메시지 통신을 담당하는 핵심 객체
    const io = SocketIO(server,{path:"/socket.io"});

    // 반드시 서버소켓은 클라이언트와 연결이 완료된 상태에서 메시지를 상호로 주고 받음.
    io.on("connection",(socket)=>{

        // 서버 수신기 이름인 "broadcast" 이벤트에 msg라는 데이터를를 클라이언트에서 전송해줌.
        socket.on("broadcast",function(msg){

            // 현재 서버소켓에 연결된 모든 클라이언트에서 메시지를 보내는데, 
            // 클라이언트 라이브러리에 "receiveAll"이라는 이베트 수신기가 msg라는 데이터를 수신함.
            io.emit("receiveAll",msg);
            //socket.broadcast.emit("receive",msg);
        });

    


    });

}