import React from 'react';
import { Link } from 'react-router-dom';

function AdminMenu() {
    return(
        <footer style = {{ backgroundColor: "#a7c2f7", height: "5vh", position: "fixed", bottom: "0", width: "100%", zIndex: "50" }}>
            <div className = "row">
                <div className = "col-md-3 col-3" style = {{ textAlign: "center" }}>
                    <Link to = "/AdminMain">
                        <img alt = "Home" src = { require('../../IMG/AdminHome.png') } style = {{ width: window.innerWidth <= 767 ? "12vw" : "5vw", height: "5vh", marginTop: "0px" }} />
                    </Link>
                </div>
                <div className = "col-md-3 col-3" style = {{ textAlign: "center" }}>
                    <Link to = "/UserManage">
                        <img alt = "Mate" src = { require('../../IMG/Mate.png') } style = {{ width: window.innerWidth <= 767 ? "12vw" : "5vw", height: "5vh", marginTop: "0px" }} />
                    </Link>
                </div>
                <div className = "col-md-3 col-3" style = {{ textAlign: "center" }}>
                    <Link to = "/AdminBoard">
                        <img alt = "Board" src = { require('../../IMG/Board.png') } style = {{ width: window.innerWidth <= 767 ? "12vw" : "5vw", height: "5vh", marginTop: "0px" }} />
                    </Link>
                </div>
                <div className = "col-md-3 col-3" style = {{ textAlign: "center" }}>
                    <Link to = "/Setting">
                        <img alt = "Setting" src = { require('../../IMG/Setting.png') } style = {{ width: window.innerWidth <= 767 ? "12vw" : "5vw", height: "5vh", marginTop: "0px" }} />
                    </Link>
                </div>
            </div>
        </footer>
    );
}
export default AdminMenu;