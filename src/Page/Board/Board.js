import React, { useEffect, useState } from 'react';
import '../../App.css';
import { Link, useNavigate } from 'react-router-dom';
import { ClockLoader } from 'react-spinners';
import { BoardListAPI, call } from '../../Service/APIService';
import Header from '../Header';
import Menu from '../Menu';

function Board() {
    const [ boardList, setBoardList ] = useState([]);
    // 윈도우 크기 변경 감지되면 리렌더링
    const [ windowWidth, setWindowWidth ] = useState(0);
    const [ windowHeight, setWindowHeight ] = useState(0);
    let resizeWindow = () => {
        setWindowWidth(window.innerWidth);
        setWindowHeight(window.innerHeight);
    }; 
    
    const userInfo = JSON.parse(localStorage.getItem("UserInfo"));
    const [ resStatus, setResStatus ] = useState("");
    const [ likeList, setLikeList ] = useState([]);
    let windowSize = window.innerWidth;
    const [ pmDivision, setPmDivision ] = useState({});
    const [ pagination, setPagination ] = useState([]);
    const [ pcPage, setPcPage ] = useState(1);
    const [ firstNo, setFirstNo ] = useState();
    const formData = new FormData();
    useEffect(() => {
        formData.append("mno", userInfo.mno);
        if(window.innerWidth >= 767) {
            if(sessionStorage.getItem("pcPage") !== null) {
                console.log("감지");
                formData.append("page", sessionStorage.getItem("pcPage"));
                formData.append("lastno", sessionStorage.getItem("lastNo"));
                console.log("sessionStorage : ", sessionStorage.getItem("lastNo"))
                console.log("formData : ", formData.get("lastno"))
                sessionStorage.removeItem("pcPage");
                sessionStorage.removeItem("lastNo");
            } else {
                formData.append("lastno", 0);
                formData.append("page", pcPage);
            }
            formData.append("device", "pc");
        } else {
            formData.append("lastno", 0);
            formData.append("device", "mobile");
            formData.append("page", 0);
        }
        formData.append("pagestatus", "null");
        call("/Board/BoardList", "POST", formData)
        .then((res) => {
            setBoardList(res);
            setResStatus(res);
            console.log("/Board/BoardList : ", res);
            setFirstNo(res[0].bno);
        })
        call("/Board/HeartList", "POST", null)
        .then((res) => {
            console.log("/Board/HeartList : ", res);
            setLikeList(res);
        })
        call("/BoardListPaging", "POST", null)
        .then((res) => {
            if(res.length === 0) {
                res.push({ pageno : 1 });
            } 
            setPagination(res);
            console.log("res : >>>>>>>>>>>>>>>>", res);
        });

        console.log(window.performance);
        resizeWindow();
        window.addEventListener("resize", resizeWindow);
        // paging();
        return () => window.removeEventListener("resize", resizeWindow);
    }, []);
    // /윈도우 크기 변경 감지되면 리렌더링
    // 뒤로가기
    const history = useNavigate();
    const GoBack = () => {
        return history(-1) // 한 페이지 뒤로
    };

    
    // window.onpopstate = () => { // PC 뒤로가기 감지
    //     // 감지 이후 로직
<<<<<<< HEAD
    //     // const formData = new FormData();
    //     formData.append("mno", userInfo.mno);
    //     formData.append("page", sessionStorage.getItem("pcPage"));
    //     formData.append("lastno", boardList[0].bno);
    //     formData.append("device", "pc");
    //     formData.append("pagestatus", "pcPaging");
    //     call("/Board/BoardList", "POST", formData)
    //     .then((res) => {
    //         setBoardList(res);
    //         setResStatus(res);
    //         console.log("/Board/BoardListBack : ", res);
    //         setFirstNo(res[0].bno);
    //     })
=======
    //     상세보기로 이동 시 로컬 스토리지에 페이지 번호 저장
    //     감지 시 로컬 스토리지 삭제
    //     alert("111");
>>>>>>> 472a8fc1629702275a6dfaadf9f9417c5b90ab4a
    // };
    
    const [ viewData, setViewData ] = useState("");
    const testFunction = (bno, btitle, bcontents, bwriter, bview, becho, bechotimer, bimg, createdDate, heart, hrno, writerimg) => {
        if(heart === "1") { heart = "1"; } else { heart = "0" }
        sessionStorage.setItem("pcPage", pcPage);
        sessionStorage.setItem("lastNo", boardList[0].bno);
        // 글 상세보기로
        history('/BoardView', {
            state: { 
                "bno" : bno, 
                "btitle" : btitle, 
                "bcontents" : bcontents, 
                "bwriter" : bwriter,
                "bview" : Number(bview) + 1, 
                "becho" : becho, 
                "bechotimer" : bechotimer, 
                "bimg" : bimg,
                "createdDate" : createdDate,
                "heart" : heart,
                "hrno" : hrno,
                "writerimg" : writerimg
            }
        })
    };

    const [loading, setLoading] = useState(false);

    // [ 인피니티 스크롤 ] 스크롤 위치 감지
    const override = {
        backgroundColor: "black",
        opacity: "1"
    };
    const [ page, setPage ] = useState(0);
    const getScroll = () => {
        let scrollContainer = document.getElementById("ScrollContainer");
        let yContainer = scrollContainer.scrollHeight; // 스크롤 전체 길이
        let y = scrollContainer.scrollTop; // 스크롤 된 높이
        let clientHeight = scrollContainer.clientHeight; // 눈에 보이는 높이
        let leftScroll = y + clientHeight; // 스크롤 된 높이 + 눈에 보이는 길이 = 스크롤 맨 아래
        let eightyPerScroll;
        if(page === 0) {
            // 99%로 설정하면 간헐적으로 정상 작동하고 아니면 첫 스크롤이 
            // 바로 렌더링 되지 않고 스크롤을 99%에 도달한 뒤에 움직여줘야 작동
            eightyPerScroll = (yContainer * 0.85); // 스크롤이 전체 길이의 85% 내려갔을 때
        } else {
            eightyPerScroll = (yContainer * 0.99); // 스크롤이 전체 길이의 99% 내려갔을 때
        }

        if(eightyPerScroll <= leftScroll) {
            // 무한 스크롤 로직
            setPage(page + 1);

            console.log(page, " : ", boardList.length);

            const formData = new FormData();
            formData.append("mno", userInfo.mno);
            formData.append("page", page);
            formData.append("lastno", boardList[boardList.length - 1].bno);
            formData.append("device", "mobile");
            formData.append("pagestatus", "null");
            call("/Board/BoardList", "POST", formData)
            .then((res) => {
                // setBoardList([...boardList, res]);
                boardList.push(...res);
            });
        }
    };
    // -/ [ 인피니티 스크롤 ] 스크롤 위치 감지
    // [ 페이징 ]
    const paging = () => {
        // 페이지 갯수 가져오기
        const formData = new FormData();
        formData.append("mno", userInfo.mno);
        formData.append("page", page);
        formData.append("lastno", boardList[boardList.length - 1].bno);
        call("/BoardListPaging", "POST", null)
        .then((res) => {
            setPagination(res);
            console.log("res : >>>>>>>>>>>>>>>>", res);
        });
        call("/Board/BoardList", "POST", formData)
        .then((res) => {
            setBoardList(res);
        });
        // 페이지 전송 -> 페이지에 맞는 글 가져오기
            // ex) 1page => 1 ~ 10번 글
        // 버튼 페이지 개수에 따라 생성
        // 맨앞으로, 앞으로, 뒤로 버튼
            // 1page일 때 맨앞, 앞 버튼 없게
        // 페이지 버튼 다섯개만 뿌리기
        // 맨 마지막 페이지에는 10개 미만의 글을 가져올 테니 그것만 뿌리기
    };

    const pagingTest = (e) => {
        const formData = new FormData();
        formData.append("mno", userInfo.mno);
        formData.append("device", "pc");
        if([e.target.id].includes("prevfirst")) {
            console.log("prevfirst");
            formData.append("page", 1);
            formData.append("lastno", firstNo);
            formData.append("pagestatus", "null");
            setPcPage(1);
            // alert(e.target.id);
            call("/Board/BoardList", "POST", formData)
            .then((res) => { console.log("/Board/BoardList/Res : ", res); setBoardList(res); });
        } else if([e.target.id].includes("prevone")) {
            if(Number(pcPage) === Number(pagination.length)) {
                formData.append("lastno", boardList[0].bno);
            } else {
                formData.append("lastno", boardList[boardList.length - 1].bno);
            }
            formData.append("pagestatus", "prev");
            if(Number(pcPage) === 1) {
                alert("첫 페이지입니다.");
                return;
            }
            setPcPage(pcPage => Number(pcPage) - 1);
            console.log("pcPage : ", pcPage);
            formData.append("page", pcPage);
            console.log("prevone : ", boardList.length);
            call("/Board/BoardList", "POST", formData)
            .then((res) => { console.log("/Board/BoardList/Res : ", res); setBoardList(res); });
        } else if([e.target.id].includes("nextone")) {
            formData.append("lastno", boardList[boardList.length - 1].bno);
            formData.append("pagestatus", "next");
            // 1 | 2 | 3 | 4 | 5 >> 6 | 7
            const bno = undefined;
            console.log("nextone : ", boardList.length);
            if(Number(pcPage) >= Number(pagination.length)) {
                alert("마지막 페이지입니다.");
                return;
            }
            setPcPage(Number(pcPage) + 1);
            formData.append("page", pcPage);
            console.log("pcPage : ", pcPage);
            call("/Board/BoardList", "POST", formData)
            .then((res) => { console.log("/Board/BoardList/Res : ", res); setBoardList(res); });
        } else if([e.target.id].includes("nextlast")) {
            console.log("nextlast");
            setPcPage(pagination.length);
            formData.append("page", pcPage);
            // console.log("pagination.length : ", pagination.length);
            // console.log("firstNo : ", firstNo);
            // console.log("pcPage * 10 : ", pcPage * 10);
            // console.log("(firstNo - (pcPage * 10)) : ", firstNo - (pcPage * 10));
            formData.append("lastno", (firstNo - ((pagination.length - 1) * 10)));
            formData.append("pagestatus", "null");
            call("/Board/BoardList", "POST", formData)
            .then((res) => { console.log("/Board/BoardList/Res : ", res); setBoardList(res); });
        } else {
            console.log(firstNo);
            formData.append("lastno", firstNo);
            formData.append("pagestatus", "null");
            setPcPage(e.target.id);
            // alert(e.target.id);
            formData.append("page", e.target.id);
            call("/Board/BoardList", "POST", formData)
            .then((res) => { console.log("/Board/BoardList/Res : ", res); setBoardList(res); });
        }
    };
    // -/ [ 페이징 ]

    return(
        <div>
            <Header />
            { window.innerWidth <= 767 ? 
                <div style = {{ borderBottom: "solid 1px gray" }}>
                    <h1 style = {{ marginLeft: "3vw", marginTop: "8vh", marginBottom: "2.5vh" }}>
                        Board
                        <span style = {{ float: "right", marginRight: "2vw" }}>
                            <Link to = "/BoardWrite">
                                <button type = "button" className = "btn btn-success">Write</button>
                            </Link>
                        </span>
                    </h1>
                </div> 
                :
                <h1 style = {{ marginLeft: "6vw", marginTop: "8vh" }}>Board</h1> 
            }
            <div className = { window.innerWidth <= 767 ? "" : "container" } style = {{  }}>
                { window.innerWidth <= 767 ? 
                    <div style = {{ overflowY: "auto", height: firstNo === boardList.length ? "83vh" : "79vh" }} id = "ScrollContainer" onScroll = { getScroll }> {/*  id = "ScrollContainer" onScroll = { getScroll }  */}
                        <table className = "table" style = {{ }}>
                            <tbody>
                                { boardList.map((list) => 
                                    <tr style = {{ borderBottom: "solid 1px gray" }} key = { list.bno }>
                                        <td className = "col-3">
                                            { list.bimg === "null" ?  
                                                <img alt = "" src = { require('../../IMG/BoardPicture_Black.png') } style = {{ width: "15vw", height: "7vh", borderRadius: "8px", marginTop: "0.7vh" }} />
                                                :
                                                <img alt = "Setting" src = { require('../../BoardImg/' + list.bimg) } style = {{ width: "15vw", height: "7vh", borderRadius: "8px", marginTop: "0.7vh" }} />
                                            }
                                        </td>
                                        
                                        <td className = "col-9">
                                            <div className = "row" style = {{ width: "100%" }}>
                                                <div className = "col-12" style = {{ marginTop: "0.7vh", fontSize: "1.3rem" }}>
                                                    <div className = "row">
                                                        <label className = "col-9 col-md-9" onClick = { (e) => { testFunction(list.bno, list.btitle, list.bcontents, list.bwriter, list.bview, list.becho, list.bechotimer, list.bimg, list.createdDate, list.heart, list.hrno, list.writerimg) } }>
                                                            {list.btitle.length >= 11 ?
                                                                String(list.btitle).substring(0, 10) + "..." 
                                                                : 
                                                                list.btitle
                                                            }
                                                        </label>
                                                        <label className = "col-3 col-md-3" style = {{ fontSize: "0.8rem", marginTop: "0.8vh", textAlign: "right", color: "gray" }}>
                                                            { list.bview }
                                                        </label>
                                                        <br />
                                                    </div>
                                                    <div className = "row">
                                                        <div className = "col-6" style = {{ marginTop: "0.8vh" }}>
                                                            <label style = {{ fontSize: "0.8rem" }}>{ list.bwriter }</label>
                                                            <span style = {{ fontSize: "1rem", marginLeft: "0.4vw", marginRight: "0.4vw" }}>·</span>
                                                            <label style = {{ fontSize: "0.7rem" }}>{ list.createdDate }</label>
                                                        </div>
                                                        <div className = "col-6" style = {{ marginTop: "0.8vh", paddingRight: "0", marginRight: "0" }}>
                                                            <label style = {{ float: "right" }}>
                                                                { list.heart === "1" && list.hrno === "null" ?
                                                                    <img alt = "Like" src = { require('../../IMG/BoardHeart_Red.png') } style = {{ width: "7vw", height: "3vh" }} />
                                                                    :
                                                                    <img alt = "Like" src = { require('../../IMG/BoardHeart_Black.png') } style = {{ width: "7vw", height: "3vh" }} />
                                                                }
                                                            </label>
                                                            <label style = {{ float: "right" }}>
                                                                { list.checkreply === "1" ? 
                                                                    <img alt = "Reply" src = { require('../../IMG/BoardReply_Orange.png') } style = {{ width: "7vw", height: "3vh" }} />
                                                                    :
                                                                    <img alt = "Reply" src = { require('../../IMG/BoardReply_Black.png') } style = {{ width: "7vw", height: "3vh" }} />
                                                                }   
                                                            </label>
                                                            <label style = {{ float: "right" }}>
                                                                { list.bimg !== "null" ?
                                                                    <img alt = "PictureImg" src = { require('../../IMG/BoardPicture_Green.png') } style = {{ width: "7vw", height: "3vh" }} />
                                                                    : 
                                                                    <img alt = "PictureImg" src = { require('../../IMG/BoardPicture_Black.png') } style = {{ width: "7vw", height: "3vh" }} />
                                                                }
                                                            </label>
                                                            <label style = {{ float: "right" }}>
                                                                { list.becho !== "2" ?
                                                                    <img alt = "Timer" src = { require('../../IMG/BoardTimer_Black.png') } style = {{ width: "7vw", height: "3vh" }} />
                                                                    :
                                                                    <img alt = "Timer" src = { require('../../IMG/BoardTimer_Blue.png') } style = {{ width: "7vw", height: "3vh" }} />
                                                                }
                                                            </label>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </td>
                                    </tr>
                                )}
                                { Number(boardList.length) === Number(firstNo) &&
                                    <tr>
                                        <td colSpan = { 3 } style = {{ backgroundColor: "#e4e4e4", textAlign: "center" }}>
                                            ▲　마지막 글입니다.
                                        </td>
                                    </tr>
                                }
                            </tbody>
                        </table>
                    </div>
                    : 
                    <div className = "container" style = {{  }}>
                        <Link to = "/BoardWrite"><button type = "button" className = "btn btn-outline-success" style = {{ float: "right", marginBottom: "1.5vh" }}>글쓰기</button></Link>
                        <table className = "table" style = {{ height: window.innerWidth <= 767 ? "80vh" : "40vh", marginBottom: "5vh" }}>
                                <tbody>
                                    <tr className = "row" style = {{ textAlign: "center" }}>
                                        <td className = "col-md-7">제목</td>
                                        <td className = "col-md-1">작성자</td>
                                        <td className = "col-md-2">작성일</td>
                                        <td className = "col-md-1">조회수</td>
                                        <td className = "col-md-1">좋아요</td>
                                    </tr> 
                                    { boardList.map((list) => 
                                        <tr key = { list.bno } className = "row" style = {{  }}>
                                            <td className = "col-md-6" onClick = { (e) => { testFunction(list.bno, list.btitle, list.bcontents, list.bwriter, list.bview, list.becho, list.bechotimer, list.bimg, list.createdDate, list.heart, list.hrno, list.writerimg) } } style = {{ cursor: "pointer" }}>{"[ " + list.bno + " ]= " + list.btitle }</td>
                                            <td className = "col-md-1" style = {{ textAlign: "center", marginLeft: "0", paddingLeft: "0", paddingRight: "1.4vw" }}>
                                                <div className = "row">
                                                    <label className = "col-md-3" style = {{ float: "right" }}>
                                                        { list.heart === '1' ?
                                                            <img alt = "Like" src = { require('../../IMG/BoardHeart_Red.png') } style = {{ width: window.innerWidth <= 767 ? "7vw" : "2vw", height: window.innerWidth <= 767 ? "3vh" : "2vh" }} />
                                                            :
                                                            <img alt = "Like" src = { require('../../IMG/BoardHeart_Black.png') } style = {{ width: window.innerWidth <= 767 ? "7vw" : "2vw", height: window.innerWidth <= 767 ? "3vh" : "2vh" }} />
                                                        }
                                                        
                                                    </label>
                                                    <label className = "col-md-3" style = {{ float: "right" }}>
                                                        { list.checkreply === "1" ? 
                                                            <img alt = "Reply" src = { require('../../IMG/BoardReply_Orange.png') } style = {{ width: "2vw", height: "2vh" }} />
                                                            :
                                                            <img alt = "Reply" src = { require('../../IMG/BoardReply_Black.png') } style = {{ width: "2vw", height: "2vh" }} />
                                                        }
                                                    </label>
                                                    <label className = "col-md-3" style = {{ float: "right" }}>
                                                        { list.bimg !== "null" ?
                                                            <img alt = "PictureImg" src = { require('../../IMG/BoardPicture_Green.png') } style = {{ width: window.innerWidth <= 767 ? "7vw" : "2vw", height: window.innerWidth <= 767 ? "3vh" : "2vh" }} />
                                                            : 
                                                            <img alt = "PictureImg" src = { require('../../IMG/BoardPicture_Black.png') } style = {{ width: window.innerWidth <= 767 ? "7vw" : "2vw", height: window.innerWidth <= 767 ? "3vh" : "2vh" }} />
                                                        }
                                                    </label>
                                                    <label className = "col-md-3" style = {{ float: "right" }}>
                                                        { list.becho !== "2" ?
                                                            <img alt = "Timer" src = { require('../../IMG/BoardTimer_Black.png') } style = {{ width: window.innerWidth <= 767 ? "7vw" : "2vw", height: window.innerWidth <= 767 ? "3vh" : "2vh" }} />
                                                            :
                                                            <img alt = "Timer" src = { require('../../IMG/BoardTimer_Blue.png') } style = {{ width: window.innerWidth <= 767 ? "7vw" : "2vw", height: window.innerWidth <= 767 ? "3vh" : "2vh" }} />
                                                        }
                                                    </label>
                                                </div>
                                            </td>
                                            <td className = "col-md-1" style = {{ textAlign: "center", paddingLeft: "1.1vw" }}>{ list.bwriter }</td>
                                            <td className = "col-md-2" style = {{ textAlign: "center" }}>{ list.createdDate }</td>
                                            <td className = "col-md-1" style = {{ textAlign: "center" }}>{ list.bview }</td>
                                            <td className = "col-md-1" style = {{ textAlign: "center" }}>2</td>
                                        </tr> 
                                    )}
                                </tbody>
                        </table>
                        <div className = "row" style = {{ width: "100%", textAlign: "center" }}>
                            <div className = "col-md-12" style = {{ textAlign: "center" }}>
                                { (Number(pcPage) === 1) ? 
                                        <button type = "button" style = {{ width: "2vw", border: "none", backgroundColor: "white", paddingTop: "0.1vh", cursor: "none" }} disabled = { true } id = "prevfirst" onClick = { pagingTest }></button>
                                        :
                                        <button type = "button" style = {{ width: "2vw", border: "none", backgroundColor: "white", paddingTop: "0.1vh" }} id = "prevfirst" onClick = { pagingTest }>&lt;&lt;</button> }
                                { (Number(pcPage) === 1) ?
                                        <button type = "button" style = {{ width: "2vw", border: "none", backgroundColor: "white", paddingTop: "0.1vh", cursor: "none" }} disabled = { true } id = "prevone" onClick = { pagingTest }></button> 
                                        :
                                        <button type = "button" style = {{ width: "2vw", border: "none", backgroundColor: "white", paddingTop: "0.1vh" }} id = "prevone" onClick = { pagingTest }>&lt;</button> }
                                { pagination.map((list) => 
                                    pagination.length >= 6 ?
                                        <label key = { list.pageno } style = {{ width: "2vw", border: "none", backgroundColor: Number(pcPage) === Number(list.pageno) ?  "#fdc6d5" : "white", borderRadius: "8px", paddingTop: "0.1vh", cursor: "pointer" }} id = { list.pageno } onClick = { pagingTest }>{ list.pageno }</label> : <></>
                                        // list.pageno <= 5 ?
                                        // <label key = { list.pageno } style = {{ width: "2vw", border: "none", backgroundColor: Number(pcPage) === Number(list.pageno) ?  "#fdc6d5" : "white", borderRadius: "8px", paddingTop: "0.1vh", cursor: "pointer" }} id = { list.pageno } onClick = { pagingTest }>{ list.pageno }</label> : <></>
                                        // :
                                        // <label key = { list.pageno } style = {{ width: "2vw", border: "none", backgroundColor: Number(pcPage) === Number(list.pageno) ?  "#fdc6d5" : "white", borderRadius: "8px", paddingTop: "0.1vh", cursor: "pointer" }} id = { list.pageno } onClick = { pagingTest }>{ list.pageno }</label>
                                ) }
                                { Number(pcPage) === Number(pagination.length) ? 
                                    <button type = "button" style = {{ width: "2vw", border: "none", backgroundColor: "white", paddingTop: "0.1vh", cursor: "none" }} disabled = { true } id = "nextone" onClick = { pagingTest }></button> 
                                    :
                                    <button type = "button" style = {{ width: "2vw", border: "none", backgroundColor: "white", paddingTop: "0.1vh" }} id = "nextone" onClick = { pagingTest }>&gt;</button> 
                                }
                                { Number(pcPage) === Number(pagination.length) ? 
                                    <button type = "button" style = {{ width: "2vw", border: "none", backgroundColor: "white", paddingTop: "0.1vh", cursor: "none" }} disabled = { true } id = "nextlast" onClick = { pagingTest }></button>
                                    :
                                    <button type = "button" style = {{ width: "2vw", border: "none", backgroundColor: "white", paddingTop: "0.1vh" }} id = "nextlast" onClick = { pagingTest }>&gt;&gt;</button>
                                }
                            </div>
                        </div>
                    </div>
                }
            </div>
            <Menu />
        </div>
    );
}
export default Board;
