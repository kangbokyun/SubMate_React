import React from 'react';
import { useEffect } from 'react';
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { call } from '../../Service/APIService';
import Header from '../Header';
import AdminMenu from './AdminMenu';

function AdminMain() {
    // 윈도우 크기 변경 감지되면 리렌더링
    const [ windowWidth, setWindowWidth ] = useState(0);
    const [ windowHeight, setWindowHeight ] = useState(0);
    let resizeWindow = () => {
        setWindowWidth(window.innerWidth);
        setWindowHeight(window.innerHeight);
    };

    const [ QnA, setQnA ] = useState([]);
    const [ tendinous, setTendinous ] = useState([]);
    useEffect(() => {
        call("/Admin/QnA", "POST", null)
        .then((res) => { console.log("/Admin/QnA/Res : ", res); setQnA(res) });
        call("/Admin/Tendinous", "POST", null)
        .then((res) => { console.log("/Admin/Tendinous/Res : ", res); setTendinous(res) });
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
                                    <td className = "col-4">{ tendinous.length }건</td>
                                    <td className = "col-4">n건</td>
                                    <td className = "col-4">{ QnA.length }건</td>
                                </tr>
                            </tbody>
                        </table>
                        <div className = "col-12" style = {{ width: "100%", height: "20vh", border: "solid 1px black", textAlign: "center", paddingTop: "1.5vh" }}>
                            <h4>유저 이용 추이 그래프</h4>
                        </div>
                    </div>
                    <div className = "row" style = {{ width: "100%", marginTop: "1.5vh", marginLeft: "1.5vw" }}>
                        <div className = "col-6">
                            <h4 style = {{ marginLeft: "1vw", marginTop: "1vh" }}>Notice<span style = {{ fontSize: "0.8rem" }}> (최근 5건)</span></h4>
                        </div>
                        <div className = "col-4 offset-2">
                            <Link to = "/NoticeList"><p style = {{ float: "right", marginTop: "0.2vh", color: "gray", paddingTop: "1vh" }}>더보기</p></Link>
                        </div>
                        <div className = "col-12">
                            <table className = "table" style = {{ border: "solid 1px black", height: "30vh", width: "100%" }}>
                                <tbody>
                                    <tr><td>[ 공지 ] 안내드립니다. 이건 이렇고 저건 저렇습니다.</td></tr>
                                    <tr><td>[ 공지 ] 안내드립니다. 이건 이렇고 저건 저렇습니다.</td></tr>
                                    <tr><td>[ 공지 ] 안내드립니다. 이건 이렇고 저건 저렇습니다.</td></tr>
                                    <tr><td>[ 공지 ] 안내드립니다. 이건 이렇고 저건 저렇습니다.</td></tr>
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
            <AdminMenu />
        </div>
    );
}
export default AdminMain;