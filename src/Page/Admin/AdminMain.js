import React from 'react';
import { useEffect } from 'react';
import { useState } from 'react';
import { useNavigate } from 'react-router';
import Header from '../Header';
import Menu from '../Menu';
import AdminMenu from './AdminMenu';

function AdminMain() {
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
                <div style = {{ borderBottom: "solid 1px gray" }}>
                    <h1 style = {{ marginLeft: "1vw", marginTop: "8vh", marginBottom: "1.5vh" }}>
                        {/* <span onClick = { GoBack } style = {{ marginRight: "1.5vw" }}>&#10094;</span> */}
                        Admin
                    </h1>
                </div> 
                : 
                <h1 style = {{ marginLeft: "2vw", marginTop: "10vh" }}>Setting_Mate</h1> 
            }
            <div className = { window.innerWidth <= 767 ? "" : "container" }>
                <div className = "row" style = {{ width: "100%" }}>
                    <div className = "col-12" style = {{ marginLeft: "2.5vw" }}>
                        <table className = "table table-stripe">
                            <tbody>
                                <tr style = {{ textAlign: "center", fontStyle: "bold" }}>
                                    <td className = "col-4"><h4>건의사항</h4></td>
                                    <td className = "col-4"><h4>신고</h4></td>
                                    <td className = "col-4"><h4>문의</h4></td>
                                </tr>
                                <tr style = {{ textAlign: "center" }}>
                                    <td className = "col-4">n건</td>
                                    <td className = "col-4">n건</td>
                                    <td className = "col-4">n건</td>
                                </tr>
                            </tbody>
                        </table>
                        <div className = "col-12" style = {{ width: "100%", height: "20vh", border: "solid 1px black", textAlign: "center", paddingTop: "1.5vh" }}>
                            <h4>유저 이용 추이 그래프</h4>
                        </div>
                    </div>
                </div>
            </div>
            <AdminMenu />
        </div>
    );
}
export default AdminMain;