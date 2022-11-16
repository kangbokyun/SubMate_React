import React from 'react';
import { useEffect } from 'react';
import { useState } from 'react';
import { useLocation, useNavigate } from 'react-router';
import Header from '../Header';
import Menu from '../Menu';

function BoardView() {
    const boardDTO = useLocation();

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

    const replyWrite = (bno, bwriter, bcontents, becho, bechotimer, bview) => {
        history("/BoardReply", {
            state: {
                "bno" : bno,
                "bwriter" : bwriter,
                "bcontents" : bcontents,
                "becho" : becho,
                "bechotimer" : bechotimer,
                "bview" : bview
            }
        });
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
                <div className = "row" style = {{ width: "100%" }}>
                     <div className = "col-md-5 col-5">
                        <label style = {{ paddingLeft: window.innerWidth <= 767 ? "1.5vw" : "", fontSize: window.innerWidth <= 767 ? "1rem" : "1.7rem", marginTop: "0" }}>{ boardDTO.state.bwriter }</label>
                    </div>
                    <div className = "col-md-6 offset-md-1 col-6 offset-1" style = {{  }}>
                        <label style = {{ float: "right", paddingTop: window.innerWidth <= 767 ? "" : "0.6vh" }}>{ boardDTO.state.bwriter } · { boardDTO.state.bview }</label>
                    </div>
                </div>
                { boardDTO.state.bimg === "null" ?  
                    <img alt = "" src = { require('../../IMG/BoardPicture_Black.png') } style = {{ width: window.innerWidth <= 767 ? "100vw" : "30%", height: window.innerWidth <= 767 ? "30vh" : "30vh", borderRadius: "8px", marginTop: "0.7vh", objectFit: "contain", backgroundColor: "gray" }} />
                    :
                    <img alt = "Setting" src = { require('../../BoardImg/' + boardDTO.state.bimg) } style = {{ width: window.innerWidth <= 767 ? "100vw" : "30%", height: window.innerWidth <= 767 ? "30vh" : "30vh", borderRadius: "8px", marginTop: "0.7vh", objectFit: "contain", backgroundColor: "gray" }} />
                }
                <div className = "row gx-0" style = {{ marginTop: "0.5vh", marginLeft: window.innerWidth <= 767 ? "1.5vw" : "", width: window.innerWidth <= 767 ? "97%" : "" }}>
                    <label className = "col-md-2" style = {{  }}>
                        <img alt = "Like" src = { require('../../IMG/BoardHeart_Black.png') } style = {{ width: window.innerWidth <= 767 ? "13vw" : "4vw", height: window.innerWidth <= 767 ? "5vh" : "3.5vh" }} />
                        <img onClick = { (e) => replyWrite(boardDTO.state.bno, boardDTO.state.bwriter, boardDTO.state.bcontents, boardDTO.state.becho, boardDTO.state.bechotimer, boardDTO.state.bview) } alt = "Reply" src = { require('../../IMG/BoardReply_Black.png') } style = {{ width: window.innerWidth <= 767 ? "13vw" : "4vw", height: window.innerWidth <= 767 ? "5vh" : "3.5vh" }} />
                    </label>
                </div>
                <div style = {{ marginTop: "", marginLeft: window.innerWidth <= 767 ? "1.5vw" : "", height: window.innerWidth <= 767 ? "31.5vh" : "35vh", width: window.innerWidth <= 767 ? "97%" : "", fontSize: window.innerWidth <= 767 ? "1.7rem" : "1.2rem" }}>{ boardDTO.state.bcontents }</div>
            </div>
            <Menu />
        </div>
    );
}
export default BoardView;