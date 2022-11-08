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
    const [ confirmEmail, setConfirmEmail ] = useState("ID");
    const [ confirmPassword, setConfirmPassword ] = useState("PW");
    const [ confirmPw2, setConfirmPw2 ] = useState("PW:Re");
    const [ confirmName, setConfirmName ] = useState("NAME");
    const [ confirmBirth, setConfirmBirth ] = useState("BIRTH");

    const checkEmail = /([\w-.]+)@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.)|(([\w-]+\.)+))([a-zA-Z]{2,4}|[0-9]{1,3})(\]?)$/;
    const checkPassword = /^(?=.*[a-zA-Z])(?=.*[!@#$%^*+=-])(?=.*[0-9]).{8,25}$/;
    const checkBirth = /(0[1-9]|1[0-2])(0[1-9]|[1,2][0-9]|3[0,1])/;

    const saveMember = (e) => {
        if([e.target.name].includes('mid')) { // 아이디
            if(checkEmail.test(e.target.value)) {
                setConfirmEmail('ID : 올바른 이메일 형식입니다.');
            } else if(e.target.value.length <= 0) {
                setConfirmEmail('ID');
            } else {
                setConfirmEmail('ID : 이메일 형식을 입력해주세요.');
            }
        }
        if([e.target.name].includes('mpw')) { // 비밀번호
            if(checkPassword.test(e.target.value)) {
                setConfirmPassword('PW : 올바른 비밀번호 형식입니다.');
            } else if(e.target.value.length <= 0) {
                setConfirmPassword('PW');
            } else {
                setConfirmPassword('PW: 숫자+영문자+특수문자 8자리 이상');
            }
        } 
        if([e.target.name].includes('mpw2')) { // 비밀번호확인
            if(checkPassword.test(e.target.value)) {
                setConfirmPw2('PW:Re : 비밀번호가 일치합니다.');
            } else if(e.target.value.length <= 0) {
                setConfirmPw2('PW:Re');
            } else {
                setConfirmPw2('PW:Re: 비밀번호를 확인해주세요.');
            }
        }
        if([e.target.name].includes('mname')) { // 이름
            if(e.target.value.length >= 2 && e.target.value.length <= 15) {
                setConfirmName('NAME: 올바른 이름 형식입니다.');
            } else {
                setConfirmName('NAME : 2자 이상, 15자 이하');
            }
        }
        if([e.target.name].includes('mbirth')) { // 생년월일
            if(checkBirth.test(e.target.value)) {
                setConfirmBirth("√");
            } else {
                setConfirmBirth("6자리");
            }
        }

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
                                <h1>SignUp</h1>
                            </section>
                            <div class="box" style = {{ width: "100%" }}>
                                <input type="text" name = "mid" required onChange = { saveMember } />
                                <span>{ confirmEmail }</span>
                                <i></i>
                            </div>
                            <div class="box" style = {{ width: "100%" }}>
                                <input type="password" name = "mpw" required onChange = { saveMember } />
                                <span style = {{ fontSize: confirmPassword.length >= 3 ? "1rem" : "" }}>{ confirmPassword }</span>
                                <i></i>
                            </div>
                            <div class="box" style = {{ width: "100%" }}>
                                <input type="text" name = "mpw2" required onChange = { saveMember } />
                                <span>{ confirmPw2 }</span>
                                <i></i>
                            </div>
                            <div class="box" style = {{ width: "100%" }}>
                                <input type="text" name = "mname" required onChange = { saveMember } />
                                <span>{ confirmName }</span>
                                <i></i>
                            </div>
                            <div className = "row" style = {{ marginLeft: "0.2vw" }}>
                                <div class="box" style = {{ width: "37%" }}>
                                    <input type="text" name = "mbirth" required onChange = { saveMember } />
                                    <span>{ confirmBirth }</span>
                                    <i></i>
                                </div>
                                <div class="box" style = {{ width: "10%", marginLeft: "5vw" }}>
                                    <input type="text" name = "mgender" required onChange = { saveMember } />
                                    <i></i>
                                </div>
                                ●●●●●●
                            </div>
                            <div class="box" style = {{ width: "100%" }}>
                                <input type="text" name = "mnickname" required onChange = { saveMember } />
                                <span>NICK</span>
                                <i></i>
                            </div>
                            <div className = "row" style = {{ marginLeft: "0.1vw" }}>
                                <div class="box" style = {{ width: "30%" }}>
                                    <input type="text" name = "mnickname" required onChange = { saveMember } />
                                    <span>PHONE</span>
                                    <i></i>
                                </div>
                                <div class="box" style = {{ width: "33%", marginLeft: "1vw" }}>
                                    <input type="text" name = "mnickname" required onChange = { saveMember } />
                                    <i></i>
                                </div>
                                <div class="box" style = {{ width: "33%", marginLeft: "1vw" }}>
                                    <input type="text" name = "mnickname" required onChange = { saveMember } />
                                    <i></i>
                                </div>
                            </div>
                            <div class="box" style = {{ width: "100%" }}>
                                <input type="text" name = "mnickname" required onChange = { saveMember } />
                                <span>MBTI</span>
                                <i></i>
                            </div>
                        </div>
                    </div>
                    <button type = "button" onClick = { sendSignUp } className = "btn btn-light" style = {{ position: "relative", zIndex: "1", marginTop: window.innerWidth <= 767 ? "10vh" :"13vh", width: window.innerWidth <= 767 ? "90%" :"60%", marginLeft: window.innerWidth <= 767 ? "5vw" :"10vw", fontSize: "1.5rem" }}>SignUp</button>
                    <button type = "button" className = "btn btn-outline-light" style = {{ position: "relative", zIndex: "1", marginTop: "1vh", width: window.innerWidth <= 767 ? "90%" :"60%", marginLeft: window.innerWidth <= 767 ? "5vw" :"10vw", fontSize: "1.5rem" }}>Google</button>
                </div>
                <img alt = "SubMate" src = { require('../../IMG/Train.jpg') } style = {{ width: "100%", height: "100vh", zIndex: "-1", position: "relative" }} />
            </div>
        </div>
    );
}
export default SignUp;