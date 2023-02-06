import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import './Header.css';

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
    const [ sideStatus, setSideStatus ] = useState(false);
    const sideBar = () => {
        setSideStatus(sideStatus => !sideStatus);
    };

    return(
        <header style = {{ textAlign: "center", backgroundColor: "#a7c2f7", verticalAlign: "middle", position: "fixed", top: "0", zIndex: "2", width: "100%", height: window.innerWidth <= 767 ? "6vh" : "7vh" }}>
            <div className = { sideStatus ? "show-side" : "hide-side" }>
                <div className = "row" style = {{ width: "100%" }}>
                    <div className = "col-12 col-md-12" style = {{ borderBottom: "solid 1px gray", marginLeft: "2.5vw", paddingLeft: "0" }}>
                        <img 
                            alt = "X"
                            src = { require('../IMG/SideX.png') }
                            style = {{ 
                                width: window.innerWidth <= 767 ? "15vw" : "",
                                float: "left" 
                            }}
                            onClick = { () => sideBar() }
                        />
                    </div>
                    <table className = "table" style = {{ marginLeft: "2.5vw", textAlign: "left" }}>
                        <tbody>
                            <tr><td style = {{ paddingLeft: "3vw" }}><Link to = "/Profile" style = {{ textDecoration: "none", color: "black" }}>내 정보 보기</Link></td></tr>
                            <tr><td style = {{ paddingLeft: "3vw" }}>로그아웃</td></tr>
                        </tbody>
                    </table>
                </div>
            </div>
            <div className = "row" style = {{ width: "100%" }}>
                <div className = "col-2" stlye = {{ border: "solid 1px black" }}>
                    <img 
                        alt = "Menu"
                        src = { require('../IMG/HamburgerMenu.png') }
                        style = {{ width: window.innerWidth <= 767 ? "15vw" : "" }}
                        onClick = { () => sideBar() }
                    />
                </div>
                <div className = "col-8">
                    <img 
                        alt = "SubMate" 
                        src = { require('../IMG/SubMate.png') } 
                        style = {{ 
                            width: window.innerWidth <= 767 ? "60vw" : window.innerWidth <= 1500 ? "40vw" : "30vw", 
                            height: window.innerWidth <= 767 ? "4vh" : "5vh", 
                            marginTop: window.innerWidth <= 767 ? "1vh" : "1vh" 
                        }} 
                    />
                </div>
                <div className = "col-2"></div>
            </div>
        </header>
    );
}
export default Header;