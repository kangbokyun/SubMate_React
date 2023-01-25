import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router';
import { Link } from 'react-router-dom';
import { call } from '../../Service/APIService';
import Header from '../Header';
import Menu from '../Menu';

function Chat() {
    // 윈도우 크기 변경 감지되면 리렌더링
    const [ windowWidth, setWindowWidth ] = useState(0);
    const [ windowHeight, setWindowHeight ] = useState(0);
    let resizeWindow = () => {
        setWindowWidth(window.innerWidth);
        setWindowHeight(window.innerHeight);
    };

    const userInfo = JSON.parse(localStorage.getItem("UserInfo"));

    const [ roomList, setRoomList ] = useState([]);
    const [ chatList, setChatList ] = useState([]);
    const formData = new FormData();
    formData.append("mno", userInfo.mno);
    useEffect(() => {
        call("/ChatRoomList", "POST", formData)
        .then((res) => { console.log("/ChatRoomList/Res : ", res); setRoomList(res) });
        resizeWindow();
        window.addEventListener("resize", resizeWindow);
        return () => window.removeEventListener("resize", resizeWindow);
    }, []);
    // /윈도우 크기 변경 감지되면 리렌더링

    const history = useNavigate();
    const goToInChat = (roomname, sendername, senderno, receivername, receiverno, roomno, sgender, rgender) => {
        history("/InChat", {
            state: {
                "roomname": roomname,
                "sendername": sendername,
                "senderno": senderno,
                "receivername": receivername,
                "receiverno": receiverno,
                "roomno": roomno,
                "sgender" : sgender,
                "rgender" : rgender
            }
        });
    };

    return(
        <div>
            <Header />
            { window.innerWidth <= 767 ? 
                <div><h1 style = {{ marginLeft: "3vw", marginTop: "8vh", marginBottom: "1.5vh" }}>Chat</h1></div> : 
                <h1 style = {{ marginLeft: "6vw", marginTop: "8vh" }}>Chat</h1> 
            }
            <div className = { window.innerWidth <= 767 ? "" : "container" }>
                <table className = "table table-striped" style = {{ height: "81.5vh" }}>
                    <tbody>
                        { roomList.map((list) => 
                            <tr onClick = { () => goToInChat(list.roomname, list.sendername, list.senderno, list.receivername, list.receiverno, list.roomno, list.sgender, list.rgender) } className = "row" style = {{ width: "100%", margin: "auto" }} key = { list.roomno }>
                                <td className = "col-12">
                                    <div className = "row" style = {{ width: "100%" }}>
                                        <div className = "col-3" style = {{ textAlign: "center" }}>
                                            { list.sendername !== userInfo.mnickname ? 
                                                <img alt = "" src = { require('../../MemberImg/' + list.simg) } style = {{ width: "15vw", height: "7vh", objectFit: "cover" }} />
                                                :
                                                <img alt = "" src = { require('../../MemberImg/' + list.rimg) } style = {{ width: "15vw", height: "7vh", objectFit: "cover" }} />
                                            }
                                        </div>
                                        <div className = "col-9">
                                            <div className = "row">
                                                <div className = "col-12">
                                                    <div className = "row" style = {{ marginTop: "0.8vh" }}>
                                                        <div className = "col-7">
                                                            { list.sendername === userInfo.mnickname ? 
                                                                list.receivername
                                                                :
                                                                list.sendername
                                                            }
                                                        </div>
                                                        <div className = "col-5">
                                                            { list.createdate.substring(2, 10) }
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className = "col-12">
                                                    <div className = "row">
                                                        <div className = "col-12" style = {{ marginTop: "0.4vh", color: "#a3a3a3" }}>
                                                            { list.chlastmessage }
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </td>
                            </tr>
                        ) }
                    </tbody>
                </table>
            </div>
            <Menu />
        </div>
    );
};
export default Chat;