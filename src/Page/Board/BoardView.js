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
            <Menu />
        </div>
    );
}
export default BoardView;