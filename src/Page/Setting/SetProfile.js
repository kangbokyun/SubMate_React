import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { call } from '../../Service/APIService';
import Header from '../Header';
import Menu from '../Menu';

function SetProfile() {
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

    const [ profile, setProfile ] = useState([]);
    const userInfo = JSON.parse(localStorage.getItem("UserInfo"));
    const mno = userInfo.mno;
    const changeComment = (e) => {
        if([e.target.name].includes("intro")) {
            if(e.target.value.length !== 0) {
                setProfile({ ...profile, "pintro" : e.target.value, 'mno' : mno });
            }
        }
        if([e.target.name].includes("l1")) {
            if(e.target.value.length !== 0) {
                setProfile({ ...profile, "plike1" : e.target.value });
            }
        }
        if([e.target.name].includes("l2")) {
            if(e.target.value.length !== 0) {
                setProfile({ ...profile, "plike2" : e.target.value });
            }
        }
        if([e.target.name].includes("l3")) {
            if(e.target.value.length !== 0) {
                setProfile({ ...profile, "plike3" : e.target.value });
            }
        }
        if([e.target.name].includes("ul1")) {
            if(e.target.value.length !== 0) {
                setProfile({ ...profile, "punlike1" : e.target.value });
            }
        }
        if([e.target.name].includes("ul2")) {
            if(e.target.value.length !== 0) {
                setProfile({ ...profile, "punlike2" : e.target.value });
            }
        }
        if([e.target.name].includes("ul3")) {
            if(e.target.value.length !== 0) {
                setProfile({ ...profile, "punlike3" : e.target.value });
            }
        }
        if([e.target.name].includes("hobby1")) {
            if(e.target.value.length !== 0) {
                setProfile({ ...profile, "phobby1" : e.target.value });
            }
        }
        if([e.target.name].includes("hobby2")) {
            if(e.target.value.length !== 0) {
                setProfile({ ...profile, "phobby2" : e.target.value });
            }
        }
        if([e.target.name].includes("hobby3")) {
            if(e.target.value.length !== 0) {
                setProfile({ ...profile, "phobby3" : e.target.value });
            }
        }
    };

    const saveSetting = () => {
        call("/Setting/Profile", "POST", profile)
        .then((res) => {
            if(res) {
                console.log(res);
                alert("저장되었습니다.");
                window.location.href = "/Setting";
            }
        })
    };

    return(
        <div>
            <Header />
            { window.innerWidth <= 767 ? 
                <div>
                    <h1 style = {{ marginLeft: "1vw", marginTop: "8vh" }}>
                        <span onClick = { GoBack } style = {{ marginRight: "1.5vw" }}>&#10094;</span>
                        Setting_Profile
                        <span style = {{ float: "right", marginRight: "2vw" }}>
                            <button type = "button" className = "btn btn-success" onClick = { saveSetting }>저장</button>
                        </span>
                    </h1>
                </div>
                : 
                <div className = "row" style = {{ width: "100%", marginLeft: "6vw", marginTop: "8vh" }}>
                    <div className = "col-md-6">
                        <h1 style = {{  }}>Setting_Profile</h1> 
                    </div>
                    <div className = "col-md-6">
                        <button onClick = { saveSetting } type = "button" className = "btn btn-info" style = {{ float: "right", marginRight: "14vw", color: "white" }}>저장</button>
                    </div>
                </div> 
            }
            <div className = { window.innerWidth <= 767 ? "" : "container" }>
                <div className = "row" style = {{ width: "100%" }}>
                    <div className = "col-12 col-md-12" style = {{ marginTop: "1.2vh", marginLeft: "1.5vw" }}>
                        <h4>나를 한마디로</h4>
                    </div>
                    <div className = "col-12 col-md-12" style = {{ marginTop: "1.2vh", marginLeft: "1.5vw" }}>
                        <textarea name = "intro" onChange = { changeComment } className = "form-control" style = {{ marginLeft: "1.4vw", width: "100%" }} placeholder = "나를 간단하게 소개해주세요."></textarea>
                    </div>
                    <div className = "col-12 col-md-12" style = {{ marginTop: "1.2vh", marginLeft: "1.5vw", borderTop: "solid 1px gray", paddingTop: "1.5vh" }}>
                        <h4>나의 호불호는 ?</h4>
                    </div>
                    <div className = "col-12 col-md-12">
                        <div className = "row">
                            <div className = "col-9 col-md-9">
                                <input name = "l1" onChange = { changeComment } type = "text" className = "form-control" placeholder = "호를 써주세요!" style = {{ marginLeft: "1.5vw" }} />
                            </div>
                            <div className = "col-3 col-md-3">
                                <h5 style = {{ marginTop: "1vh" }}>좋아하는</h5>
                            </div>
                            <div className = "col-9 col-md-9">
                                <input name = "l2" onChange = { changeComment } type = "text" className = "form-control" placeholder = "호를 써주세요!" style = {{ marginLeft: "1.5vw" }} />
                            </div>
                            <div className = "col-3 col-md-3">
                                <h5 style = {{ marginTop: "1vh" }}>좋아하는</h5>
                            </div>
                            <div className = "col-9 col-md-9">
                                <input name = "l3" onChange = { changeComment } type = "text" className = "form-control" placeholder = "호를 써주세요!" style = {{ marginLeft: "1.5vw" }} />
                            </div>
                            <div className = "col-3 col-md-3">
                                <h5 style = {{ marginTop: "1vh" }}>좋아하는</h5>
                            </div>
                            <div className = "col-12 col-md-12" style = {{ marginLeft: "2.5vw" }}>
                                <hr/>
                            </div>
                            <div className = "col-9 col-md-9">
                                <input name = "ul1" onChange = { changeComment } type = "text" className = "form-control" placeholder = "불호를 써주세요!" style = {{ marginLeft: "1.5vw" }} />
                            </div>
                            <div className = "col-3 col-md-3">
                                <h5 style = {{ marginTop: "1vh" }}>싫어하는</h5>
                            </div>
                            <div className = "col-9 col-md-9">
                                <input name = "ul2" onChange = { changeComment } type = "text" className = "form-control" placeholder = "불호를 써주세요!" style = {{ marginLeft: "1.5vw" }} />
                            </div>
                            <div className = "col-3 col-md-3">
                                <h5 style = {{ marginTop: "1vh" }}>싫어하는</h5>
                            </div>
                            <div className = "col-9 col-md-9">
                                <input name = "ul3" onChange = { changeComment } type = "text" className = "form-control" placeholder = "불호를 써주세요!" style = {{ marginLeft: "1.5vw" }} />
                            </div>
                            <div className = "col-3 col-md-3">
                                <h5 style = {{ marginTop: "1vh" }}>싫어하는</h5>
                            </div>
                        </div>
                    </div>
                    <div className = "col-12 col-md-12" style = {{ marginTop: "1.2vh", marginLeft: "1.5vw", borderTop: "solid 1px gray", paddingTop: "1.5vh" }}>
                        <h4>취미</h4>
                    </div>
                    <div className = "col-12 col-md-12" style = {{ marginTop: "1.2vh", marginLeft: "1.5vw" }}>
                        <input name = "hobby1" onChange = { changeComment } type = "text" className = "form-control" placeholder = "테니스" style = {{ marginLeft: "1.5vw" }} />
                        <input name = "hobby2" onChange = { changeComment } type = "text" className = "form-control" placeholder = "사진찍기" style = {{ marginLeft: "1.5vw" }} />
                        <input name = "hobby3" onChange = { changeComment } type = "text" className = "form-control" placeholder = "춤추기" style = {{ marginLeft: "1.5vw" }} />
                    </div>
                </div>
            </div>
            <Menu />
        </div>
    );
}
export default SetProfile;