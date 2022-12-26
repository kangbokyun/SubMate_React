import React from 'react';
import { useEffect } from 'react';
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Header from '../Header';
import AdminMenu from './AdminMenu';

function NoticeList() {
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

    return(
        <div>
            <Header />
            { window.innerWidth <= 767 ? 
                <div style = {{ borderBottom: "solid 1px gray" }}>
                    <h1 style = {{ marginLeft: "1vw", marginTop: "8vh" }}>
                        <span onClick = { GoBack } style = {{ marginRight: "1.5vw" }}>&#10094;</span>
                        NoticeList
                        <span style = {{ float: "right", marginRight: "2vw" }}>
                            <Link to = "/NoticeWrite">
                                <button type = "button" className = "btn btn-success">공지작성</button>
                            </Link>
                        </span>
                    </h1>
                </div> : 
                <h1 style = {{ marginLeft: "6vw", marginTop: "10vh" }}>NoticeList</h1> 
            }
            <div className = { window.innerWidth <= 767 ? "" : "container" }>
                <table className = "table" style = {{  }}>
                    <tbody>
                        <tr className = "row" style = {{ width: "100%", marginLeft: "0.1vw" }}>
                            <td className = "col-3" style = {{ textAlign: "center" }}>종류</td>
                            <td className = "col-9" style = {{ textAlign: "center" }}>제목</td>
                        </tr>
                        <tr className = "row gx-0" style = {{ width: "100%", marginLeft: "0.1vw" }}>
                            <td className = "col-3" style = {{ textAlign: "center" }}>[공지]</td>
                            <td className = "col-9" style = {{ textAlign: "center" }}>공지사항 안내드립니다.</td>
                        </tr>
                        <tr className = "row gx-0" style = {{ width: "100%", marginLeft: "0.1vw" }}>
                            <td className = "col-3" style = {{ textAlign: "center" }}>[이벤트]</td>
                            <td className = "col-9" style = {{ textAlign: "center" }}>이벤트 안내드립니다.</td>
                        </tr>
                    </tbody>
                </table>
            </div>
            <AdminMenu />
        </div>
    );
}
export default NoticeList;