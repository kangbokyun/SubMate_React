import React, { useEffect, useState } from 'react';

function Header(){
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
    
    // 헤더 색상 성별에 따라 다르게
    // 여 : #fdc6d5
    // 남 : #a7c2f7

    return(
        <header style = {{ textAlign: "center", backgroundColor: "#a7c2f7", verticalAlign: "middle", position: "fixed", top: "0", zIndex: "2", width: "100%", height: window.innerWidth <= 767 ? "6vh" : "7vh" }}>
            <img 
                alt = "SubMate" 
                src = { require('../IMG/SubMate.png') } 
                style = {{ 
                    width: window.innerWidth <= 767 ? "60vw" : window.innerWidth <= 1500 ? "40vw" : "30vw", 
                    height: window.innerWidth <= 767 ? "4vh" : "5vh", 
                    marginTop: window.innerWidth <= 767 ? "1vh" : "1vh" 
                }} 
            />
        </header>
    );
}
export default Header;