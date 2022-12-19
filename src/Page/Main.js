import React, { useEffect, useState } from 'react';
import Carousel from 'react-bootstrap/Carousel';
import Header from './Header';
import Menu from './Menu';
import '../Component/UpSlide.css';
import { call } from '../Service/APIService';

function Main() {
    const userInfo = JSON.parse(localStorage.getItem("UserInfo"));

    // 윈도우 크기 변경 감지되면 리렌더링
    const [ windowWidth, setWindowWidth ] = useState(0);
    const [ windowHeight, setWindowHeight ] = useState(0);
    let resizeWindow = () => {
        setWindowWidth(window.innerWidth);
        setWindowHeight(window.innerHeight);
    };

    const [rankDTO, setRankDTO] = useState([]);
    
    useEffect(() => {
        const formData = new FormData();
        formData.append('mno', userInfo.mno);
        call("/Home/Rank", "POST", formData) 
        .then((res) => {
            console.log("/Home/Rank/Res : ", res);
            setRankDTO(res);
        })
        resizeWindow();
        window.addEventListener("resize", resizeWindow);
        return () => window.removeEventListener("resize", resizeWindow);
    }, []);
    // /윈도우 크기 변경 감지되면 리렌더링

    return(
        <div className = { window.innerWidth <= 767 ? "grad" : "gra" }>
            <Header />
            { window.innerWidth <= 767 ? 
                <div><h1 style = {{ marginLeft: "3vw", marginTop: "10vh" }}>4호선 Rank</h1></div> : 
                <h1 style = {{ marginLeft: "6vw", marginTop: "10vh" }}>4호선 Rank</h1> 
            }
            {window.innerWidth <= 767 ?
                <div style = {{ marginBottom: "10vh", width: "100vw" }}>
                    <Carousel fade>
                        { rankDTO.map((list) => 
                            <Carousel.Item key = { list.mno }>
                                <img alt = "Setting" src = { require('../MemberImg/' + list.profileImg) } style = {{ width: "100%", height: "30vh", maxHeight: "30vh", objectFit: "contain", backgroundColor: "gray" }} /> 
                            </Carousel.Item>
                        )}
                    </Carousel>
                    <h1 style = {{ marginTop: "1.4vh" }}>공지사항</h1>
                    <div id="showcase-dynamic" style = {{ height: "5vh", paddingTop: "0", backgroundColor: "transparent", color: "black", fontSize: "1.2rem" }}>
                        <div><p>레이아웃을 잡는 중입니다.</p></div>
                        <div><p>얼른 백엔드까지 연결하고 싶습니다.</p></div>
                        <div><p>사실 제일 큰 문제는 JWT와 OAuth2입니다.</p></div>
                    </div>
                    <h1 style = {{ marginTop: "1.4vh" }}>서브뉴스</h1>
                    <div id="showcase-dynamic" style = {{ height: "5vh", paddingTop: "0", backgroundColor: "transparent", color: "black", fontSize: "1.2rem" }}>
                        <div><p>전장연시위</p></div>
                        <div><p>지하철에서 사람이 쓰러졌어요!</p></div>
                    </div>
                    <h1 style = {{ marginTop: "1.4vh" }}>오늘의 날씨</h1>
                    <div id="showcase-dynamic" style = {{ height: "5vh", paddingTop: "0", backgroundColor: "transparent", color: "black", fontSize: "1.2rem" }}>
                        <div><p>쌀쌀하긴 함</p></div>
                        <div><p>맑음</p></div>
                    </div>
                </div>
                :
                <div className = "container">
                    <Carousel fade style = {{ width: "100%" }}>
                        <Carousel.Item>
                            <img alt = "Setting" src = { require('../IMG/임시프사.png') } style = {{ width: "100%", height: "30vh", objectFit: "contain", backgroundColor: "gray" }} /> 
                        </Carousel.Item>
                        <Carousel.Item>
                            <img alt = "Setting" src = { require('../IMG/임시프사2.jpg') } style = {{ width: "100%", height: "30vh", objectFit: "contain", backgroundColor: "gray" }} /> 
                        </Carousel.Item>
                        <Carousel.Item>
                            <img alt = "Setting" src = { require('../IMG/임시프사3.jpg') } style = {{ width: "100%", height: "30vh", objectFit: "contain", backgroundColor: "gray" }} /> 
                        </Carousel.Item>
                    </Carousel>
                    <div className = "row" style = {{ marginTop: "5vh" }}>
                        <div className = "col-md-5">
                            <h1>공지사항</h1>
                            <div id="showcase-dynamic" style = {{ height: "5vh", paddingTop: "0.1vh", backgroundColor: "transparent", color: "black", fontSize: "1.6rem" }}>
                                <div><p>레이아웃을 잡는 중입니다.</p></div>
                                <div><p>얼른 백엔드까지 연결하고 싶습니다.</p></div>
                                <div><p>사실 제일 큰 문제는 JWT와 OAuth2입니다.</p></div>
                            </div>
                        </div>
                    </div>
                </div>
            }
            <Menu />
        </div>
    );
}
export default Main;