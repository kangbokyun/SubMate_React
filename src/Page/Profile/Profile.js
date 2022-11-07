import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '../Header';
import Menu from '../Menu';

function Profile() {
    // 윈도우 크기 변경 감지되면 리렌더링
    const [ windowWidth, setWindowWidth ] = useState(0);
    const [ windowHeight, setWindowHeight ] = useState(0);
    
    let userInfo = JSON.parse(localStorage.getItem("UserInfo"));
    
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
                <div><h1 style = {{ marginLeft: "3vw", marginTop: "10vh" }}>Profile</h1></div> : 
                <h1 style = {{ marginLeft: "6vw", marginTop: "10vh" }}>Profile</h1> 
            }
            <div className = "container">
                <div className = "row">
                    <div className = "col-md-8 offset-md-2" style = {{  }}>
                        <div style = {{ border: "solid 3px black", height: window.innerWidth <= 767 ? "30vh" : "35vh", borderRadius: "10px", backgroundColor: "#f7f0e0" }}>
                            <div className = "row" style = {{ marginTop: "2vh" }}>
                                <div className = "col-md-7 offset-md-1 col-7 offset-1">
                                    { window.innerWidth <= 767 ? <h4>서 브 메 이 트 등 록 증</h4> : <h4>서　브　메　이　트　등　록　증</h4> }
                                    <div className = "row">
                                        <div className = "col-md-4 col-4">
                                            { window.innerWidth <= 767 ? <h4 style = {{ marginTop: "1vh" }}>Nick</h4> : <h4 style = {{ marginTop: "2vh" }}>Nick</h4> }
                                            { window.innerWidth <= 767 ? <h4>Hobby</h4> : <h4 style = {{ marginTop: "1vh" }}>Hobby</h4> }
                                            { window.innerWidth <= 767 ? <h4>Age</h4> : <h4 style = {{ marginTop: "1vh" }}>Age</h4> }
                                            { window.innerWidth <= 767 ? <h4>MBTI</h4> : <h4 style = {{ marginTop: "1vh" }}>MBTI</h4> }
                                            { window.innerWidth <= 767 ? <h4>Auth</h4> : <h4 style = {{ marginTop: "1vh" }}>Auth</h4> }
                                        </div>
                                        <div className = "col-md-8 col-8" style = {{ textAlign: "center" }}>
                                            { window.innerWidth <= 767 ? <h4 style = {{ marginTop: "1vh" }}>{ userInfo.mnickname }</h4> : <h4 style = {{ marginTop: "2vh" }}>아이린</h4> }
                                            { window.innerWidth <= 767 ? <h4>춤, 노래</h4> : <h4 style = {{ marginTop: "1vh" }}>춤, 노래</h4> }
                                            { window.innerWidth <= 767 ? <h4>{ userInfo.mbirth }</h4> : <h4 style = {{ marginTop: "1vh" }}>1991. 03. 29</h4> }
                                            { window.innerWidth <= 767 ? <h4>ESTP</h4> : <h4 style = {{ marginTop: "1vh" }}>ESTP</h4> }
                                            <h4>{ userInfo.platForm === "Kakao" ? <span style = {{ font: "bold", color: "yellow" }}>K</span> : <span style = {{ font: "bold", color: "green" }}>N</span> }</h4>
                                        </div>
                                    </div>
                                </div>
                                <div className = "col-md-3 col-3">
                                { window.innerWidth <= 767 ? 
                                    <img alt = "Setting" src = { require('../../IMG/임시프사.png') } style = {{ width: "100%", height: "80%", borderRadius: "8px", objectFit: "contain" }} /> : 
                                    <img alt = "Setting" src = { require('../../IMG/임시프사.png') } style = {{ width: "100%", height: "100%", borderRadius: "8px", objectFit: "contain" }} /> 
                                }
                                </div>
                                <div className = "col-md-10 col-10 offset-md-1 offset-1">
                                    { window.innerWidth <= 767 ? 
                                        <div className = "row">
                                            <div className = "col-md-9 col-9">
                                                <h4 style = {{ marginTop: "1vh", textAlign: "center" }}>서브메이트 개발자 일동</h4>
                                            </div>
                                            <div className = "col-md-3 col-3">
                                                <img alt = "Setting" src = { require('../../IMG/Stamp.png') } style = {{ width: "11vw", height: "5vh" }} />
                                            </div>
                                        </div> : 
                                        <div className = "row">
                                            <div className = "col-md-7 col-7">
                                                <h4 style = {{ marginTop: "5vh", textAlign: "right" }}>서브메이트 개발자 일동</h4> 
                                            </div>
                                            <div className = "col-md-4 col-4">
                                                <img alt = "Setting" src = { require('../../IMG/Stamp.png') } style = {{ width: "6vw", height: "5vh", marginTop: "3vh" }} />
                                            </div>
                                        </div>
                                    }
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <Menu />
        </div>
    );
}
export default Profile;