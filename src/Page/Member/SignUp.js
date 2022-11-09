import React, { useEffect, useState } from 'react';
import Marquee from "react-fast-marquee";
import { Link, useNavigate } from 'react-router-dom';
import { useDaumPostcodePopup } from 'react-daum-postcode';
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
    const [ savePw, setSavePw ] = useState("");
    const [ confirmName, setConfirmName ] = useState("NAME");
    const [ confirmBirth, setConfirmBirth ] = useState("BIRTH");
    const [ confirmAddr_Post, setConfirmAddr_Post ] = useState("Addr_Post");
    const [ confirmAddr_Road, setConfirmAddr_Road ] = useState("Addr_Road");
    const [ confirmAddr, setConfirmAddr ] = useState("Addr");
    const [ confirmPhone, setConfirmPhone ] = useState("Phone");
    const [ confirmMBTI, setConfirmMBTI ] = useState("MBTI");
    let test1 = "010";
    let test2 = "0000";
    let test3 = "1111";

    let flag = {
        idF : false, pwF : false, nameF : false, birthF : false, nickF : false,
        genderF : false, addrF : false, p1: false, p2: false, p3: false, mbti: false
    };

    const checkEmail = /([\w-.]+)@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.)|(([\w-]+\.)+))([a-zA-Z]{2,4}|[0-9]{1,3})(\]?)$/;
    const checkPassword = /^(?=.*[a-zA-Z])(?=.*[!@#$%^*+=-])(?=.*[0-9]).{8,25}$/;
    const checkBirth = /([0-9]{2}(0[1-9]|1[0-2])(0[1-9]|[1,2][0-9]|3[0,1]))/;
    const checkp1 = /01[016789]/;
    const checkp2 = /[^0][0-9]{3,4}/;
    const checkp3 = /[0-9]{4}/;

    // 다음 주소 API
    const open = useDaumPostcodePopup('CURRENT_URL'); 
    
    const handleComplete = (data) => {
    let fullAddress = data.address;
    let extraAddress = '';

    if (data.addressType === 'R') {
        if (data.bname !== '') {
        extraAddress += data.bname;
        }
        if (data.buildingName !== '') {
        extraAddress += extraAddress !== '' ? `, ${data.buildingName}` : data.buildingName;
        }
        fullAddress += extraAddress !== '' ? ` (${extraAddress})` : '';
    }
    
    setConfirmAddr_Post(data.zonecode);
    setConfirmAddr_Road(data.roadAddress);
    flag.addrPF = true;
    flag.addrRF = true;
    };

    const handleClick = () => {
    open({ onComplete: handleComplete });
    };
    // -/다음 주소 API

    const saveMember = (e) => {
        // memberDTO  
        // mno mid mpw mname mnickname mbirth mgender mphone 
	    // maddress mrole createddate mplatform mager mbti token
        // 유효성검사
        if([e.target.name].includes('mid')) { // 아이디
            if(checkEmail.test(e.target.value)) {
                flag.idF = true;
                setConfirmEmail('ID : 올바른 이메일 형식입니다.');
                setSignUp({ ...signUp, [ e.target.name ] : e.target.value })
                console.log("signUp : ", signUp);
            } else if(e.target.value.length <= 0) {
                flag.idF = false;
                setConfirmEmail('ID');
            } else {
                flag.idF = false;
                setConfirmEmail('ID : 이메일 형식으로 입력');
            }
        }
        if([e.target.name].includes('mpw')) { // 비밀번호
            if(checkPassword.test(e.target.value)) {
                setSavePw(e.target.value);
                setConfirmPassword('PW : 올바른 비밀번호 형식입니다.');
                setSignUp({ ...signUp, [ e.target.name ] : e.target.value })
                console.log("signUp : ", signUp);
            } else if(e.target.value.length <= 0) {
                setConfirmPassword('PW');
            } else {
                setConfirmPassword('PW: 숫자+영문자+특수문자 8자리 이상');
            }
        } 
        if([e.target.name].includes('mpw2')) { // 비밀번호확인
            console.log("savePw : ", savePw, " e : ", e.target.value);
            if(savePw === e.target.value) {
                flag.pwF = true;
                setConfirmPw2('PW:Re : 비밀번호가 일치합니다.');
                setSignUp({ ...signUp, [ e.target.name ] : e.target.value })
                console.log("signUp : ", signUp);
            } else if(e.target.value.length <= 0) {
                flag.pwF = false;
                setConfirmPw2('PW:Re');
            } else {
                flag.pwF = false;
                setConfirmPw2('PW:Re: 비밀번호를 확인해주세요.');
            }
        }
        if([e.target.name].includes('mname')) { // 이름
            if(e.target.value.length >= 2 && e.target.value.length <= 15) {
                flag.nameF = true;
                setConfirmName('NAME: 올바른 이름 형식입니다.');
                setSignUp({ ...signUp, [ e.target.name ] : e.target.value })
                console.log("signUp : ", signUp);
            } else {
                flag.nameF = false;
                setConfirmName('NAME : 2자 이상, 15자 이하');
            }
        }
        if([e.target.name].includes('mbirth')) { // 생년월일
            if(checkBirth.test(e.target.value)) {
                flag.birthF = true;
                setConfirmBirth("√");
                setSignUp({ ...signUp, [ e.target.name ] : e.target.value })
                console.log("signUp : ", signUp);
            } else {
                flag.birthF = false;
                setConfirmBirth("6자리");
            }
        }
        if([e.target.name].includes('mnickname')) { // 닉네임
            if(e.target.value.length >= 2 && e.target.value.length <= 15) {
                flag.nickF = true;
                setConfirmName('NICK: 올바른 닉네임 형식입니다.');
                setSignUp({ ...signUp, [ e.target.name ] : e.target.value })
                console.log("signUp : ", signUp);
            } else {
                flag.nickF = false;
                setConfirmName('NICK : 2자 이상, 15자 이하');
            }
        }
        if([e.target.name].includes('mgender')) {
            if(e.target.value.length !== 0 && e.target.value % 2 === 0) {
                flag.genderF = true;
                console.log("Woman");
                setSignUp({ ...signUp, [ e.target.name ] : "Woman" })
                console.log("signUp : ", signUp);
            } else if(e.target.value.length === 0) {
                flag.genderF = false;
            } else {
                flag.genderF = true;
                console.log("Man");
                setSignUp({ ...signUp, [ e.target.name ] : "Man" })
                console.log("signUp : ", signUp);
            }
        }
        if([e.target.name].includes('mphone1')) {
            if(checkp1.test(e.target.value)) {
                flag.p1 = true;
                test1 = e.target.value;
            } else {
                flag.p1 = false;
            }
        }
        if([e.target.name].includes('mphone2')) {
            if(checkp2.test(e.target.value)) {
                flag.p2 = true;
                test2 = e.target.value;
            } else {
                flag.p2 = false;
            }
        }
        if([e.target.name].includes('mphone3')) {
            if(checkp3.test(e.target.value)) {
                flag.p3 = true;
                test3 = test1 + test2 + e.target.value;
            } else {
                flag.p3 = false;
            }
        }
        if(flag.p1 && flag.p2 && flag.p3) {
            setConfirmPhone("√");
            setSignUp({ ...signUp, 'mphone' : test3 })
            console.log("signUp : ", signUp);
        } else {
            setConfirmPhone("X");
        }
        if([e.target.name].includes('mbti')) {
            if(e.target.value.length === 4) {
                flag.mbti = true;
                setSignUp({ ...signUp, 'mbti' : e.target.value });
                setConfirmMBTI("MBTI : 올바른 형식입니다.");
            } else {
                flag.mbti = false;
                setConfirmMBTI("MBTI : 다시 확인해주세요.");
            }
        }
    };

    const sendSignUp = () => {
        console.log(
            "flag.idF : ", flag.idF, 
            "flag.idF : ", flag.nameF, 
            "flag.idF : ", flag.pwF, 
            "flag.idF : ", flag.birthF, 
            "flag.idF : ", flag.nickF, 
            "flag.idF : ", flag.mbti, 
            "flag.idF : ", flag.genderF, 
        )
        if(flag.idF && flag.nameF && flag.pwF && flag.birthF
            && flag.nickF && flag.mbti && flag.genderF) {
            console.log("confirmAddr_Post : ", confirmAddr_Post);
        } else {
            console.log("ss");
        }
        // fetch("http://localhost:8080/Auth/SignUp", {
        //     headers: {'Content-Type': 'application/json'},
        //     method : "POST",
        //     body : JSON.stringify(signUp)
        // })
        // .then((res) => res.json())
        // .then((data) => {
        //     if(data) {
        //         alert("회원가입 되었습니다.");
        //         window.location.href = "/Login";
        //     } else {
        //         alert("회원가입 실패 :: 관리자에게 문의")
        //     }
        // })
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
                        <div className="card" style = {{ width: "100%", height: window.innerWidth <= 767 ? "60vh" : "50vh", border: "solid 5px aqua", overflowY : "auto" }}>
                            <section>
                                <h1>SignUp</h1>
                            </section>
                            <div className="box" style = {{ width: "100%" }}>
                                <input type="text" name = "mid" required onChange = { saveMember } />
                                <span>{ confirmEmail }</span>
                                <i></i>
                            </div>
                            <div className="box" style = {{ width: "100%" }}>
                                <input type="password" name = "mpw" required onChange = { saveMember } />
                                <span style = {{ fontSize: confirmPassword.length >= 3 ? "1rem" : "" }}>{ confirmPassword }</span>
                                <i></i>
                            </div>
                            <div className="box" style = {{ width: "100%" }}>
                                <input type="password" name = "mpw2" required onChange = { saveMember } />
                                <span style = {{ fontSize: confirmPassword.length >= 3 ? "1rem" : "" }}>{ confirmPw2 }</span>
                                <i></i>
                            </div>
                            <div className="box" style = {{ width: "100%" }}>
                                <input type="text" name = "mname" required onChange = { saveMember } />
                                <span>{ confirmName }</span>
                                <i></i>
                            </div>
                            <div className = "row gx-0">
                                <div className = "col-5">
                                    <div className="box" style = {{ width: "100%" }}>
                                        <input type="text" name = "mbirth" required onChange = { saveMember } />
                                        <span>{ confirmBirth }</span>
                                        <i></i>
                                    </div>
                                </div>
                                <div className = "col-1" style = {{ marginTop: "1.2vh" }}>
                                    <span>-</span>
                                </div>
                                <div className = "col-2">
                                    <div className="box" style = {{ width: "100%" }}>
                                        <input type="text" name = "mgender" required onChange = { saveMember } style = {{ textAlign: "center" }} />
                                        <i></i>
                                    </div>
                                </div>
                                <div className = "col-4" style = {{ marginTop: "1vh" }}>
                                    <span style = {{ fontSize: "0.9rem" }}>●●●●●●</span>
                                </div>
                            </div>
                            <div className="box" style = {{ width: "100%" }}>
                                <input type="text" name = "mnickname" required onChange = { saveMember } />
                                <span>NICK</span>
                                <i></i>
                            </div>
                            <div className = "row gx-0">
                                <div className = "col-2">
                                    <div className="box" style = {{ width: "100%" }}>
                                        <input type="text" name = "mphone1" required onChange = { saveMember } style = {{ textAlign: "center" }} />
                                        <span>{ confirmPhone }</span>
                                        <i></i>
                                    </div>
                                </div>
                                <div className = "col-1" style = {{ textAlign: "center", marginTop: "1.2vh" }}>
                                    <span>-</span>
                                </div>
                                <div className = "col-4">
                                    <div className="box" style = {{ width: "100%" }}>
                                        <input type="text" name = "mphone2" required onChange = { saveMember } style = {{ textAlign: "center" }} />
                                        <i></i>
                                    </div>
                                </div>
                                <div className = "col-1" style = {{ textAlign: "center", marginTop: "1.2vh" }}>
                                    <span>-</span>
                                </div>
                                <div className = "col-4">
                                    <div className="box" style = {{ width: "100%" }}>
                                        <input type="text" name = "mphone3" required onChange = { saveMember } style = {{ textAlign: "center" }} />
                                        <i></i>
                                    </div>
                                </div>
                            </div>
                            <div className="box" style = {{ width: "100%" }}>
                                <input type="text" name = "mbti" required onChange = { saveMember } />
                                <span>MBTI</span>
                                <i></i>
                            </div>
                            <div className = "row">
                                <div className = "col-6">
                                    <button type = "button" className = "form-control" onClick = { handleClick } style = {{ marginTop: "1vh" }}>우편번호 찾기</button>
                                </div>
                                <div className = "col-6">
                                    <div className="box" style = {{ width: "100%" }}>
                                        <input type="text" name = "addr_post" required onChange = { saveMember } value = { confirmAddr_Post === 'Addr_Post' ? "" : confirmAddr_Post } />
                                        <span>Post</span>
                                        <i></i>
                                    </div>
                                </div>
                                <div className = "col-12">
                                    <div className="box" style = {{ width: "100%" }}>
                                        <input type="text" name = "addr_road" required onChange = { saveMember } value = { confirmAddr_Road === 'Addr_Road' ? "" : confirmAddr_Road } />
                                        <span>Road</span>
                                        <i></i>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <button type = "button" onClick = { sendSignUp } className = "btn btn-light" style = {{ position: "relative", zIndex: "1", marginTop: window.innerWidth <= 767 ? "3vh" :"13vh", width: window.innerWidth <= 767 ? "90%" :"60%", marginLeft: window.innerWidth <= 767 ? "5vw" :"10vw", fontSize: "1.5rem" }}>SignUp</button>
                    <button type = "button" className = "btn btn-outline-light" style = {{ position: "relative", zIndex: "1", marginTop: "1vh", width: window.innerWidth <= 767 ? "90%" :"60%", marginLeft: window.innerWidth <= 767 ? "5vw" :"10vw", fontSize: "1.5rem" }}>Google</button>
                </div>
                <img alt = "SubMate" src = { require('../../IMG/Train.jpg') } style = {{ width: "100%", height: "100vh", zIndex: "-1", position: "relative" }} />
            </div>
        </div>
    );
}
export default SignUp;