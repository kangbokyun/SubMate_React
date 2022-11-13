import { KakaoAPI, LoginAPI } from '../../Service/APIService';
import React, { useEffect, useState } from 'react';
import Marquee from "react-fast-marquee";
import { Link, useNavigate } from 'react-router-dom';
import '../../App.css';
import './Login.css';
import KakaoLogin from 'react-kakao-login';

function Login() {
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
    
    // 임시 메인페이지로 매핑
    const TemporaryMain = () => {
        window.location.href = "/Home";
    };

    const [ minfo, setMinfo ] = useState([]);

    const changeBox = (e) => {
        setMinfo({
            ...minfo, [ e.target.name ] : e.target.value
        })
        console.log(minfo);
    };
    const clickBtn = () => {
        LoginAPI(minfo)
    };

    const kakaoLogin = (result) => {
        const kakaoAccess = result.response['id_token'];
        const kakaoAge_Range = result.profile['kakao_account']['age_range'];
        const kakaoBirth = result.profile['kakao_account']['birthday'];
        const kakaoEmail = result.profile['kakao_account']['email'];
        const kakaoGender = result.profile['kakao_account']['gender'];
        const kakaoNickname = result.profile['kakao_account']['profile']['nickname'];
        const kakaoProfileIMG = result.profile['kakao_account']['profile']['profile_image_url'];
        const kakaoThumbnail = result.profile['kakao_account']['profile']['thumbnail_image_url'];
        const platForm = "Kakao";

        const kInfo = {
            "Access_Token" : kakaoAccess,
            "mager" : kakaoAge_Range,
            "mbirth" : kakaoBirth,
            "mid" : kakaoEmail,
            "mgender" : kakaoGender,
            "mnickname" : kakaoNickname,
            "mprofileimg" : kakaoProfileIMG,
            "mthumbnail" : kakaoThumbnail,
            "platForm" : platForm
        };

        fetch("http://localhost:8080/Auth/KakaoLogin", {
            headers: {'Content-Type' : 'application/json'},
            method : "POST",
            body : JSON.stringify(kInfo)
        })
        .then((res) => {
            localStorage.setItem("Access_Token", kakaoAccess);
            
            localStorage.setItem("UserInfo", JSON.stringify(kInfo));
            window.location.href = "/Home";
        })
    };

    // sendKakao = () => {
    //     console.log(kakaoInfo);
    // };

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
                    <h1 onClick = { GoBack } style = {{ position: "relative", top: "0px", marginLeft: "2vw", zIndex: "1", color: "white", marginTop: "1.5vh" }}>&#10094;</h1>
                    <h1 style = {{ position: "relative", top: "0px", zIndex: "1", textAlign: "center", color: "white", marginTop: "0.4vh" }}>SubMate</h1>
                    <Marquee gradient = { false } speed = "45" style = {{ position: "relative", top: "0px", zIndex: "1", textAlign: "center", color: "gold", marginTop: "5vh", width: window.innerWidth <= 767 ? "90%" :"60%", marginLeft: window.innerWidth <= 767 ? "5vw" :"10vw", fontSize: "1.4rem" }}>
                        지하철에서 스치듯 지나간 그 사람.. 서브메이트에서 만나자!　　　　　　　　　
                    </Marquee>
                    <div style = {{ position: "relative", zIndex: "1", marginTop: window.innerWidth <= 767 ? "5vh" :"10vh", width: window.innerWidth <= 767 ? "90%" :"60%", marginLeft: window.innerWidth <= 767 ? "5vw" :"10vw", fontSize: "1.5rem" }}>
                        <div className = "card" style = {{ width: "100%" }}>
                            <section>
                                <h1>Login</h1>
                            </section>
                            <div className = "box" style = {{ width: "100%" }}>
                                <input type = "text" name = "mid" required onChange = { changeBox } />
                                <span>ID</span>
                                <i></i>
                            </div>
                            <div className = "box" style = {{ width: "100%" }}>
                                <input type = "text" name = "mpw" required onChange = { changeBox } />
                                <span>PW</span>
                                <i></i>
                            </div>
                        </div>
                    </div>
                    <button  onClick = { clickBtn } type = "button" className = "btn btn-light" style = {{ position: "relative", zIndex: "1", marginTop: window.innerWidth <= 767 ? "17vh" :"20vh", width: window.innerWidth <= 767 ? "90%" :"60%", marginLeft: window.innerWidth <= 767 ? "5vw" :"10vw", fontSize: "1.5rem" }}>Login</button>
                    <KakaoLogin
                        token="a4f2c5ae0c7d781058ce2872976b922e"
                        onSuccess={ kakaoLogin }
                        onFail={ kakaoLogin }
                        needProfile={true}
                        useLoginForm={true}
                        persistAccessToken={true}
                        throughTalk={true}
                    />
                    <button type = "button" className = "btn btn-outline-success" style = {{ position: "relative", zIndex: "1", marginTop: "1vh", width: window.innerWidth <= 767 ? "90%" :"60%", marginLeft: window.innerWidth <= 767 ? "5vw" :"10vw", fontSize: "1.5rem" }}>Naver</button>
                    <Link to = "/SignUp"><p style = {{ position: "relative", zIndex: "1", marginTop: window.innerWidth <= 767 ? "3vh" :"2.5vh", width: window.innerWidth <= 767 ? "90%" :"60%", marginLeft: window.innerWidth <= 767 ? "5vw" :"10vw", color: "white", fontSize: "0.8rem" }}>아직 회원이 아니신가요?</p></Link>
                </div>
                <img alt = "SubMate" src = { require('../../IMG/Train.jpg') } style = {{ width: "100%", height: "100vh", zIndex: "-1", position: "relative" }} />
            </div>
        </div>
    );
}
export default Login;