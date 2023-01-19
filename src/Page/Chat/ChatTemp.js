// import React, { useEffect, useState } from 'react';
// import SockJS from 'sockjs-client';
// import { over } from 'stompjs';
// import Header from '../Header';
// import Menu from '../Menu';
// // import './Chat.css';

// let stompClient = null;

// function ChatTemp() {
//     const [ privateMessage, setPrivateMessage ] = useState();
//     const [ publicMessage, setPublicMessage ] = useState();
//     const [ room, setRoom ] = useState("Room");
    
//     const connect = () => {
//         const sock = new SockJS("http://localhost:8080/ws");
//         stompClient = over(sock);

//         stompClient.connect({}, onConnected, onError);
//     };

//     const onConnected = () => {
//         stompClient.subscribe()
//     };

//     return(
//         <div>
//             <Header />
//             { window.innerWidth <= 767 ? 
//                 <div><h1 style = {{ marginLeft: "3vw", marginTop: "10vh" }}>Chat</h1></div> : 
//                 <h1 style = {{ marginLeft: "6vw", marginTop: "10vh" }}>Chat</h1> 
//             }
//             <div className = { window.innerWidth <= 767 ? "" : "container" } stlye = {{ border: "solid 1px black", width: "110px" }}>
//                 { userData.connected ?
//                     <div>
                        
//                     </div>
//                     :
//                     // 연결 안됨
//                     <div>
//                         <input id = "user-name" placeholder = "이름을 입력하세요." name = "userName" value = { userData.username } onChange = { handleUserName } />
//                         <button type = "button" onClick = { registerUser }>connect</button>
//                     </div>
//                 }
//             </div>
//             <Menu />
//         </div>
//     );
// };
// export default ChatTemp;