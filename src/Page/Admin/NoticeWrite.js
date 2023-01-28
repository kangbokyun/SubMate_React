import React from 'react';
import { useState } from 'react';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { NoticeWriteAPI } from '../../Service/APIService';
import Header from '../Header';
import AdminMenu from './AdminMenu';

function NoticeWrite() {
    const userInfo = JSON.parse(localStorage.getItem("UserInfo"));
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

    const [ writeData, setWriteData ] = useState({});
    const noticeWrite = (e) => {
        if([e.target.name].includes("noticetitle")) {
            setWriteData({ ... writeData, [e.target.name] : e.target.value });
        }
        if([e.target.name].includes("noticecontents")) {
            setWriteData({ ... writeData, [e.target.name] : e.target.value });
        }
        if([e.target.name].includes("noticefile")) {
            setWriteData({ ... writeData, [e.target.name] : e.target.value });
        }
        if([e.target.name].includes("noticekind")) {
            setWriteData({ ... writeData, [e.target.name] : e.target.value });
        }
    };

    const sendNotice = () => {
        const formData = new FormData();
        formData.append("ntitle", writeData.noticetitle);
        formData.append("ncontents", writeData.noticecontents);
        if(writeData.noticefile != null) {
            formData.append("nfile", writeData.noticefile);
        }
        formData.append("nkind", writeData.noticekind);
        formData.append("mno", userInfo.mno);
        console.log("mno : ", userInfo.mno);
        NoticeWriteAPI(formData);
    };

    return(
        <div>
            <Header />
            { window.innerWidth <= 767 ? 
                <div style = {{ borderBottom: "solid 1px gray" }}>
                    <h1 style = {{ marginLeft: "3vw", marginTop: "8vh" }}>
                        <span onClick = { GoBack } style = {{ marginRight: "1.5vw" }}>&#10094;</span>
                        NoticeWrite
                    </h1>
                </div> : 
                <h1 style = {{ marginLeft: "6vw", marginTop: "8vh" }}>NoticeWrite</h1> 
            }
            <div className = { window.innerWidth <= 767 ? "" : "container" }>
                <div className = "row" style = {{ width: "100%", marginTop: "1.5vh" }}>
                    <div className = "col-12">
                        <input name = "noticetitle" onChange = { noticeWrite } type = "text" className = "form-control" placeholder = "Title" style = {{ marginLeft: "3vw" }} />
                    </div>
                    <div className = "col-12">
                        <textarea name = "noticecontents" onChange = { noticeWrite } className = "form-control" placeholder = "내용" style = {{ marginLeft: "3vw", height: "40vh", marginTop: "1vh" }} />
                    </div>
                    <div className = "col-6">
                        <h4 style = {{ textAlign: "center", marginTop: "2vh" }}>분류 : </h4>
                    </div>
                    <div className = "col-6">
                        <select name = "noticekind" onChange = { noticeWrite } className = "form-control" style = {{ marginTop: "1vh" }}>
                            <option value = "0">선택</option>
                            <option value = "1">공지</option>
                            <option value = "2">이벤트</option>
                        </select>
                    </div>
                    <div className = "col-12">
                        <input name = "noticefile" onChange = { noticeWrite } type = "file" className = "form-control" style = {{ marginTop: "1vh", marginLeft: "3vw" }} />
                    </div>
                    <div className = "col-12">
                        <button onClick = { sendNotice } type = "button" className = "btn btn-success" style = {{ marginTop: "20vh", marginLeft: "3vw", width: "100%" }}>작성</button>
                    </div>
                </div>
            </div>
            <AdminMenu />
        </div>
    );
}
export default NoticeWrite;