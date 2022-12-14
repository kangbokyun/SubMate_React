import React, { useEffect, useState } from 'react';
import SockJS from 'sockjs-client';
import { over } from 'stompjs';
import Header from '../Header';
import Menu from '../Menu';
// import './Chat.css';

// 스프링에서 Stomp 사용
// 웹 소켓의 서브 프로토콜인 stomp 위에서 sockJS가 정상적으로 작동되고 stomp 프로토콜 환경에서
// sockJS에서 제공하는 프로토콜 연결, 메세지 전송, 상대방 구독 기능을 제공
let sotmpClient = null;

function Chat() {

        // 개인 채팅 메세지
        const [ privateChats, setPrivateChats ] = useState(new Map());

        // 채팅 메세지
        const [ publicChats, setPublicChats ] = useState([]);

        // 채팅룸 상태
        const [ room, setRoom ] = useState("Room");

        const [ userData, setUserData ] = useState({
            username: '',
            receivername: '',
            connected: '',
            message: ''
        });

        const connect = () => {
            // 연결할 sockJS의 인자로 프로토콜의 URI를 입력, 입의의 변수에 할당 => stomp 프로토콜 위에 sockJS가 돌아가도록 Stomp.over() 메소드의 인자로 소켓 변수 할당
            // 상황에 따라 sotmpClient라는 변수에 서버 연결, 메세지 전송, 상대방 구독 관련 값을 추가 할당하기에 자주 사용됨
            let Sock = new SockJS("http://localhost:8080/ws");
            sotmpClient = over(Sock);

            // 서버 연결
            // 서버에 연결하기 위해 서버에 connect 프레임 전송
            // 프레임이란? 명령어, 선택사항인 헤더 집합, 선택사항인 body로 구성되어 있으며, 이 프레임을 클라이언트와 주고 받음으로써 통신을 실시간으로 상호작용 할 수 있다.
            // {} : connect 프레임을 전송할 때 같이 전송하는 헤더를 설정하는 부분
            // 연결 완료 시 콜백 함수가 실행 => 콜백 함수를 통해 서버 연결 후에 취할 다양한 액션을 넣을 수 있다.
            // 연결 시 취할 액선 onConnected, onError
            sotmpClient.connect({}, onConnected, onError);
        };

        const onConnected = () => {
            setUserData({ ...userData, "connected" : true });

            // subscribe()의 첫번째 인자는 구독할 URI, 두번째 인자는 구독한 후에 실행될 콜백함수이며 구독 이후, 세번째 인자는 subscribe 프레임을 전송할 때 같이 보내는 헤더를 설정
            // 상대방로부터 메세지를 수신받을 때마다 해당 콜백 함수 실행
            // 메세지 수신 액션 구독
            sotmpClient.subscribe("/room/public", onMessageReceived);

            // 개인 메세지 수신 액션 구독 해당 메세지에 데이터 전달
            sotmpClient.subscribe("/user/" + userData.username + "/private", onPrivateMessage)

            userJoin();
        };

        // 연결 될 경우 userJoin을 통해 JOIN 상태 값과 유저 이름을 전송한다.
        const userJoin = () => {
            let chatMessage = {
                senderName: userData.username,
                status: "JOIN"
            };
            sotmpClient.send("/app/message", {}, JSON.stringify(chatMessage));
        };

        // 메세지를 수신받은 payload 확인
        const onMessageReceived = (payload) => {
            let payloadData = JSON.parse(payload.body);
            switch(payloadData.status) {
                case "JOIN": // JOIN일 경우
                    if(!privateChats.get(payloadData.senderName)) {
                        privateChats.set(payloadData.senderName, []);
                        setPrivateChats(new Map(privateChats));
                    } break;
                case "MESSAGE":
                    publicChats.push(payloadData);
                    setPublicChats([ ...publicChats ]);
                    break;
                default:
                    break;
            }
        };

        // 전달받은 payload 확인
        const onPrivateMessage = (payload) => {
            console.log("payload : ", payload);
            let payloadData = JSON.parse(payload.body);

            // privateChats의 map타입에서 해당 senderName(메세지를 보낸 사람)의 키가 일치하면
            if(privateChats.get(payloadData.senderName)) {
                // 해당 키의 값에 value 를 push
                privateChats.get(payloadData.senderName).push(payloadData);

                // push한 값을 기존의 privateChats state에 전달
                setPrivateChats(new Map(privateChats));
            } else {
                let list = [];
                // privateChats의 키와 다르다면 리스트의 값에 담아 key와 value값을 privateChats에 담는다.
                privateChats.set(payloadData.senderName, list);
                setPrivateChats(new Map(privateChats));
            }
        };

        // 에러가 나면
        const onError = (err) => {
            // 에러 로그 찍기
            console.log("Error : ", err);
        };

        // handleMessage를 onChate를 통해 값 state로 메세지 전달
        const handleMessage = (e) => {
            const { value } = e.target;
            setUserData({ ...userData, "message" : value });
            console.log("handleMessage_userData : ", userData);
        };

        const sendValue = () => {
            // stompClient에 소켓이 존재한다면 /app/message로 값을 전달
            if(sotmpClient) {
                let chatMessage = {
                    senderName: userData.username,
                    message: userData.message,
                    status: "MESSAGE"
                };

                console.log("sendValue_Message : ", chatMessage);
                sotmpClient.send("/app/message", {}, JSON.stringify(chatMessage));
                setUserData({ ...userData, "message" : "" });
            }
            console.log("sendValue_UserData : ", userData);
        };

        const sendPrivateValue = () => {
            // stompClient에 소켓이 존재한다면 /app/private-message로 값을 전달, 현재 room상태를 전달한다.
            // room은 개인아이디 상태 or CHATROOM(PublicChat)을 나타냄
            if(sotmpClient) {
                let chatMessage = {
                    senderName: userData.username,
                    receiverName: room,
                    message: userData.message,
                    status: "MESSAGE"
                };

                // 클라이언트의 username과 room의 이름이 다르면
                if(userData.username !== room) {
                    // privateChats의 키가 room의 이름 value값에 chatmessage 상태 값들을 저장
                    privateChats.get(room).push(chatMessage);

                    // map 형으로 바꾼 후 state 값에 전달
                    setPrivateChats(new Map(privateChats));
                }

                sotmpClient.send("/app/private-message", {}, JSON.stringify(chatMessage));

                // 클라이언트 상태의 데이터에 message를 담는다. 데이터를 쌓기 위해 깊은 복사 사용
                setUserData({ ...userData, "message" : "" });
                console.log("sendPrivateValue_UserData : ", userData);
                console.log("Check");
            }
        };

        // 등록할 때 사용
        const handleUserName = (e) => {
            const { value } = e.target;
            setUserData({ ...userData, "username" : value });
        };

        // connect 함수 실행으로 서버 연결
        const registerUser = () => {
            connect();
        };

    return(
        <div>
            <Header />
            { window.innerWidth <= 767 ? 
                <div><h1 style = {{ marginLeft: "3vw", marginTop: "10vh" }}>Chat</h1></div> : 
                <h1 style = {{ marginLeft: "6vw", marginTop: "10vh" }}>Chat</h1> 
            }
            <div className = { window.innerWidth <= 767 ? "" : "container" } stlye = {{ border: "solid 1px black" }}>
                { userData.connected ?
                    <div>
                        { room === "Room" && <div>
                            <ul style = {{ border: "solid 1px black", height: "30vh" }}>
                                { publicChats.map((chat, index) => (
                                    <div key = { index }>
                                        <h6>{ chat.senderName }</h6>
                                        { chat.message }
                                    </div>
                                )) }
                            </ul>
                            <div>
                                {/* state에 message 전달(onChange) */}
                                <input type = "text" placeholder = "메세지를 입력하세요." value = { userData.message } onChange = { handleMessage } />
                                {/* 버튼 누르면 서버로 유저 정보 및 액션 상태, 메세지를 전달 */}
                                <button type = "button" onClick = { sendValue }>Send</button>
                            </div>
                        </div> }

                        {/* room이 "Room"이 아니라면 개인 메세지 상태 */}
                        { room !== "Room" && <div>
                            <ul>
                                {/* privateChats.get(room) 탭에 해당하는 채팅 메세지 출력 */}
                                {[ ...privateChats.get(room) ].map((chat, index) => (
                                    <li className = {`message ${ chat.senderName === userData.username && "self" }`} key = { index }>
                                        {/* 해당 채팅을 보내는 이름과 현재 클라이언트의 이름이 같이 않다면 상대 프로필 활성화 */}
                                        { chat.senderName !== userData.username && <div>{ chat.senderName }</div> }

                                        {/* 메세지 보내기 */}
                                        <div>{ chat.message }</div>

                                        {/* 해당 채팅을 보내는 이름과 현재 클라이언트의 이름이 같다면 내 프로필 활성화 */}
                                        { chat.senderName === userData.username && <div>{ chat.senderName }</div> }
                                    </li>
                                ))}
                            </ul>
                            {/* 메세지 보내는 곳 */}
                            <div>
                                <input type = "text" placeholder = "메세지를 입력하세요." value = { userData.message } onChange = { handleMessage } />
                                <button type = "button" onClick = { sendPrivateValue }>Send</button>
                            </div>
                        </div> }
                    </div>
                    :
                    // 연결 안됨
                    <div>
                        <input id = "user-name" placeholder = "이름을 입력하세요." name = "userName" value = { userData.username } onChange = { handleUserName } />
                        <button type = "button" onClick = { registerUser }>connect</button>
                    </div>
                }
            </div>
            <Menu />
        </div>
    );
};
export default Chat;