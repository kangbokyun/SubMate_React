import React from 'react';
import { useState } from 'react';
import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { call } from '../../Service/APIService';
import Header from '../Header';
import AdminMenu from './AdminMenu';

function AdminBoard() {
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

    return(
        <div>
            <Header />
            { window.innerWidth <= 767 ? 
                <div style = {{ borderBottom: "solid 1px gray" }}>
                    <h1 style = {{ marginLeft: "3vw", marginTop: "8vh" }}>
                        Board
                    </h1>
                </div> : 
                <h1 style = {{ marginLeft: "6vw", marginTop: "8vh" }}>Board</h1> 
            }
            <div className = { window.innerWidth <= 767 ? "" : "container" }>
                <div className = "row" style = {{ width: "100%", borderBottom: "solid 1px gray", marginLeft: "0.1px", marginBottom: "0", marginTop: "10vh" }}>
                    <div className = "col-8" >
                        <h4 style = {{ marginLeft: "0.5vw", paddingTop: "1vh" }}>건의사항</h4>
                    </div>
                    <div className = "col-4">
                        <Link to = "/TendinousList"><p style = {{ float: "right", marginTop: "0.2vh", color: "gray", paddingTop: "1vh" }}>더보기</p></Link>
                    </div>
                </div>
                <div className = "row" style = {{ width: "100%" }}>
                    <div className = "col-12">
                        <table className = "table" style = {{ height: "23vh", width: "100%" }}>
                            <tbody>
                                { tendinous.length <= 0 ?
                                    <tr><td>받은 건의사항이 없습니다.</td></tr>
                                    :
                                    tendinous.map((list) => 
                                        String(list.tstatus) === "0" ?
                                        <tr className = "row" key = { list.tno } style = {{ width: "100%", marginLeft: "2.5vw" }}>
                                            <td className = "col-9">{ list.tcontents }</td>
                                            <td className = "col-3" style = {{ textAlign: "right" }}>{ list.tstatus === "0" ? "미처리" : "" }</td>
                                        </tr>
                                        :
                                        <tr key = { list.tno }></tr>
                                    ) 
                                }
                            </tbody>
                        </table>
                    </div>
                </div>
                <div className = "row" style = {{ width: "100%", borderBottom: "solid 1px gray", marginLeft: "0.1px" }}>
                    <div className = "col-8">
                        <h4 style = {{ marginLeft: "0.5vw", paddingTop: "1vh" }}>문의사항</h4>
                    </div>
                    <div className = "col-4">
                        <Link to = "/QnAList"><p style = {{ float: "right", marginTop: "0.2vh", color: "gray", paddingTop: "1vh" }}>더보기</p></Link>
                    </div>
                </div>
                <div className = "row" style = {{ width: "100%" }}>
                    <div className = "col-12" style = {{  }}>
                        <table className = "table" style = {{ height: "23vh" }}>
                            <tbody>
                                { QnA.length <= 0 ?
                                    <tr><td>받은 QnA가 없습니다.</td></tr>
                                    :
                                    QnA.map((list) =>
                                        list.qnano > 5 ?
                                        "" :
                                        <tr className = "row" style = {{ width: "100%", marginLeft: "1vw" }} key = { list.qnano }>
                                            <td>{ list.qnatitle }</td>
                                        </tr>
                                    ) 
                                }
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
            <AdminMenu />
        </div>
    );
}
export default AdminBoard;