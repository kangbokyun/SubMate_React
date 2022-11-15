import React from 'react';
import { useEffect } from 'react';
import { useState } from 'react';
import { useLocation, useNavigate } from 'react-router';
import Header from '../Header';
import Menu from '../Menu';

function BoardView() {
    const boardDTO = useLocation();
    console.log("bno : ", boardDTO.state.bno);
    console.log("btitle : ", boardDTO.state.btitle);
    console.log("bcontents : ", boardDTO.state.bcontents);
    console.log("bwriter : ", boardDTO.state.bwriter);
    console.log("bview : ", boardDTO.state.bview);
    console.log("becho : ", boardDTO.state.becho);
    console.log("bechotimer : ", boardDTO.state.bechotimer);
    console.log("bimg : ", boardDTO.state.bimg);

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

    return(
        <div>
            <Header />
            { window.innerWidth <= 767 ? 
                <div>
                    <h1 style = {{ marginLeft: "1vw", marginTop: "10vh" }}>
                        <span onClick = { GoBack } style = {{ marginRight: "1.5vw" }}>&#10094;</span>
                        BoardView
                    </h1>
                </div>
                : 
                <h1 style = {{ marginLeft: "6vw", marginTop: "10vh" }}>BoardView</h1> 
            }
            <div className = { window.innerWidth <= 767 ? "" : "container" }>
                <label style = {{ marginLeft: window.innerWidth <= 767 ? "1.5vw" : "", fontSize: "1.7rem", marginTop: "1.5vh" }}>{ boardDTO.state.btitle }</label>{ window.innerWidth <= 767 ? "" : <br /> }
                <hr />
                <div className = "row">
                    <div className = "col-md-5">
                        <label style = {{ marginLeft: window.innerWidth <= 767 ? "1.5vw" : "", fontSize: "1.7rem", marginTop: "0", padding : "0" }}>{ boardDTO.state.bnickname }</label>
                    </div>
                    <div className = "col-md-6 offset-md-1" style = {{ border: "solid 1px blue" }}>
                        <label style = {{ float: "right", paddingTop: window.innerWidth <= 767 ? "0.4vh" : "0.6vh", marginRight: window.innerWidth <= 767 ? "1vw" : "" }}>{ boardDTO.state.bwriter } · { boardDTO.state.bview }</label>
                    </div>
                </div>
                { boardDTO.state.bimg === "null" ?  
                    <img alt = "" src = { require('../../IMG/BoardPicture_Black.png') } style = {{ width: window.innerWidth <= 767 ? "100vw" : "30%", height: window.innerWidth <= 767 ? "30vh" : "30vh", borderRadius: "8px", marginTop: "0.7vh", objectFit: "contain", backgroundColor: "gray" }} />
                    :
                    <img alt = "Setting" src = { require('../../BoardImg/' + boardDTO.state.bimg) } style = {{ width: window.innerWidth <= 767 ? "100vw" : "30%", height: window.innerWidth <= 767 ? "30vh" : "30vh", borderRadius: "8px", marginTop: "0.7vh", objectFit: "contain", backgroundColor: "gray" }} />
                }
                <div className = "row gx-0" style = {{ marginTop: "0.5vh", marginLeft: window.innerWidth <= 767 ? "1.5vw" : "", border: "solid 1px red", width: window.innerWidth <= 767 ? "97%" : "" }}>
                    <label className = "col-md-2" style = {{  }}>
                        <img alt = "Like" src = { require('../../IMG/BoardHeart_Black.png') } style = {{ width: window.innerWidth <= 767 ? "13vw" : "4vw", height: window.innerWidth <= 767 ? "5vh" : "3.5vh" }} />
                        <img alt = "Reply" src = { require('../../IMG/BoardReply_Black.png') } style = {{ width: window.innerWidth <= 767 ? "13vw" : "4vw", height: window.innerWidth <= 767 ? "5vh" : "3.5vh" }} />
                    </label>
                </div>
                <div style = {{ marginTop: "", marginLeft: window.innerWidth <= 767 ? "1.5vw" : "", border: "solid 1px blue", height: window.innerWidth <= 767 ? "29vh" : "35vh", width: window.innerWidth <= 767 ? "97%" : "", fontSize: window.innerWidth <= 767 ? "1.7rem" : "1.2rem" }}>{ boardDTO.state.bcontents }</div>
            </div>
            <Menu />
        </div>
    );
}
export default BoardView;