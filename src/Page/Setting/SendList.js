import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router';
import Header from '../Header';
import Menu from '../Menu';
import { call } from '../../Service/APIService';

function SendList() {
    // 윈도우 크기 변경 감지되면 리렌더링
    const [ windowWidth, setWindowWidth ] = useState(0);
    const [ windowHeight, setWindowHeight ] = useState(0);
    let resizeWindow = () => {
        setWindowWidth(window.innerWidth);
        setWindowHeight(window.innerHeight);
    };

    const [ sendedTendinous, setSendedTendinous ] = useState([]);
    useEffect(() => {
        call("/SendedTendinous", "POST", null)
        .then((res) => { console.log(res); setSendedTendinous(res) });
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
                <div>
                    <h1 style = {{ marginLeft: "1vw", marginTop: "10vh" }}>
                        <span onClick = { GoBack } style = {{ marginRight: "1.5vw" }}>&#10094;</span>
                        SendList
                    </h1>
                </div>
                : 
                <h1 style = {{ marginLeft: "6vw", marginTop: "10vh" }}>SendList</h1> 
            }
            <div className = { window.innerWidth <= 767 ? "" : "container" }>
                <div className = "row" style = {{ marginLeft: "0.1vw", width: "100%" }}>
                    <div className = "col-12" style = {{ marginTop: "1vh", height: "35vh" }}>
                        <h5>보낸 건의</h5>
                    </div>
                    <div className = "col-12" style = {{ marginTop: "1vh", height: "35vh" }}>
                        <h5>보낸 문의</h5>
                    </div>
                </div>
            </div>
            <Menu />
        </div>
    );
}
export default SendList;