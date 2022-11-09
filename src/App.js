import { useEffect, useState } from 'react';
import 'bootstrap/dist/css/bootstrap.css';
import Marquee from "react-fast-marquee";
import { Link } from 'react-router-dom';
import './App.css';
import isLogin from './isLogin';

function App() {

    // 윈도우 크기 변경 감지되면 리렌더링
    const [ windowWidth, setWindowWidth ] = useState(0);
    const [ windowHeight, setWindowHeight ] = useState(0);
    let resizeWindow = () => {
        setWindowWidth(window.innerWidth);
        setWindowHeight(window.innerHeight);

        if(isLogin()) {
            window.location.href = "/Home";
        } 
    };

    useEffect(() => {
    resizeWindow();
    window.addEventListener("resize", resizeWindow);
    return () => window.removeEventListener("resize", resizeWindow);
    }, []);
    // /윈도우 크기 변경 감지되면 리렌더링

    return (
    <div className = "row" style = {{ width: "100%", margin: "auto" }}>
        <div className = "col-md-6 offset-md-3 col-sm-6 offset-sm-3 col-12" style = {{ margin: "auto", padding: "0" }}>
        <div style = {{ 
            zIndex: "0", 
                width: window.innerWidth <= 767 ? "100%" :"50vw", 
                height: "100vh", 
                backgroundColor: "black", 
                position: "absolute", 
                left: window.innerWidth <= 767 ? "0px" :"25.1vw", 
                top: "0px",
                opacity: "70%"
        }}>
            <h1 style = {{ position: "relative", top: "0px", zIndex: "1", textAlign: "center", color: "white", marginTop: "5vh" }}>SubMate</h1>
            <Marquee gradient = { false } speed = "45" style = {{ position: "relative", top: "0px", zIndex: "1", textAlign: "center", color: "gold", marginTop: "5vh", width: window.innerWidth <= 767 ? "90%" :"60%", marginLeft: window.innerWidth <= 767 ? "5vw" :"10vw", fontSize: "1.4rem" }}>
                지하철에서 스치듯 지나간 그 사람.. 서브메이트에서 만나자!　　　　　　　　　
            </Marquee>
            <Link to = "/Login"><button type = "button" className = "btn btn-light" style = {{ position: "relative", zIndex: "1", marginTop: window.innerWidth <= 767 ? "70vh" :"60vh", width: window.innerWidth <= 767 ? "90%" :"60%", marginLeft: window.innerWidth <= 767 ? "5vw" :"10vw", fontSize: "1.5rem" }}>Login</button></Link>
            <Link to = "/SignUp"><button type = "button" className = "btn btn-outline-light" style = {{ position: "relative", zIndex: "1", marginTop: "1vh", width: window.innerWidth <= 767 ? "90%" :"60%", marginLeft: window.innerWidth <= 767 ? "5vw" :"10vw", fontSize: "1.5rem" }}>SignUp</button></Link>
        </div>
        <img alt = "SubMate" src = { require('./IMG/Train.jpg') } style = {{ width: "100%", height: "100vh", zIndex: "-1", position: "relative" }} />
        </div>
    </div>
    );
}
export default App;