import React, { useEffect, useState } from 'react';
import Carousel from 'react-bootstrap/Carousel';
import Header from './Header';
import Menu from './Menu';
import '../Component/UpSlide.css';
import { call } from '../Service/APIService';
import Snow from '../Component/Weather/Snow/Snow';
import Rain from '../Component/Weather/Rain/Rain';
import Cloud from '../Component/Weather/Cloud/Cloud';
import Sun from '../Component/Weather/Sun/Sun';

function Main() {
    const userInfo = JSON.parse(localStorage.getItem("UserInfo"));

    // 윈도우 크기 변경 감지되면 리렌더링
    const [ windowWidth, setWindowWidth ] = useState(0);
    const [ windowHeight, setWindowHeight ] = useState(0);
    let resizeWindow = () => {
        setWindowWidth(window.innerWidth);
        setWindowHeight(window.innerHeight);
    };

    const [ rankDTO, setRankDTO ] = useState([]);
    const [ issueDTO, setIssueDTO ] = useState([]);
    const [ weather, setWeather ] = useState({});
    const [ notice, setNotice ] = useState([]);
    useEffect(() => {
        const formData = new FormData();
        formData.append('mno', userInfo.mno);
        call("/Home/Rank", "POST", formData) 
        .then((res) => {
            console.log("/Home/Rank/Res : ", JSON.stringify(res));
            setRankDTO(res);
        });
        call("/Home/Issue", "POST", null)
        .then((res) => {
            console.log("/Home/Issue/Res : " + JSON.stringify(res));
            setIssueDTO(res);
        });
        call("/Home/Weather", "POST", null)
        .then((res) => {
            console.log("/Home/Weather/Res : ", res);
            setWeather(res);
        });
        call("/Admin/NoticeList", "POST", null)
        .then((res) => { console.log("/Home/Notice/Res : ", res); setNotice(res) });
        resizeWindow();
        window.addEventListener("resize", resizeWindow);
        return () => window.removeEventListener("resize", resizeWindow);
    }, []);
    // /윈도우 크기 변경 감지되면 리렌더링

    const newsClick = (e) => {
        // alert(e.target.id);
        window.location.href = e.target.id;
    };
    

    return(
        <div className = { window.innerWidth <= 767 ? "grad" : "gra" }>
            <Header />
            { weather.pty === "null" && window.innerWidth <= 767 ? 
                weather.sky === "구름많음" ? <Cloud /> : 
                weather.sky === "흐림" ? <Cloud /> : 
                <></> : 
                weather.pty === "눈" ? <Snow /> :
                weather.pty === "진눈깨비" ? <Snow /> :
                weather.pty === "눈날림" ? <Snow /> :
                weather.pty === "비" ? <Rain /> : 
                weather.pty === "빗방울" ? <Rain /> : 
                weather.pty === "소나기" ? <Rain /> : <></>
            }
            { window.innerWidth <= 767 ? 
                <div><h1 style = {{ marginLeft: "3vw", marginTop: "10vh" }}>4호선 Rank</h1></div> : 
                <h1 style = {{ marginLeft: "6vw", marginTop: "8vh" }}>4호선 Rank</h1> 
            }
            {window.innerWidth <= 767 ?
                <div style = {{ marginBottom: "10vh", width: "100%" }}>
                    <Carousel fade>
                        { rankDTO.map((list) =>
                            <Carousel.Item key = { list.mno } style = {{  }}>
                                <div style = {{ width: "100%"}}>
                                    <img alt = "Setting" src = { require('../MemberImg/' + list.profileImg) } style = {{ width: "100%", height: "30vh", maxHeight: "30vh", objectFit: "contain", backgroundColor: "gray" }} /> 
                                    <div className = "row" style = {{ backgroundColor: "rgba(0, 0, 0, 0.2)", color: "white", width: "100%", position: "absolute", bottom: "0", left: "0", marginLeft: "0.3vw" }}>
                                        <div className = "col-6">
                                            <div className = "row">
                                                <div className = "col-2">
                                                    <img alt = "Setting" src = { require('../IMG/BoardHeart_Red.png') } style = {{ width: "10vw", paddingTop: "2px" }} />
                                                </div>
                                                <div className = "col-4">
                                                    <h5 style ={{ paddingTop: "1vh", paddingLeft: "2vw" }}>{ list.heartcount }</h5>
                                                </div>
                                            </div>
                                        </div>
                                        <div className = "col-6">
                                            <div>
                                                <h5 style = {{ paddingTop: "1vh", float: "right" }}>{ list.rankrankernickname }님</h5>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </Carousel.Item>
                        )}
                    </Carousel>
                    <h1 style = {{ marginTop: "1.4vh", marginLeft: "2vw" }}>공지사항</h1>
                    <div id="showcase-dynamic" style = {{ height: "5vh", paddingTop: "0", backgroundColor: "transparent", color: "black", fontSize: "1.2rem", marginLeft: "2vw" }}>
                        { notice.map((list) => 
                            <div key = { list.nno }>
                                <p>{ list.nkind === 1 ? "[ 공지 ]" : "[ 이벤트 ]" }　{ list.ntitle }</p>
                            </div>
                        ) }
                    </div>
                    <h1 style = {{ marginTop: "1.4vh", marginLeft: "2vw" }}>서브뉴스</h1>
                    <div id="showcase-dynamic" style = {{ height: "5vh", paddingTop: "0", backgroundColor: "transparent", color: "black", fontSize: "1.2rem", marginLeft: "2vw" }}>
                        { issueDTO.map((list) => 
                            <div key = {list.issueNo}>
                                <p onClick = { newsClick } id = { list.issueLink }>
                                    { list.issueTitle.length >= 20 ? 
                                        list.issueTitle.substring(0, 20) + "..." 
                                        : 
                                        list.issueTitle 
                                    }
                                </p>
                            </div>
                        )}
                    </div>
                    <h1 style = {{ marginTop: "1.4vh", marginLeft: "2vw" }}>오늘의 날씨</h1>
                    <div id="showcase-dynamic" style = {{ height: "5vh", paddingTop: "0", backgroundColor: "transparent", color: "black", fontSize: "1.2rem", marginLeft: "2vw" }}>
                        <div><p>기온 : { weather.tmp }°C</p></div>
                        <div><p>강수확률 : { weather.pop }</p></div>
                        <div>
                            { Number(weather.tmp) < 0 && Number(weather.tmp) > -10 ? 
                                <p>날이 춥습니다. 감기 조심하세요.</p> :
                                Number(weather.tmp) > 0 && Number(weather.tmp) < 10 ? 
                                <p>날이 따듯해지고 있습니다.</p> :
                                Number(weather.tmp) > 10 && Number(weather.tmp) < 20 ? 
                                <p>데이트하기 좋은 날씨네요!</p> :
                                Number(weather.tmp) > 20 && Number(weather.tmp) < 30 ? 
                                <p>활동적인 데이트하기 좋게 다 풀렸어요.</p> :
                                Number(weather.tmp) > 30 ?
                                <p>실내데이트 하세요... 너무 더워요.</p> :
                                <p>롱패딩 입으세요... 너무 추워요.</p>
                            }
                        </div>
                    </div>
                </div>
                :
                <div className = "container" style = {{  }}>
                    <Carousel fade style = {{ width: "100%" }}>
                        { rankDTO.map((list) => 
                            <Carousel.Item key = { list.mno }>
                                <div style = {{ width: "100%"}}>
                                    <img alt = "Setting" src = { require('../MemberImg/' + list.profileImg) } style = {{ width: "100%", height: "30vh", maxHeight: "30vh", objectFit: "contain", backgroundColor: "gray" }} /> 
                                    <div className = "row" style = {{ backgroundColor: "rgba(0, 0, 0, 0.2)", color: "white", width: "100%", position: "absolute", bottom: "0", left: "0", marginLeft: "0.1vw" }}>
                                        <div className = "col-md-6">
                                            <div className = "row">
                                                <div className = "col-md-2">
                                                    <img alt = "Setting" src = { require('../IMG/BoardHeart_Red.png') } style = {{ width: "5vw", paddingTop: "2px" }} />
                                                </div>
                                                <div className = "col-md-4 gx-0">
                                                    <h5 style ={{ paddingTop: "1.5vh", fontSize: "1.5rem" }}>{ list.heartcount }</h5>
                                                </div>
                                            </div>
                                        </div>
                                        <div className = "col-md-6">
                                            <div>
                                                <h5 style = {{ paddingTop: "1.5vh", float: "right", fontSize: "1.5rem" }}>{ list.rankrankernickname }님</h5>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </Carousel.Item>
                        )}
                    </Carousel>
                    <div className = "row" style = {{ marginTop: "5vh" }}>
                        <div className = "col-md-5">
                            <h1>공지사항</h1>
                            <div id="showcase-dynamic" style = {{ paddingTop: "0.1vh", backgroundColor: "transparent", color: "black", fontSize: "1.2rem" }}>
                                { notice.map((list) => 
                                    <div key = { list.nno }>
                                        <p>{ list.nkind === 1 ? "[ 공지 ]" : "[ 이벤트 ]" }　{ list.ntitle }</p>
                                    </div>
                                ) }
                            </div>
                        </div>
                        <h1 style = {{ marginTop: "1.4vh" }}>서브뉴스</h1>
                        <div id="showcase-dynamic" style = {{ paddingTop: "0", backgroundColor: "transparent", color: "black", fontSize: "1.2rem" }}>
                            { issueDTO.map((list) => 
                                <div key = {list.issueNo}>
                                    <p onClick = { newsClick } id = { list.issueLink }>
                                        { list.issueTitle }
                                    </p>
                                </div>
                            )}
                        </div>
                        <h1 style = {{ marginTop: "1.4vh" }}>오늘의 날씨</h1>
                        <div id="showcase-dynamic" style = {{ paddingTop: "0", backgroundColor: "transparent", color: "black", fontSize: "1.2rem" }}>
                            <div><p>기온 : { weather.tmp }°C</p></div>
                            <div><p>강수확률 : { weather.pop }</p></div>
                            <div>
                                { Number(weather.tmp) < 0 && Number(weather.tmp) > -10 ? 
                                    <p>날이 춥습니다. 감기 조심하세요.</p> :
                                    Number(weather.tmp) > 0 && Number(weather.tmp) < 10 ? 
                                    <p>날이 따듯해지고 있습니다.</p> :
                                    Number(weather.tmp) > 10 && Number(weather.tmp) < 20 ? 
                                    <p>데이트하기 좋은 날씨네요!</p> :
                                    Number(weather.tmp) > 20 && Number(weather.tmp) < 30 ? 
                                    <p>활동적인 데이트하기 좋게 다 풀렸어요.</p> :
                                    Number(weather.tmp) > 30 ?
                                    <p>실내데이트 하세요... 너무 더워요.</p> :
                                    <p>롱패딩 입으세요... 너무 추워요.</p>
                                }
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