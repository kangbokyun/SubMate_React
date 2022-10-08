import React, { useState } from 'react';
import { useNavigate } from 'react-router';
import Header from '../../Component/Header';

function SignUp() {
    const [ signUp, setSignUp ] = useState([]);
    const history = useNavigate();
    const GoBack = () => {
        return history(-1)
    };
    const saveMember = (e) => {
        setSignUp({
            ...signUp, [ e.target.name ] : e.target.value
        })
    };
    const sendSignUp = () => {
        fetch("http://localhost:8080/Auth/SignUp", {
            headers: {'Content-Type': 'application/json'},
            method : "POST",
            body : JSON.stringify(signUp)
        })
        .then((res) => res.json())
        .then((data) => {
            if(data) {
                alert("회원가입 되었습니다.");
                window.location.href = "/Login";
            } else {
                alert("회원가입 실패 :: 관리자에게 문의")
            }
        })
    };

    return (
        <div className = "App">
            <Header />
            <h1 style = {{ marginTop : "20px" }}>SignUp</h1>
            <div className = "container" style = {{ marginTop : "15px" }}>
                <div className = "row">
                    <div className = "col-md-3 offset-md-1" style = {{ textAlign : "left" }}>
                        <h3>아이디</h3>
                        <h3>비밀번호</h3>
                        <h3>비밀번호확인</h3>
                        <h3>이름</h3>
                        <h3>별명</h3>
                        <h3>번호</h3>
                        <h3>주소</h3>
                    </div>
                    <div className = "col-md-6">
                        <input type = "text" className = "form-control" name = "mid" onChange = { saveMember } placeholder = "ID" />
                        <input type = "text" className = "form-control" name = "mpw" onChange = { saveMember } placeholder = "PW" style = {{ marginTop : "3px" }} />
                        <input type = "text" className = "form-control" name = "mpw2" onChange = { saveMember } placeholder = "RE:PW" style = {{ marginTop : "3px" }} />
                        <input type = "text" className = "form-control" name = "mname" onChange = { saveMember } placeholder = "NAME" style = {{ marginTop : "3px" }} />
                        <input type = "text" className = "form-control" name = "mnickname" onChange = { saveMember } placeholder = "NICKNAME" style = {{ marginTop : "3px" }} />
                        <input type = "text" className = "form-control" name = "mphone" onChange = { saveMember } placeholder = "Phone" style = {{ marginTop : "3px" }} />
                        <input type = "text" className = "form-control" name = "maddress" onChange = { saveMember } placeholder = "ADDRESS" style = {{ marginTop : "3px" }} />
                    </div>
                    <div className = "col-md-8 offset-md-2 mb-3">
                        <button type = "button" onClick = { sendSignUp } className = "btn btn-outline-info" style = {{ width : "40%" }}>가입</button>
                        <button type = "button" className = "btn btn-outline-secondary" style = {{ marginLeft : "15px" }} onClick = { GoBack } >취소</button>
                    </div>
                </div>
            </div>
        </div>
    );
}
export default SignUp;