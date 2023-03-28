import React from 'react';
import Header from '../Header';
import Menu from '../Menu';
import '../../Component/Card/Card2.css';
import { useState } from 'react';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { call, ChatCall, UserHeart } from '../../Service/APIService';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Dropdown from 'react-bootstrap/Dropdown';
import DropdownButton from 'react-bootstrap/DropdownButton';
import './Mate.css';

function Mate() {
    // 윈도우 크기 변경 감지되면 리렌더링
    const [ windowWidth, setWindowWidth ] = useState(0);
    const [ windowHeight, setWindowHeight ] = useState(0);
    let resizeWindow = () => {
        setWindowWidth(window.innerWidth);
        setWindowHeight(window.innerHeight);
    };

    const userInfo = JSON.parse(localStorage.getItem("UserInfo"));
    const [ userInfos, setUserInfos ] = useState([]);
    const [ profile, setProfile ] = useState([]);
    const [ userHeartList, setUserHeartList ] = useState([]);
    const [ checkClickH, setCheckClickH ] = useState(false);
    const [ callList, setCallList ] = useState([]);
    useEffect(() => {
        let userInfo = JSON.parse(localStorage.getItem("UserInfo"));
        const formData = new FormData();
        formData.append("mno", userInfo.mno);
        // setUserInfos({"mno" : mno.mno})
        call("/Mate/Users", "POST", formData)
        .then((res) => { setUserInfos(res); console.log("UserRes : ", res); });
        call("/Mate/Profile", "POST", formData)
        .then((res) => { setProfile(res); console.log("ProfileRes : ", res); });
        call("/Mate/ClickHeart", "POST", formData)
        .then((res) => { setCheckClickH(res); console.log("CheckHeartRes : ", res); });
        call("/CallList", "POST", formData)
        .then((res) => { console.log("CallList/Res : ", res); setCallList(res); });
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

    const [ heart, setHeart ] = useState(userInfos.heartclicker);
    const [ heartData, setHeartData ] = useState();
    const clickHeart = (e) => {
        const userInfo = JSON.parse(localStorage.getItem("UserInfo"));
        const mno = userInfo.mno;
        const formData = new FormData();
        let temp = userInfos.map(function(list) {
            if(String(list.mno) === String(e.target.id)) {
                console.log("list.userheart : ", list.userheart);
                if(list.userheart === "1") {
                    list.userheart = "0";
                    setHeartData("0");
                    formData.append("hkind", list.userheart);
                } else {
                    list.userheart = "1";
                    setHeartData("1")
                    formData.append("hkind", list.userheart);
                }
                if(list.heartclicker === "true") {
                    // alert("list.heartClicker : " + "true");
                    list.heartclicker = "false";
                } else {
                    // alert("list.heartClicker : " + "false");
                    list.heartclicker = "true";
                }
                console.log("list.heartclicker : ", list.heartclicker, " list.userHeart : ", list.userheart);
            }
        })
        formData.append("htype", "4");
        formData.append("userno", e.target.id);
        formData.append("mno", mno);
        UserHeart(formData);
    };

    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = (receivermno) => {
        setUserNo(receivermno);
        setShow(true)
    };

    const [ userNo, setUserNo ] = useState(0);
    const sendChat = (e) => {
        const formData = new FormData();
        const userInfo = JSON.parse(localStorage.getItem("UserInfo"));
        formData.append("sendermno", userInfo.mno);
        formData.append("receivermno", userNo)
        ChatCall(formData);
        handleClose();
    };
    const [ chatRoom, setChatRoom ] = useState({});

    const chatOk = (receiverno, receivername, senderno, sendername) => {
        console.log("@@@@@@@@@@@@@ >>>>> ", receivername);
        const formData = new FormData();
        formData.append("receiverno", receiverno);
        formData.append("receivername", receivername);
        formData.append("senderno", senderno);
        formData.append("sendername", sendername);
        call("/CreateChatRoom", "POST", formData)
        .then((res) => { 
            if(res) {
                // 룸 번호 찾아와서 맞으면 히스토리
                call("/ChatRoom", "POST", formData)
                .then((ress) => { console.log("ChatRoom/Res : ", ress);
                    if(ress) {
                        history("/InChat", {
                        state: {
                            "receiverno" : receiverno,
                            "receivername" : receivername,
                            "senderno" : senderno,
                            "sendername" : sendername,
                            "roomname" : ress.roomname,
                            "sgender" : ress.sgender,
                            "rgender" : ress.rgender
                        }});
                    }  
                });
            } 
        });
        console.log("채팅이 시작됨");
    };
    const chatNo = () => {
        alert("No");
    };

    const [ sidebar, setSidebar ] = useState(false);
    const clickBell = () => {
        setSidebar(sidebar => !sidebar);
    };

    const [ dropDown, setDropDown ] = useState(false);
    const clickDrop = () => {
        setDropDown(dropDown => !dropDown);
    };

    const getProfile = (mno, mager, mbirth, mbti, mgender, mhobby, mid, mname, mphone, profileimg, mnickname) => {
        history('/Profile', {
            state: {
                "mno" : mno,
                "mager" : mager,
                "mbirth" : mbirth,
                "mbti" : mbti,
                "mgender" : mgender,
                "mhobby" : mhobby,
                "mid" : mid,
                "mname" : mname,
                "mphone" : mphone,
                "profileimg" : profileimg,
                "mnickname" : mnickname
            }
        });
    };
  
    return(
        <div>
            <Header />
            { window.innerWidth <= 767 ? 
                <div className = "row" style = {{ width: "100%" }}>
                    <div className = "col-3">
                        <h1 style = {{ marginLeft: "3vw", marginTop: "8vh" }}>Mate</h1>
                    </div>
                    <div className = "col-4 offset-5">
                        <img id="dropdown-basic-button" alt = "Setting" src = { require('../../IMG/Bell.png') } style = {{ width: "12vw", marginTop: "6vh", float: "right" }} />
                        <DropdownButton id="dropdown-basic-button" title = "" style = {{ backgroundColor: "transparent", height: "4.5vh", marginTop: "7vh", backgroundImage: "../../IMG/Bell.png" }}>
                            { callList.length <= 0 ?
                                <div style = {{ fontSize: "0.8rem", textAlign: "center" }}>받은 채팅 신청이 없습니다.</div>
                                :
                                callList.map((list) =>
                                    <div className = "row" style = {{ width: "100%", marginLeft: "3vw" }} key = { list.callno }>
                                        <div className = "col-9" style = {{  }}>
                                            <Dropdown.Item onClick = { handleShow } style = {{ paddingLeft: "1vw", width: "50vw" }}>{ list.sendername }님의 채팅신청</Dropdown.Item>
                                        </div>
                                        <div className = "col-3" style = {{  }}>
                                            <div className = "row" style = {{ width: "100%" }}>
                                                <div className = "col-6" style = {{ padding: "0" }}>
                                                    <p onClick = { () => { chatOk(list.callreceiverno, list.receivername, list.callsenderno, list.sendername) } } style = {{ float: "right" }}>v</p>
                                                </div>
                                                <div className = "col-6" style = {{ padding: "0" }}>
                                                    <p onClick = { chatNo } style = {{ float: "right" }}>x</p>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                )
                            }
                        </DropdownButton>
                    </div>
                </div> : 
                <div className = "row" style = {{ width: "100%" }}>
                    <div className = "col-md-6">
                        <h1 style = {{ marginLeft: "6vw", marginTop: "8vh" }}>Mate</h1> 
                    </div>
                    <div className = "col-md-6" onClick = { clickBell }>
                        <img id="dropdown-basic-button" alt = "Setting" src = { require('../../IMG/Bell.png') } style = {{ width: "5vw", marginTop: "6.5vh", float: "right" }} />
                    </div>

                </div>
            }
            { window.innerWidth <= 767 ?
                <section className = "section-6" style = {{ borderBottom: "none", marginTop: "3vh", marginBottom: "2vh" }}>
                    { userInfos.length === 0 ? 
                        <div style = {{ textAlign: "center", fontSize: "1.2rem", marginTop: "25vh" }}>설정을 통해 조건에 맞는<br />새로운 사람을 만나보세요!</div>
                        :
                        userInfos.map((list) => 
                            <figure key = { list.mno } className = "figure" style = {{ backgroundColor: "black", borderRadius: "8px" }}>
                                <img alt = "Setting" src = { require('../../MemberImg' + list.profileimg) } style = {{ width: "100%", marginLeft: "0px", height: "67.5vh", objectFit: "contain", backgroundColor: "gray" }} name = { list.mno } />
                                <figcaption style = {{ color: "white", marginTop: "25vh", height: "5vh" }}>
                                    <h3>{ list.mnickname } ( { list.mbti } )</h3>
                                </figcaption>
                                <figcaption style = {{ color: "white", marginTop: "29vh", height: "25vh" }}>
                                    Hobby & Introduce<br /><br />
                                    { list.psetting === null ? 
                                            <label key = { list.mno } style = {{ marginTop: "2vh" }}>프로필 미설정</label>
                                            :
                                            profile.map((profileList) => 
                                           list.mno !== profileList.mno ? 
                                                <label key = { profileList.pno }></label>
                                           :
                                           <label key = { profileList.pno }>
                                                {profileList.pintro}<br /> {profileList.plike1} 좋아해요<br /> {profileList.plike2} 좋아해요<br />
                                                {profileList.plike3} 좋아해요<br /> {profileList.punlike1} 싫어해요<br /> {profileList.punlike2} 싫어해요<br />
                                                {profileList.punlike3} 싫어해요<br /> 취미는 {profileList.phobby1}와 {profileList.phobby2},<br />{profileList.phobby3}랍니다.
                                            </label>
                                        ) }
                                </figcaption>
                                <figcaption style = {{ color: "white", marginTop: "62vh", paddingTop: "5px" }}>
                                    <div className = "row" style = {{ fontSize: "30px", marginTop: "0", padding: "0" }}>
                                        <div className = "col-1" style = {{ marginLeft: "0px", paddingLeft: "0px" }}>
                                            { String(list.userheart) === "1" && String(list.heartclicker) === "true" ?
                                                <img id = { list.mno } onClick = { clickHeart } alt = "Heart" src = { require('../../IMG/BoardHeart_Red.png') } style = {{ width: "11vw", height: "5vh", opacity: "1" }} />
                                                :
                                                <img id = { list.mno } onClick = { clickHeart } alt = "Heart" src = { require('../../IMG/BoardHeart_Black.png') } style = {{ width: "11vw", height: "5vh", opacity: "1" }} />
                                            } 
                                        </div>
                                        <div className = "col-1">
                                            <label style = {{ fontSize: "1rem" }}>
                                                { list.userheartcnt }
                                            </label>
                                        </div>
                                        <div className = "col-1 offset-9" style = {{ paddingLeft: "0" }}>
                                            <label style = {{  }}>
                                                <img value = { userNo } onClick = { clickDrop } alt = "More" src = { require('../../IMG/Mate_More.png') } style = {{ width: "11vw", height: "5vh", opacity: "1" }} />
                                            </label>
                                        </div>
                                        <div className = { dropDown ? "show-drop" : "hide-drop" } style = {{ backgroundColor: "#e6e6e6" }}>
                                            <table style = {{ width: "100%" }}>
                                                <tbody>
                                                    <tr style = {{ fontSize: "1rem" }}><td style = {{ paddingTop: "0.5vh", borderBottom: "solid 1px black", color: "black" }} onClick = { () => { handleShow(list.mno) } }>채팅하기</td></tr>
                                                    <tr style = {{ fontSize: "1rem" }}><td style = {{ paddingTop: "0.5vh", color: "black" }} id = { list.mno } onClick = { () => {getProfile(list.mno, list.mager, list.mbirth, list.mbti, list.mgender, list.mhobby, list.mid, list.mname, list.mphone, list.profileimg, list.mnickname)} }>프로필보기</td></tr>
                                                </tbody>
                                            </table>
                                        </div>
                                        <Modal show = { show } onHide = { handleClose }>
                                            <Modal.Header closeButton>
                                                <Modal.Title>Chat</Modal.Title>
                                            </Modal.Header>
                                            <Modal.Body>
                                                <h5>채팅을 신청하겠습니까?</h5>
                                            </Modal.Body>
                                            <Modal.Footer>
                                                <Button variant = "secondary" onClick = { handleClose }>
                                                    취소
                                                </Button>
                                                <Button variant = "info" onClick = { sendChat } style = {{ color: "white" }}>
                                                    보내기
                                                </Button>
                                            </Modal.Footer>
                                        </Modal>
                                    </div>
                                </figcaption>
                            </figure>
                        ) }
                </section>
                :
                <div className = "container" style = {{ marginTop: "3vh" }}>
                    <div className = { sidebar ? "show-sidebar" : "hide-sidebar" } style = {{ backgroundColor: "white", boxShadow: "8px 5px 31px gray", paddingTop: "1vh" }}>
                        <div className = "row" style = {{ width: "100%", marginLeft: "0.1vw" }}>
                            <div className = "col-md-2" style = {{ borderBottom: "solid 1px #cac9cb" }}>
                                <h3 style = {{ paddingTop: "0.5vh", cursor: "pointer" }} onClick = { clickBell }>X</h3>
                            </div>
                            <div className = "col-md-10" style = {{ borderBottom: "solid 1px #cac9cb" }}>
                                <p style = {{ fontSize: "1.7rem", fontStyle: "none" }}>채팅 신청 내역</p>
                            </div>
                            <table className = "table">
                                <tbody>
                                    { callList.length <= 0 ? 
                                        <tr><td>받은 채팅 신청이 없습니다.</td></tr> :
                                        callList.map((list) => 
                                            <tr key = { list.callno } className = "row" style = {{ width: "100%", marginLeft: "0.1vw" }}>
                                                <td className = "col-md-8"><div style = {{ marginLeft: "1.5vw", marginTop: "0.5vh" }}>"{ list.sendername }"님의 채팅신청</div></td>
                                                <td className = "col-md-4">
                                                    <div className = "row" style = {{ width: "100%" }}>
                                                        <div className = "col-md-6">
                                                            <h4 onClick = { () => { chatOk(list.callreceiverno, list.receivername, list.callsenderno, list.sendername) }}>v</h4>
                                                        </div>
                                                        <div className = "col-md-6">
                                                            <h4>x</h4>
                                                        </div>
                                                    </div>
                                                </td>
                                            </tr>
                                        ) 
                                    }
                                </tbody>
                            </table>
                        </div>
                    </div>
                    <div className = "row">
                        { userInfos.length === 0 ? 
                            <div style = {{ textAlign: "center", fontSize: "1.2rem", marginTop: "25vh" }}>설정을 통해 조건에 맞는<br />새로운 사람을 만나보세요!</div>
                            :
                            userInfos.map((list) => 
                            <div className = "col-md-3 col-sm-3" key = { list.mno }>
                                <section className="section-6" style = {{ borderBottom: "none", marginBottom: "2vh", width: "20vw" }}>
                                    <figure className = "figure" style = {{ backgroundColor: "black", borderRadius: "8px" }}>
                                        <img alt = "Setting" src = { require('../../MemberImg' + list.profileimg) } style = {{ width: "100%", marginLeft: "0px", height: "29vh", objectFit: "contain", backgroundColor: "gray" }} name = { list.mno } />
                                        <figcaption style = {{ color: "white", marginTop: "1vh", height: "5vh", paddingLeft: "1vw" }}>
                                            <h5 style = {{ borderBottom: "solid 1px #f4f5f7" }}>{ list.mnickname } ( { list.mbti } )</h5>
                                        </figcaption>
                                        <figcaption style = {{ color: "white", marginTop: "3vh", height: "25vh", paddingLeft: "1vw", fontSize: "0.9rem" }}>
                                            Hobby & Introduce<br /><br />
                                            { list.psetting === null ? 
                                                <label key = { list.mno } style = {{ marginLeft: "5vw", marginTop: "7.5vh" }}>프로필 미설정</label>
                                                :
                                                profile.map((profileList) => 
                                                    list.mno !== profileList.mno ? 
                                                        <label key = { profileList.pno }></label>
                                                :
                                                <label key = { profileList.pno }>
                                                    {profileList.pintro}<br /> {profileList.plike1} 좋아해요<br /> {profileList.plike2} 좋아해요<br />
                                                    {profileList.plike3} 좋아해요<br /> {profileList.punlike1} 싫어해요<br /> {profileList.punlike2} 싫어해요<br />
                                                    {profileList.punlike3} 싫어해요<br /> 취미는 {profileList.phobby1}와 {profileList.phobby2},<br />  {profileList.phobby3}랍니다.
                                                </label>
                                            ) }
                                        </figcaption>
                                        <figcaption style = {{ color: "white", marginTop: "25vh", paddingTop: "0", paddingLeft: "15px" }}>
                                            <div className = "row" style = {{ fontSize: "30px", marginTop: "0", padding: "0" }}>
                                                <div className = "col-md-1" style = {{ marginLeft: "0px", paddingLeft: "0px" }}>
                                                    { String(list.userheart) === "1" && String(list.heartclicker) === "true" ?
                                                        <img id = { list.mno } onClick = { clickHeart } alt = "Heart" src = { require('../../IMG/BoardHeart_Red.png') } style = {{ width: "3vw", height: "3vh", opacity: "1" }} />
                                                        :
                                                        <img id = { list.mno } onClick = { clickHeart } alt = "Heart" src = { require('../../IMG/BoardHeart_Black.png') } style = {{ width: "3vw", height: "3vh", opacity: "1" }} />
                                                    } 
                                                    
                                                </div>
                                                <div className = "col-md-1">
                                                    <label style = {{ fontSize: "1rem", marginLeft: "0.4vw" }}>
                                                        { list.userheartcnt }
                                                    </label>
                                                </div>
                                                <div className = "col-md-1 offset-md-8" style = {{  }}>
                                                    <label style = {{  }}>
                                                        <img value = { userNo } onClick = { () => {handleShow(list.mno)} } alt = "More" src = { require('../../IMG/Mate_More.png') } style = {{ width: "3vw", height: "2.5vh", opacity: "1" }} />
                                                    </label>
                                                </div>
                                                <Modal show = { show } onHide = { handleClose }>
                                                    <Modal.Header closeButton>
                                                        <Modal.Title>Chat</Modal.Title>
                                                    </Modal.Header>
                                                    <Modal.Body>
                                                        <h5>채팅을 신청하겠습니까?</h5>
                                                    </Modal.Body>
                                                    <Modal.Footer>
                                                        <Button variant = "secondary" onClick = { handleClose }>
                                                            취소
                                                        </Button>
                                                        <Button variant = "info" onClick = { sendChat } style = {{ color: "white" }}>
                                                            보내기
                                                        </Button>
                                                    </Modal.Footer>
                                                </Modal>
                                            </div>
                                        </figcaption>
                                    </figure>
                                    </section>
                                </div>
                            ) }
                    </div>
                </div>
            }
            <Menu />
        </div>
    );
}
export default Mate;