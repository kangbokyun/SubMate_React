import React from 'react';
import { useEffect } from 'react';
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ChangeInfo, call } from '../../Service/APIService';
import Header from '../Header';
import Menu from '../Menu';
import Statistics from './Statistics';

function MyProfile() {
    // 윈도우 크기 변경 감지되면 리렌더링
    const [ windowWidth, setWindowWidth ] = useState(0);
    const [ windowHeight, setWindowHeight ] = useState(0);
    const [ userId, setUserId ] = useState("");
    const [ idSt, setIdSt ] = useState(true);
    const [ name, setName ] = useState("");
    const [ nameSt, setNameSt ] = useState(true);
    const [ nickSt, setNcikSt ] = useState(true);
    const [ phoneSt, setPhoneSt ] = useState(true);
    const [ mbtiSt, setMbtiSt ] = useState(true);
    const [ addressSt, setAddressSt ] = useState(true);
    const [ previewImg, setPreviewImg ] = useState();
    const [ previewImgName, setPreviewImgName ] = useState("");
    const [ WritedBoard, setWritedBoard ] = useState({});
    const [ writedReply, setWritedReply ] = useState({});
    const [ takeHeart, setTakeHeart ] = useState();
    const [ changeInfo, setChangeInfo ] = useState({});
    const [ nickFlag, setNickFlag ] = useState(false);
    const [ phoneFlag, setPhoneFlag ] = useState(false);
    const [ addressFlag, setAddressFlag ] = useState(false);
    const [ mbtiFlag, setMbtiFlag ] = useState(false);
    const [ profileImg, setProfileImg ] = useState({});
    
    let userInfo = JSON.parse(localStorage.getItem("UserInfo"));
    const [ nick, setNick ] = useState({ "mnickname" : userInfo.mnickname});
    const [ phone, setPhone ] = useState({ "mphone" : userInfo.mphone});
    const [ mbti, setMbti ] = useState({ "mbti" : userInfo.mbti});
    const [ address, setAddress ] = useState({ "maddress" : userInfo.maddress});
    
    let resizeWindow = () => {
        setWindowWidth(window.innerWidth);
        setWindowHeight(window.innerHeight);
    };
    
    useEffect(() => {
        const formData = new FormData();
        formData.append("mno", userInfo.mno);
        call("/MyInfo/WritedBoard", "POST", formData)
        .then((res) => { console.log("/MyInfo/WritedBoard/Res => ", res); setWritedBoard(res); });
        call("/MyInfo/WritedReply", "POST", formData)
        .then((res) => { console.log("/MyInfo/WritedReply/Res => ", res); setWritedReply(res); })
        call("/MyInfo/TakeHeart", "POST", formData)
        .then((res) => { console.log("/MyInfo/TakeHeart/Res => ", res); setTakeHeart(res); })
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

    const stChange = (e) => {
        if([e.target.name].includes("mnickname")) { 
            setNick({[e.target.name] : e.target.value});
            userInfo.mnickname = e.target.value;
        } else if([e.target.name].includes("mphone")) { 
            setPhone({ ...phone, [e.target.name] : e.target.value }); 
            userInfo.mnickname = e.target.value;
        } else if([e.target.name].includes("mbti")) { 
            setMbti({ ...mbti, [e.target.name] : e.target.value }); 
            userInfo.mnickname = e.target.value;
        } else if([e.target.name].includes("maddress")) { 
            setAddress({ ...address, [e.target.name] : e.target.value });
            userInfo.mnickname = e.target.value; 
        } else if([e.target.name].includes("imgBtn")) {
            
        }

        setChangeInfo({ ...changeInfo, "mno" : userInfo.mno, [e.target.name] : e.target.value });
    };

    const confirmBtn = (e) => {
        if([e.target.id].includes("nickBtn")) { setNcikSt(nickSt => !nickSt);
        } else if([e.target.id].includes("phoneBtn")) {  setPhoneSt(phoneSt => !phoneSt);
        } else if([e.target.id].includes("mbtiBtn")) { setMbtiSt(mbtiSt => !mbtiSt);
        } else if([e.target.id].includes("addressBtn")) { setAddressSt(addressSt => !addressSt); }
        
        if(!nickSt || !phoneSt || !mbtiSt || !addressSt) {
            const userData = JSON.parse(localStorage.getItem("UserInfo"));
            if(!nickSt) { if(userInfo.mnickname !== changeInfo.mnickname && changeInfo.mnickname !== undefined) { userData.mnickname = changeInfo.mnickname; } }
            if(!phoneSt) { if(!userInfo.mphone !== changeInfo.mphone && changeInfo.mphone !== undefined) { userData.mphone = changeInfo.mphone; } }
            if(!mbtiSt) { if(!userInfo.mbti !== changeInfo.mbti && changeInfo.mbti !== undefined) { userData.mbti = changeInfo.mbti; } }
            if(!addressSt) { if(!userInfo.maddress !== changeInfo.maddress && changeInfo.maddress !== undefined) {  userData.maddress = changeInfo.maddress; } }
            localStorage.setItem("UserInfo", JSON.stringify(userData));

            ChangeInfo(changeInfo);
        }
    };

    const [ view, setView ] = useState(1);
    const viewChange = (e) => {
        if(e.target.id === "1") {
            setView(2);
        } else {
            setView(1);
        }
    };

    const imagePreview = (e) => {
        alert("123");
        let fileReader = new FileReader();

        if(e.target.files[0]) {
            fileReader.readAsDataURL(e.target.files[0]);
            setPreviewImgName(e.target.files[0].name);
            setProfileImg({ [ e.target.name ] : e.target.files[0] });
        }

        fileReader.onloadend = () => {
            setPreviewImg(fileReader.result);
        };
        alert(e.target.name);
        if([e.target.name].includes("imgBtn")) {
            alert(e.target.files[0].name);
        }
    };

    return(
        <div>
            <Header />
            { window.innerWidth <= 767 ? 
                <div><h1 style = {{ marginLeft: "3vw", marginTop: "8vh" }}>MyProfile</h1></div> :
                <h1 style = {{ marginLeft: "6vw", marginTop: "8vh" }}>MyProfile</h1> 
            }
            <div className = { window.innerWidth <= 767 ? "" : "container" }>
                <div className = "row" style = {{ width: "96%", marginTop: "3vh", marginLeft: "0.1vw" }}>
                    <div className = "col-6 col-md-6" style = {{ height: "6vh", textAlign: "center", backgroundColor: view === 1 ? "white" : "#e6e6e6", paddingLeft: "1.5vw" }}>
                        <img alt = "" src = { require('../../IMG/ProfileHuman.png') } 
                            style = {{  
                                width: window.innerWidth <= 767 ? "10vw" : "4vw"
                            }}
                            id = "2"
                            onClick = { viewChange }
                        />
                    </div>
                    <div className = "col-6 col-md-6" style = {{ height: "6vh", textAlign: "center", backgroundColor: view === 2 ? "white" : "#e6e6e6" }}>
                        <img alt = "" src = { require('../../IMG/ProfileGraph.png') } 
                            style = {{  
                                width: window.innerWidth <= 767 ? "12vw" : "5vw",
                                marginTop: "0.5vh"
                            }}
                            id = "1"
                            onClick = { viewChange }
                        />
                    </div>
                </div>
                { view === 1 ? 
                
                <div className = "row" style = {{ width: "100%", marginTop: "3vh" }}>
                    <table className = "table" style = {{ width: "95%" }}>
                        <tbody>
                            <tr className = "row" style = {{ width: "100%", marginLeft: "3vw" }}>
                                <td className = "col-3 col-md-3"><label style = {{ fontSize: "1rem", marginTop: "1vh" }}>ID</label></td>
                                <td className = "col-7 col-md-7"><input type = "text" id = "idBtn" className = "form-control" value = { userInfo.mid } disabled = { idSt } /></td>
                            </tr>
                            <tr className = "row" style = {{ width: "100%", marginLeft: "3vw" }}>
                                <td className = "col-3"><label style = {{ fontSize: "1rem", marginTop: "1vh" }}>Name</label></td>
                                <td className = "col-7"><input type = "text" id = "idBtn" className = "form-control" value = { userInfo.mname } disabled = { nameSt } /></td>
                            </tr>
                            <tr className = "row" style = {{ width: "100%", marginLeft: "3vw" }}>
                                <td className = "col-3 col-md-3"><label style = {{ fontSize: "1rem", marginTop: "1vh" }}>Nick</label></td>
                                <td className = "col-6 col-md-7"><input type = "text" className = "form-control" name = "mnickname" onChange = { stChange } value = { nick.mnickname } disabled = { nickSt } /></td>
                                <td className = "col-3 col-md-2"><button type = "button" onClick = { confirmBtn } id = "nickBtn" className = "btn btn-info" style = {{ width: window.innerWidth <= 767 ? "100%" : "63%", color: "white" }}>{ nickSt ? "수정" : "완료" }</button></td>
                            </tr>
                            <tr className = "row" style = {{ width: "100%", marginLeft: "3vw" }}>
                                <td className = "col-3 col-md-3"><label style = {{ fontSize: "1rem", marginTop: "1vh" }}>Phone</label></td>
                                <td className = "col-6 col-md-7"><input type = "text" className = "form-control" name = "mphone" onChange = { stChange } value = { phone.mphone } disabled = { phoneSt } /></td>
                                <td className = "col-3 col-md-2"><button type = "button" onClick = { confirmBtn } id = "phoneBtn" className = "btn btn-info" style = {{ width: window.innerWidth <= 767 ? "100%" : "63%", color: "white" }}>{ phoneSt ? "수정" : "완료" }</button></td>
                            </tr>
                            <tr className = "row" style = {{ width: "100%", marginLeft: "3vw" }}>
                                <td className = "col-3 col-md-3"><label style = {{ fontSize: "1rem", marginTop: "1vh" }}>MBTI</label></td>
                                <td className = "col-6 col-md-7"><input type = "text" className = "form-control" name = "mbti" onChange = { stChange } value = { mbti.mbti } disabled = { mbtiSt } /></td>
                                <td className = "col-3 col-md-2"><button type = "button" onClick = { confirmBtn } id = "mbtiBtn" className = "btn btn-info" style = {{ width: window.innerWidth <= 767 ? "100%" : "63%", color: "white" }}>{ mbtiSt ? "수정" : "완료" }</button></td>
                            </tr>
                            <tr className = "row" style = {{ width: "100%", marginLeft: "3vw" }}>
                                <td className = "col-3 col-md-3"><label style = {{ fontSize: "1rem", marginTop: "1vh" }}>Address</label></td>
                                <td className = "col-6 col-md-7"><input type = "text" className = "form-control" name = "maddress" onChange = { stChange } value = { address.maddress } disabled = { addressSt } /></td>
                                <td className = "col-3 col-md-2"><button type = "button" onClick = { confirmBtn } id = "addressBtn" className = "btn btn-info" style = {{ width: window.innerWidth <= 767 ? "100%" : "63%", color: "white" }}>{ addressSt ? "수정" : "완료" }</button></td>
                            </tr>
                            <tr className = "row" style = {{ width: "100%", marginLeft: "3vw" }}>
                                <td className = "col-12">
                                { !previewImg ? 
                                    <img 
                                        alt = "" 
                                        src = { require('../../MemberImg' + userInfo.profileimg.split("/MemberImg")[1]) }
                                        htmlFor = "fileInput"
                                        style = {{  
                                            width: window.innerWidth <= 767 ? "96vw" : "100%",
                                            height: "30vh",
                                            objectFit: "contain",
                                            backgroundColor: "#f0efed"
                                        }} 
                                    />
                                    :
                                    <img 
                                        alt = "" 
                                        src = { previewImg } 
                                        style = {{ 
                                            width: window.innerWidth <= 767 ? "96vw" : "100%",
                                            height: "30vh",
                                            objectFit: "contain",
                                            backgroundColor: "#f0efed"
                                        }} 
                                    /> 
                                }
                                </td>
                                <td className = "col-9 col-md-9" style = {{ textAlign: "center", paddingTop: "1vh" }}>
                                    <input id = "fileInput" accept = "image/*" type = "file" style = {{ display: "none" }} onChange = { (e) => imagePreview(e) } />
                                    <label onClick = { stChange } name = "imgTitle" htmlFor = "fileInput" style= {{ textAlign: "center" }}>{ !previewImg ? userInfo.profileimg.split("/MemberImg")[1].split("_")[1] : previewImgName }</label>
                                </td>
                                <td className = "col-3 col-md-3" style = {{ textAlign: "right" }}>
                                    { previewImg ? 
                                        <button type = "button" name = "imgBtn" className = "btn btn-info" onClick = { imagePreview } style = {{ width: window.innerWidth <= 767 ? "100%" : "63%", color: "white" }}>완료</button>
                                        :
                                        <></>
                                    }
                                </td>
                            </tr>
                        </tbody>
                    </table>
                    </div>
                    :
                    <Statistics WritedBoard = { WritedBoard } WritedReply = { writedReply } TakeHeart = { takeHeart } />
                }
            </div>
            <Menu />
        </div>
    );
}
export default MyProfile;