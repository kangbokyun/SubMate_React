import React, { useEffect, useState } from 'react';
import Header from '../Header';
import Menu from '../Menu';
import '../../Component/Switch/Switch.css';
import { useNavigate } from 'react-router';

function BoardWrite() {
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

    const [ checked, setCehcked ] = useState("1");
    const checkedSwitch = (e) => { // 스위치 제어
        if(e.target.value === '1') { // 스위치 꺼짐
            setCehcked("2");
        } else { // 켜짐
            setCehcked("1");
        }
    };

    const [ write, setWrite ] = useState([]);
    const sendBoardWrite = () => {
        // 글등록
    };

    return(
        <div>
            <Header />
            { window.innerWidth <= 767 ? 
                <div>
                    <h1 style = {{ marginLeft: "1vw", marginTop: "10vh" }}>
                        <span onClick = { GoBack } style = {{ marginRight: "1.5vw" }}>&#10094;</span>
                        BoardWrite
                        <span style = {{ float: "right", marginRight: "2vw" }}>
                            <button type = "button" className = "btn btn-success" >등록</button>
                        </span>
                    </h1>
                </div>
                : 
                <h1 style = {{ marginLeft: "6vw", marginTop: "10vh" }}>BoardWrite</h1> 
            }
            <div className = { window.innerWidth <= 767 ? "" : "row" } style = {{ marginTop: "3vh" }}>
                <input type = "text" style = {{ backgroundColor: "transparent", border: "none", borderBottom: "solid 1px gray", outline: "none", width: "100%", height: window.innerWidth <= 767 ? "6vh" : "", fontSize: window.innerWidth <= 767 ? "1.4rem" : "", paddingLeft: "2.5vw" }} placeholder = "Title" />
                <textarea placeholder = "내용을 입력하세요." style = {{ width: "100%", outline: "none", paddingTop: "1vh", paddingLeft: "2.5vw", border: "none", borderBottom: "solid 1px gray", height: "25vh" }}></textarea>
                <div style = {{ border: "none", borderBottom: "solid 1px gray" }}>
                    <div className = "row" style = {{ maxWidth: "100%" }}>
                        <div className = "col-3" style = {{ textAlign: "center", fontSize: "1.5rem" }}>
                            <label style = {{ color: checked === '1' ? "gray" : "skyblue", fontStyle: "bold", paddingLeft: "3vw" }}>메아리</label>
                        </div>
                        <div className = "col-2 offset-7" style = {{ paddingBottom: "1vh" }}>
                            <input value = { checked } id="checkbox" class="switch-input" type="checkbox" onClick = { checkedSwitch } style = {{  }} />
                            <label for="checkbox" class="switch"></label>
                        </div>
                    </div>
                </div>
                <div className = "col-4">
                    <h1 style = {{ border: "solid 1px #a7c2f7", color: "#a7c2f7", width: "8vw", heigh: "5vh", textAlign: "center", marginLeft: "1vw" }}>+</h1>
                </div>
            </div>
            <Menu />
        </div>
    );
}
export default BoardWrite;