import React from 'react';
import { Link } from 'react-router-dom';
import Header from '../Header';
import Menu from '../Menu';

function Setting() {
    return(
        <div>
            <Header />
            { window.innerWidth <= 767 ? 
                <div><h1 style = {{ marginLeft: "3vw", marginTop: "10vh" }}>Setting</h1></div> : 
                <h1 style = {{ marginLeft: "6vw", marginTop: "10vh" }}>Setting</h1> 
            }
            
            { window.innerWidth <= 767 ? 
                <table className = "table">
                    <tr style = {{ borderBottom: "solid 1px gray", height: "5.5vh" }}>
                        <td style = {{ fontSize: "1.2rem" }}><Link to = "/SetMate" style = {{ textDecoration: "none", color: "black" }}>메이트</Link></td>
                    </tr>
                    <tr style = {{ borderBottom: "solid 1px gray", height: "5.5vh" }}>
                        <td style = {{ fontSize: "1.2rem" }}><Link to = "/SetChat" style = {{ textDecoration: "none", color: "black" }}>채팅</Link></td>
                    </tr>
                    <tr style = {{ borderBottom: "solid 1px gray", height: "5.5vh" }}>
                        <td style = {{ fontSize: "1.2rem" }}><Link to = "/SetBoard" style = {{ textDecoration: "none", color: "black" }}>게시판</Link></td>
                    </tr>
                    <tr style = {{ borderBottom: "solid 1px gray", height: "5.5vh" }}>
                        <td style = {{ fontSize: "1.2rem" }}><Link to = "/SetProfile" style = {{ textDecoration: "none", color: "black" }}>프로필</Link></td>
                    </tr>
                    <tr style = {{ borderBottom: "solid 1px gray", height: "5.5vh" }}>
                        <td style = {{ fontSize: "1.2rem" }}><Link to = "/SetCustomer" style = {{ textDecoration: "none", color: "black" }}>고객센터</Link></td>
                    </tr>
                </table>
                :
                <div className = "container">
                    <table className = "table">
                        <tr style = {{ borderBottom: "solid 1px gray", height: "5.5vh" }}>
                            <td style = {{ fontSize: "1.2rem" }}><Link to = "/SetMate" style = {{ textDecoration: "none", color: "black" }}>메이트</Link></td>
                        </tr>
                        <tr style = {{ borderBottom: "solid 1px gray", height: "5.5vh" }}>
                            <td style = {{ fontSize: "1.2rem" }}><Link to = "/SetChat" style = {{ textDecoration: "none", color: "black" }}>채팅</Link></td>
                        </tr>
                        <tr style = {{ borderBottom: "solid 1px gray", height: "5.5vh" }}>
                            <td style = {{ fontSize: "1.2rem" }}><Link to = "/SetBoard" style = {{ textDecoration: "none", color: "black" }}>게시판</Link></td>
                        </tr>
                        <tr style = {{ borderBottom: "solid 1px gray", height: "5.5vh" }}>
                            <td style = {{ fontSize: "1.2rem" }}><Link to = "/SetProfile" style = {{ textDecoration: "none", color: "black" }}>프로필</Link></td>
                        </tr>
                        <tr style = {{ borderBottom: "solid 1px gray", height: "5.5vh" }}>
                            <td style = {{ fontSize: "1.2rem" }}><Link to = "/SetCustomer" style = {{ textDecoration: "none", color: "black" }}>고객센터</Link></td>
                        </tr>
                    </table>
                </div>
            }
            <Menu />
        </div>
    );
}
export default Setting;