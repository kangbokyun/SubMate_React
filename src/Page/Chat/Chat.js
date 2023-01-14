import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router';
import { Link } from 'react-router-dom';
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

    const [ reportList, setReportList ] = useState([]);
    useEffect(() => {
        resizeWindow();
        window.addEventListener("resize", resizeWindow);
        return () => window.removeEventListener("resize", resizeWindow);
    }, []);
    // /윈도우 크기 변경 감지되면 리렌더링

    return(
        <div>
            <Header />
            { window.innerWidth <= 767 ? 
                <div><h1 style = {{ marginLeft: "3vw", marginTop: "8vh", marginBottom: "1.5vh" }}>Chat</h1></div> : 
                <h1 style = {{ marginLeft: "3vw", marginTop: "8vh" }}>Chat</h1> 
            }
            <div className = { window.innerWidth <= 767 ? "" : "container" }>
                {/* TempData */}
                <table className = "table table-striped" style = {{ border: "solid 1px black", height: "81.5vh" }}>
                    <tbody>
                        <Link to = "/InChat" style = {{ textDecoration: "none", color: "black" }}>
                            <tr className = "row" style = {{ width: "100%", marginLeft: "0.1vh" }}>
                                <td className = "col-12">
                                    <div className = "row" style = {{ width: "100%" }}>
                                        <div className = "col-3">
                                            이미지
                                        </div>
                                        <div className = "col-9">
                                            <div className = "row">
                                                <div className = "col-12">
                                                    <div className = "row">
                                                        <div className = "col-7">
                                                            상대닉네임
                                                        </div>
                                                        <div className = "col-5">
                                                            시간
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className = "col-12">
                                                    <div className = "row">
                                                        <div className = "col-11">
                                                            마지막대화
                                                        </div>
                                                        <div className = "col-1">
                                                            1
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </td>
                            </tr>
                        </Link>
                        <tr className = "row" style = {{ width: "100%", marginLeft: "0.1vh" }}>
                            <td className = "col-12">
                                <div className = "row" style = {{ width: "100%" }}>
                                    <div className = "col-3">
                                        이미지
                                    </div>
                                    <div className = "col-9">
                                        <div className = "row">
                                            <div className = "col-12">
                                                <div className = "row">
                                                    <div className = "col-7">
                                                        상대닉네임
                                                    </div>
                                                    <div className = "col-5">
                                                        시간
                                                    </div>
                                                </div>
                                            </div>
                                            <div className = "col-12">
                                                <div className = "row">
                                                    <div className = "col-11">
                                                        마지막대화
                                                    </div>
                                                    <div className = "col-1">
                                                        1
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </td>
                        </tr>
                        <tr className = "row" style = {{ width: "100%", marginLeft: "0.1vh" }}>
                            <td className = "col-12">
                                <div className = "row" style = {{ width: "100%" }}>
                                    <div className = "col-3">
                                        이미지
                                    </div>
                                    <div className = "col-9">
                                        <div className = "row">
                                            <div className = "col-12">
                                                <div className = "row">
                                                    <div className = "col-7">
                                                        상대닉네임
                                                    </div>
                                                    <div className = "col-5">
                                                        시간
                                                    </div>
                                                </div>
                                            </div>
                                            <div className = "col-12">
                                                <div className = "row">
                                                    <div className = "col-11">
                                                        마지막대화
                                                    </div>
                                                    <div className = "col-1">
                                                        1
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </td>
                        </tr>
                        <tr className = "row" style = {{ width: "100%", marginLeft: "0.1vh" }}>
                            <td className = "col-12">
                                <div className = "row" style = {{ width: "100%" }}>
                                    <div className = "col-3">
                                        이미지
                                    </div>
                                    <div className = "col-9">
                                        <div className = "row">
                                            <div className = "col-12">
                                                <div className = "row">
                                                    <div className = "col-7">
                                                        상대닉네임
                                                    </div>
                                                    <div className = "col-5">
                                                        시간
                                                    </div>
                                                </div>
                                            </div>
                                            <div className = "col-12">
                                                <div className = "row">
                                                    <div className = "col-11">
                                                        마지막대화
                                                    </div>
                                                    <div className = "col-1">
                                                        1
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </td>
                        </tr>
                        <tr className = "row" style = {{ width: "100%", marginLeft: "0.1vh" }}>
                            <td className = "col-12">
                                <div className = "row" style = {{ width: "100%" }}>
                                    <div className = "col-3">
                                        이미지
                                    </div>
                                    <div className = "col-9">
                                        <div className = "row">
                                            <div className = "col-12">
                                                <div className = "row">
                                                    <div className = "col-7">
                                                        상대닉네임
                                                    </div>
                                                    <div className = "col-5">
                                                        시간
                                                    </div>
                                                </div>
                                            </div>
                                            <div className = "col-12">
                                                <div className = "row">
                                                    <div className = "col-11">
                                                        마지막대화
                                                    </div>
                                                    <div className = "col-1">
                                                        1
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </td>
                        </tr>
                        <tr className = "row" style = {{ width: "100%", marginLeft: "0.1vh" }}>
                            <td className = "col-12">
                                <div className = "row" style = {{ width: "100%" }}>
                                    <div className = "col-3">
                                        이미지
                                    </div>
                                    <div className = "col-9">
                                        <div className = "row">
                                            <div className = "col-12">
                                                <div className = "row">
                                                    <div className = "col-7">
                                                        상대닉네임
                                                    </div>
                                                    <div className = "col-5">
                                                        시간
                                                    </div>
                                                </div>
                                            </div>
                                            <div className = "col-12">
                                                <div className = "row">
                                                    <div className = "col-11">
                                                        마지막대화
                                                    </div>
                                                    <div className = "col-1">
                                                        1
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </td>
                        </tr>
                        <tr className = "row" style = {{ width: "100%", marginLeft: "0.1vh" }}>
                            <td className = "col-12">
                                <div className = "row" style = {{ width: "100%" }}>
                                    <div className = "col-3">
                                        이미지
                                    </div>
                                    <div className = "col-9">
                                        <div className = "row">
                                            <div className = "col-12">
                                                <div className = "row">
                                                    <div className = "col-7">
                                                        상대닉네임
                                                    </div>
                                                    <div className = "col-5">
                                                        시간
                                                    </div>
                                                </div>
                                            </div>
                                            <div className = "col-12">
                                                <div className = "row">
                                                    <div className = "col-11">
                                                        마지막대화
                                                    </div>
                                                    <div className = "col-1">
                                                        1
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
            <Menu />
        </div>
    );
};
export default Chat;