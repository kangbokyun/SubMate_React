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
    
    useEffect(() => {
        call("/Board/BoardList", "POST", null)
        .then((res) => {
            console.log(res)
            setBoardList(res);
        })
        console.log("boardList : ", boardList)
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

    return(
        <div>
            <Header />
            { window.innerWidth <= 767 ? 
                <div>
                    <h1 style = {{ marginLeft: "1vw", marginTop: "10vh" }}>
                        <span onClick = { GoBack } style = {{ marginRight: "1.5vw" }}>&#10094;</span>
                        Board
                        <span style = {{ float: "right", marginRight: "2vw" }}>
                            <Link to = "/BoardWrite">
                                <button type = "button" className = "btn btn-success">Write</button>
                            </Link>
                        </span>
                    </h1>
                </div> 
                :
                <h1 style = {{ marginLeft: "6vw", marginTop: "10vh" }}>Board</h1> 
            }
            <div className = { window.innerWidth <= 767 ? "" : "container" } style = {{ marginTop: "1.5vh" }}>
                { window.innerWidth <= 767 ? 
                    <table className = "table" style = {{ marginBottom: "2.5vh" }}>
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
                                                <label><Link to = "/BoardView" style = {{ textDecoration: "none", cursor: "pointer", color: "black" }}>{ list.btitle }</Link></label><br />
                                                <div className = "row">
                                                    <div className = "col-5" style = {{ marginTop: "0.8vh" }}>
                                                        <label style = {{ fontSize: "1rem" }}>{ list.bwriter }</label>
                                                        <span style = {{ fontSize: "1rem", marginLeft: "0.4vw", marginRight: "0.4vw" }}>·</span>
                                                        <label style = {{ fontSize: "1rem" }}>1분 전</label>
                                                    </div>
                                                    <div className = "col-7" style = {{ marginTop: "0.8vh", paddingRight: "0", marginRight: "0" }}>
                                                        <label style = {{ float: "right" }}>
                                                            <img alt = "Like" src = { require('../../IMG/BoardHeart_Black.png') } style = {{ width: "7vw", height: "3vh" }} />
                                                        </label>
                                                        <label style = {{ float: "right" }}>
                                                            <img alt = "Reply" src = { require('../../IMG/BoardReply_Black.png') } style = {{ width: "7vw", height: "3vh" }} />
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
                                                                <img alt = "Timer" src = { require('../../IMG/BoardTimer_Color.png') } style = {{ width: "7vw", height: "3vh" }} />
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
                    : 
                        <div className = "container">
                    <table className = "table" style = {{ height: window.innerWidth <= 767 ? "80vh" : "70vh", marginBottom: "5vh" }}>
                            <tbody>
                                <tr className = "row" style = {{ textAlign: "center" }}>
                                    <td className = "col-md-7">제목</td>
                                    <td className = "col-md-1">작성자</td>
                                    <td className = "col-md-2">작성일</td>
                                    <td className = "col-md-1">조회수</td>
                                    <td className = "col-md-1">좋아요</td>
                                </tr> 
                                <tr className = "row" style = {{  }}>
                                    <td className = "col-md-5">안녕하세요</td>
                                    <td className = "col-md-2" style = {{ textAlign: "center" }}>좋, 댓, 이, 에</td>
                                    <td className = "col-md-1" style = {{ textAlign: "center" }}>홍길동</td>
                                    <td className = "col-md-2" style = {{ textAlign: "center" }}>22.10.22</td>
                                    <td className = "col-md-1" style = {{ textAlign: "center" }}>31</td>
                                    <td className = "col-md-1" style = {{ textAlign: "center" }}>2</td>
                                </tr> 
                                <tr className = "row" style = {{  }}>
                                    <td className = "col-md-5">안녕하세요</td>
                                    <td className = "col-md-2" style = {{ textAlign: "center" }}>좋, 댓, 이, 에</td>
                                    <td className = "col-md-1" style = {{ textAlign: "center" }}>홍길동</td>
                                    <td className = "col-md-2" style = {{ textAlign: "center" }}>22.10.22</td>
                                    <td className = "col-md-1" style = {{ textAlign: "center" }}>31</td>
                                    <td className = "col-md-1" style = {{ textAlign: "center" }}>2</td>
                                </tr> 
                                <tr className = "row" style = {{  }}>
                                    <td className = "col-md-5">안녕하세요</td>
                                    <td className = "col-md-2" style = {{ textAlign: "center" }}>좋, 댓, 이, 에</td>
                                    <td className = "col-md-1" style = {{ textAlign: "center" }}>홍길동</td>
                                    <td className = "col-md-2" style = {{ textAlign: "center" }}>22.10.22</td>
                                    <td className = "col-md-1" style = {{ textAlign: "center" }}>31</td>
                                    <td className = "col-md-1" style = {{ textAlign: "center" }}>2</td>
                                </tr> 
                                <tr className = "row" style = {{  }}>
                                    <td className = "col-md-5">안녕하세요</td>
                                    <td className = "col-md-2" style = {{ textAlign: "center" }}>좋, 댓, 이, 에</td>
                                    <td className = "col-md-1" style = {{ textAlign: "center" }}>홍길동</td>
                                    <td className = "col-md-2" style = {{ textAlign: "center" }}>22.10.22</td>
                                    <td className = "col-md-1" style = {{ textAlign: "center" }}>31</td>
                                    <td className = "col-md-1" style = {{ textAlign: "center" }}>2</td>
                                </tr> 
                            </tbody>
                    </table>
                        </div>
                }
                {window.innerWidth <= 767 ? 
                    <div>무한스크롤</div> : 
                    <div className = "container">
                        <div className = "row">
                            <div className = "col-md-2">1</div>
                            <div className = "col-md-2">2</div>
                            <div className = "col-md-2">3</div>
                            <div className = "col-md-2">4</div>
                            <div className = "col-md-2">5</div>
                            <div className = "col-md-2">옆</div>
                        </div>
                    </div>
                }
            </div>
            <Menu />
        </div>
    );
}
export default Board;