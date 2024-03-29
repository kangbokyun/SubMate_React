import React from 'react';
import { useEffect } from 'react';
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { call } from '../../Service/APIService';
import Header from '../Header';
import AdminMenu from './AdminMenu';
import MultiLineChart from './MultiLineChart';

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
    const [ notice, setNotice ] = useState([]);
    const [ report, setReport ] = useState([]);
    const [ chartData, setChartData ] = useState([]);
    useEffect(() => {
        call("/Admin/QnA", "POST", null)
        .then((res) => { console.log("/Admin/QnA/Res : ", res); setQnA(res) });
        call("/Admin/Tendinous", "POST", null)
        .then((res) => { console.log("/Admin/Tendinous/Res : ", res); setTendinous(res) });
        call("/Admin/NoticeList", "POST", null)
        .then((res) => { console.log("/Admin/NoticeList/Res : ", res); setNotice(res) });
        call("/Admin/ReportList", "POST", null)
        .then((res) => { console.log("/Admin/ReportList/Res : ", res); setReport(res) });
        call("/Admin/MainChart", "POST", null)
        .then((res) => { if(res) { console.log("/Admin/MainChart/Res : ", res); setChartData(res); }});
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
                    <h1 style = {{ marginLeft: "3vw", marginTop: "8vh", marginBottom: "1.5vh" }}>
                        {/* <span onClick = { GoBack } style = {{ marginRight: "1.5vw" }}>&#10094;</span> */}
                        Admin
                    </h1>
                </div> 
                : 
                <h1 style = {{ marginLeft: "6vw", marginTop: "8vh" }}>Admin</h1> 
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
                                    <td className = "col-4">{ report.length }건</td>
                                    <td className = "col-4">{ QnA.length }건</td>
                                </tr>
                            </tbody>
                        </table>
                        <div className = "col-12 col-md-12" style = {{ width: "100%", height: "20vh", textAlign: "center", paddingLeft: "0", marginLeft: "0" }}>
                            {/* <h4>유저 이용 추이 그래프</h4> */}
                            <MultiLineChart data = { chartData } />
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
                            <table className = "table" style = {{ height: "16.5vh", width: "100%", marginLeft: "3vw" }}>
                                <tbody>
                                    { notice.map((list) => 
                                        <tr className = "row" style = {{ width: "100%" }} key = { list.nno }>
                                            <td className = "col-3" style = {{  }}>
                                                { list.nkind === 1 ? "[ 공지 ]" : "[ 이벤트 ]" }
                                            </td>
                                            <td className = "col-9 gx-0">
                                                { list.ntitle }
                                            </td>
                                        </tr>
                                    ) }
                                </tbody>
                            </table>
                        </div>
                        <div className = "col-6">
                            <h4 style = {{ marginLeft: "1vw", marginTop: "1vh" }}>Report<span style = {{ fontSize: "0.8rem" }}> (최근 5건)</span></h4>
                        </div>
                        <div className = "col-4 offset-2">
                            <Link to = "/ReportList"><p style = {{ float: "right", marginTop: "0.2vh", color: "gray", paddingTop: "1vh" }}>더보기</p></Link>
                        </div>
                        <div className = "col-12">
                            <table className = "table" style = {{ height: "1vh", width: "100%", marginLeft: "3vw" }}>
                                <tbody>
                                    { report.map((list) => 
                                        <tr className = "row" style = {{ width: "100%" }} key = { list.reportno }>
                                            <td className = "col-3" style = {{  }}>
                                                { 
                                                    list.reportkind === 1 ? "음란매체" : 
                                                    list.reportkind === 2 ? "사진도용" :
                                                    list.reportkind === 3 ? "명예훼손" :
                                                    list.reportkind === 4 ? "기타" : ""
                                                }
                                            </td>
                                            <td className = "col-9 gx-0">
                                                { list.reportcontents }
                                            </td>
                                        </tr>
                                    ) }
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