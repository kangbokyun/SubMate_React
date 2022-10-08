import React, { useState } from 'react';
import '../../ComponentCss/InputCss.css';
import { LoginAPI } from '../../Service/APIService';

function Login() {
    const [ minfo, setMinfo ] = useState([]);

    const changeBox = (e) => {
        setMinfo({
            ...minfo, [ e.target.name ] : e.target.value
        })
        console.log(minfo);
    };
    const clickBtn = () => {
        LoginAPI(minfo)
    };

    return(
        <div className="row" style = {{ marginTop: "30vh" }}>
            <div className = "col-md-4 offset-md-4 col-sm-4 offset-sm-4">
                <div class="card" style = {{ width: "100%" }}>
                    <section>
                        <h1>Login</h1>
                    </section>
                    <div class="box" style = {{ width: "100%" }}>
                        <input type="text" name = "mid" required onChange={ changeBox } />
                        <span>ID</span>
                        <i></i>
                    </div>
                    <div class="box" style = {{ width: "100%" }}>
                        <input type="text" name = "mpw" required onChange={ changeBox } />
                        <span>PW</span>
                        <i></i>
                    </div>
                    <button type="button" class="submit-btn" onClick = { clickBtn }>Login</button>
                </div>
            </div>
        </div>
    );
}
export default Login;