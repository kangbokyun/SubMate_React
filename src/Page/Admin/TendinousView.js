import React from 'react';
import { useEffect } from 'react';
import { useState } from 'react';
import { useLocation, useNavigate } from 'react-router';
import { call } from '../../Service/APIService';
import Header from '../Header';
import AdminMenu from './AdminMenu';

function TendinousView() {
    const tno = useLocation();

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
        console.log("tno : ", tno);
        console.log("formData.get : ", formData.get("tno"));
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
    return(
        <div>
            <Header />
            { window.innerWidth <= 767 ? 
                <div style = {{ borderBottom: "solid 1px gray" }}>
                    <h1 style = {{ marginLeft: "1vw", marginTop: "8vh", marginBottom: "1.5vh" }}>
                        <span onClick = { GoBack } style = {{ marginRight: "1.5vw" }}>&#10094;</span>
                        TendinousView
                    </h1>
                </div> 
                : 
                <h1 style = {{ marginLeft: "2vw", marginTop: "10vh" }}>TendinousView</h1> 
            }
            <div className = { window.innerWidth <= 767 ? "" : "container" }>
                <div className = "row" style = {{ width: "100%", marginTop: "1vh", borderBottom: "solid 1px gray", marginLeft: "0.1vw" }}>
                    <div className = "col-6" style = {{ textAlign: "center" }}>
                        <h4 style = {{ marginLeft: "1.5vw" }}>작성자 : { tendinous.twriter }</h4>
                    </div>
                    <div className = "col-6" style = {{ textAlign: "center" }}>
                        <h4>상태 : { tendinous.tselectcontentkind === "1" ? "열람" : 
                                tendinous.tselectcontentkind ==="2" ? "보류" :
                                "처리"
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
                <div className = "row" style = {{ width: "100%" }}>
                    <div className = "col-12" style = {{ marginLeft: "1.5vw", marginTop: "1vh" }}>
                        <h5>{ tendinous.tcontents }</h5>
                    </div>
                </div>
            </div>
            <AdminMenu />
        </div>
    );
}
export default TendinousView;