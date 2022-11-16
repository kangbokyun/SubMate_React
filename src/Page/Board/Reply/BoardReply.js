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
            <div className = {window.innerWidth <= 767 ? "" : "container"} style = {{ marginTop: "2vh" }}>
                <div className = "row" style = {{ borderBottom: "solid 1px gray" }}>
                    <div className = "col-3 col-md-3" style ={{ width: "5vw" }}>
                        {/* <img alt = "" src = { require('../../../IMG/임시프사2.jpg') } style = {{ width: window.innerWidth <= 767 ? "25vw" : "10vw", height: window.innerWidth <= 767 ? "10vh" : "10vw", objectFit: "cover", borderRadius: "23px" }} /> */}
                    </div>
                    {/* <div className = "col-9 col-md-9" style = {{ border: "solid 1px blue", marginLeft: "" }}>
                        <div className = "row">
                            <div className = "col-4 col-md-3"><h3><label style = {{ marginTop : "1vh", marginLeft: window.innerWidth <= 767 ? "2.5vw" : "" }}>{ boardData.state.bwriter }</label></h3></div>
                            <div className = "col-6 col-md-6">
                                <span style = {{ float: "right", marginTop: "1.3vh" }}>8개</span>
                                <span style = {{ marginLeft: "1.5vw", marginRight: "1.5vw", float: "right", marginTop: "1.3vh" }}>·</span>
                                <span style = {{ float: "right", marginTop: "1.3vh" }}>11. 16</span>
                            </div>
                            <div className = "col-2 col-md-2" style = {{  }}>
                                <img alt = "" src = { require('../../../IMG/BoardHeart_Black.png') } style = {{ width: window.innerWidth <= 767 ? "100%" : "3vw", float: "right", paddingRight: "0px", marginRight: "0px", marginTop: window.innerWidth <= 767 ? "1.2vh" : "0.7vh" }} />
                            </div>
                            <div className = "col-12 col-md-12">
                                <label style = {{ marginLeft: window.innerWidth <= 767 ? "2.5vw" : "", marginTop: "1vh" }}>{ boardData.state.bcontents }</label>
                            </div>
                        </div>
                    </div> */}
                </div>
            </div>
            <Menu />
        </div>
    );
}
export default BoardReply;
// {/* <div className = "row" style = {{ borderBottom: "solid 1px gray", paddingBottom: "2vh", width: window.innerWidth <= 767 ? "" : "" }}>
//     <div className = "col-3" style = {{ textAlign: "center" }}>Img</div>
//     <div className = "col-9">
//         <div className = "row">
//             <div className = "col-5" style = {{ textAlign: "center" }}>{ boardData.state.bwriter }</div>
//             <div className = "col-7" style = {{ textAlign: "center" }}>
//                 <span style = {{ fontSize: "0.8rem", float: "right" }}>{ boardData.state.bview }</span>
//                 <span style = {{ fontSize: "0.8rem", float: "right", marginLeft: "0.7vw", marginRight: "0.7vw" }}>·</span>
//                 <span style = {{ fontSize: "0.8rem", float: "right" }}>Date</span>
//             </div>
//         </div>
//     </div>
// </div>
// <div className = "row" style = {{ overflowY: "auto" }}>
//     <table className = "table col-12 col-md-12" style = {{ marginBottom: "5.5vh" }}>
//         <tbody>
//             { replyList.map((list) => 
//                 <tr key = { list.rno } style = {{  }}>
//                     <td className = "row" style = {{ marginLeft: window.innerWidth <= 767 ? "" : "", paddingLeft: "0", width: "100%" }}>
//                         <div className = "col-3 col-md2" style = {{ marginLeft: "3.4vw", width: window.innerWidth <= 767 ? "20vw" : "8vw", paddingLeft: "0" }}>
//                             <img alt = "" src = { require('../../../IMG/BoardPicture_Black.png') } style = {{ width: window.innerWidth <= 767 ? "20vw" : "8vw", marginLeft: window.innerWidth <= 767 ? "" : "" }} />
//                         </div>
//                         <div className = "col-9 col-md-10" style = {{ marginLeft: "2vw" }}>
//                             <div className = "row" style = {{ marginTop: "0.3vh" }}>
//                                 <div className = "col-4 col-md-4">
//                                     { list.rwriter }
//                                 </div>
//                                 <div className = "col-6 col-md-6">
//                                         <span style = {{ fontSize: "0.8rem", float: "right" }}>1042개</span>
//                                         <span style = {{ fontSize: "0.8rem", float: "right", marginLeft: "0.7vw", marginRight: "0.7vw" }}>·</span>
//                                         <span style = {{ fontSize: "0.8rem", float: "right" }}>4분전</span>
//                                 </div>
//                                 <div className = "col-2 col-md-2">
//                                     <img alt = "" src = { require('../../../IMG/BoardHeart_Black.png') } style = {{ width: window.innerWidth <= 767 ? "7vw" : "3vw", float: "right" }} />
//                                 </div>
//                                 <div className = "col-12 col-md-12">
//                                     <label style = {{ marginTop: "1vh" }}>{ list.rcontents }</label>
//                                 </div>
//                             </div>
//                         </div>
//                     </td>
//                 </tr>
//             ) }
//         </tbody>
//     </table>
// </div>
// <div className = "row" style = {{ borderTop: "solid 1px gray", paddingTop: "1vh" }}>
//     <div className = "col-9" style = {{  }}>
//         <input type = "text" name = "rcontents" className = "form-control" onChange = { getReply } style = {{ height: "4.6vh", outline: "none", marginLeft: "1.5vh", width: "100%" }} placeholder = "댓글을 입력해주세요." />
//     </div>
//     <div className = "col-3">
//         <button type = "button" className = "btn btn-success" onClick = { sendReply } style = {{ height: window.innerWidth <= 767 ? "4.6vh" : "", width: window.innerWidth <= 767 ? "100%" : "" }}>Send</button>
//     </div>
// </div> */}