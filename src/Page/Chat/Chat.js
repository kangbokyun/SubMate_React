import React from 'react';
import { Link } from 'react-router-dom';
import Header from '../Header';
import Menu from '../Menu';

function Chat() {
    return(
        <div>
            <Header />
            { window.innerWidth <= 767 ? 
                <div><h1 style = {{ marginLeft: "3vw", marginTop: "10vh" }}>Chat</h1></div> : 
                <h1 style = {{ marginLeft: "6vw", marginTop: "10vh" }}>Chat</h1> 
            }
            { window.innerWidth <= 767 ? 
                <div>Mobile</div>
                :
                <div>PC</div>
            }
            <Menu />
        </div>
    );
}
export default Chat;