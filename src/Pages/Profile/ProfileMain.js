import React from 'react';
import Header from '../../Component/Header';

function ProfileMain() {
    let a = JSON.parse(localStorage.getItem("UserInfo"));

    return(
        <div>
            <Header />
            <div style = {{ height: "25vh" }}></div>
            <div className = "row">
                <div className = "col-md-2 col-sm-2"></div>
                <div className = "col-md-8 col-sm-8">
                    <div className = "card" style = {{ width: "100%", height: "37vh" }}>
                        <div className = "card-title" style = {{ fontSize: "35px", textAlign: "center" }}>메 이 트 등 록 증</div>
                        <div className = "row" style = {{ marginTop: "30px" }}>
                            <div className = "col-md-8 col-sm-8">
                                <div className = "row">
                                    <div className = "col-md-3">
                                        <h3>ID</h3>
                                        <h3>Name</h3>
                                        <h3>Nick</h3>
                                        <h3>Phone</h3>
                                        <h3>Addr</h3>
                                        <h3>Join</h3>
                                    </div>
                                    <div className = "col-md-7">
                                        <input type = "text" disabled = "true" className = "form-control" value = { a.mid } style = {{ textAlign: "center" }} />
                                        <input type = "text" disabled = "true" className = "form-control" value = { a.mname } style = {{ marginTop: "3px", textAlign: "center" }} />
                                        <input type = "text" disabled = "true" className = "form-control" value = { a.mnickname } style = {{ marginTop: "3px", textAlign: "center" }} />
                                        <input type = "text" disabled = "true" className = "form-control" value = { a.mphone } style = {{ marginTop: "3px", textAlign: "center" }} />
                                        <input type = "text" disabled = "true" className = "form-control" value = { a.maddress } style = {{ marginTop: "3px", textAlign: "center" }} />
                                        <input type = "text" disabled = "true" className = "form-control" value = { a.createddate.split("T")[0] } style = {{ marginTop: "3px", textAlign: "center" }} />
                                    </div>
                                </div>
                            </div>
                            <div className = "col-md-4 col-sm-4" style = {{ backgroundColor: "black" }}>
                                <img alt = "Person" src = { require('../../Img/Person.png') } style = {{ width: "100%" }} /> 
                                <button type = "button">asd</button>
                            </div>
                        </div>
                    </div>
                </div>
                <div className = "col-md-2 col-sm-1"></div>
            </div>
        </div>
    );
}
export default ProfileMain;