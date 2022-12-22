import React from 'react';
import { useEffect } from 'react';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { call, ChangeRole } from '../../Service/APIService';
import Header from '../Header';
import AdminMenu from './AdminMenu';

function UserManage() {
    // 윈도우 크기 변경 감지되면 리렌더링
    const [ windowWidth, setWindowWidth ] = useState(0);
    const [ windowHeight, setWindowHeight ] = useState(0);
    let resizeWindow = () => {
        setWindowWidth(window.innerWidth);
        setWindowHeight(window.innerHeight);
    };

    const [ userData, setUserData ] = useState([]);
    useEffect(() => {
        call("/Admin/UserManage", "POST", null)
        .then((res) => {
            setUserData(res);
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

    // Role 변경
    const [ role, setRole ] = useState("USER");
    const gradeUp = (e) => {
        const formData = new FormData();
        let temp = userData.map((list) => {
            if(String(list.mno) === String(e.target.id)) {
                if(list.mrole === "USER") {
                    setRole("MANAGER");
                    list.mrole = "MANAGER";
                } else if(list.mrole === "ADMIN") {
                    setRole("USER");
                    list.mrole = "USER";
                } else {
                    setRole("ADMIN");
                    list.mrole = "ADMIN";
                }
                formData.append("mno", list.mno);
                formData.append("mrole", list.mrole);
                ChangeRole(formData);
            }
        })
    };

    return(
        <div>
            <Header />
            { window.innerWidth <= 767 ? 
                <div style = {{ borderBottom: "solid 1px gray" }}>
                    <h1 style = {{ marginLeft: "1vw", marginTop: "8vh", marginBottom: "1.5vh" }}>
                        {/* <span onClick = { GoBack } style = {{ marginRight: "1.5vw" }}>&#10094;</span> */}
                        UserManage
                    </h1>
                </div> 
                : 
                <h1 style = {{ marginLeft: "2vw", marginTop: "10vh" }}>Setting_Mate</h1> 
            }
            <div className = { window.innerWidth <= 767 ? "" : "container" }>
                <table className = "table table-striped">
                    <thead>
                        <tr style = {{ textAlign: "center" }}>
                            <td>이름</td>
                            <td>별명</td>
                            <td>신고</td>
                            <td>정지</td>
                            <td>권한</td>
                        </tr>
                    </thead>
                    <tbody>
                        { userData.map((list) => 
                            <tr style = {{ textAlign: "center" }} key = { list.mno }>
                                <td>{ list.mname }</td>
                                <td>{ list.mnickname }</td>
                                <td>2건</td>
                                <td>0건</td>
                                <td>
                                    <span
                                        onClick = { gradeUp }
                                        id = { list.mno }
                                        style = {{ fontSize: list.mrole === "MANAGER" ? "0.5rem" : "1rem" }}
                                    >
                                        { list.mrole }
                                    </span>
                                </td>
                            </tr>
                        ) }
                    </tbody>
                </table>
            </div>
            <AdminMenu />
        </div>
    );
}
export default UserManage;