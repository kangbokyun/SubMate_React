import React from 'react';
import { useEffect } from 'react';
import { useState } from 'react';
import { LogoutAPI } from '../../Service/APIService';
import Header from '../Header';
import AdminMenu from './AdminMenu';

function AdminSetting() {
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

    const Logout = () => {
        LogoutAPI();
    };

    return(
        <div>
            <Header />
            { window.innerWidth <= 767 ? 
                <div style = {{ borderBottom: "solid 1px gray" }}>
                    <h1 style = {{ marginLeft: "3vw", marginTop: "8vh" }}>
                        Setting
                    </h1>
                </div> : 
                <h1 style = {{ marginLeft: "6vw", marginTop: "8vh" }}>Setting</h1> 
            }
            <div className = { window.innerWidth <= 767 ? "" : "container" }>
                <table className = "table">
                    <tbody>
                        <tr>
                            <td onClick = { Logout }>로그아웃</td>
                        </tr>
                    </tbody>
                </table>
            </div>
            <AdminMenu />
        </div>
    );
}
export default AdminSetting;