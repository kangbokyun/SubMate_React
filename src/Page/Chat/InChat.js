import { calculateNewValue } from '@testing-library/user-event/dist/utils';
import React, { useEffect, useRef, useState } from 'react';
import { ListGroup } from 'react-bootstrap';
import { useLocation, useNavigate } from 'react-router';
import SockJS from 'sockjs-client';
import { over } from 'stompjs';
import Header from '../Header';
import Menu from '../Menu';
import { call } from '../../Service/APIService';

// 스프링에서 Stomp 사용
// 웹 소켓의 서브 프로토콜인 stomp 위에서 sockJS가 정상적으로 작동되고 stomp 프로토콜 환경에서
// sockJS에서 제공하는 프로토콜 연결, 메세지 전송, 상대방 구독 기능을 제공
let sotmpClient = null;

function InChat() {
    const userInfo = JSON.parse(localStorage.getItem("UserInfo"));
    // 메이트에서 값 넘겨 받아 채팅 기본 데이터 세팅 완료
    // 넘겨 받은 값을 이용해 서버에서 센더와 리시버를 이용해 조건 충족 시 룸네임 가져오기
    // 서로 채팅
    // 내가 센더거나 리시버라면 채팅 목록 가져와서 챗 페이지에 뿌리기

    const chatDTO = useLocation();

    // 윈도우 크기 변경 감지되면 리렌더링
    const [ windowWidth, setWindowWidth ] = useState(0);
    const [ windowHeight, setWindowHeight ] = useState(0);
    let resizeWindow = () => {
        setWindowWidth(window.innerWidth);
        setWindowHeight(window.innerHeight);
    };

    // /윈도우 크기 변경 감지되면 리렌더링
    // 뒤로가기
    const history = useNavigate();
    const GoBack = () => {
        return history(-1) // 한 페이지 뒤로
    };
    // Mate에서 채팅 신청을 하면 상대한테 알림
    // 알림이 오면 채팅하기나 거부를 선택
    // 채팅 선택 시 신청, 확인하는 사람의 PK를 이용해 고유값 생성 여기서 고유값이 방 아이디 or 방 번호
    // 채팅 탭 클릭 시 회원 번호에 일치하는 방 리스트 출력
    // 방 클릭 시 해당하는 방 입장
    // 대화

        // 개인 채팅 메세지
        const [ privateChats, setPrivateChats ] = useState(new Map());
        
        // 채팅 메세지
        const [ publicChats, setPublicChats ] = useState([]);
        
        const scrollRef = useRef();

        const [ chatData, setChatData ] = useState({});
        const [ chatList, setChatList ] = useState([]);

        useEffect(() => {
            const formData = new FormData();
            formData.append("roomname", chatDTO.state.roomname);
            call("/ChatHistoryList", "POST", formData)
            .then((res) => { console.log("ChatHistory/Res : ", res); setChatList(res); });
            console.log("chatDTO : ", chatDTO);
            connect();
            resizeWindow();
            window.addEventListener("resize", resizeWindow);
            return () => window.removeEventListener("resize", resizeWindow);
        }, []);

        // 채팅룸 상태
        const [ room, setRoom ] = useState(chatDTO.state.roomname);

        const [ userData, setUserData ] = useState({
            username: '',
            receiverName: '',
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
            if(room === "Room") {
                sotmpClient.subscribe("/room/public", onMessageReceived);
            } else {
                console.log("userData.username : ", userData.username);
                sotmpClient.subscribe("/user/" + chatDTO.state.roomname + "/private", onPrivateMessage)
            }

            // 개인 메세지 수신 액션 구독 해당 메세지에 데이터 전달

            userJoin();
        };

        // 연결 될 경우 userJoin을 통해 JOIN 상태 값과 유저 이름을 전송한다.
        const userJoin = () => {
            let chatMessage = {
                senderName: chatDTO.state.sendername,
                receiverName: room,
                status: "JOIN"
            };

            if(room === "Room") {
                sotmpClient.send("/app/message", {}, JSON.stringify(chatMessage));
            } else {
                sotmpClient.send("/app/private-message", {}, JSON.stringify(chatMessage));
            }
        };

        // 메세지를 수신받은 payload 확인
        const onMessageReceived = (payload) => {
            console.log("PublicPayload : ", payload);
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
            let payloadData = JSON.parse(payload.body);
            console.log("PrivatePayload : ", payloadData);
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
                    senderName: userInfo.mnickname,
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
                    senderName: userInfo.mnickname,
                    message: userData.message,
                    receiverName: chatDTO.state.roomname,
                    senderno: chatDTO.state.senderno,
                    mgender: userInfo.mnickname === chatDTO.state.sendername ? chatDTO.state.sgender : chatDTO.state.rgender,
                    status: "MESSAGE"
                };

                console.log("sendValue_Message : ", chatMessage);
                sotmpClient.send("/app/private-message", {}, JSON.stringify(chatMessage));
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

    return(
        <div>
            <Header />
            { window.innerWidth <= 767 ? 
                <div>
                    <h1 style = {{ marginLeft: "1vw", marginTop: "8vh", marginBottom: "1.5vh" }}>
                        <span onClick = { GoBack } style = {{ marginRight: "1.5vw" }}>&#10094;</span>
                        InChat : { userInfo.mnickname === chatDTO.state.sendername ? chatDTO.state.receivername : chatDTO.state.sendername }
                    </h1>
                </div> : 
                <h1 style = {{ marginLeft: "6vw", marginTop: "8vh" }}>InChat</h1> 
            }
            <div className = { window.innerWidth <= 767 ? "" : "container" } stlye = {{  }}>
                <div className = "row" style = {{ width: "100%" }}>
                    { room === "Room" && <div>
                        <ul style = {{ height: "30vh" }}>
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
                    { room !== "Room" && <div className = "row" style = {{ width: "100%" }}>
                        <ul style = {{ height: "74.5vh", overflowY: "scroll", marginLeft: "5.5vw" }} ref = { scrollRef }>
                            { chatList.map((list) =>
                                <div key = { list.chno } style = {{  }}>
                                    { list.chsendername === userInfo.mnickname ? 
                                    <label className = "row" style = {{ width: "100%", marginTop: "1.5vh", float: "left" }}>
                                        <div className = "col-3" style = {{ textAlign: "left" }}>
                                            { list.chsendername }
                                        </div>
                                        <div className = "col-10" style = {{ textAlign: "left" }}>
                                            <label style = {{ // "#fdc6d5" : "#a7c2f7"
                                                backgroundColor: userInfo.mnickname === chatDTO.sendername ? 
                                                userInfo.mgender === "Woman" ? "#fdc6d5" : "#a7c2f7" :
                                                userInfo.mgender === "Woman" ? "#fdc6d5" : "#a7c2f7",
                                                paddingLeft: "2vw", 
                                                borderRadius: "8px", 
                                                paddingTop: "0.4vh", 
                                                paddingRight: "2vw" ,
                                                paddingBottom: "0.4vh"
                                            }}>
                                                { list.chcontents }<br />
                                            </label>
                                        </div>
                                    </label>
                                    : 
                                    <label className = "row" style = {{ width: "100%", marginTop: "1.5vh", float: "right" }}>
                                        <div className = "col-3 offset-9" style = {{ textAlign: "right" }}>
                                            { list.chsendername }
                                        </div>
                                        <div className = "col-10 offset-2" style = {{ textAlign: "right" }}>
                                            <label style = {{ 
                                                backgroundColor: userInfo.mnickname === chatDTO.sendername ? 
                                                userInfo.mgender === "Woman" ? "#a7c2f7" : "#fdc6d5" :
                                                userInfo.mgender === "Woman" ? "#a7c2f7" : "#fdc6d5", 
                                                paddingLeft: "2vw", 
                                                borderRadius: "8px", 
                                                paddingTop: "0.4vh", 
                                                paddingRight: "2vw" ,
                                                paddingBottom: "0.4vh"
                                            }}>{ list.chcontents }</label>
                                        </div>
                                    </label>
                                }
                            </div>
                            ) }
                            {/* privateChats.get(room) 탭에 해당하는 채팅 메세지 출력 */}
                                { publicChats.map((chat, index) => 
                                    <div key = { index } style = {{  }}>
                                        { chat.senderName === userInfo.mnickname ? 
                                        <label className = "row" style = {{ width: "100%", marginTop: "1.5vh", float: "left" }}>
                                            <div className = "col-3" style = {{ textAlign: "left" }}>
                                                { chat.senderName }
                                            </div>
                                            <div className = "col-10" style = {{ textAlign: "left" }}>
                                                <label style = {{ 
                                                    backgroundColor: userInfo.mnickname === chatDTO.sendername ? 
                                                    userInfo.mgender === chatDTO.state.sgender ? "#fdc6d5" : "#a7c2f7" : userInfo.mgender === chatDTO.state.rgender ? "#fdc6d5" : "#a7c2f7", 
                                                    paddingLeft: "2vw", 
                                                    borderRadius: "8px", 
                                                    paddingTop: "0.4vh", 
                                                    paddingRight: "2vw" ,
                                                    paddingBottom: "0.4vh"
                                                }}>
                                                    { chat.message }<br />
                                                </label>
                                            </div>
                                        </label>
                                        : 
                                        <label className = "row" style = {{ width: "100%", marginTop: "1.5vh", float: "right" }}>
                                            <div className = "col-3 offset-9" style = {{ textAlign: "right" }}>
                                                { chat.senderName }
                                            </div>
                                            <div className = "col-10 offset-2" style = {{ textAlign: "right" }}>
                                                <label style = {{ 
                                                    backgroundColor: userInfo.mnickname === chatDTO.receivername ? 
                                                    userInfo.mgender === chatDTO.state.sgender ? "#fdc6d5" : "#a7c2f7" : userInfo.mgender === chatDTO.state.rgender ? "#a7c2f7" : "#fdc6d5", 
                                                    paddingLeft: "2vw", 
                                                    borderRadius: "8px", 
                                                    paddingTop: "0.4vh", 
                                                    paddingRight: "2vw" ,
                                                    paddingBottom: "0.4vh"
                                                }}>{ chat.message }</label>
                                            </div>
                                        </label>
                                    }
                                </div>
                            ) }
                        </ul>
                        {/* 메세지 보내는 곳 */}
                            <div className = "col-10" style = {{  }}>
                                <input className = "form-control" type = "text" placeholder = "메세지를 입력하세요." value = { userData.message } onChange = { handleMessage } style = {{ marginLeft: "4vw", width: "100%" }} />
                            </div>
                            <div className = "col-2 gx-0" style = {{  }}>
                                <button className = "btn btn-info" style = {{ width: "100%", paddingLeft: "1.7vw", color: "white", marginLeft: "5vw" }} type = "button" onClick = { sendPrivateValue }>Send</button>
                            </div>
                    </div> }
                </div>
            </div>
            <Menu />
        </div>
    );
};
export default InChat;