import React, { useEffect, useState } from 'react';
import Header from '../Header';
import Menu from '../Menu';
import '../../Component/Switch/Switch.css';
import { useNavigate } from 'react-router';
import { BoardWriteAPI, BoardWriteNoImgAPI } from '../../Service/APIService';
import '../../Component/Accordion/Accordion.css';

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
        } else { // 켜짐
            setWrite({ ...write, 'becho' : checked });
            setCehcked("1");
        }
    };

    const [data,setData] = useState({
        btitle:'',
        bcontents:'',
        becho:'',
        bimg:''
      });

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
    const sendBoardWrite = () => {
        // 글등록
        if(checkTitle && checkContents) {
            const userInfo = JSON.parse(localStorage.getItem("UserInfo"));
            console.log("checkEcho: ", checked);
            setWrite({ ...write, 'becho' : checked });

            let mno = userInfo.mno;
            let mid = userInfo.mid;
            setWrite({ ...write, 'mno' : mno });
            setWrite({ ...write, 'bwriter' : mid });
            const formData = new FormData();
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
                formData.append("bwriter", mid);
                if(checked === '1') {
                    BoardWriteAPI(formData);
                } else {
                    BoardWriteAPI(formData);
                }
            }
        }
    };

    // 스위치 아코디언
    const items = document.querySelectorAll(".accordian-item");
    items.forEach((item) => {
        item.addEventListener("click", (e) => {
            item.classList.toggle("active");
            const elementBody = item.querySelector(".accordian-body");
            if (item.classList.contains("active")) {
                elementBody.style.maxHeight = elementBody.scrollHeight + "px";
            } else {
                elementBody.style.maxHeight = 0;
            }
        });
    });
    // -/스위치 아코디언

    return(
        <div>
            <Header />
            { window.innerWidth <= 767 ? 
                <div>
                    <h1 style = {{ marginLeft: "1vw", marginTop: "10vh" }}>
                        <span onClick = { GoBack } style = {{ marginRight: "1.5vw" }}>&#10094;</span>
                        BoardWrite
                        <span style = {{ float: "right", marginRight: "2vw" }}>
                            <button type = "button" className = "btn btn-success" onClick = { sendBoardWrite }>등록</button>
                        </span>
                    </h1>
                </div>
                : 
                <h1 style = {{ marginLeft: "6vw", marginTop: "10vh" }}>BoardWrite</h1> 
            }
            <div className = { window.innerWidth <= 767 ? "" : "row" } style = {{ marginTop: "3vh" }}>
                <input onChange = { boardState } name = "btitle" type = "text" style = {{ backgroundColor: "transparent", border: "none", borderBottom: "solid 1px gray", outline: "none", width: "100%", height: window.innerWidth <= 767 ? "6vh" : "", fontSize: window.innerWidth <= 767 ? "1.4rem" : "", paddingLeft: "2.5vw" }} placeholder = "Title" />
                <textarea onChange = { boardState } name = "bcontents" placeholder = "내용을 입력하세요." style = {{ width: "100%", outline: "none", paddingTop: "1vh", paddingLeft: "2.5vw", border: "none", borderBottom: "solid 1px gray", height: "25vh" }}></textarea>
                <div className = "accordian" style = {{ border: "none", borderBottom: "solid 1px gray" }}>
                    <div className = "row accordian-item" style = {{ maxWidth: "100%" }}>
                        <div className = "col-3" style = {{ textAlign: "center", fontSize: "1.5rem", border: "solid 1px blue" }}>
                            <label style = {{ color: checked === '1' ? "gray" : "skyblue", fontStyle: "bold", paddingLeft: "3vw" }}>메아리</label>
                        </div>
                        <div className = "col-2 offset-7 accordian-header" style = {{ paddingBottom: "1vh" }}>
                            <input value = { checked } id="checkbox" className="switch-input accordian-header" type="checkbox" onClick = { checkedSwitch } style = {{  }} />
                            <label htmlFor="checkbox" className="switch"></label>
                        </div>
                        <div className="accordian" style = {{ border: "solid 1px red" }}>
                            <div className="accordian-item row">
                                <div className = "col-4">
                                    <div style = {{ fontSize: "1.8rem" }}>메아리</div>
                                </div>
                                <div className = "col-3 offset-5">
                                    <button className="accordian-header">asdasd</button>
                                </div>
                                <div id="1" className="accordian-body">
                                    <div className="accordian-body-content">
                                        HyperText Markup Language (HTML) is the set of markup symbols or codes inserted into a file intended for display on the Internet. The markup tells web browsers how to display a web page's words and images.
                                    </div>
                                </div>
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