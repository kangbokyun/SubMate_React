import React from 'react';
import { useState } from 'react';
import { useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router';
import { call, ReplyWriteAPI } from '../../../Service/APIService';
import Header from '../../Header';
import Menu from '../../Menu';
import '../../../Component/Accordion/Accordion.css';

function BoardReply() {
    // 윈도우 크기 변경 감지되면 리렌더링
    const [ windowWidth, setWindowWidth ] = useState(0);
    const [ windowHeight, setWindowHeight ] = useState(0);
    let resizeWindow = () => {
        setWindowWidth(window.innerWidth);
        setWindowHeight(window.innerHeight);
    };
    
    // bno, bwriter, bcontents, becho, bechotimer
    const boardData = useLocation();
    // let bno = boardData.state.bno;

    const [ replyList, setReplyList ] = useState([]);
    useEffect(() => {
        call("/Board/ReplyList", "POST", boardData.state.bno)
        .then((res) => {
            console.log(res);
            setReplyList(res);
        });
        resizeWindow();
        window.addEventListener("resize", resizeWindow);
        return () => window.removeEventListener("resize", resizeWindow);
    }, []);
    // /윈도우 크기 변경 감지되면 리렌더링
    // 뒤로가기
    const history = useNavigate();
    const GoBack = () => {
        return history(-1) // 한 페이지 뒤로
    };

    // 스위치 아코디언
    const items = document.querySelectorAll(".accordian-item");
    items.forEach((item) => {
        item.addEventListener("click", (e) => {
            item.classList.toggle("active");
            const elementBody = item.querySelector(".accordian-body");
            if (item.classList.contains("active")) {
                elementBody.style.maxHeight = elementBody.scrollHeight + "px";
            } else {
                elementBody.style.maxHeight = 0;
            }
        });
    });
    // -/스위치 아코디언

    const [ writeReply, setWriteReply ] = useState("");
    const getReply = (e) => {
        const userInfo = JSON.parse(localStorage.getItem("UserInfo"));
        if(e.target.value.length !== 0) {
            setWriteReply({ 
                [e.target.name] : e.target.value,
                "mno" : userInfo.mno,
                "bno" : boardData.state.bno,
                "rwriter" : userInfo.mnickname
            });
        }
    };

    const sendReply = () => {
        ReplyWriteAPI(writeReply);
    };

    return(
        <div>
            <Header />
            { window.innerWidth <= 767 ? 
                <div>
                    <h1 style = {{ marginLeft: "1vw", marginTop: "10vh" }}>
                        <span onClick = { GoBack } style = {{ marginRight: "1.5vw" }}>&#10094;</span>
                        BoardReply
                    </h1>
                </div>
                : 
                <h1 style = {{ marginLeft: "6vw", marginTop: "10vh" }}>BoardReply</h1> 
            }
            <div className = { window.innerWidth <= 767 ? "" : "container" }>
                <div style = {{ borderBottom: "solid 1px gray" }}>
                    <div className = "row" style = {{ width: "100%" }}>
                        <div className = "col-3 col-md-3" style = {{ marginBottom: "1.5vh" }}>
                            <img alt = "" 
                                src = { require('../../../IMG/임시프사2.jpg') } 
                                style = {{ 
                                    width: window.innerWidth <= 767 ? "20vw" : "10vw", 
                                    objectFit: "cover", 
                                    height: window.innerWidth <= 767 ? "8.5vh" : "8.5vh", 
                                    borderRadius: "23px",
                                    paddingLeft: "1vh"
                                }} 
                            />
                        </div>
                        <div className = "col-9 col-md-9">
                            <div className = "row">
                                <div className = "col-3 col-md-3" style = {{ marginTop: "0.8vh" }}>
                                    <h3>{ boardData.state.bwriter }</h3>
                                </div>
                                <div className = "col-7 col-md-7" style = {{ textAlign: "center" }}>
                                    <span style = {{ fontSize: "0.8rem", float: "right", marginTop: "1.4vh" }}>{ boardData.state.bview }</span>
                                    <span style = {{ fontSize: "0.8rem", float: "right", marginTop: "1.4vh", marginLeft: "0.7vw", marginRight: "0.7vw" }}>·</span>
                                    <span style = {{ fontSize: "0.8rem", float: "right", marginTop: "1.4vh" }}>Date</span>
                                </div>
                                <div className = "col-2 col-md-2">
                                    <img alt = "" 
                                        src = { require('../../../IMG/BoardHeart_Black.png') } 
                                        style = {{ 
                                            width: window.innerWidth <= 767 ? "6vw" : "3vw", 
                                            height: window.innerWidth <= 767 ? "3vh" : "",
                                            marginTop: "0.8vh"
                                        }} 
                                    />      
                                </div>
                                <div className = "col-12 col-md-12">
                                    <label style = {{ marginTop: "1vh" }}>{ boardData.state.bcontents }</label>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div style = {{ height: window.innerWidth <= 767 ? "65vh" : "67vh", overflowY: "auto" }}>
                    <table className = "table" style = {{  }}>
                        <tbody>
                            { replyList.map((list) => 
                                <tr key = { list.rno }>
                                    <td>
                                        <div className = "row" style = {{ width: "100%" }}>
                                            <div className = "col-3 col-md-3">
                                                <img alt = "" src = { require('../../../IMG/BoardPicture_Black.png') } style = {{ width: window.innerWidth <= 767 ? "20vw" : "8vw", marginLeft: window.innerWidth <= 767 ? "" : "" }} />
                                            </div>
                                            <div className = "col-9 col-md-9">
                                                <div className = "row">
                                                    <div className = "col-3" style = {{ marginTop: "0.8vh" }}>
                                                        {list.rwriter}
                                                    </div>
                                                    <div className = "col-7">
                                                        <span style = {{ fontSize: "0.8rem", float: "right", marginTop: "1.2vh" }}>답글 n개</span>
                                                        <span style = {{ fontSize: "0.8rem", float: "right", marginTop: "1.2vh", marginLeft: "1vw", marginRight: "1vw" }}>·</span>
                                                        <span style = {{ fontSize: "0.8rem", float: "right", marginTop: "1.2vh" }}>Date</span>
                                                    </div>
                                                    <div className = "col-2">
                                                        <img alt = "" 
                                                            src = { require('../../../IMG/BoardHeart_Black.png') } 
                                                            style = {{ 
                                                                width: window.innerWidth <= 767 ? "6vw" : "3vw", 
                                                                height: window.innerWidth <= 767 ? "3vh" : "",
                                                                marginTop: "0.7vh"
                                                            }} 
                                                        /> 
                                                    </div>
                                                    <div className = "col-12">
                                                        { list.rcontents }
                                                    </div>
                                                    <div className = "col-12">
                                                        <div className="accordian" style = {{ width: "100%" }}>
                                                            <div className="accordian-item">
                                                                <div className="accordian-header">답글</div>
                                                                <div id="1" className="accordian-body">
                                                                    <div className="accordian-body-content">
                                                                        { list.rno }
                                                                    </div>
                                                                </div>
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
                <div className = "row gx-0" style = {{ width: "100%" }}>
                    <div className = "col-10 col-md-10" style = {{  }}>
                        <input type = "text" name = "rcontents" className = "form-control" onChange = { getReply } style = {{ width: "95%", marginLeft: "1.5vw" }} />
                    </div>
                    <div className = "col-2 col-md-2">
                        <button type = "button" className = "btn btn-success" onClick = { sendReply } style = {{ width: "95%" }}>Send</button>
                    </div>
                </div>
            </div>
            <Menu />
        </div>
    );
}
export default BoardReply;