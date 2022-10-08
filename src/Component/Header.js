import React from 'react';
import { Link } from 'react-router-dom';
import { LogoutAPI } from '../Service/APIService';

function Header() {

    const clickLogout = () => {
        LogoutAPI();
    };
    
    return(
        <header style = {{ backgroundColor: "black" }}>
            <div className = "row">
                <div className = "col-md-2 col-sm-2" style = {{ textAlign : "center" }}>
                    <h2 style = {{ width: "100%" }}>
                        <Link to = "/"><img alt = "SubMate" src = { require('../Img/SubMate.png') } style = {{ height: "10vh", marginTop: "5%" }} /></Link>
                    </h2>
                </div>
                <div className = "col-md-10 col-sm-10">
                    { localStorage.getItem("Access_Token") === "null" ? 
                        <div style = {{ float: "right", marginRight: "7px", color: "white" }}>
                            <Link to = "/SignUp"><img alt = "SignUp" src = { require('../Img/SignUp.png') } style = {{ height: "10vh", marginTop: "15%" }} /></Link>
                        </div> : 
                        <div style = {{ float: "right", marginRight: "7px", color: "white" }}>
                            <img alt = "Logout" src = { require('../Img/Logout.png') } style = {{ height: "10vh", marginTop: "15%", cursor: "pointer" }} onClick = { clickLogout } />
                        </div> 
                    }{ localStorage.getItem("Access_Token") === "null" ? 
                        <div style = {{ float: "right", marginRight: "7px", color: "white" }}>
                            <Link to = "/Login"><img alt = "Login" src = { require('../Img/Login.png') } style = {{ height: "10vh", marginTop: "15%" }} /></Link>
                        </div> : 
                        <div style = {{ float: "right", marginRight: "7px", color: "white" }}>
                            <Link to = "/Profile"><img alt = "Profile" src = { require('../Img/Profile.png') } style = {{ height: "10vh", marginTop: "15%" }} /></Link>
                        </div> 
                    }
                    {/* <div style = {{ float: "right", marginRight: "7px" }}>
                        <img alt = "Profile" src = { require('../Img/Profile.png') } style = {{ height: "10vh", marginTop: "15%" }} />
                    </div> */}
                    <div style = {{ float: "right", marginRight: "7px" }}>
                        <Link to = "/Pid"><img alt = "PID" src = { require('../Img/PID.png') } style = {{ height: "10vh", marginTop: "15%" }} /></Link>
                    </div>
                    <div style = {{ float: "right", marginRight: "7px" }}>
                        <Link to = "/Chat"><img alt = "Chat" src = { require('../Img/Chat.png') } style = {{ height: "10vh", marginTop: "15%" }} /></Link>
                    </div>
                    <div style = {{ float: "right", marginRight: "7px" }}>
                        <Link to = "/Mate"><img alt = "Mate" src = { require('../Img/Mate.png') } style = {{ height: "10vh", marginTop: "15%" }} /></Link>
                    </div>
                </div>
            </div>
        </header>
    );
}
export default Header;