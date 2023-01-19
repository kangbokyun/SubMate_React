import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { call, SendTalkAPI } from '../../Service/APIService';
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
    
    const [ talkList, setTalkList ] = useState([]);
    const formData = new FormData();
    formData.append("mno", userInfo.mno);
    useEffect(() => {
        call("/Profile/TalkList", "POST", formData)
        .then((res) => { console.log("/Profile/TalkList/Res : ", res); setTalkList(res); console.log(res.length) });
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

    const [ talkData, setTalkData ] = useState({});
    const lineTalk = (e) => {
        setTalkData({ 
            ...talkData, 
            [ e.target.name ] : e.target.value, 
            "mno" : userInfo.mno, 
            "ptwriter" : userInfo.mnickname,
            "writedmno" : 0
        });
    };

    const sendTalk = () => {
        SendTalkAPI(talkData);
    };

    return(
        <div>
            <Header />
            { window.innerWidth <= 767 ? 
                <div><h1 style = {{ marginLeft: "1vw", marginTop: "10vh" }}><span onClick = { GoBack } style = {{ marginRight: "1.5vw" }}>&#10094;</span>Profile</h1></div> :
                <h1 style = {{ marginLeft: "8vw", marginTop: "8vh" }}>Profile</h1> 
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
                                            { window.innerWidth <= 767 ? <h4>Birth</h4> : <h4 style = {{ marginTop: "1vh" }}>Birth</h4> }
                                            { window.innerWidth <= 767 ? <h4>MBTI</h4> : <h4 style = {{ marginTop: "1vh" }}>MBTI</h4> }
                                            { window.innerWidth <= 767 ? <h4>Auth</h4> : <h4 style = {{ marginTop: "1vh" }}>Auth</h4> }
                                        </div>
                                        <div className = "col-md-8 col-8" style = {{ textAlign: "center" }}>
                                            { window.innerWidth <= 767 ? <h4 style = {{ marginTop: "1vh" }}>{ userInfo.mnickname }</h4> : <h4 style = {{ marginTop: "2vh" }}>{ userInfo.mnickname }</h4> }
                                            { window.innerWidth <= 767 ? <h4 style = {{ marginTop: window.innerWidth <= 767 ? userInfo.mhobby === null ? "1.7vh" : "1vh" : "", fontSize: userInfo.mhobby === null ? "0.9rem" : "" }}>{ userInfo.mhobby === null ? "취미를 설정해주세요." : userInfo.mhobby }</h4> : <h4 style = {{ marginTop: "1vh" }}>{ userInfo.mhobby === null ? "취미를 설정해주세요." : userInfo.mhobby }</h4> }
                                            { window.innerWidth <= 767 ? <h4 style = {{ marginTop: window.innerWidth <= 767 ? "1vh" : "" }}>{ userInfo.mbirth }</h4> : <h4 style = {{ marginTop: "1vh" }}>{ userInfo.mbirth }</h4> }
                                            { window.innerWidth <= 767 ? <h4 style = {{ marginTop: window.innerWidth <= 767 ? "1vh" : "" }}>{ userInfo.mbti }</h4> : <h4 style = {{ marginTop: "1vh" }}>{ userInfo.mbti }</h4> }
                                            <h4>{ userInfo.platForm === "Kakao" ? <span style = {{ font: "bold", color: "yellow" }}>K</span> : userInfo.mplatform === "SubMate" || null || "" ? <span style = {{ font: "bold", color: "green" }}>SubMate</span> : <span style = {{ font: "bold", color: "green" }}>N</span> }</h4>
                                        </div>
                                    </div>
                                </div>
                                <div className = "col-md-3 col-3">
                                { window.innerWidth <= 767 ? 
                                    <div style = {{ marginTop: "4vh" }}><img alt = "Setting" src = { require('../../MemberImg' + userInfo.profileimg.split("/MemberImg")[1]) } style = {{ width: "100%", height: "80%", borderRadius: "8px", objectFit: "contain" }} /><h6 style = {{ marginLeft: "1vw" }}>{ userInfo.mager }</h6></div> : 
                                    <div style = {{ marginTop: "4vh" }}><img alt = "Setting" src = { require('../../MemberImg' + userInfo.profileimg.split("/MemberImg")[1]) } style = {{ width: "100%", height: "80%", borderRadius: "8px", objectFit: "contain" }} /><h6 style = {{ marginLeft: "1vw" }}>{ userInfo.mager }</h6></div> 
                                }
                                </div>
                                <div className = "col-md-10 col-10 offset-md-1 offset-1">
                                    { window.innerWidth <= 767 ? 
                                        <div className = "row">
                                            <div className = "col-md-9 col-9">
                                                <h4 style = {{ marginTop: "1vh", textAlign: "center" }}>서브메이트 개발자 일동</h4>
                                            </div>
                                            <div className = "col-md-3 col-3">
                                                <img alt = "Setting" src = { require('../../IMG/Stamp.png') } style = {{ width: "11vw", height: "5vh", paddingTop: "0" }} />
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
                    <div className = "row" style = {{ width: "100%", marginTop: "3vh" }}>
                        <h5>한마디</h5>
                        <table className = "table"  style = {{ marginLeft: "5vw", height: "37vh" }}>
                            <tbody>
                                { talkList.length === 0 ? 
                                    <tr className = "row" style = {{ width: "100%" }}>
                                        <td className = "col-12" style = {{ textAlign: "center" }}>첫 한마디를 남겨보세요!</td>
                                    </tr>
                                    :
                                    <></>
                                }
                                { talkList.map((list) =>
                                    <tr key = { list.ptno } className = "row" style = {{ width: "100%" }}>
                                        <td className = "col-3">{ list.ptwriter }</td>
                                        <td className = "col-9">{ list.ptcontents }</td>
                                    </tr>
                                ) }
                            </tbody>
                        </table>
                        <div className = "row">
                            <div className = "col-11" style = {{ paddingLeft: "5vw" }}>
                                <input type = "text" className = "form-control" onChange = { lineTalk } name = "ptcontents" />
                            </div>
                            <div className = "col-1 gx-0">
                                <button type = "button" className = "btn btn-success" onClick = { sendTalk }>Send</button>
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