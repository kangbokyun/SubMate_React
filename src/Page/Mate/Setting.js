import React from 'react';
import { Link } from 'react-router-dom';
import Header from '../../Component/Header';

function Setting() {
    return(
        <div>
            <Header />
            <div className = "container" style = {{ marginTop: "2vh" }}>
                <div className = "row" style = {{ height: "70vh" }}>
                    <div className = "col-md-6 col-sm-6 offset-md-3 offset-sm-3">
                        <div className = "card" style = {{ width: "100%", borderBottom: "none", borderBottomLeftRadius: "0", borderBottomRightRadius: "0" }}>
                        </div>
                        <div className = "row" style = {{ border: "solid 2px black", width: "100%", marginLeft: "0.1vw", borderTop: "none" }}>
                            <div className = "col-md-6 col-sm-6" style = {{ textAlign: "center", backgroundColor: "gray", border: "solid 2px black", borderLeft: "none", borderBottom: "none" }}>
                                <Link to = "/Mate">
                                    <img 
                                        alt = "MateMenu"
                                        src = { require('../../Img/MateMenu.png') }
                                        style = {{
                                            width: "13vh",
                                        }}
                                    />
                                </Link>
                            </div>
                            <div className = "col-md-6 col-sm-6" style = {{ textAlign: "center", borderTop: "none;" }}>
                                <img 
                                    alt = "Setting" 
                                    src = { require('../../Img/Setting.png') } 
                                    style = {{
                                        width: "13vh",
                                        marginTop: "0.7vh",
                                    }}
                                /> 
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
export default Setting;