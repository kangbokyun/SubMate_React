import React, { useEffect, useState } from 'react';
import Header from '../Header';
import Menu from '../Menu';

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


    return(
        <div>
            <Header />
            { window.innerWidth <= 767 ? 
                <div><h1 style = {{ marginLeft: "3vw", marginTop: "10vh" }}>BoardWrite</h1></div> : 
                <h1 style = {{ marginLeft: "6vw", marginTop: "10vh" }}>BoardWrite</h1> 
            }
            <div className = { window.innerWidth <= 767 ? "" : "row" } style = {{ marginTop: "3vh" }}>
                <input type = "text" style = {{ backgroundColor: "transparent", border: "none", borderBottom: "solid 1px gray", outline: "none", width: "100%", height: window.innerWidth <= 767 ? "6vh" : "", fontSize: window.innerWidth <= 767 ? "1.4rem" : "" }} placeholder = "Title" />
                <textarea placeholder = "내용을 입력하세요." style = {{ width: "100%", outline: "none", paddingTop: "1vh", paddingLeft: "1.5vw", border: "none", borderBottom: "solid 1px gray", height: "25vh" }}></textarea>
                <div className = "col-4">
                    <h1 style = {{ border: "solid 1px #a7c2f7", color: "#a7c2f7", width: "8vw", heigh: "5vh", textAlign: "center", marginLeft: "1vw" }}>+</h1>
                </div>
            </div>
            <Menu />
        </div>
    );
}
export default BoardWrite;