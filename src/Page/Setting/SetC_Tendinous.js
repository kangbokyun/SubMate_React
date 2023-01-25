import React from 'react';
import { useEffect } from 'react';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { TendinousAPI } from '../../Service/APIService';
import Header from '../Header';
import Menu from '../Menu';

function Tendinous() {
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

    const [ tendinousData, setTendinousData ] = useState({});
    const userInfo = JSON.parse(localStorage.getItem("UserInfo"));
    const tendinous = (e) => {
        setTendinousData({ 
            ...tendinousData, 
            [e.target.name] : e.target.value, 
            'mno' : userInfo.mno 
        });
    };
    
    const sendTendinous = () => {
        TendinousAPI(tendinousData);
    };

    return(
        <div>
            <Header />
            { window.innerWidth <= 767 ? 
                <div style = {{ borderBottom: "solid 1px gray" }}>
                    <h1 style = {{ marginLeft: "1vw", marginTop: "8vh" }}>
                        <span onClick = { GoBack } style = {{ marginRight: "1.5vw" }}>&#10094;</span>
                        Customer_Tendinous
                    </h1>
                </div> : 
                <h1 style = {{ marginLeft: "6vw", marginTop: "8vh" }}>Customer_Tendinous</h1> 
            }
            <div className = { window.innerWidth <= 767 ? "" : "container" }>
                <div className = "row" style = {{ width: "100%" }}>
                    <div className = "col-4"><h4 style = {{ marginLeft: "1.5vw", marginTop: "1vh", textAlign: "center" }}>건의유형</h4></div>
                    <div className = "col-4">
                        <select name = "tselectcontentkind" onChange = { tendinous } className = "form-control" style = {{ marginTop: "0.5vh", textAlign: "center" }}>
                            <option value = "0">--선택--</option>
                            <option value = "1">메이트</option>
                            <option value = "2">채팅</option>
                            <option value = "3">게시판</option>
                            <option value = "4">프로필</option>
                            <option value = "5">설정</option>
                        </select>
                    </div>
                    <div className = "col-4">
                        <select name = "tselecttendinouskind" onChange = { tendinous } className = "form-control" style = {{ marginTop: "0.5vh", textAlign: "center" }}>
                            <option value = "0">--선택--</option>
                            <option value = "1">기능</option>
                            <option value = "2">개선</option>
                            <option value = "3">버그</option>
                        </select>
                    </div>
                    <div className = "col-12">
                        <textarea name = "tcontents" onChange = { tendinous } className = "form-control" style = {{ marginLeft: "2.7vw", marginTop: "1vh", height: "71vh" }} placeholder = "건의하실 내용을 상세히 기재 부탁드립니다." />
                    </div>
                    <div className = "col-12">
                        <button type = "button" onClick = { sendTendinous } className = "btn btn-outline-success" style = {{ width: "100%", marginLeft: "2.5vw", marginTop: "0.8vh" }}>건의하기</button>
                    </div>
                </div>
            </div>
            <Menu />
        </div>
    );
}
export default Tendinous;