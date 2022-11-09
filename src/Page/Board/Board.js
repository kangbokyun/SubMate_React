import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Header from '../Header';
import Menu from '../Menu';

function Board() {
    // 윈도우 크기 변경 감지되면 리렌더링
    const [ windowWidth, setWindowWidth ] = useState(0);
    const [ windowHeight, setWindowHeight ] = useState(0);
    let resizeWindow = () => {
        setWindowWidth(window.innerWidth);
        setWindowHeight(window.innerHeight);
    };
    
    useEffect(() => {
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
                                <button type = "button" className = "btn btn-success" style = {{  }}>Write</button>
                            </Link>
                        </span>
                    </h1>
                </div> 
                :
                <h1 style = {{ marginLeft: "6vw", marginTop: "10vh" }}>Board</h1> 
            }
            <div className = "container" style = {{ marginTop: "1.5vh" }}>
                { window.innerWidth <= 767 ? 
                    <table className = "table" style = {{ marginBottom: "5vh" }}>
                        <tr style = {{ borderBottom: "solid 1px gray" }}>
                            <td className = "col-3">
                                <img alt = "Setting" src = { require('../../IMG/임시프사.png') } style = {{ width: "15vw", height: "7vh", borderRadius: "50%" }} />
                            </td>
                            <td className = "col-7">
                                <tr style = {{ border: "none" }}><td>NICK</td></tr>
                                <tr style = {{ border: "none" }}><td>TITLE</td></tr>
                            </td>
                            <td className = "col-2">
                                <tr style = {{ border: "none" }}><td>좋</td></tr>
                                <tr style = {{ border: "none" }}><td>댓</td></tr>
                                <tr style = {{ border: "none" }}><td>이</td></tr>
                            </td>
                        </tr>
                    </table>
                    : 
                    <table className = "table" style = {{ height: window.innerWidth <= 767 ? "80vh" : "70vh", marginBottom: "5vh" }}>
                        <div className = "container">
                            <tr className = "row" style = {{ textAlign: "center" }}>
                                <td className = "col-md-6">제목</td>
                                <td className = "col-md-2">작성자</td>
                                <td className = "col-md-2">작성일</td>
                                <td className = "col-md-1">조회수</td>
                                <td className = "col-md-1">좋아요</td>
                            </tr> 
                            <tr className = "row" style = {{  }}>
                                <td className = "col-md-5">안녕하세요</td>
                                <td className = "col-md-1" style = {{ textAlign: "center" }}>좋, 댓, 이</td>
                                <td className = "col-md-2" style = {{ textAlign: "center" }}>홍길동</td>
                                <td className = "col-md-2" style = {{ textAlign: "center" }}>2022-10-22</td>
                                <td className = "col-md-1" style = {{ textAlign: "center" }}>31</td>
                                <td className = "col-md-1" style = {{ textAlign: "center" }}>2</td>
                            </tr> 
                            <tr className = "row" style = {{  }}>
                                <td className = "col-md-5">안녕하세요</td>
                                <td className = "col-md-1" style = {{ textAlign: "center" }}>좋, 댓, 이</td>
                                <td className = "col-md-2" style = {{ textAlign: "center" }}>홍길동</td>
                                <td className = "col-md-2" style = {{ textAlign: "center" }}>2022-10-22</td>
                                <td className = "col-md-1" style = {{ textAlign: "center" }}>31</td>
                                <td className = "col-md-1" style = {{ textAlign: "center" }}>2</td>
                            </tr> 
                            <tr className = "row" style = {{  }}>
                                <td className = "col-md-5">안녕하세요</td>
                                <td className = "col-md-1" style = {{ textAlign: "center" }}>좋, 댓, 이</td>
                                <td className = "col-md-2" style = {{ textAlign: "center" }}>홍길동</td>
                                <td className = "col-md-2" style = {{ textAlign: "center" }}>2022-10-22</td>
                                <td className = "col-md-1" style = {{ textAlign: "center" }}>31</td>
                                <td className = "col-md-1" style = {{ textAlign: "center" }}>2</td>
                            </tr> 
                            <tr className = "row" style = {{  }}>
                                <td className = "col-md-5">안녕하세요</td>
                                <td className = "col-md-1" style = {{ textAlign: "center" }}>좋, 댓, 이</td>
                                <td className = "col-md-2" style = {{ textAlign: "center" }}>홍길동</td>
                                <td className = "col-md-2" style = {{ textAlign: "center" }}>2022-10-22</td>
                                <td className = "col-md-1" style = {{ textAlign: "center" }}>31</td>
                                <td className = "col-md-1" style = {{ textAlign: "center" }}>2</td>
                            </tr> 
                        </div>
                    </table>
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