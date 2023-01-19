import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Header from '../Header';
import Menu from '../Menu';

function SetCustomer() {
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
                <div><h1 style = {{ marginLeft: "1vw", marginTop: "10vh" }}><span onClick = { GoBack } style = {{ marginRight: "1.5vw" }}>&#10094;</span>Setting_Customer</h1></div> : 
                <h1 style = {{ marginLeft: "8vw", marginTop: "8vh" }}>Setting_Customer</h1> 
            }
            { window.innerWidth <= 767 ?
                <div>
                    <table className = "table">
                        <tbody>
                            <tr style = {{ borderBottom: "solid 1px gray", height: "5.5vh" }}>
                                <td style = {{ fontSize: "1.2rem" }}><Link to = "/Customer/QnA" style = {{ textDecoration: "none", color: "black" }}>QnA</Link></td>
                            </tr>
                            <tr style = {{ borderBottom: "solid 1px gray", height: "5.5vh" }}>
                                <td style = {{ fontSize: "1.2rem" }}><Link to = "/Customer/Tendinous" style = {{ textDecoration: "none", color: "black" }}>건의하기</Link></td>
                            </tr>
                            <tr style = {{ borderBottom: "solid 1px gray", height: "5.5vh" }}>
                                <td style = {{ fontSize: "1.2rem" }}><Link to = "/" style = {{ textDecoration: "none", color: "black" }}>FAQ</Link></td>
                            </tr>
                            <tr style = {{ borderBottom: "solid 1px gray", height: "5.5vh" }}>
                                <td style = {{ fontSize: "1.2rem" }}><Link to = "/Customer/SendList" style = {{ textDecoration: "none", color: "black" }}>내역</Link></td>
                            </tr>
                        </tbody>
                    </table>
                </div>
                :
                <div className = "container">
                    <table className = "table">
                        <tr style = {{ borderBottom: "solid 1px gray", height: "3vh" }}>
                            <td style = {{ fontSize: "1.2rem" }}><Link to = "/" style = {{ textDecoration: "none", color: "black" }}>문의하기</Link></td>
                        </tr>
                        <tr style = {{ borderBottom: "solid 1px gray", height: "3vh" }}>
                            <td style = {{ fontSize: "1.2rem" }}><Link to = "/" style = {{ textDecoration: "none", color: "black" }}>건의하기</Link></td>
                        </tr>
                        <tr style = {{ borderBottom: "solid 1px gray", height: "3vh" }}>
                            <td style = {{ fontSize: "1.2rem" }}><Link to = "/" style = {{ textDecoration: "none", color: "black" }}>FAQ</Link></td>
                        </tr>
                        <tr style = {{ borderBottom: "solid 1px gray", height: "3vh" }}>
                            <td style = {{ fontSize: "1.2rem" }}><Link to = "/" style = {{ textDecoration: "none", color: "black" }}>내역</Link></td>
                        </tr>
                    </table>
                </div>
            }
            <Menu />
        </div>
    );
}
export default SetCustomer;