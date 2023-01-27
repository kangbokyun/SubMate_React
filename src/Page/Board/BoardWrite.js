import React, { useEffect, useState } from 'react';
import Header from '../Header';
import Menu from '../Menu';
// import '../../Component/Switch/Switch.css';
import { useNavigate } from 'react-router-dom';
import { BoardWriteAPI, BoardWriteNoImgAPI } from '../../Service/APIService';
import '../../Component/Accordion/AccordionButton.css';

function BoardWrite() {
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

    const [ checked, setCehcked ] = useState("1");
    const checkedSwitch = (e) => { // 스위치 제어
        if(e.target.value === '1') { // 스위치 꺼짐
            setWrite({ ...write, 'becho' : checked });
            setCehcked("2");
            setWrite({ ...write, 'becho' : "2" });
        } else { // 켜짐
            setWrite({ ...write, 'becho' : checked });
            setCehcked("1");
            setWrite({ ...write, 'becho' : "1" });
        }
    };

    const [data,setData] = useState({
        btitle:'',
        bcontents:'',
        becho:'',
        bimg:''
      });

    const [ echoTime, setEchoTime ] = useState("0");
    const [ checkTitle, setCheckTitle ] = useState(false);
    const [ checkContents, setCheckContents ] = useState(false);
    const [ checkImg, setCheckImg ] = useState(false);
    const [ write, setWrite ] = useState([]);
    const boardState = (e) => {
        if([e.target.name].includes("btitle")) {
            if(e.target.value.length >= 0) {
                setCheckTitle(true);
                setWrite({ ...write, [e.target.name] : e.target.value });
                setData({ ...data, [e.target.name] : e.target.value });
                console.log("write : ", write);
            } else {
                setCheckTitle(false);
            }
        }
        if([e.target.name].includes("bcontents")) {
            if(e.target.value.length >= 0) {
                setCheckContents(true);
                setWrite({ ...write, [e.target.name] : e.target.value });
                setData({ ...data, [e.target.name] : e.target.value });
                console.log("write : ", write);
            } else {
                setCheckContents(false);
            }
        }
        if([e.target.name].includes("bimg")) {
            if(e.target.value.length >= 0) {
                setCheckImg(true);
                setWrite({ ...write, [e.target.name] : e.target.files[0].name });
                setData({ ...data, [e.target.name] : e.target.files[0] });
            } else {
                setCheckImg(false);
            }
        }
    };

    let timer = "";
    const setEchoTimer = (e) => {
        setEchoTime(e.target.value);
        setWrite({ ...write, "bechotimer" : e.target.value });
        setData({ ...data, "bechotimer" : e.target.value });
    };

    const sendBoardWrite = () => {
        // 글등록
        if(checkTitle && checkContents) {
            const userInfo = JSON.parse(localStorage.getItem("UserInfo"));
            console.log("checkEcho: ", checked);

            let mno = userInfo.mno;
            let mnickname = userInfo.mnickname;
            setWrite({ ...write, 'mno' : mno });
            setWrite({ ...write, 'bwriter' : mnickname });
            console.log("write : ", write);
            const formData = new FormData();
            if(checked === "2") {
                if(echoTime === "0") {
                    alert("메아리 시간을 설정해주세요.");
                    return;
                }
            } 
            if(data.bimg === "") { // 이미지가 없을 때
                if(checked === '1') {
                    BoardWriteNoImgAPI(write);
                } else {
                    // setWrite({ ...write, 'becho' : checked });
                    BoardWriteNoImgAPI(write);
                }
            } else { // 이미지가 있을 때
                formData.append("bimg", data.bimg);
                formData.append("btitle", data.btitle);
                formData.append("bcontents", data.bcontents);
                formData.append("becho", checked);
                formData.append("mno", userInfo.mno);
                formData.append("bwriter", userInfo.mnickname);
                if(checked === "1") {
                    formData.append("bechotimer", 0);
                } else {
                    formData.append("bechotimer", write.bechotimer);
                }
                BoardWriteAPI(formData);
            }
        }
    };

    return(
        <div>
            <Header />
            { window.innerWidth <= 767 ? 
                <div>
                    <h1 style = {{ marginLeft: "1vw", marginTop: "8vh" }}>
                        <span onClick = { GoBack } style = {{ marginRight: "1.5vw" }}>&#10094;</span>
                        BoardWrite
                        <span style = {{ float: "right", marginRight: "2vw" }}>
                            <button type = "button" className = "btn btn-success" onClick = { sendBoardWrite }>등록</button>
                        </span>
                    </h1>
                </div>
                : 
                <h1 style = {{ marginLeft: "6vw", marginTop: "8vh" }}>BoardWrite</h1> 
            }
            <div className = { window.innerWidth <= 767 ? "" : "container" } style = {{ marginTop: "3vh" }}>
                { window.innerWidth <= 767 ? "" : <div><button type = "button" className = "btn btn-outline-secondary" style = {{ float: "right", marginBottom: "1.5vh", marginLeft: "1vw" }} onClick = { GoBack }>취소</button><button type = "button" className = "btn btn-outline-success" style = {{ float: "right", marginBottom: "1.5vh" }} onClick = { sendBoardWrite }>등록</button></div> }
                <input onChange = { boardState } name = "btitle" type = "text" style = {{ backgroundColor: "transparent", border: "none", borderBottom: "solid 1px gray", outline: "none", width: "100%", height: window.innerWidth <= 767 ? "6vh" : "", fontSize: window.innerWidth <= 767 ? "1.4rem" : "2rem", paddingLeft: "2.5vw" }} placeholder = "Title" />
                <textarea onChange = { boardState } name = "bcontents" placeholder = "내용을 입력하세요." style = {{ width: "100%", outline: "none", paddingTop: "1vh", paddingLeft: "2.5vw", border: "none", borderBottom: "solid 1px gray", height: "25vh" }}></textarea>
                <div className = "" style = {{ border: "none", borderBottom: "solid 1px gray" }}>
                    <div className = "row" style = {{ maxWidth: "100%" }}>
                        <div className="toggleContainer">
                            <h3><label className = "" htmlFor="switch1" style = {{ color: checked === '1' ? "gray" : "skyblue", fontStyle: "bold", paddingLeft: "3vw" }}>메아리</label></h3>
                            <div className="trainingToggle" style = {{  }}>
                                <input value = { checked } id="switch1" className="switch col-3 offset-6" type="checkbox" onClick = { checkedSwitch } style = {{  }} />
                                <label htmlFor = "switch1" style = {{ marginLeft: window.innerWidth <= 767 ? "85vw" : "80vw" }}></label>
                                <table className = "col-12 col-md-12" style = {{ width: "100%" }}>
                                    <tbody style = {{ width: "100%" }}>
                                        <tr className="workout" style = {{ width: "100%" }}>
                                            <td style = {{  }}>
                                                <div className = "row" style = {{ marginLeft: window.innerWidth <= 767 ? "3.5vw" : "6vw", width: "100%" }}>
                                                    <div className = "col-3 offset-5">{ echoTime.endsWith("h") ? echoTime.split("h")[0] : "" }시간</div>
                                                    <div className = "col-3 offset-1">{ echoTime.endsWith("m") ? echoTime.split("m")[0] : "" }분</div>
                                                    <hr />
                                                    <ul className = "row" style ={{  }}>
                                                        <h5>(단위 : 분)</h5>
                                                        <li name = "m1" className = "col-3" style = {{ listStyle: "none", textAlign: "center" }}>
                                                            <button type = "button" className = "form-control" name = "bechotimer" value = "5m" onClick = { setEchoTimer } style = {{ borderRadius: "23px" }}>5</button>
                                                        </li>
                                                        <li name = "m2" className = "col-3" style = {{ listStyle: "none", textAlign: "center" }}>
                                                            <button type = "button" className = "form-control" name = "bechotimer" value = "10m" onClick = { setEchoTimer } style = {{ borderRadius: "23px" }}>10</button>
                                                        </li>
                                                        <li name = "m3" className = "col-3" style = {{ listStyle: "none", textAlign: "center" }}>
                                                            <button type = "button" className = "form-control" name = "bechotimer" value = "15m" onClick = { setEchoTimer } style = {{ borderRadius: "23px" }}>15</button>
                                                        </li>
                                                        <li name = "m4" className = "col-3" style = {{ listStyle: "none", textAlign: "center" }}>
                                                            <button type = "button" className = "form-control" name = "bechotimer" value = "30m" onClick = { setEchoTimer } style = {{ borderRadius: "23px" }}>30</button>
                                                        </li>
                                                    </ul>
                                                    <ul className = "row">
                                                        <h5>(단위 : 시간)</h5>
                                                        <li className = "col-3" style = {{ listStyle: "none", textAlign: "center" }}>
                                                            <button type = "button" className = "form-control" name = "bechotimer" value = "1h" onClick = { setEchoTimer } style = {{ borderRadius: "23px" }}>1</button>
                                                        </li>
                                                        <li className = "col-3" style = {{ listStyle: "none", textAlign: "center" }}>
                                                            <button type = "button" className = "form-control" name = "bechotimer" value = "6h" onClick = { setEchoTimer } style = {{ borderRadius: "23px" }}>6</button>
                                                        </li>
                                                        <li className = "col-3" style = {{ listStyle: "none", textAlign: "center" }}>
                                                            <button type = "button" className = "form-control" name = "bechotimer" value = "12h" onClick = { setEchoTimer } style = {{ borderRadius: "23px" }}>12</button>
                                                        </li>
                                                        <li className = "col-3" style = {{ listStyle: "none", textAlign: "center" }}>
                                                            <button type = "button" className = "form-control" name = "bechotimer" value = "24h" onClick = { setEchoTimer } style = {{ borderRadius: "23px" }}>24</button>
                                                        </li>
                                                    </ul>
                                                </div>
                                            </td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                </div>
                <div style = {{ border: "none", borderBottom: "solid 1px gray", height: "4vh", marginTop: "1vh" }}>
                    <input className = "form-control" onChange = { boardState } type = "file" style = {{  }} name = "bimg" />
                </div>
            </div>
            <Menu />
        </div>
    );
}
export default BoardWrite;