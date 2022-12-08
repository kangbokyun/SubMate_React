import React from 'react';
import Header from '../Header';
import Menu from '../Menu';
import '../../Component/Card/Card2.css';
import { useState } from 'react';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { call } from '../../Service/APIService';

function Mate() {
    // 윈도우 크기 변경 감지되면 리렌더링
    const [ windowWidth, setWindowWidth ] = useState(0);
    const [ windowHeight, setWindowHeight ] = useState(0);
    let resizeWindow = () => {
        setWindowWidth(window.innerWidth);
        setWindowHeight(window.innerHeight);
    };

    const [ userInfos, setUserInfos ] = useState([]);
    const [ profile, setProfile ] = useState({});
    // const userInfo = JSON.parse(localStorage.getItem("UserInfo"));
    // setUserInfos({ 'mno' : userInfo.mno });
    useEffect(() => {
        let userInfo = JSON.parse(localStorage.getItem("UserInfo"));
        const formData = new FormData();
        formData.append("mno", userInfo.mno);
        // setUserInfos({"mno" : mno.mno})
        call("/Mate/Users", "POST", formData)
        .then((res) => {
            setUserInfos(res);
            console.log("UserRes : ", res)
        })
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

    const viewProfile = (e) => {
        console.log(e.target.name);
        const formData = new FormData();
        formData.append("mno", e.target.name);
        call("/Mate/Profile", "POST", formData)
        .then((res) => {
            setProfile(res)
            console.log("ProfileRes : ", res);
        })
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
                            <figure key = { list.mno } className = "figure" style = {{ backgroundColor: "black", borderRadius: "8px" }} onClick = { viewProfile }>
                                <img alt = "Setting" src = { require('../../MemberImg' + list.profileimg) } style = {{ width: "100%", marginLeft: "0px", height: "67.5vh", objectFit: "contain", backgroundColor: "gray" }} name = { list.mno } />
                                <figcaption style = {{ color: "white", marginTop: "28vh", height: "5vh" }}>
                                    <h3>{ list.mnickname } ( { list.mbti } )</h3>
                                </figcaption>
                                <figcaption style = {{ color: "white", marginTop: "32vh", height: "25vh" }}>
                                        Hobby & Introduce<br />
                                        { profile.pno === 0 ?
                                            <label>프로필을 설정하지 않았습니다.</label>
                                            :
                                            <label>
                                                {profile.pintro}<br /> {profile.plike1} 좋아해요<br /> {profile.plike2} 좋아해요<br />
                                                {profile.plike3} 좋아해요<br /> {profile.punlike1} 싫어해요<br /> {profile.punlike2} 싫어해요<br />
                                                {profile.punlike3} 싫어해요<br /> 취미는 {profile.phobby1}와 {profile.phobby2},  {profile.phobby3}랍니다.
                                                
                                            </label>
                                        }
                                </figcaption>
                                <figcaption style = {{ color: "white", marginTop: "62vh", paddingTop: "5px" }}>
                                    <div className = "row" style = {{ fontSize: "30px", marginTop: "0", padding: "0" }}>
                                        <div className = "col-1" style = {{ marginLeft: "0px", paddingLeft: "0px" }}>
                                            <img alt = "Like" src = { require('../../IMG/BoardHeart_Red.png') } style = {{ width: "11vw", height: "5vh", opacity: "1" }} />
                                        </div>
                                        <div className = "col-1">
                                            <label style = {{ fontSize: "1rem" }}>
                                                1.6K
                                            </label>
                                        </div>
                                        <div className = "col-1 offset-9" style = {{ paddingLeft: "0" }}>
                                            <label style = {{  }}>
                                                <img alt = "Like" src = { require('../../IMG/Mate_More.png') } style = {{ width: "11vw", height: "5vh", opacity: "1" }} />
                                            </label>
                                        </div>
                                    </div>
                                </figcaption>
                            </figure>
                        ) }
                </section>
                :
                <div className = "container" style = {{ marginTop: "3vh" }}>
                    <div className = "row">
                        <div className = "col-md-3 col-sm-3">
                            <section className="section-6" style = {{ borderBottom: "none", marginBottom: "2vh", width: "20vw" }}>
                                <figure className="figure" style = {{ backgroundColor: "black", borderRadius: "8px" }}>
                                    <img alt = "Setting" src = { require('../../IMG/임시프사.png') } style = {{ width: "100%", marginLeft: "0px", height: "29vh", objectFit: "contain", backgroundColor: "gray" }} />
                                    <figcaption style = {{ color: "white", marginTop: "13vh", height: "5vh", paddingLeft: "15px" }}>
                                        <h4>아이린</h4>
                                    </figcaption>
                                    <figcaption style = {{ color: "white", marginTop: "16vh", height: "25vh", paddingLeft: "15px" }}>
                                        <label>노래, 춤을 좋아해요</label>
                                    </figcaption>
                                    <figcaption style = {{ color: "white", marginTop: "25vh", paddingTop: "0", paddingLeft: "15px" }}>
                                        <div className = "row" style = {{ fontSize: "30px", marginTop: "0", padding: "0" }}>
                                            <div className = "col-1">♡</div>
                                            <div className = "col-1">...</div>
                                        </div>
                                    </figcaption>
                                </figure>
                            </section>
                        </div>
                        <div className = "col-md-3 col-sm-3">
                            <section className="section-6" style = {{ borderBottom: "none", marginBottom: "2vh", width: "20vw" }}>
                                <figure className="figure" style = {{ backgroundColor: "black", borderRadius: "8px" }}>
                                    <img alt = "Setting" src = { require('../../IMG/임시프사2.jpg') } style = {{ width: "100%", marginLeft: "0px", height: "29vh", objectFit: "contain", backgroundColor: "gray" }} />
                                    <figcaption style = {{ color: "white", marginTop: "13vh", height: "5vh", paddingLeft: "15px" }}>
                                        <h4>윈터</h4>
                                    </figcaption>
                                    <figcaption style = {{ color: "white", marginTop: "16vh", height: "25vh", paddingLeft: "15px" }}>
                                        <label>셀카 찍는 것을 좋아해요</label>
                                        <label>여행가는 것을 좋아해요</label>
                                        <label>MBTI를 굉장히 싫어해요</label>
                                        <label>자신감 없는 사람 싫어해요</label>
                                    </figcaption>
                                    <figcaption style = {{ color: "white", marginTop: "25vh", paddingTop: "0", paddingLeft: "15px" }}>
                                        <div className = "row" style = {{ fontSize: "30px", marginTop: "0", padding: "0" }}>
                                            <div className = "col-1">♥</div>
                                            <div className = "col-1">...</div>
                                        </div>
                                    </figcaption>
                                </figure>
                            </section>
                        </div>
                        <div className = "col-md-3 col-sm-3">
                            <section className="section-6" style = {{ borderBottom: "none", marginBottom: "2vh", width: "20vw" }}>
                                <figure className="figure" style = {{ backgroundColor: "black", borderRadius: "8px" }}>
                                    <img alt = "Setting" src = { require('../../IMG/임시프사3.jpg') } style = {{ width: "100%", marginLeft: "0px", height: "29vh", objectFit: "contain", backgroundColor: "gray" }} />
                                    <figcaption style = {{ color: "white", marginTop: "13vh", height: "5vh", paddingLeft: "15px" }}>
                                        <h4>윈터</h4>
                                    </figcaption>
                                    <figcaption style = {{ color: "white", marginTop: "16vh", height: "25vh", paddingLeft: "15px" }}>
                                        <label>노래, 춤을 좋아해요</label>
                                    </figcaption>
                                    <figcaption style = {{ color: "white", marginTop: "25vh", paddingTop: "0", paddingLeft: "15px" }}>
                                        <div className = "row" style = {{ fontSize: "30px", marginTop: "0", padding: "0" }}>
                                            <div className = "col-1">♥</div>
                                            <div className = "col-1">...</div>
                                        </div>
                                    </figcaption>
                                </figure>
                            </section>
                        </div>
                    </div>
                </div>
            }
            <Menu />
        </div>
    );
}
export default Mate;