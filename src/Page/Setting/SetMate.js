import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '../Header';
import Menu from '../Menu';

function SetMate() {
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
                <div style = {{ borderBottom: "solid 1px gray" }}>
                    <h1 style = {{ marginLeft: "1vw", marginTop: "8vh", marginBottom: "1.5vh" }}>
                        <span onClick = { GoBack } style = {{ marginRight: "1.5vw" }}>&#10094;</span>
                        Setting_Mate
                    </h1>
                </div> 
                : 
                <h1 style = {{ marginLeft: "2vw", marginTop: "10vh" }}>Setting_Mate</h1> 
            }
            <div className = {window.innerWidth <= 767 ? "" : "container"}>
                <div className = "row" style = {{ width: window.innerWidth <= 767 ? "100%" : "", marginTop: "1.5vh" }}>
                    <div className = "col-12" style = {{ marginLeft: "2.5vw" }}>
                        <label style = {{ fontSize: "1.5rem" }}>출근시간</label>
                        <div className = "row">
                            <div className = "col-4">
                                <input type = "text" className = "form-control" style = {{ textAlign: "right" }} placeholder = "00" />
                            </div>
                            <div className = "col-1">
                                <label style = {{ fontSize: "1.5rem" }}>시</label>
                            </div>
                            <div className = "col-4">
                                <input type = "text" className = "form-control" style = {{ textAlign: "right" }} placeholder = "00" />
                            </div>
                            <div className = "col-3">
                                <label style = {{ fontSize: "1.5rem" }}>분 부터</label>
                            </div>
                            <div className = "col-4">
                                <input type = "text" className = "form-control" style = {{ textAlign: "right" }} placeholder = "00" />
                            </div>
                            <div className = "col-1">
                                <label style = {{ fontSize: "1.5rem" }}>시</label>
                            </div>
                            <div className = "col-4">
                                <input type = "text" className = "form-control" style = {{ textAlign: "right" }} placeholder = "00" />
                            </div>
                            <div className = "col-3">
                                <label style = {{ fontSize: "1.5rem" }}>분 까지</label>
                            </div>
                        </div>
                    </div>
                    <div className = "col-12" style = {{ marginTop: "1vh", borderBottom: "solid 1px gray", marginLeft: "2vw", paddingBottom: "2vh" }}>
                        <label style = {{ fontSize: "1.5rem" }}>퇴근시간</label>
                        <div className = "row">
                            <div className = "col-4">
                                <input type = "text" className = "form-control" style = {{ textAlign: "right" }} placeholder = "00" />
                            </div>
                            <div className = "col-1">
                                <label style = {{ fontSize: "1.5rem" }}>시</label>
                            </div>
                            <div className = "col-4">
                                <input type = "text" className = "form-control" style = {{ textAlign: "right" }} placeholder = "00" />
                            </div>
                            <div className = "col-3">
                                <label style = {{ fontSize: "1.5rem" }}>분 부터</label>
                            </div>
                            <div className = "col-4">
                                <input type = "text" className = "form-control" style = {{ textAlign: "right" }} placeholder = "00" />
                            </div>
                            <div className = "col-1">
                                <label style = {{ fontSize: "1.5rem" }}>시</label>
                            </div>
                            <div className = "col-4">
                                <input type = "text" className = "form-control" style = {{ textAlign: "right" }} placeholder = "00" />
                            </div>
                            <div className = "col-3">
                                <label style = {{ fontSize: "1.5rem" }}>분 까지</label>
                            </div>
                        </div>
                    </div>
                    <div className = "col-12" style = {{ marginTop: "1vh", borderBottom: "solid 1px gray", marginLeft: "2vw", paddingBottom: "2vh" }}>
                        <label style = {{ fontSize: "1.5rem" }}>호선</label>
                        <div className = "row">
                            <div className = "col-12" style = {{  }}>
                                <label style = {{ marginTop: "1.5vh", backgroundColor: "blue", border: "solid 1px black", color: "white", marginLeft: "1.5vw", paddingLeft: "1.5vw", paddingRight: "1.5vw", borderRadius: "23px" }}>1호선</label>
                                <label style = {{ marginTop: "1.5vh", backgroundColor: "orange", border: "solid 1px black", color: "white", marginLeft: "1.5vw", paddingLeft: "1.5vw", paddingRight: "1.5vw", borderRadius: "23px" }}>2호선</label>
                                <label style = {{ marginTop: "1.5vh", backgroundColor: "purple", border: "solid 1px black", color: "white", marginLeft: "1.5vw", paddingLeft: "1.5vw", paddingRight: "1.5vw", borderRadius: "23px" }}>3호선</label>
                                <label style = {{ marginTop: "1.5vh", backgroundColor: "pink", border: "solid 1px black", color: "white", marginLeft: "1.5vw", paddingLeft: "1.5vw", paddingRight: "1.5vw", borderRadius: "23px" }}>4호선</label>
                                <label style = {{ marginTop: "1.5vh", backgroundColor: "red", border: "solid 1px black", color: "white", marginLeft: "1.5vw", paddingLeft: "1.5vw", paddingRight: "1.5vw", borderRadius: "23px" }}>5호선</label>
                                <label style = {{ marginTop: "1.5vh", backgroundColor: "green", border: "solid 1px black", color: "white", marginLeft: "1.5vw", paddingLeft: "1.5vw", paddingRight: "1.5vw", borderRadius: "23px" }}>6호선</label>
                                <label style = {{ marginTop: "1.5vh", backgroundColor: "skyblue", border: "solid 1px black", color: "white", marginLeft: "1.5vw", paddingLeft: "1.5vw", paddingRight: "1.5vw", borderRadius: "23px" }}>7호선</label>
                                <label style = {{ marginTop: "1.5vh", backgroundColor: "aqua", border: "solid 1px black", color: "white", marginLeft: "1.5vw", paddingLeft: "1.5vw", paddingRight: "1.5vw", borderRadius: "23px" }}>8호선</label>
                                <label style = {{ marginTop: "1.5vh", backgroundColor: "gray", border: "solid 1px black", color: "white", marginLeft: "1.5vw", paddingLeft: "1.5vw", paddingRight: "1.5vw", borderRadius: "23px" }}>9호선</label>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <Menu />
        </div>
    );
}
export default SetMate;