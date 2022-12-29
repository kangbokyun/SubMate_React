import React from 'react';
import { useEffect } from 'react';
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { call } from '../../Service/APIService';
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

    const [ notice, setNotice ] = useState([]);
    useEffect(() => {
        call("/Admin/NoticeList", "POST", null)
        .then((res) => {
            console.log("/Admin/NoticeList/Res : ", res);
            setNotice(res);
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
                        <tr className = "row" style = {{ width: "100%" }}>
                            <td className = "col-3" style = {{ textAlign: "center" }}>종류</td>
                            <td className = "col-9" style = {{ textAlign: "center" }}>제목</td>
                        </tr>
                        { notice.map((list) => 
                            <tr key = { list.nno } className = "row" style = {{ width: "100%" }}>
                                <td className = "col-3" style = {{ textAlign: "center" }}>{
                                    list.nkind === 1 ?
                                    "[ 공지 ]" : "[ 이벤트 ]"
                                }</td>
                                <td className = "col-9" style = {{ textAlign: "center" }}>{ list.ntitle }</td>
                            </tr>
                        ) }
                    </tbody>
                </table>
            </div>
            <AdminMenu />
        </div>
    );
}
export default NoticeList;