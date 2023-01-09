import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router';
import Header from '../Header';
import Menu from '../Menu';
import { call } from '../../Service/APIService';

function SendList() {
    // 윈도우 크기 변경 감지되면 리렌더링
    const [ windowWidth, setWindowWidth ] = useState(0);
    const [ windowHeight, setWindowHeight ] = useState(0);
    let resizeWindow = () => {
        setWindowWidth(window.innerWidth);
        setWindowHeight(window.innerHeight);
    };

    const userInfo = JSON.parse(localStorage.getItem("UserInfo"));
    const [ sendedTendinous, setSendedTendinous ] = useState([]);
    useEffect(() => {
        const formData = new FormData();
        formData.append("mno", userInfo.mno);
        call("/SendedTendinous", "POST", formData)
        .then((res) => { console.log(res); setSendedTendinous(res) });
        resizeWindow();
        window.addEventListener("resize", resizeWindow);
        return () => window.removeEventListener("resize", resizeWindow);
    }, []);
    // /윈도우 크기 변경 감지되면 리렌더링
    // 뒤로가기
    const history = useNavigate();
    const GoBack = () => {
        return history(-1) // 한 페이지 뒤로
    };// 커밋주석

    return(
        <div>
            <Header />
            { window.innerWidth <= 767 ? 
                <div>
                    <h1 style = {{ marginLeft: "1vw", marginTop: "10vh" }}>
                        <span onClick = { GoBack } style = {{ marginRight: "1.5vw" }}>&#10094;</span>
                        SendList
                    </h1>
                </div>
                : 
                <h1 style = {{ marginLeft: "6vw", marginTop: "10vh" }}>SendList</h1> 
            }
            <div className = { window.innerWidth <= 767 ? "" : "container" }>
                <div className = "row" style = {{ marginLeft: "0.1vw", width: "100%" }}>
                    <div className = "col-12" style = {{ marginTop: "1vh", height: "35vh" }}>
                        <h5>보낸 건의</h5>
                        <table className = "table">
                            <tbody>
                                <tr className = "row" stlye = {{ width: "100%" }}>
                                    <td className = "col-3" style = {{ textAlign: "center" }}>상태</td>
                                    <td className = "col-5" style = {{ textAlign: "center" }}>내용</td>
                                    <td className = "col-2" style = {{ textAlign: "center" }}>종류</td>
                                    <td className = "col-2" style = {{ textAlign: "center" }}>건의</td>
                                </tr>
                                { sendedTendinous.map((list) => 
                                    <tr className = "row" style = {{ width: "100%", marginLeft: "0.1vw" }} key = { list.tno }>
                                        <td className = "col-3" style = {{ textAlign: "center" }}>
                                            { 
                                                list.tstatus === "2" ? "[ 확인 ]" : 
                                                list.tstatus === "3" ? "[ 보류 ]" : 
                                                list.tstatus === "4" ? "[ 처리 ]" : "[ 미처리 ]"
                                            }
                                        </td>
                                        <td className = "col-5" style = {{ textAlign: "center" }}>
                                            { list.tcontents }
                                        </td>
                                        <td className = "col-2" style = {{ textAlign: "center" }}>
                                            { 
                                                list.tselectcontentkind === "1" ? "메이트" : 
                                                list.tselectcontentkind === "2" ? "채팅" :
                                                list.tselectcontentkind === "3" ? "게시판" :
                                                list.tselectcontentkind === "4" ? "프로필" : "설정"
                                            }
                                        </td>
                                        <td className = "col-2" style = {{ textAlign: "center" }}>
                                            { 
                                                list.tselecttendinouskind === "1" ? "기능" : 
                                                list.tselecttendinouskind === "2" ? "개선" : "버그"
                                            }
                                        </td>
                                    </tr>
                                ) }
                            </tbody>
                        </table>
                    </div>
                    <div className = "col-12" style = {{ marginTop: "1vh", height: "35vh" }}>
                        <h5>보낸 문의</h5>
                    </div>
                </div>
            </div>
            <Menu />
        </div>
    );
}
export default SendList;