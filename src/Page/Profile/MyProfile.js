import React from 'react';
import { useEffect } from 'react';
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
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
    const [ nick, setNick ] = useState("");
    const [ nickSt, setNcikSt ] = useState(true);
    const [ phone, setPhone ] = useState("");
    const [ phoneSt, setPhoneSt ] = useState(true);
    const [ mbti, setMbti ] = useState("");
    const [ mbtiSt, setMbtiSt ] = useState(true);
    const [ address, setAddress ] = useState("");
    const [ addressSt, setAddressSt ] = useState(true);
    const [ previewImg, setPreviewImg ] = useState();
    const [ previewImgName, setPreviewImgName ] = useState("");
    
    let userInfo = JSON.parse(localStorage.getItem("UserInfo"));
    
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

    const stChange = (e) => {
        console.log(e.target.id);
        if([e.target.id].includes("idBtn")) {
            setIdSt(idSt => !idSt);
        } else if([e.target.id].includes("nameBtn")) {
            setIdSt(nameSt => !nameSt);
        } else if([e.target.id].includes("nickBtn")) {
            setIdSt(nickSt => !nickSt);
        } else if([e.target.id].includes("phoneBtn")) {
            setIdSt(phoneSt => !phoneSt);
        } else if([e.target.id].includes("mbtiBtn")) {
            setIdSt(mbtiSt => !mbtiSt);
        } else if([e.target.id].includes("addressBtn")) {
            setIdSt(addressSt => !addressSt);
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
            <div className = { window.innerWidth <= 767 ? "container" : "" }>
                <div className = "row" style = {{ width: "100%", marginTop: "3vh", marginLeft: "0.1vw" }}>
                    <div className = "col-6 col-md-6" style = {{ height: "6vh", textAlign: "center", backgroundColor: view === 1 ? "white" : "#e6e6e6", paddingLeft: "1.5vw", boxShadow: view === 1 ? "" : "inset -5px -5px 5px 5px gray" }}>
                        <img alt = "" src = { require('../../IMG/ProfileHuman.png') } 
                            style = {{  
                                width: "10vw"
                            }}
                            id = "2"
                            onClick = { viewChange }
                        />
                    </div>
                    <div className = "col-6 col-md-6" style = {{ height: "6vh", textAlign: "center", backgroundColor: view === 2 ? "white" : "#e6e6e6", boxShadow: view === 2 ? "" : "inset 5px -5px 5px 5px gray" }}>
                        <img alt = "" src = { require('../../IMG/ProfileGraph.png') } 
                            style = {{  
                                width: "12vw",
                                marginTop: "0.5vh"
                            }}
                            id = "1"
                            onClick = { viewChange }
                        />
                    </div>
                </div>
                { view === 1 ? 
                
                <div className = "row" style = {{ width: "100%", marginTop: "3vh" }}>
                    <table className = "table">
                        <tbody>
                            <tr className = "row" style = {{ width: "100%", marginLeft: "3vw" }}>
                                <td className = "col-3 col-md-3"><label style = {{ fontSize: "1rem", marginTop: "1vh" }}>ID</label></td>
                                <td className = "col-6 col-md-6"><input type = "text" className = "form-control" value = { userInfo.mid } disabled = { idSt } /></td>
                            </tr>
                            <tr className = "row" style = {{ width: "100%", marginLeft: "3vw" }}>
                                <td className = "col-3"><label style = {{ fontSize: "1rem", marginTop: "1vh" }}>Name</label></td>
                                <td className = "col-6"><input type = "text" className = "form-control" value = { userInfo.mname } disabled = { nameSt } /></td>
                            </tr>
                            <tr className = "row" style = {{ width: "100%", marginLeft: "3vw" }}>
                                <td className = "col-3"><label style = {{ fontSize: "1rem", marginTop: "1vh" }}>Nick</label></td>
                                <td className = "col-6"><input type = "text" className = "form-control" value = { userInfo.mnickname } disabled = { nickSt } /></td>
                                <td className = "col-3"><button type = "button" onClick = { stChange } id = "nickBtn" className = "btn btn-info" style = {{ width: "100%", color: "white" }}>수정</button></td>
                            </tr>
                            <tr className = "row" style = {{ width: "100%", marginLeft: "3vw" }}>
                                <td className = "col-3"><label style = {{ fontSize: "1rem", marginTop: "1vh" }}>MBTI</label></td>
                                <td className = "col-6"><input type = "text" className = "form-control" value = { userInfo.mbti } disabled = { mbtiSt } /></td>
                                <td className = "col-3"><button type = "button" onClick = { stChange } id = "mbtiBtn" className = "btn btn-info" style = {{ width: "100%", color: "white" }}>수정</button></td>
                            </tr>
                            <tr className = "row" style = {{ width: "100%", marginLeft: "3vw" }}>
                                <td className = "col-3"><label style = {{ fontSize: "1rem", marginTop: "1vh" }}>Address</label></td>
                                <td className = "col-6"><input type = "text" className = "form-control" value = { userInfo.maddress } disabled = { addressSt } /></td>
                                <td className = "col-3"><button type = "button" onClick = { stChange } id = "addressBtn" className = "btn btn-info" style = {{ width: "100%", color: "white" }}>수정</button></td>
                            </tr>
                            <tr className = "row" style = {{ width: "100%", marginLeft: "3vw" }}>
                                <td className = "col-12">
                                { !previewImg ? 
                                    <img 
                                        alt = "" 
                                        src = { require('../../MemberImg' + userInfo.profileimg.split("/MemberImg")[1]) }
                                        style = {{  
                                            width: "90vw",
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
                                            width: "90vw",
                                            height: "30vh",
                                            objectFit: "contain",
                                            backgroundColor: "#f0efed"
                                        }} 
                                    /> 
                                }
                                </td>
                                <td>
                                    <input id = "fileInput" accept = "image/*" type = "file" style = {{ display: "none" }} onChange = { (e) => imagePreview(e) } />
                                    <label htmlFor = "fileInput" style= {{ border: "solid 1px green" }}>{ !previewImg ? userInfo.profileimg.split("/MemberImg")[1].split("_")[1] : previewImgName }</label>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                    </div>
                    :
                    <Statistics />
                }
            </div>
            <Menu />
        </div>
    );
}
export default MyProfile;