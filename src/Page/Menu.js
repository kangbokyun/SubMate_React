import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

function Menu() {
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

    // 푸터 색상 성별에 따라 다르게
    // 여 : #fdc6d5
    // 남 : #a7c2f7

    return(
        <footer style = {{ backgroundColor: "#a7c2f7", height: "5vh", position: "fixed", bottom: "0", width: "100%", zIndex: "50" }}>
            <div className = "row">
                <div className = "col-md-2 col-2" style = {{ textAlign: "center" }}>
                    <Link to = "/Home">
                        <img alt = "Home" src = { require('../IMG/Home.png') } style = {{ width: window.innerWidth <= 767 ? "12vw" : "5vw", height: "5vh", marginTop: "0px" }} />
                    </Link>
                </div>
                <div className = "col-md-2 col-2" style = {{ textAlign: "center" }}>
                    <Link to = "/Mate">
                        <img alt = "Mate" src = { require('../IMG/Mate.png') } style = {{ width: window.innerWidth <= 767 ? "12vw" : "5vw", height: "5vh", marginTop: "0px" }} />
                    </Link>
                </div>
                <div className = "col-md-2 col-2" style = {{ textAlign: "center" }}>
                    <Link to = "/Chat">
                        <img alt = "Chat" src = { require('../IMG/Chat.png') } style = {{ width: window.innerWidth <= 767 ? "12vw" : "5vw", height: "5vh", marginTop: "0px" }} />
                    </Link>
                </div>
                <div className = "col-md-2 col-2" style = {{ textAlign: "center" }}>
                    <Link to = "/Board">
                        <img alt = "Board" src = { require('../IMG/Board.png') } style = {{ width: window.innerWidth <= 767 ? "12vw" : "5vw", height: "5vh", marginTop: "0px" }} />
                    </Link>
                </div>
                <div className = "col-md-2 col-2" style = {{ textAlign: "center" }}>
                    <Link to = "/Profile">
                        <img alt = "Profile" src = { require('../IMG/Profile.png') } style = {{ width: window.innerWidth <= 767 ? "12vw" : "6vw", height: "5vh", marginTop: "0px" }} />
                    </Link>
                </div>
                <div className = "col-md-2 col-2" style = {{ textAlign: "center" }}>
                    <Link to = "/Setting">
                        <img alt = "Setting" src = { require('../IMG/Setting.png') } style = {{ width: window.innerWidth <= 767 ? "12vw" : "5vw", height: "5vh", marginTop: "0px" }} />
                    </Link>
                </div>
            </div>
        </footer>
    );
}
export default Menu;