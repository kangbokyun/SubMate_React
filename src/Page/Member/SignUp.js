import React, { useEffect, useState } from 'react';
import Marquee from "react-fast-marquee";
import { Link, useNavigate } from 'react-router-dom';
import { useDaumPostcodePopup } from 'react-daum-postcode';
import '../../App.css';
import './Login.css';
import { SignUpAPI, SignUpNoImg, SignUpNoImgAPI } from '../../Service/APIService';

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
    const [ confirmNick, setConfirmNick ] = useState("Nick");
    const [ confirmBirth, setConfirmBirth ] = useState("BIRTH");
    const [ confirmAddr_Post, setConfirmAddr_Post ] = useState("Addr_Post");
    const [ confirmAddr_Road, setConfirmAddr_Road ] = useState("Addr_Road");
    const [ confirmAddr, setConfirmAddr ] = useState("Addr");
    const [ confirmPhone, setConfirmPhone ] = useState("Phone");
    const [ savePhone, setSavePhone ] = useState("");
    const [ confirmMBTI, setConfirmMBTI ] = useState("MBTI");

    const [ flagEmail, setFlagEmail ] = useState(false);
    const [ flagPassword, setFlagPassword ] = useState(false);
    const [ flagName, setFlagName ] = useState(false);
    const [ flagBirth, setFlagBirth ] = useState(false);
    const [ flagGender, setFlagGender ] = useState(false);
    const [ flagPhone, setFlagPhone ] = useState(false);
    const [ flagNick, setFlagNick ] = useState(false);
    const [ flagMBTI, setFlagMBTI ] = useState(false);
    const [ flagAddr, setFlagAddr ] = useState(false);
    const [ fileCheck, setFileCheck ] = useState("");
    const [ checkImg, setCheckImg ] = useState("");

    let test1 = "";
    let test2 = "";
    let test3 = "";

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
                setConfirmEmail('ID : 올바른 이메일 형식입니다.');
                setFlagEmail(true);
                setSignUp({ ...signUp, [ e.target.name ] : e.target.value })
                console.log("signUp : ", signUp);
            } else if(e.target.value.length <= 0) {
                setFlagEmail(false);
                setConfirmEmail('ID');
            } else {
                setFlagEmail(false);
                setConfirmEmail('ID : 이메일 형식으로 입력');
            }
        }
        if([e.target.name].includes('mpw1')) { // 비밀번호
            if(checkPassword.test(e.target.value)) {
                setSavePw(e.target.value);
                setConfirmPassword('PW : 올바른 비밀번호 형식입니다.');
                console.log("signUp : ", signUp);
            } else if(e.target.value.length <= 0) {
                setConfirmPassword('PW');
            } else {
                setConfirmPassword('PW: 숫자+영문자+특수문자 8자리 이상');
            }
        } 
        if([e.target.name].includes('mpw')) { // 비밀번호확인
            if(savePw === e.target.value) {
                setConfirmPw2('PW:Re : 비밀번호가 일치합니다.');
                setFlagPassword(true);
                setSignUp({ ...signUp, [ e.target.name ] : e.target.value })
                console.log("signUp : ", signUp);
            } else if(e.target.value.length <= 0) {
                setFlagPassword(false);
                setConfirmPw2('PW:Re');
            } else {
                setFlagPassword(false);
                setConfirmPw2('PW:Re: 비밀번호를 확인해주세요.');
            }
        }
        if([e.target.name].includes('mname')) { // 이름
            if(e.target.value.length >= 2 && e.target.value.length <= 15) {
                setConfirmName('NAME: 올바른 이름 형식입니다.');
                setFlagName(true);
                setSignUp({ ...signUp, [ e.target.name ] : e.target.value })
                console.log("signUp : ", signUp);
            } else {
                setFlagName(false); 
                setConfirmName('NAME : 2자 이상, 15자 이하');
            }
        }
        if([e.target.name].includes('mbirth')) { // 생년월일
            if(checkBirth.test(e.target.value)) {
                setConfirmBirth("√");
                setFlagBirth(true);
                setSignUp({ ...signUp, [ e.target.name ] : e.target.value })
                console.log("signUp : ", signUp);
            } else {
                setFlagBirth(false);
                setConfirmBirth("6자리");
            }
        }
        if([e.target.name].includes('mnickname')) { // 닉네임
            if(e.target.value.length >= 2 && e.target.value.length <= 15) {
                setConfirmNick('NICK: 올바른 닉네임 형식입니다.');
                setFlagNick(true);
                setSignUp({ ...signUp, [ e.target.name ] : e.target.value })
                console.log("signUp : ", signUp);
            } else {
                setFlagNick(false);
                setConfirmNick('NICK: 올바른 닉네임 형식입니다.');
            }
        }
        if([e.target.name].includes('mgender')) {
            if(e.target.value.length !== 0 && e.target.value % 2 === 0) {
                setFlagGender(true);
                setSignUp({ ...signUp, [ e.target.name ] : "Woman" })
                console.log("signUp : ", signUp);
            } else if(e.target.value.length === 0) {
                setFlagGender(false);
            } else {
                setFlagGender(true);
                setSignUp({ ...signUp, [ e.target.name ] : "Man" })
                console.log("signUp : ", signUp);
            }
        }
        if([e.target.name].includes('mphone1')) {
            if(checkp1.test(e.target.value)) {
                test1 = e.target.value;
            } 
        }
        if([e.target.name].includes('mphone2')) {
            if(checkp2.test(e.target.value)) {
                test2 = e.target.value;
            } 
        }
        if([e.target.name].includes('mphone')) {
            if(checkp3.test(e.target.value)) {
                test3 = test1 + test2 + e.target.value;
                setConfirmPhone("√");
                setSignUp({ ...signUp, [ e.target.name ] : test3 })
                setFlagPhone(true);
                console.log("signUp1 : ", signUp);
            } else {
                setConfirmPhone("X");
            }
        }
        if([e.target.name].includes('mbti')) {
            if(e.target.value.length === 4) {
                setConfirmMBTI("MBTI : 올바른 형식입니다.");
                setFlagMBTI(true);
                setSignUp({ ...signUp, [e.target.name] : e.target.value });
            } else {
                setConfirmMBTI("MBTI : 다시 확인해주세요.");
                setFlagMBTI(false);
            }
        }
        if([e.target.name].includes('profileimg')) {
            if(e.target.value.length >= 0) {
                setFileCheck({ [e.target.name] : e.target.files[0] });
                console.log(fileCheck);
                // setSignUp({ ...signUp, [e.target.name] : e.target.files[0] });
                setCheckImg(e.target.files[0].name);
            } 
        }
    };

    const sendSignUp = () => {
        if(flagEmail && flagBirth && flagGender && flagMBTI && flagName && flagNick && flagPassword && flagPhone) {
            if(confirmAddr_Post === "Addr_Post" || confirmAddr_Road === "Addr_Road") {
                alert("주소에 빈칸을 확인해주세요.");
                return;
            } else {
                const division = "_";
                let addr = confirmAddr_Post + division + confirmAddr_Road;

                const formData = new FormData();
                formData.append("mid", signUp.mid);
                formData.append("mpw", signUp.mpw);
                formData.append("mname", signUp.mname);
                formData.append("mnickname", signUp.mnickname);
                formData.append("mbirth", signUp.mbirth);
                formData.append("mgender", signUp.mgender);
                formData.append("mphone", signUp.mphone);
                formData.append("maddress", addr);
                formData.append("mbti", signUp.mbti);
                formData.append("profileimg", fileCheck.profileimg);

                setSignUp({ ...signUp, 'maddress' : addr });

                if(checkImg !== "") {
                    alert("폼데이터로");
                    SignUpAPI(formData);
                } else {
                    alert("안폼데이터로");
                    console.log("signUpsignUpsignUp: " , signUp);
                    SignUpNoImgAPI(signUp);
                }
            }
        }
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
                        <div className="card" style = {{ width: "100%", height: window.innerWidth <= 767 ? "60vh" : "50vh", overflowY : "auto" }}>
                            <section>
                                <h1>SignUp</h1> 
                            </section>
                            <div className="box" style = {{ width: "100%" }}>
                                <input type="text" name = "mid" required onChange = { saveMember } />
                                <span>{ confirmEmail }</span>
                                <i></i>
                            </div>
                            <div className="box" style = {{ width: "100%" }}>
                                <input type="password" name = "mpw1" required onChange = { saveMember } />
                                <span style = {{ fontSize: confirmPassword.length >= 3 ? "1rem" : "" }}>{ confirmPassword }</span>
                                <i></i>
                            </div>
                            <div className="box" style = {{ width: "100%" }}>
                                <input type="password" name = "mpw" required onChange = { saveMember } />
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
                                <span>{ confirmNick }</span>
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
                                        <input type="text" name = "mphone" required onChange = { saveMember } style = {{ textAlign: "center" }} />
                                        <i></i>
                                    </div>
                                </div>
                            </div>
                            <div className="box" style = {{ width: "100%" }}>
                                <input type="text" name = "mbti" required onChange = { saveMember } />
                                <span>{ confirmMBTI }</span>
                                <i></i>
                            </div>
                            <div className="box" style = {{ width: "100%" }}>
                            <input className = "form-control" onChange = { saveMember } type = "file" style = {{  }} name = "profileimg" />
                                <span></span>
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