import React, { useEffect, useState } from 'react';
import Header from '../Header';
import Menu from '../Menu';
import '../../Component/Switch/Switch.css';
import { useNavigate } from 'react-router';
import { BoardWriteAPI } from '../../Service/APIService';

function BoardWrite() {
    // 윈도우 크기 변경 감지되면 리렌더링
    const [ windowWidth, setWindowWidth ] = useState(0);
    const [ windowHeight, setWindowHeight ] = useState(0);
    let resizeWindow = () => {
        setWindowWidth(window.innerWidth);
        setWindowHeight(window.innerHeight);
    };
    
    useEffect(() => {
        resizeWindow();
        window.addEventListener("resize", resizeWindow);
        return () => window.removeEventListener("resize", resizeWindow);
    }, []);
    // /윈도우 크기 변경 감지되면 리렌더링
    // 뒤로가기
    const history = useNavigate();
    const GoBack = () => {
        return history(-1) // 한 페이지 뒤로
    };

   
    const [ checked, setCehcked ] = useState("1");
    const checkedSwitch = (e) => { // 스위치 제어
        if(e.target.value === '1') { // 스위치 꺼짐
            setCehcked("2");
            setWrite({ ...write, 'becho' : checked });
        } else { // 켜짐
            setCehcked("1");
            setWrite({ ...write, 'becho' : checked });
        }
    };



    const [data,setData] = useState({
        btitle:'',
        bcontents:'',
        becho:'',
        bimg:''
      });




    const [ checkTitle, setCheckTitle ] = useState(false);
    const [ checkContents, setCheckContents ] = useState(false);
    const [ checkImg, setCheckImg ] = useState(false);
    const [ write, setWrite ] = useState([]);
    const boardState = (e) => {
        if([e.target.name].includes("btitle")) {
            if(e.target.value.length >= 0) {
                setCheckTitle(true);
                setWrite({ ...write, [e.target.name] : e.target.value });
                setData({ ...data, [e.target.name] : e.target.value });
                console.log("write : ", write);
            } else {
                setCheckTitle(false);
            }
        }
        if([e.target.name].includes("bcontents")) {
            if(e.target.value.length >= 0) {
                setCheckContents(true);
                setWrite({ ...write, [e.target.name] : e.target.value });
                setData({ ...data, [e.target.name] : e.target.value });
                console.log("write : ", write);
            } else {
                setCheckContents(false);
            }
        }
        if([e.target.name].includes("bimg")) {
            if(e.target.value.length >= 0) {
                setCheckImg(true);
                setWrite({ ...write, [e.target.name] : e.target.files[0] });
                setData({ ...data, [e.target.name] : e.target.files[0] });
            } else {
                setCheckImg(false);
            }
        }
    };
    const sendBoardWrite = () => {
        // 글등록
        if(checkTitle && checkContents) {
            const userInfo = JSON.parse(localStorage.getItem("UserInfo"));
            // alert(userInfo.mno);
            
            setWrite({ ...write, 'mno' : userInfo.mno });
            if(checked === '1') {
                const formData = new FormData();
                formData.append("bimg", data.bimg);
                formData.append("btitle", data.btitle);
                formData.append("bcontents", data.bcontents);
                formData.append("becho", checked);
                formData.append("mno", userInfo.mno);
                // fetch("http://localhost:8080/Board/BoardWrite", {
                //     headers: { "Authorization" : "Bearer " + localStorage.getItem("Access_Token") },
                //     method: "POST",
                //     body: formData
                // }).then((res) => {console.log("resres:::::::::::::::::::::::: ", res)})
                BoardWriteAPI(formData);
            } else {
                console.log("sendWrite : ", write);
                // BoardWriteAPI(write);
            }
        }
    };

    return(
        <div>
            <Header />
            { window.innerWidth <= 767 ? 
                <div>
                    <h1 style = {{ marginLeft: "1vw", marginTop: "10vh" }}>
                        <span onClick = { GoBack } style = {{ marginRight: "1.5vw" }}>&#10094;</span>
                        BoardWrite
                        <span style = {{ float: "right", marginRight: "2vw" }}>
                            <button type = "button" className = "btn btn-success" onClick = { sendBoardWrite }>등록</button>
                        </span>
                    </h1>
                </div>
                : 
                <h1 style = {{ marginLeft: "6vw", marginTop: "10vh" }}>BoardWrite</h1> 
            }
            <div className = { window.innerWidth <= 767 ? "" : "row" } style = {{ marginTop: "3vh" }}>
                <input onChange = { boardState } name = "btitle" type = "text" style = {{ backgroundColor: "transparent", border: "none", borderBottom: "solid 1px gray", outline: "none", width: "100%", height: window.innerWidth <= 767 ? "6vh" : "", fontSize: window.innerWidth <= 767 ? "1.4rem" : "", paddingLeft: "2.5vw" }} placeholder = "Title" />
                <textarea onChange = { boardState } name = "bcontents" placeholder = "내용을 입력하세요." style = {{ width: "100%", outline: "none", paddingTop: "1vh", paddingLeft: "2.5vw", border: "none", borderBottom: "solid 1px gray", height: "25vh" }}></textarea>
                <div style = {{ border: "none", borderBottom: "solid 1px gray" }}>
                    <div className = "row" style = {{ maxWidth: "100%" }}>
                        <div className = "col-3" style = {{ textAlign: "center", fontSize: "1.5rem" }}>
                            <label style = {{ color: checked === '1' ? "gray" : "skyblue", fontStyle: "bold", paddingLeft: "3vw" }}>메아리</label>
                        </div>
                        <div className = "col-2 offset-7" style = {{ paddingBottom: "1vh" }}>
                            <input value = { checked } id="checkbox" className="switch-input" type="checkbox" onClick = { checkedSwitch } style = {{  }} />
                            <label htmlFor="checkbox" className="switch"></label>
                        </div>
                    </div>
                </div>
                <div style = {{ border: "none", borderBottom: "solid 1px gray", height: "4vh", marginTop: "1vh" }}>
                    <input className = "form-control" onChange = { boardState } type = "file" style = {{  }} name = "bimg" />
                </div>
            </div>
            <Menu />
        </div>
    );
}
export default BoardWrite;
//   return (
//     <div className="container-center">
//       <div className="container">
//         <form id="myform"onSubmit={(e) => submit(e)} >
//           <center>
//             <label className="form_title" htmlFor="Form">Form :</label>
//           </center>
//           <label htmlFor="fname">First Name</label>
//           <input  onChange={(e)=>handle(e)} value={data.firstname} type="text" id="fname" name="firstname" placeholder="First name" required minLength="3" maxLength="15"/>
//           <label htmlFor="lname">Last Name</label>
//           <input  onChange={(e)=>handle(e)} value={data.lastname} type="text" id="lname" name="lastname" placeholder="last name" />
//           <label htmlFor="email">Email</label>
//           <input  onChange={(e)=>handle(e)} value={data.email} type="text" id="txt_email" name="email" placeholder="Email" required minLength="6"/>
//           <div className="check_email_valid" id="check_email_valid">Email is Invalide</div>
//           <label htmlFor="Description">Description</label>
//           <textarea onChange={(e)=>handle(e)} value={data.description}  className='description' id="Description" name="description" placeholder="txt_Descripton.." required minLength="10"/>
//           <div className="border_button_choose_file">
//             <input value={data.selectedFile} className="button_choose_file" type="file" id="myFile" name="filename" onChange={window['fileValidation']}/>
//           </div>
//           <input type="submit" value="Submit"/>
//         </form>
//       </div>
//     </div> 
//   );
//   }