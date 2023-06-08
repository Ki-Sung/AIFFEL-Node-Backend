// socket.io 패키지 참조 
const SoketIO = require("socket.io");
const { Configuration, OpenAIApi } = require("openai");

// socket.js 모듈 기능 정의 
module.exports = (server) => {

    // 클라이언트와 서버 소켓간의 통신(input/ouput)을 담당하는 io 객체
    const io = SoketIO(server, {path:"/socket.io"});

    // io 객체의 connection이벤트가 발생하면 클라이언트와 서버소켓이 연결이 완료된 상태를 말함(중요)
    // 모든 클라이언트와 서버소켓간의 통신처리는 connection 이벤트 안에서 구현한다.
    io.on("connection", (socket) => {

        // 비자발적으로 클라이언트와의 연결이 끊어지는 경우 발생하는 이벤트 
        socket.on("disconnect", async() => {
            console.log("비정상적으로 사용자 연결이 종료되었습니다. ConnectId: ", socket.id);
        });

        // socket.on("서버 이벤트 수신기명", 클라이언트에서 서버이벤트로 전달되는 파라미터 처리 콜백함수)
        socket.on("broadcast", async(message) => {
            
            // io.emit("클라이언트 이벤트 수신기명 정의", 클라이언트 이벤트 수신기에 전달할 데이터)
            // io.emit() 메소드는 서버소켓(socket.js)와 연결된 모든 클라이언트에게 메시지가 발송된다.
            // 예를들면 100명의 사용자가 브라우저(사용자)가 socket.js서버 소켓과 연결이 되어 있다면 100명에 동일한 메세지가 전송됨.
            // io.emit("receiveAll", msg);
            // console.log("클라이언트 receiveAll 이벤트 수신기 호출")
            //socket.broadcast.emit("receive",msg);

            const configuration = new Configuration({
                apiKey: "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",
            });
            
            const openai = new OpenAIApi(configuration);
            
            const response = await openai.createChatCompletion({
                model: "gpt-3.5-turbo",
                messages: [{ role: "user", content: message }],
            });

            var resultMsg = response.data.choices[0].message;

            //현재 접속자에게만 발송
            socket.emit("receiveAll", `${resultMsg.role}:${resultMsg.content}`);
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

        // 그룹 채팅방 입장처리
        socket.on("entry", async(channelId, nickName) => {

            // 서버소켓에서 채팅방을 채널아이디값으로 생성함.
            // 동일한 채팅방이 존재하면 그냥쓰고, 없으면 채팅방이 자동으로 생성함.
            // socket.join(개설하려는 채팅방(채널)아이디);
            // 현재 entry를 호출하는 클라이언트 connectionid 값을 해당 채팅방 사용자로 추가
            socket.join(channelId);

            // 현재 서버이벤트 수신기(entry)를 호출한 사용자(클라이언트) 1명에게만 메시지를 보내고 싶을때 
            // socket.emit("클라이언트이벤트 수신기명", 클라이언트에게 보낼 메시지데이터);
            socket.emit("entryOk", `${nickName}님으로 ${channelId}방에 입장했습니다.`);

            // 지정한 채널(채팅방)내 현재 접속자를 제외한 모든 채팅방 사용자에게 메시지를 전송하고 싶을 때
            // socket.to("채널아이디=채팅방아이디").emit(클라이언트이벤트 수신기명", 클라이언트에게 보낼 메시지데이터);
            socket.to(channelId).emit("entryOk", `${nickName}님이 ${channelId} 방에 입장했습니다.`);

        });

        // 그룹채팅 서버 메시지 수신기 기능 정의 
        socket.on("send", async(data) => {

            // 지정된 채팅방에 접속해있는 나(현재호출자)를 포함한 모든 채팅방 접속자에게 메시지를 보낸다.
            // io.to(채널아이디).emit("클라이언트이벤트수신기명", 전달할 데이터);
            io.to(data.channelId).emit("receiveGroupMsg", data);

        });

        // 채팅방 나가기 처리 이벤트 수신기 
        socket.on("exit", async(channelId, nickName) => {

            socket.leave(channelId);
            socket.emit("leaveOk", `채팅방을 퇴장했습니다.`);
            socket.to(channelId).emit("leaveOk", `${nickName}님이 채팅방을 퇴장했습니다..`);

        });

        // 연결된 소켓 종료하기 
        // 클라이언트와 서버 소켓을 끊는다.
        socket.on("goodbye", async() => {
            
            socket.disconnect();

        });

    });

};