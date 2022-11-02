import React, { useEffect, useState } from 'react';
import Marquee from "react-fast-marquee";
import { Link, useNavigate } from 'react-router-dom';
import '../../App.css';
import './Login.css';

function SignUp() {
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

    const [ signUp, setSignUp ] = useState([]);
    const saveMember = (e) => {
        setSignUp({
            ...signUp, [ e.target.name ] : e.target.value
        })
    };
    const sendSignUp = () => {
        fetch("http://localhost:8080/Auth/SignUp", {
            headers: {'Content-Type': 'application/json'},
            method : "POST",
            body : JSON.stringify(signUp)
        })
        .then((res) => res.json())
        .then((data) => {
            if(data) {
                alert("회원가입 되었습니다.");
                window.location.href = "/Login";
            } else {
                alert("회원가입 실패 :: 관리자에게 문의")
            }
        })
    };

    return(
        <div className = "row" style = {{ width: "100%", margin: "auto" }}>
            <div className = "col-md-6 offset-md-3 col-sm-6 offset-sm-3 col-12" style = {{ margin: "auto", padding: "0" }}>
                <div style = {{ 
                    zIndex: "0", 
                    width: window.innerWidth <= 767 ? "100%" :"50vw", 
                    height: "100vh", 
                    backgroundColor: "black", 
                    position: "absolute", 
                    left: window.innerWidth <= 767 ? "0px" :"25.1vw", 
                    top: "0px",
                    opacity: "70%"
                }}>
                    <h1 style = {{ position: "relative", top: "0px", marginLeft: "2vw", zIndex: "1", color: "white", marginTop: "1.5vh" }}>&#10094;</h1>
                    <h1 onClick = { GoBack } style = {{ position: "relative", top: "0px", zIndex: "1", textAlign: "center", color: "white", marginTop: "0.4vh" }}>SubMate</h1>
                    <Marquee gradient = { false } speed = "45" style = {{ position: "relative", top: "0px", zIndex: "1", textAlign: "center", color: "gold", marginTop: "5vh", width: window.innerWidth <= 767 ? "90%" :"60%", marginLeft: window.innerWidth <= 767 ? "5vw" :"10vw", fontSize: "1.4rem" }}>
                        지하철에서 스치듯 지나간 그 사람.. 서브메이트에서 만나자!　　　　　　　　　
                    </Marquee>
                    <div style = {{ position: "relative", zIndex: "1", marginTop: window.innerWidth <= 767 ? "5vh" :"10vh", width: window.innerWidth <= 767 ? "90%" :"60%", marginLeft: window.innerWidth <= 767 ? "5vw" :"10vw", fontSize: "1.5rem" }}>
                        <div class="card" style = {{ width: "100%" }}>
                            <section>
                                <h1>Login</h1>
                            </section>
                            <div class="box" style = {{ width: "100%" }}>
                                <input type="text" name = "mid" required onChange = { saveMember } />
                                <span>ID</span>
                                <i></i>
                            </div>
                            <div class="box" style = {{ width: "100%" }}>
                                <input type="text" name = "mpw" required onChange = { saveMember } />
                                <span>PW</span>
                                <i></i>
                            </div>
                            <div class="box" style = {{ width: "100%" }}>
                                <input type="text" name = "mpw" required onChange = { saveMember } />
                                <span>Re:PW</span>
                                <i></i>
                            </div>
                            <div class="box" style = {{ width: "100%" }}>
                                <input type="text" name = "mpw" required onChange = { saveMember } />
                                <span>NAME</span>
                                <i></i>
                            </div>
                            <div class="box" style = {{ width: "100%" }}>
                                <input type="text" name = "mpw" required onChange = { saveMember } />
                                <span>NICK</span>
                                <i></i>
                            </div>
                        </div>
                    </div>
                    <Link to = "/Login"><button type = "button" className = "btn btn-light" style = {{ position: "relative", zIndex: "1", marginTop: window.innerWidth <= 767 ? "10vh" :"13vh", width: window.innerWidth <= 767 ? "90%" :"60%", marginLeft: window.innerWidth <= 767 ? "5vw" :"10vw", fontSize: "1.5rem" }}>SignUp</button></Link>
                    <button type = "button" className = "btn btn-outline-light" style = {{ position: "relative", zIndex: "1", marginTop: "1vh", width: window.innerWidth <= 767 ? "90%" :"60%", marginLeft: window.innerWidth <= 767 ? "5vw" :"10vw", fontSize: "1.5rem" }}>Google</button>
                </div>
                <img alt = "SubMate" src = { require('../../IMG/Train.jpg') } style = {{ width: "100%", height: "100vh", zIndex: "-1", position: "relative" }} />
            </div>
        </div>
    );
}
export default SignUp;