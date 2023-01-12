import React from 'react';
import Header from '../Header';
import Menu from '../Menu';
import '../../Component/Card/Card2.css';
import { useState } from 'react';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { call, UserHeart } from '../../Service/APIService';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';

function Mate() {
    // 윈도우 크기 변경 감지되면 리렌더링
    const [ windowWidth, setWindowWidth ] = useState(0);
    const [ windowHeight, setWindowHeight ] = useState(0);
    let resizeWindow = () => {
        setWindowWidth(window.innerWidth);
        setWindowHeight(window.innerHeight);
    };

    const loginUser = JSON.parse(localStorage.getItem("UserInfo"));
    const [ userInfos, setUserInfos ] = useState([]);
    const [ profile, setProfile ] = useState([]);
    const [ userHeartList, setUserHeartList ] = useState([]);
    const [ checkClickH, setCheckClickH ] = useState(false);
    useEffect(() => {
        let userInfo = JSON.parse(localStorage.getItem("UserInfo"));
        const formData = new FormData();
        formData.append("mno", userInfo.mno);
        // setUserInfos({"mno" : mno.mno})
        call("/Mate/Users", "POST", formData)
        .then((res) => {
            setUserInfos(res);
            console.log("UserRes : ", res);
        });
        call("/Mate/Profile", "POST", formData)
        .then((res) => {
            setProfile(res);
            console.log("ProfileRes : ", res);
        });
        call("/Mate/ClickHeart", "POST", formData)
        .then((res) => {
            setCheckClickH(res);
            console.log("CheckHeartRes : ", res);
        });
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
    const handleShow = () => setShow(true);

    const sendChat = (e) => {
        const userInfo = JSON.parse(localStorage.getItem("UserInfo"));
        console.log("e.target.id : ", e.target.id, " userno : ", userInfo.mno);
    };
  
    return(
        <div>
            <Header />
            { window.innerWidth <= 767 ? 
                <div><h1 style = {{ marginLeft: "3vw", marginTop: "8vh" }}>Mate</h1></div> : 
                <h1 style = {{ marginLeft: "6vw", marginTop: "10vh" }}>Mate</h1> 
            }
            { window.innerWidth <= 767 ?
                <section className = "section-6" style = {{ borderBottom: "none", marginTop: "3vh", marginBottom: "2vh" }}>
                    { userInfos.length === 0 ? 
                        <div style = {{ textAlign: "center", fontSize: "1.2rem", marginTop: "25vh" }}>설정을 통해 조건에 맞는<br />새로운 사람을 만나보세요!</div>
                        :
                        userInfos.map((list) => 
                            <figure key = { list.mno } className = "figure" style = {{ backgroundColor: "black", borderRadius: "8px" }}>
                                <img alt = "Setting" src = { require('../../MemberImg' + list.profileimg) } style = {{ width: "100%", marginLeft: "0px", height: "67.5vh", objectFit: "contain", backgroundColor: "gray" }} name = { list.mno } />
                                <figcaption style = {{ color: "white", marginTop: "28vh", height: "5vh" }}>
                                    <h3>{ list.mnickname } ( { list.mbti } )</h3>
                                </figcaption>
                                <figcaption style = {{ color: "white", marginTop: "32vh", height: "25vh" }}>
                                    Hobby & Introduce<br />
                                    { profile.map((profileList) =>
                                        String(profileList.mno) !== String(list.mno) ?
                                            <label key = { profileList.pno }>프로필을 설정하지 않았습니다</label>
                                            :
                                            <label key = { profileList.pno }>
                                                {profileList.pintro}<br /> {profileList.plike1} 좋아해요<br /> {profileList.plike2} 좋아해요<br />
                                                {profileList.plike3} 좋아해요<br /> {profileList.punlike1} 싫어해요<br /> {profileList.punlike2} 싫어해요<br />
                                                {profileList.punlike3} 싫어해요<br /> 취미는 {profileList.phobby1}와 {profileList.phobby2},  {profileList.phobby3}랍니다.
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
                                                <img onClick = { handleShow } alt = "More" src = { require('../../IMG/Mate_More.png') } style = {{ width: "11vw", height: "5vh", opacity: "1" }} />
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
                        ) }
                </section>
                :
                <div className = "container" style = {{ marginTop: "3vh" }}>
                    <div className = "row">
                        { userInfos.length === 0 ? 
                            <div style = {{ textAlign: "center", fontSize: "1.2rem", marginTop: "25vh" }}>설정을 통해 조건에 맞는<br />새로운 사람을 만나보세요!</div>
                            :
                            userInfos.map((list) => 
                            <div className = "col-md-3 col-sm-3" key = { list.mno }>
                                <section className="section-6" style = {{ borderBottom: "none", marginBottom: "2vh", width: "20vw" }}>
                                    <figure className = "figure" style = {{ backgroundColor: "black", borderRadius: "8px" }}>
                                        <img alt = "Setting" src = { require('../../MemberImg' + list.profileimg) } style = {{ width: "100%", marginLeft: "0px", height: "29vh", objectFit: "contain", backgroundColor: "gray" }} name = { list.mno } />
                                        <figcaption style = {{ color: "white", marginTop: "28vh", height: "5vh" }}>
                                            <h3>{ list.mnickname } ( { list.mbti } )</h3>
                                        </figcaption>
                                        <figcaption style = {{ color: "white", marginTop: "4vh", height: "25vh", paddingLeft: "15px" }}>
                                            Hobby & Introduce<br />
                                            { profile.map((profileList) =>
                                                String(profileList.mno) !== String(list.mno) ?
                                                    <label key = { profileList.pno }>프로필을 설정하지 않았습니다</label>
                                                    :
                                                    <label key = { profileList.pno }>
                                                        {profileList.pintro}<br /> {profileList.plike1} 좋아해요<br /> {profileList.plike2} 좋아해요<br />
                                                        {profileList.plike3} 좋아해요<br /> {profileList.punlike1} 싫어해요<br /> {profileList.punlike2} 싫어해요<br />
                                                        {profileList.punlike3} 싫어해요<br /> 취미는 {profileList.phobby1}와 {profileList.phobby2},  {profileList.phobby3}랍니다.
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
                                                        <img alt = "More" src = { require('../../IMG/Mate_More.png') } style = {{ width: "3vw", height: "2.5vh", opacity: "1" }} />
                                                    </label>
                                                </div>
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