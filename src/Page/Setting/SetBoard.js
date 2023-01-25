import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '../Header';
import Menu from '../Menu';

function SetBoard() {
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

    return(
        <div>
            <Header />
            { window.innerWidth <= 767 ? 
                <div><h1 style = {{ marginLeft: "1vw", marginTop: "10vh" }}><span onClick = { GoBack } style = {{ marginRight: "1.5vw" }}>&#10094;</span>Setting_Board</h1></div> : 
                <h1 style = {{ marginLeft: "6vw", marginTop: "8vh" }}>Setting_Board</h1> 
            }
            <Menu />
        </div>
    );
}
export default SetBoard;