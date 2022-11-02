import React from 'react';

function InChat() {
    return(
        <div>
            { window.innerWidth <= 767 ? 
                <div><h1 style = {{ marginLeft: "3vw", marginTop: "10vh" }}>Nick</h1></div> : 
                <h1 style = {{ marginLeft: "6vw", marginTop: "10vh" }}>Nick</h1> 
            }
        </div>
    );
}
export default InChat;