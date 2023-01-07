import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router';
import { call } from '../../Service/APIService';
import Header from '../Header';
import Menu from '../Menu';
import AdminMenu from './AdminMenu';

function ReportList() {
    // 윈도우 크기 변경 감지되면 리렌더링
    const [ windowWidth, setWindowWidth ] = useState(0);
    const [ windowHeight, setWindowHeight ] = useState(0);
    let resizeWindow = () => {
        setWindowWidth(window.innerWidth);
        setWindowHeight(window.innerHeight);
    };

    const [ reportList, setReportList ] = useState([]);
    useEffect(() => {
        call("/Admin/ReportList", "POST", null)
        .then((res) => { console.log("/Admin/ReportList/Res : ", res); setReportList(res); });
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
                        <span onClick = { GoBack } style = {{ marginRight: "1.5vw" }}>&#10094;</span>
                        ReportList
                    </h1>
                </div> 
                : 
                <h1 style = {{ marginLeft: "2vw", marginTop: "10vh" }}>ReportList</h1> 
            }
            <div className = { window.innerWidth <= 767 ? "" : "container" }>
                <table className = "table">
                    <tbody>
                        <tr className = "row" style = {{ width: "100%" }}>
                            <td className = "col-3" style = {{ textAlign: "center" }}>종류</td>
                            <td className = "col-9 gx-0" style = {{ textAlign: "center" }}>내용</td>
                        </tr>
                        { reportList.map((list) => 
                            <tr className = "row" style = {{ width: "100%", paddingLeft: "4vw" }} key = { list.reportno }>
                                <td className = "col-3">
                                    { 
                                        list.reportkind === 1 ? "음란매체" : 
                                        list.reportkind === 2 ? "사진도용" :
                                        list.reportkind === 3 ? "명예훼손" :
                                        list.reportkind === 4 ? "기타" : ""
                                    }
                                </td>
                                <td className = "col-9 gx-0">{ list.reportcontents }</td>
                            </tr>
                        ) }
                    </tbody>
                </table>
            </div>
            <AdminMenu />
        </div>
    );
}
export default ReportList;