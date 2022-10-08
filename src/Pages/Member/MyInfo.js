import React from 'react';
import '../../ComponentCss/InputCss.css';
import Header from '../../Component/Header';

function MyInfo() {
    let userInfo = JSON.parse(localStorage.getItem("UserInfo"));

    return(
        <div>
            <Header />
            <div className = "container">
                <h2 style = {{ textAlign: "center", marginTop: "3vh" }}>MyInfo</h2>
                <hr />
                <div className = "row">
                    <div className = "col-md-2" style = {{ textAlign: "center" }}>
                        <h3>ID</h3>
                    </div>
                    <div className = "col-md-8" style = {{ textAlign: "center" }}>
                        <input className = "form-control" disabled = "true" type = "text" value = { userInfo.mid } style = {{ textAlign: "center" }} required />
                    </div>
                    <div className = "col-md-2" style = {{ textAlign: "center" }}>
                        <button type = "button" className = "form-control">수정</button>
                    </div>
                </div>
            </div>
        </div>
    );
}
export default MyInfo;