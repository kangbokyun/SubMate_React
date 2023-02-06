import React from 'react';
import { Link } from 'react-router-dom';
import Header from '../Header';
import Menu from '../Menu';

function MyProfile() {
    return(
        <div>
            <Header />
            { window.innerWidth <= 767 ? 
                <div><h1 style = {{ marginLeft: "3vw", marginTop: "8vh" }}>MyProfile
                <span style = {{ float: "right", marginRight: "2vw" }}>
                        <Link to = "/BoardWrite">
                            <button type = "button" className = "btn btn-success">정보수정</button>
                        </Link>
                    </span>
                </h1></div> :
                <h1 style = {{ marginLeft: "6vw", marginTop: "8vh" }}>MyProfile</h1> 
            }
            <Menu />
        </div>
    );
}
export default MyProfile;