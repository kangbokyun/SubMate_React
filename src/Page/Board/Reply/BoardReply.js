import React from 'react';
import { useState } from 'react';
import { useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router';
import { call, ReplyWriteAPI } from '../../../Service/APIService';
import Header from '../../Header';
import Menu from '../../Menu';

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

    const [ writeReply, setWriteReply ] = useState("");
    const getReply = (e) => {
        const userInfo = JSON.parse(localStorage.getItem("UserInfo"));
        if(e.target.value.length !== 0) {
            console.log(
                "mno : ", userInfo.mno, 
                " bno : ", boardData.state.bno,
                " bwriter : ", boardData.state.bwriter,
                " rcontents : ", e.target.value
            )
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
            <div className = { window.innerWidth <= 767 ? "" : "container" } style = {{  }}>
                <div className = { window.innerWidth <= 767 ? "row" : "" } style = {{ width: "100%" }}>
                    <div className = "col-3" style = {{ textAlign: "center" }}>Img</div>
                    <div className = "col-4" style = {{ textAlign: "center" }}>{ boardData.state.bwriter }</div>
                    <div className = "col-3" style = {{ textAlign: "center" }}>Date　·</div>
                    <div className = "col-2" style = {{ textAlign: "center" }}>{ boardData.state.bview }</div>
                </div>
                <div className = { window.innerWidth <= 767 ? "row" : "" } style = {{ width: "100%", borderBottom: "solid 1px gray", marginBottom: "1vh" }}>
                    <div className = "col-12" style = {{ marginLeft: "1.5vw", marginTop: "1vh" }}>{ boardData.state.bcontents }</div>
                </div>
                <div className = "row" style = {{ height: "", overflowY: "auto", width: "100%" }}>
                    <table className = "table col-12" style = {{ marginBottom: "5.5vh" }}>
                        <tbody>
                            { replyList.map((list) => 
                                <tr style = {{ width: "100%" }}>
                                    <td className = "row" style = {{ width: "100%" }}>
                                        <div className = "col-3" style = {{  }}>
                                            <label>
                                                <img alt = "" src = { require('../../../IMG/BoardPicture_Black.png') } style = {{ width: "100%" }} />
                                            </label>
                                        </div>
                                        <div className = "col-9">
                                            <div className = "row">
                                                <div className = "col-4">
                                                    <label>{ list.rwriter }</label>
                                                </div>
                                                <div className = "col-6">
                                                    <label>
                                                        <span style = {{ fontSize: "0.8rem" }}>4분전</span>
                                                        <span style = {{ fontSize: "0.8rem", marginLeft: "0.7vw", marginRight: "0.7vw" }}>·</span>
                                                        <span style = {{ fontSize: "0.8rem" }}>1042개</span>
                                                    </label>
                                                </div>
                                                <div className = "col-2">
                                                    <label>
                                                    <img alt = "" src = { require('../../../IMG/BoardHeart_Black.png') } style = {{ width: "100%" }} />
                                                    </label>
                                                </div>
                                                <div className = "col-12">
                                                    <label style = {{ marginTop: "1vh" }}>{ list.rcontents }</label>
                                                </div>
                                            </div>
                                        </div>
                                    </td>
                                </tr>
                            ) }
                        </tbody>
                    </table>
                </div>
                <div className = "row" style = {{ borderTop: "solid 1px gray", width: "100%", paddingTop: "1vh" }}>
                    <div className = "col-9" style = {{  }}>
                        <input type = "text" name = "rcontents" className = "form-control" onChange = { getReply } style = {{ height: "4.6vh", outline: "none", marginLeft: "1.5vh" }} placeholder = "댓글을 입력해주세요." />
                    </div>
                    <div className = "col-3">
                        <button type = "button" className = "btn btn-success" onClick = { sendReply } style = {{ height: window.innerWidth <= 767 ? "4.6vh" : "", width: window.innerWidth <= 767 ? "100%" : "" }}>Send</button>
                    </div>
                </div>
            </div>
            <Menu />
        </div>
    );
}
export default BoardReply;