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
    
    let userInfo = JSON.parse(localStorage.getItem("UserInfo"));
    const [ nick, setNick ] = useState({ "cnick" : userInfo.mnickname});
    const [ phone, setPhone ] = useState({ "cphone" : userInfo.mphone});
    const [ mbti, setMbti ] = useState({ "cmbti" : userInfo.mbti});
    const [ address, setAddress ] = useState({ "caddress" : userInfo.maddress});
    
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
        console.log(e.target.id);
        if([e.target.name].includes("cnick")) { setNick({ ...nick, [e.target.name] : e.target.value }); }
        else if([e.target.name].includes("cphone")) { setPhone({ ...phone, [e.target.name] : e.target.value }); }
        else if([e.target.name].includes("cmbti")) { setMbti({ ...mbti, [e.target.name] : e.target.value }); }
        else if([e.target.name].includes("caddress")) { setAddress({ ...address, [e.target.name] : e.target.value }); }

        if([e.target.id].includes("nickBtn")) {
            if(!nickSt) {  console.log("수정완료"); if(userInfo.mnickname !== nick.cnick) { setNickFlag(nickFlag => !nickFlag); } }
            setNcikSt(nickSt => !nickSt);
        } else if([e.target.id].includes("phoneBtn")) {
            if(!phoneSt) { console.log("수정완료"); if(userInfo.mnickname !== nick.cnick) { setPhoneFlag(phoneFlag => !phoneFlag); } }
            setPhoneSt(phoneSt => !phoneSt);
        } else if([e.target.id].includes("mbtiBtn")) {
            if(!mbtiSt) { console.log("수정완료"); if(userInfo.mnickname !== nick.cnick) { setMbtiFlag(mbtiFlag => !mbtiFlag); } }
            setMbtiSt(mbtiSt => !mbtiSt);
        } else if([e.target.id].includes("addressBtn")) {
            if(!addressSt) { console.log("수정완료"); if(userInfo.mnickname !== nick.cnick) { setAddressFlag(addressFlag => !addressFlag); } }
            setAddressSt(addressSt => !addressSt);
        } else if([e.target.id].includes("imgBtn")) {
            
        }

        console.log("nick.cnick : ", nick.length);

        // if(nick.length)

        if(!nickFlag || !phoneFlag || !mbtiFlag || !addressFlag) {
            setChangeInfo({ 
                "mnickname" : nick.cnick, 
                "mphone" : phone.cphone, 
                "mbti" : mbti.cmbti, 
                "maddress" : address.caddress 
            });
            console.log(userInfo.mnickname, " : ", nick);
            if(nick.cnick !== userInfo.mnickname && !nickSt || phone.cphone !== userInfo.mphone && !phoneSt || mbti.cmbti !== userInfo.mbti && !mbtiSt || address.caddress !== userInfo.maddress && !addressSt) {
                ChangeInfo(changeInfo);
            } else {
                console.log("@@@@@@@@@\nㄴㄴㄴㄴ\n@@@@@@@@@")
            }
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
        let fileReader = new FileReader();

        if(e.target.files[0]) {
            fileReader.readAsDataURL(e.target.files[0]);
            setPreviewImgName(e.target.files[0].name);
        }

        fileReader.onloadend = () => {
            setPreviewImg(fileReader.result);
        };
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
                                <td className = "col-6 col-md-7"><input type = "text" className = "form-control" name = "cnick" onChange = { stChange } value = { nick.cnick } disabled = { nickSt } /></td>
                                <td className = "col-3 col-md-2"><button type = "button" onClick = { stChange } id = "nickBtn" className = "btn btn-info" style = {{ width: window.innerWidth <= 767 ? "100%" : "63%", color: "white" }}>{ nickSt ? "수정" : "완료" }</button></td>
                            </tr>
                            <tr className = "row" style = {{ width: "100%", marginLeft: "3vw" }}>
                                <td className = "col-3 col-md-3"><label style = {{ fontSize: "1rem", marginTop: "1vh" }}>Phone</label></td>
                                <td className = "col-6 col-md-7"><input type = "text" className = "form-control" name = "cphone" onChange = { stChange } value = { phone.cphone } disabled = { phoneSt } /></td>
                                <td className = "col-3 col-md-2"><button type = "button" onClick = { stChange } id = "phoneBtn" className = "btn btn-info" style = {{ width: window.innerWidth <= 767 ? "100%" : "63%", color: "white" }}>{ phoneSt ? "수정" : "완료" }</button></td>
                            </tr>
                            <tr className = "row" style = {{ width: "100%", marginLeft: "3vw" }}>
                                <td className = "col-3 col-md-3"><label style = {{ fontSize: "1rem", marginTop: "1vh" }}>MBTI</label></td>
                                <td className = "col-6 col-md-7"><input type = "text" className = "form-control" name = "cmbti" onChange = { stChange } value = { mbti.cmbti } disabled = { mbtiSt } /></td>
                                <td className = "col-3 col-md-2"><button type = "button" onClick = { stChange } id = "mbtiBtn" className = "btn btn-info" style = {{ width: window.innerWidth <= 767 ? "100%" : "63%", color: "white" }}>{ mbtiSt ? "수정" : "완료" }</button></td>
                            </tr>
                            <tr className = "row" style = {{ width: "100%", marginLeft: "3vw" }}>
                                <td className = "col-3 col-md-3"><label style = {{ fontSize: "1rem", marginTop: "1vh" }}>Address</label></td>
                                <td className = "col-6 col-md-7"><input type = "text" className = "form-control" name = "caddress" onChange = { stChange } value = { address.caddress } disabled = { addressSt } /></td>
                                <td className = "col-3 col-md-2"><button type = "button" onClick = { stChange } id = "addressBtn" className = "btn btn-info" style = {{ width: window.innerWidth <= 767 ? "100%" : "63%", color: "white" }}>{ addressSt ? "수정" : "완료" }</button></td>
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
                                    <label htmlFor = "fileInput" style= {{ textAlign: "center" }}>{ !previewImg ? userInfo.profileimg.split("/MemberImg")[1].split("_")[1] : previewImgName }</label>
                                </td>
                                <td className = "col-3 col-md-3" style = {{ textAlign: "right" }}>
                                    { previewImg ? 
                                        <button type = "button" id = "imgBtn" className = "btn btn-info" onClick = { stChange } style = {{ width: window.innerWidth <= 767 ? "100%" : "63%", color: "white" }}>완료</button>
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