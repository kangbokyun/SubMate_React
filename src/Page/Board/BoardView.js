import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import React from 'react';
import { useEffect } from 'react';
import { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { BoardHeart, BoardReportAPI, call } from '../../Service/APIService';
import Header from '../Header';
import Menu from '../Menu';

function BoardView() {
    const boardDTO = useLocation();
    
    // 윈도우 크기 변경 감지되면 리렌더링
    const [ windowWidth, setWindowWidth ] = useState(0);
    const [ windowHeight, setWindowHeight ] = useState(0);
    let resizeWindow = () => {
        setWindowWidth(window.innerWidth);
        setWindowHeight(window.innerHeight);
    };
    
    let bno = boardDTO.state.bno;
    let bview = boardDTO.state.bview;
    let heart = boardDTO.state.heart;

    useEffect(() => {
        const formData = new FormData();
        formData.append("bno", bno);
        formData.append("bview", bview);
        call("/Board/ViewUpdate", "POST", formData)
        .then((res) => {
            if(res) {
                console.log(res);
            }
        })
        console.log("boardDTO: ", boardDTO);
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

    // 댓글 페이지로
    const replyWrite = (bno, bwriter, bcontents, becho, bechotimer, bview, createdDate, heart, hrno) => {
        history("/BoardReply", {
            state: {
                "bno" : bno,
                "bwriter" : bwriter,
                "bcontents" : bcontents,
                "becho" : becho,
                "bechotimer" : bechotimer,
                "bview" : bview,
                "createdDate" : createdDate,
                "heart" : heart,
                "hrno" : hrno
            }
        });
    };

    const [ likeValue, setLikeValue ] = useState(boardDTO.state.heart);
    const [ likeStatus, setLikeStatus ] = useState([]);
    // 하트
    const clickLike = () => {
        const userInfo = JSON.parse(localStorage.getItem("UserInfo"));
        const formData = new FormData();
        formData.append("hkind", likeValue);
        formData.append("bno", boardDTO.state.bno);
        formData.append("mno", userInfo.mno);
        formData.append("htype", "1");
        formData.append("rno", null);
        if(likeValue === "0") {
            setLikeValue("1");
        } else {
            setLikeValue("0");
            // BoardHeart(heart);
        }
        // BoardHeart(formData);
        call("/Board/Heart", "POST", formData)
        .then((res) => {
            if(res === "") {
                setLikeStatus(res);
            }
        })
    };

    const [ reportStatus, setReportStatus ] = useState("0");
    const [ reportData, setReportData ] = useState({});
    const [ flag, setFalg ] = useState(false);
    
    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    
    const report = (e) => {
        const formData = new FormData();
        const userInfo = JSON.parse(localStorage.getItem("UserInfo"));
        formData.append("mno", Number(userInfo.mno));
        formData.append("reportbno", Number(boardDTO.state.bno));
        formData.append("reportkind", 2);
        if(reportStatus === "0") {
            handleShow();
            if([e.target.name].includes("reportvalue")) {
                setReportData({ ...reportData, [e.target.name] : e.target.value });
            } else if([e.target.name].includes("reportcontents")) {
                setReportData({ ...reportData, [e.target.name] : e.target.value });
            }
            if(e.target.id === "modalBTN") {
                console.log("reportData : ", reportData);
                // 모달
                if(String(reportData.reportvalue) === "0" || reportData.reportvalue === undefined) { alert("신고 구분을 선택해주세요."); return; } 
                if(reportData.reportcontents === undefined) { alert("신고 사유를 작성해주세요."); return; }
                if(reportData.reportvalue !== "0" && reportData.reportcontents !== undefined) {
                    alert("신고되었습니다.\n빠른 시일 내에 내용 검토 후 조치하겠습니다.")
                    setReportStatus("1");
                    formData.append("reportclickvalue", reportStatus);
                    formData.append("reportvalue", reportData.reportvalue);
                    formData.append("reportcontents", reportData.reportcontents);
                    
                    BoardReportAPI(formData);
                    handleClose();
                } else {
                    return;
                }
            }
        } else {
            setReportStatus("0");
            formData.append("reportclickvalue", reportStatus);
            formData.append("reportvalue", reportData.reportvalue);
            formData.append("reportcontents", reportData.reportcontents);
            BoardReportAPI(formData);
        }
    };

    return(
        <div>
            <Header />
            { window.innerWidth <= 767 ? 
                <div>
                    <h1 style = {{ marginLeft: "1vw", marginTop: "10vh" }}>
                        <span onClick = { GoBack } style = {{ marginRight: "1.5vw" }}>&#10094;</span>
                        BoardView
                    </h1>
                </div>
                : 
                <h1 style = {{ marginLeft: "6vw", marginTop: "10vh" }}>BoardView</h1> 
            }
            <div className = { window.innerWidth <= 767 ? "" : "container" }>
                <label style = {{ marginLeft: window.innerWidth <= 767 ? "1.5vw" : "", fontSize: "1.7rem", marginTop: "1.5vh" }}>{ boardDTO.state.btitle }</label>{ window.innerWidth <= 767 ? "" : <br /> }
                <hr />
                <div className = "row" style = {{ width: "100%" }}>
                     <div className = "col-md-5 col-5">
                        <label style = {{ paddingLeft: window.innerWidth <= 767 ? "1.5vw" : "", fontSize: window.innerWidth <= 767 ? "1rem" : "1.7rem", marginTop: "0" }}>{ boardDTO.state.bwriter }</label>
                    </div>
                    <div className = "col-md-6 offset-md-1 col-6 offset-1" style = {{  }}>
                        <label style = {{ float: "right", paddingTop: window.innerWidth <= 767 ? "" : "0.6vh" }}>{ boardDTO.state.createdDate } · { boardDTO.state.bview }</label>
                    </div>
                </div>
                { boardDTO.state.bimg === "null" ?  
                    <img alt = "" src = { require('../../IMG/BoardPicture_Black.png') } style = {{ width: window.innerWidth <= 767 ? "100vw" : "30%", height: window.innerWidth <= 767 ? "30vh" : "30vh", borderRadius: "8px", marginTop: "0.7vh", objectFit: "contain", backgroundColor: "gray" }} />
                    :
                    <img alt = "Setting" src = { require('../../BoardImg/' + boardDTO.state.bimg) } style = {{ width: window.innerWidth <= 767 ? "100vw" : "30%", height: window.innerWidth <= 767 ? "30vh" : "30vh", borderRadius: "8px", marginTop: "0.7vh", objectFit: "contain", backgroundColor: "gray" }} />
                }
                <div className = "row gx-0" style = {{ marginTop: "0.5vh", marginLeft: window.innerWidth <= 767 ? "1.5vw" : "", width: window.innerWidth <= 767 ? "97%" : "" }}>
                    <label className = "col-md-2" style = {{  }}>
                        { likeValue === "0" ? 
                            <img onClick = { clickLike } value = { likeValue } alt = "Like" src = { require('../../IMG/BoardHeart_Black.png') } style = {{ width: window.innerWidth <= 767 ? "13vw" : "4vw", height: window.innerWidth <= 767 ? "5vh" : "3.5vh" }} />
                            :
                            <img onClick = { clickLike } value = { likeValue } alt = "Like" src = { require('../../IMG/BoardHeart_Red.png') } style = {{ width: window.innerWidth <= 767 ? "13vw" : "4vw", height: window.innerWidth <= 767 ? "5vh" : "3.5vh" }} />
                        }
                        <img onClick = { (e) => replyWrite(boardDTO.state.bno, boardDTO.state.bwriter, boardDTO.state.bcontents, boardDTO.state.becho, boardDTO.state.bechotimer, boardDTO.state.bview, boardDTO.state.createdDate, boardDTO.state.heart, boardDTO.state.hrno) } alt = "Reply" src = { require('../../IMG/BoardReply_Black.png') } style = {{ width: window.innerWidth <= 767 ? "13vw" : "4vw", height: window.innerWidth <= 767 ? "5vh" : "3.5vh" }} />
                        { reportStatus === "0" ? 
                            <img onClick = { report } alt = "Siren" src = { require('../../IMG/Siren_Black.png') } style = {{ width: window.innerWidth <= 767 ? "13vw" : "4vw", height: window.innerWidth <= 767 ? "5vh" : "3.5vh", float: "right" }} />
                            :
                            <img onClick = { report } alt = "Siren" src = { require('../../IMG/Siren_Red.png') } style = {{ width: window.innerWidth <= 767 ? "13vw" : "4vw", height: window.innerWidth <= 767 ? "5vh" : "3.5vh", float: "right" }} />
                        }

                        <Modal show = { show } onHide = { handleClose }>
                            <Modal.Header closeButton>
                                <Modal.Title>Report</Modal.Title>
                            </Modal.Header>
                            <Modal.Body>
                                <h5><span style = {{ color: "red" }}>신고</span>하시려는 사유를 선택해주세요.</h5>
                                <p>허위 신고 적발 시 법적 제재를 할 수 있습니다.</p>
                                <select className = "form-control" onChange = { report } name = "reportvalue">
                                    <option value = "0">선택</option>
                                    <option value = "1">음란매체</option>
                                    <option value = "2">사진도용</option>
                                    <option value = "3">명예훼손</option>
                                </select>
                                <textarea onChange = { report } name = "reportcontents" className = "form-control" placeholder = "사유 기재" style = {{ marginTop: "1.5vh", height: "20vh" }}></textarea>
                            </Modal.Body>
                            <Modal.Footer>
                                <Button variant = "secondary" onClick = { handleClose }>
                                    취소
                                </Button>
                                <Button variant = "danger" onClick = { report } id = "modalBTN">
                                    보내기
                                </Button>
                            </Modal.Footer>
                        </Modal>
                    </label>
                </div>
                <div style = {{ marginTop: "", marginLeft: window.innerWidth <= 767 ? "1.5vw" : "", height: window.innerWidth <= 767 ? "31.5vh" : "35vh", width: window.innerWidth <= 767 ? "97%" : "", fontSize: window.innerWidth <= 767 ? "1.7rem" : "1.2rem" }}>{ boardDTO.state.bcontents }</div>
            </div>
            <Menu />
        </div>
    );
}
export default BoardView;