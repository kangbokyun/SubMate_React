import React from 'react';
import { useEffect } from 'react';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { QnAAPI } from '../../Service/APIService';
import Header from '../Header';
import Menu from '../Menu';

function QnA() {
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

    const [ QnAData, setQnAData ] = useState({});
    const userInfo = JSON.parse(localStorage.getItem("UserInfo"));
    const saveQnA = (e) => {
        setQnAData({ ...QnAData, [e.target.name] : e.target.value, 'qnamno' : userInfo.mno });
    };
    const sendQnA = () => {
        QnAAPI(QnAData);
    };

    return(
        <div>
            <Header />
            { window.innerWidth <= 767 ? 
                <div style = {{ borderBottom: "solid 1px gray" }}>
                    <h1 style = {{ marginLeft: "1vw", marginTop: "8vh" }}>
                        <span onClick = { GoBack } style = {{ marginRight: "1.5vw" }}>&#10094;</span>
                        Customer_QnA
                    </h1>
                </div> : 
                <h1 style = {{ marginLeft: "6vw", marginTop: "8vh" }}>Setting_Customer</h1> 
            }
            <div className = { window.innerWidth <= 767 ? "" : "container" }>
                <div className = "row" style = {{ width: "100%" }}>
                    <div className = "col-12" style = {{ marginLeft: "2.7vw", marginTop: "1.5vh" }}>
                        <input name = "qnatitle" type = "text" className = "form-control" placeholder = "title" onChange = { saveQnA } />
                    </div>
                    <div className = "col-12" style = {{ marginLeft: "2.7vw", marginTop: "1vh" }}>
                        <textarea name = "qnacontents" className = "form-control" style = {{ height: "70vh" }} placeholder = "문의내용"  onChange = { saveQnA } />
                    </div>
                    <button className = "btn btn-outline-success" type = "button" style = {{ marginLeft: "5vw", width: "95%", marginTop: "0.7vh" }} onClick = { sendQnA }>문의하기</button>
                </div>
            </div>
            <Menu />
        </div>
    );
}
export default QnA;