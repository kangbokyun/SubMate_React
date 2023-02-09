import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
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
    useEffect(() => {
        const formData = new FormData();
        formData.append("mno", userInfo.mno);
        call("/Board/BoardList", "POST", formData)
        .then((res) => {
            setBoardList(res);
            setResStatus(res);
            console.log("/Board/BoardList : ", res);
        })
        call("/Board/HeartList", "POST", null)
        .then((res) => {
            console.log("/Board/HeartList : ", res);
            setLikeList(res);
        })
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

    const [ viewData, setViewData ] = useState("");
    const testFunction = (bno, btitle, bcontents, bwriter, bview, becho, bechotimer, bimg, createdDate, heart, hrno, writerimg) => {
        if(heart === "1") { heart = "1"; } else { heart = "0" }
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

    // 스크롤 위치 감지
    const [ infinityScroll, setInfinityScroll ] = useState([]);
    const getScroll = () => {
        let scrollContainer = document.getElementById("ScrollContainer");
        let yContainer = scrollContainer.scrollHeight; // 스크롤 전체 길이
        let y = scrollContainer.scrollTop; // 스크롤 된 높이
        let clientHeight = scrollContainer.clientHeight; // 눈에 보이는 높이
        let leftScroll = y + clientHeight; // 스크롤 된 높이 + 눈에 보이는 길이 = 스크롤 맨 아래
        let eightyPerScroll = (yContainer * 0.99); // 스크롤이 전체 길이의 99% 내려갔을 때
        console.log("leftScroll : ", leftScroll);
        console.log("eightyPerScroll : ", eightyPerScroll);

        if(eightyPerScroll <= leftScroll) {
            // 무한 스크롤 로직
            console.log("99% 내려옴")
        }
    };
    // -/스크롤 위치 감지

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
                    <div style = {{ overflowY: "auto", height: "79vh" }} id = "ScrollContainer" onScroll = { getScroll }> {/*  id = "ScrollContainer" onScroll = { getScroll }  */}
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
                                                            <label style = {{ fontSize: "0.8rem" }}>{ list.createdDate }</label>
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
                            </tbody>
                        </table>
                    </div>
                    : 
                    <div className = "container" style = {{  }}>
                        <Link to = "/BoardWrite"><button type = "button" className = "btn btn-outline-success" style = {{ float: "right", marginBottom: "1.5vh" }}>글쓰기</button></Link>
                        <table className = "table" style = {{ height: window.innerWidth <= 767 ? "80vh" : "70vh", marginBottom: "5vh" }}>
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
                                            <td className = "col-md-6" onClick = { (e) => { testFunction(list.bno, list.btitle, list.bcontents, list.bwriter, list.bview, list.becho, list.bechotimer, list.bimg, list.createdDate, list.heart, list.hrno, list.writerimg) } }>{ list.btitle }</td>
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
                    </div>
                }
            </div>
            <Menu />
        </div>
    );
}
export default Board;