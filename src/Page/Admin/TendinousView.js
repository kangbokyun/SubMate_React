import React from 'react';
import { useEffect } from 'react';
import { useState } from 'react';
import { useLocation, useNavigate } from 'react-router';
import { call, TendinousAnswerAPI } from '../../Service/APIService';
import Header from '../Header';
import AdminMenu from './AdminMenu';

function TendinousView() {
    const tno = useLocation();
    const userInfo = JSON.parse(localStorage.getItem("UserInfo"));

    // 윈도우 크기 변경 감지되면 리렌더링
    const [ windowWidth, setWindowWidth ] = useState(0);
    const [ windowHeight, setWindowHeight ] = useState(0);
    let resizeWindow = () => {
        setWindowWidth(window.innerWidth);
        setWindowHeight(window.innerHeight);
    };

    const formData = new FormData();
    const [ tendinous, setTendinous ] = useState({});
    useEffect(() => {
        formData.append("tno", tno.state.tno);
        call("/Admin/TendinousView", "POST", formData)
        .then((res) => { console.log("/Admin/TendnousView/Res : ", res); setTendinous(res) });
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

    const [ tendiStat, setTendiStat ] = useState({});
    const tenS = (e) => {
        if([e.target.name].includes("tanswer")) {
            setTendiStat({ ...tendiStat, [e.target.name] : e.target.value, "mno" : userInfo.mno, "tno" : tno.state.tno });
        }
        if([e.target.name].includes("tstatus")) {
            setTendiStat({ ...tendiStat, [e.target.name] : e.target.value, "mno" : userInfo.mno, "tno" : tno.state.tno });
        }
    };

    const sendTendi = () => {
        TendinousAnswerAPI(tendiStat);
    };

    return(
        <div>
            <Header />
            { window.innerWidth <= 767 ? 
                <div style = {{ borderBottom: "solid 1px gray" }}>
                    <h1 style = {{ marginLeft: "3vw", marginTop: "8vh", marginBottom: "1.5vh" }}>
                        <span onClick = { GoBack } style = {{ marginRight: "1.5vw" }}>&#10094;</span>
                        TendinousView
                    </h1>
                </div> 
                : 
                <h1 style = {{ marginLeft: "6vw", marginTop: "8vh" }}>TendinousView</h1> 
            }
            <div className = { window.innerWidth <= 767 ? "" : "container" }>
                <div className = "row" style = {{ width: "100%", marginTop: "1vh", borderBottom: "solid 1px gray", marginLeft: "0.1vw" }}>
                    <div className = "col-6" style = {{ textAlign: "center" }}>
                        <h4 style = {{ marginLeft: "1.5vw" }}>작성자 : { tendinous.twriter }</h4>
                    </div>
                    <div className = "col-6" style = {{ textAlign: "center" }}>
                        <h4>상태 : { tno.state.tstatus === "2" ? "확인" :
                                tno.state.tstatus === "3" ? "보류" :
                                tno.state.tstatus === "4" ? "처리" : "미지정"
                            }
                        </h4>
                    </div>
                    <div className = "col-12" style = {{ textAlign: "center" }}>
                        <h5>종류 : { tendinous.tselecttendinouskind === "1" ? "기능" : 
                                tendinous.tselecttendinouskind === "2" ? "개선" :
                                "버그"
                            }
                            　·　
                            { tendinous.tselectcontentkind === "1" ? "메이트" : 
                                tendinous.tselectcontentkind === "2" ? "채팅" :
                                tendinous.tselectcontentkind === "3" ? "게시판" :
                                tendinous.tselectcontentkind === "4" ? "프로필" :
                                "설정"
                            }
                        </h5>
                    </div>
                </div>
                <div className = "row" style = {{ width: "100%", marginLeft: "0.1vw", height: "30vh" }}>
                    <div className = "col-12" style = {{ marginTop: "1vh" }}>
                        <h5>{ tendinous.tcontents }</h5>
                    </div>
                </div>
                <div className = "row" style = {{ width: "100%", marginLeft: "0.1vw" }}>
                    <div className = "col-12">
                        { tendinous.tstatus === "0" ? 
                            <select className = "form-control" onChange = { tenS } style = {{ marginTop: "1.5vh" }} name = "tstatus">
                                <option value = "1">선택</option>
                                <option value = "2">확인</option>
                                <option value = "3">보류</option>
                                <option value = "4">처리</option>
                            </select>
                            :
                            <select disabled className = "form-control" onChange = { tenS } style = {{ marginTop: "1.5vh" }} name = "tstatus">
                                <option value = "n">
                                    { tendinous.tstatus === "2" ? "확인" : 
                                        tendinous.tstatus === "3" ? "보류" : 
                                        tendinous.tstatus === "4" ? "처리" : "미처리" 
                                    }
                                </option>
                            </select>
                        }
                    </div>
                </div>
                    { tendinous.tanswer !== null ?  
                        <div className = "row" style = {{ width: "100%", marginLeft: "0.1vw" }}>
                            <textarea disabled onChange = { tenS } className = "form-control" style = {{ marginTop: "1vh", height: "31vh" }} name = "tanswer" placeholder = { tendinous.tanswer }></textarea>
                            <button type = "button" disabled onClick = { sendTendi } className = "btn btn-success" style = {{ marginTop: "1vh" }}>저장</button>
                        </div>
                        : 
                        <div className = "row" style = {{ width: "100%", marginLeft: "0.1vw" }}>
                            <textarea onChange = { tenS } className = "form-control" style = {{ marginTop: "1vh", height: "31vh" }} name = "tanswer" placeholder = { tendinous.tanswer }></textarea>
                            <button type = "button" onClick = { sendTendi } className = "btn btn-success" style = {{ marginTop: "1vh" }}>저장</button>
                        </div>
                    } 
            </div>
            <AdminMenu />
        </div>
    );
}
export default TendinousView;