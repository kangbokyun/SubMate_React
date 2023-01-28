import React from 'react';
import { useEffect } from 'react';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { call } from '../../Service/APIService';
import Header from '../Header';
import AdminMenu from './AdminMenu';

function AdminTendinousList() {
    // 윈도우 크기 변경 감지되면 리렌더링
    const [ windowWidth, setWindowWidth ] = useState(0);
    const [ windowHeight, setWindowHeight ] = useState(0);
    let resizeWindow = () => {
        setWindowWidth(window.innerWidth);
        setWindowHeight(window.innerHeight);
    };

    const [ tendinousList, setTendinousList ] = useState([]);
    useEffect(() => {
        call("/Admin/Tendinous", "POST", null)
        .then((res) => { console.log("/Admin/Tendinous/Res : ", res); setTendinousList(res) });
        resizeWindow();
        window.addEventListener("resize", resizeWindow);
        return () => window.removeEventListener("resize", resizeWindow);
    }, []);
    // 뒤로가기
    const history = useNavigate();
    const GoBack = () => {
        return history(-1) // 한 페이지 뒤로
    };

    const navi = (tno, tstatus) => {
        console.log("tstatus : ", tstatus);
        history('/TendinousView', {
            state: { "tno" : tno, "tstatus" : tstatus }
        });
    };

    return(
        <div>
            <Header />
            { window.innerWidth <= 767 ? 
                <div style = {{ borderBottom: "solid 1px gray" }}>
                    <h1 style = {{ marginLeft: "3vw", marginTop: "8vh", marginBottom: "1.5vh" }}>
                        <span onClick = { GoBack } style = {{ marginRight: "1.5vw" }}>&#10094;</span>
                        TendinousList
                    </h1>
                </div> 
                : 
                <h1 style = {{ marginLeft: "6vw", marginTop: "8vh" }}>TendinousList</h1> 
            }
            <div className = { window.innerWidth <= 767 ? "" : "container" }>
                <table className = "table" style = {{  }}>
                    <tbody>
                        <tr className = "row" style = {{ width: "100%", marginLeft: "0.1px" }}>
                            <td className = "col-8" style = {{ textAlign: "center" }}>제목</td>
                            <td className = "col-2" style = {{ textAlign: "center" }}>작성자</td>
                            <td className = "col-2" style = {{ textAlign: "center" }}>상태</td>
                        </tr>
                        { tendinousList.map((list) => 
                            <tr key = { list.tno } className = "row" style = {{ width: "100%", marginLeft: "0.1px" }}>
                                <td className = "col-8" style = {{ textAlign: "center" }} onClick = { (e) => navi(list.tno, list.tstatus) }>
                                    { list.tcontents }
                                </td>
                                <td className = "col-2" style = {{ textAlign: "center" }}>{ list.twriter }</td>
                                <td className = "col-2" style = {{ textAlign: "center" }}>
                                    { list.tstatus === "2" ? "확인" : 
                                      list.tstatus === "3" ? "보류" :
                                      list.tstatus === "4" ? "처리" : "미처리"
                                    }
                                </td>
                            </tr>
                        ) }
                    </tbody>
                </table>
            </div>
            <AdminMenu />
        </div>
    );
}
export default AdminTendinousList;