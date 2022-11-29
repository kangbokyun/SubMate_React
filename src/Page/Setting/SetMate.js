import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '../Header';
import Menu from '../Menu';

function SetMate() {
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


    // 카카오맵 API
    useEffect(() => {
        const { kakao } = window;
        const container = document.getElementById('map');
        const options = {
            center: new kakao.maps.LatLng(33.450701, 126.570667),
            level: 3
        };
    
        const map = new kakao.maps.Map(container, options);
        // HTML5의 geolocation으로 사용할 수 있는지 확인합니다 
        if (navigator.geolocation) {
            
            // GeoLocation을 이용해서 접속 위치를 얻어옵니다
            navigator.geolocation.getCurrentPosition(function(position) {
                
                var lat = position.coords.latitude, // 위도
                    lon = position.coords.longitude; // 경도
                
                var locPosition = new kakao.maps.LatLng(lat, lon), // 마커가 표시될 위치를 geolocation으로 얻어온 좌표로 생성합니다
                    message = '<div style="padding:5px;">현재 위치입니다.</div>'; // 인포윈도우에 표시될 내용입니다
                
                // 마커와 인포윈도우를 표시합니다
                displayMarker(locPosition, message);
                    
            });
            
        } else { // HTML5의 GeoLocation을 사용할 수 없을때 마커 표시 위치와 인포윈도우 내용을 설정합니다
            
            var locPosition = new kakao.maps.LatLng(33.450701, 126.570667),    
                message = 'geolocation을 사용할수 없어요..'
                
            displayMarker(locPosition, message);
        }

        // 지도에 마커와 인포윈도우를 표시하는 함수입니다
        function displayMarker(locPosition, message) {

            // 마커를 생성합니다
            var marker = new kakao.maps.Marker({  
                map: map, 
                position: locPosition
            }); 
            
            var iwContent = message, // 인포윈도우에 표시할 내용
                iwRemoveable = true;

            // 인포윈도우를 생성합니다
            var infowindow = new kakao.maps.InfoWindow({
                content : iwContent,
                removable : iwRemoveable
            });
            
            // 인포윈도우를 마커위에 표시합니다 
            infowindow.open(map, marker);
            
            // 지도 중심좌표를 접속위치로 변경합니다
            map.setCenter(locPosition);
        }
    }, []);
    // -/카카오맵 API

    const [ mateSetting, setMateSetting ] = useState([]);
    const [ startTime, setStartTime ] = useState();
    const [ startMinute, setStartMinute ] = useState();
    const saveMateSetting = (e) => {
        if(e.target.name === "mategwsth") {
            setStartTime(e.target.value);
            console.log(startTime);
        }
        if(e.target.name === "mategwstm") {
            setStartMinute(e.target.value);
            setMateSetting({...mateSetting, "mategwt" : startTime + e.target.value});
        }
        console.log("mateSetting: " , mateSetting);
    };

    return(
        <div>
            <Header />
            { window.innerWidth <= 767 ? 
                <div style = {{ borderBottom: "solid 1px gray" }}>
                    <h1 style = {{ marginLeft: "1vw", marginTop: "8vh", marginBottom: "1.5vh" }}>
                        <span onClick = { GoBack } style = {{ marginRight: "1.5vw" }}>&#10094;</span>
                        Setting_Mate
                    </h1>
                </div> 
                : 
                <h1 style = {{ marginLeft: "2vw", marginTop: "10vh" }}>Setting_Mate</h1> 
            }
            <div className = {window.innerWidth <= 767 ? "" : "container"}>
                <div className = "row" style = {{ width: window.innerWidth <= 767 ? "100%" : "", marginTop: "1.5vh" }}>
                    <div className = "col-12" style = {{ marginLeft: "2.5vw" }}>
                        <label style = {{ fontSize: "1.5rem" }}>출근시간</label>
                        <div className = "row">
                            <div className = "col-4">
                                <input onChange = { saveMateSetting } name = "mategwsth" type = "text" className = "form-control" style = {{ textAlign: "right" }} placeholder = "00" />
                            </div>
                            <div className = "col-1">
                                <label style = {{ fontSize: "1.5rem" }}>시</label>
                            </div>
                            <div className = "col-4">
                                <input onChange = { saveMateSetting } name = "mategwstm" type = "text" className = "form-control" style = {{ textAlign: "right" }} placeholder = "00" />
                            </div>
                            <div className = "col-3">
                                <label style = {{ fontSize: "1.5rem" }}>분 부터</label>
                            </div>
                            <div className = "col-4">
                                <input onChange = { saveMateSetting } name = "mategweth" type = "text" className = "form-control" style = {{ textAlign: "right", marginTop: "0.7vh" }} placeholder = "00" />
                            </div>
                            <div className = "col-1">
                                <label style = {{ fontSize: "1.5rem", marginTop: "0.7vh" }}>시</label>
                            </div>
                            <div className = "col-4">
                                <input onChange = { saveMateSetting } name = "mategwetm" type = "text" className = "form-control" style = {{ textAlign: "right", marginTop: "0.7vh" }} placeholder = "00" />
                            </div>
                            <div className = "col-3">
                                <label style = {{ fontSize: "1.5rem", marginTop: "0.7vh" }}>분 까지</label>
                            </div>
                        </div>
                    </div>
                    <div className = "col-12" style = {{ marginTop: "1vh", borderBottom: "solid 1px gray", marginLeft: "2.5vw", paddingBottom: "2vh" }}>
                        <label style = {{ fontSize: "1.5rem" }}>퇴근시간</label>
                        <div className = "row">
                            <div className = "col-4">
                                <input onChange = { saveMateSetting } name = "matelwsth" type = "text" className = "form-control" style = {{ textAlign: "right" }} placeholder = "00" />
                            </div>
                            <div className = "col-1">
                                <label style = {{ fontSize: "1.5rem" }}>시</label>
                            </div>
                            <div className = "col-4">
                                <input onChange = { saveMateSetting } name = "matelwstm" type = "text" className = "form-control" style = {{ textAlign: "right" }} placeholder = "00" />
                            </div>
                            <div className = "col-3">
                                <label style = {{ fontSize: "1.5rem" }}>분 부터</label>
                            </div>
                            <div className = "col-4">
                                <input onChange = { saveMateSetting } name = "matelweth" type = "text" className = "form-control" style = {{ textAlign: "right", marginTop: "0.7vh" }} placeholder = "00" />
                            </div>
                            <div className = "col-1">
                                <label style = {{ fontSize: "1.5rem", marginTop: "0.7vh" }}>시</label>
                            </div>
                            <div className = "col-4">
                                <input onChange = { saveMateSetting } name = "matelwetm" type = "text" className = "form-control" style = {{ textAlign: "right", marginTop: "0.7vh" }} placeholder = "00" />
                            </div>
                            <div className = "col-3">
                                <label style = {{ fontSize: "1.5rem", marginTop: "0.7vh" }}>분 까지</label>
                            </div>
                        </div>
                    </div>
                    <div className = "col-12" style = {{ marginTop: "1vh", borderBottom: "solid 1px gray", marginLeft: "2vw", paddingBottom: "2vh" }}>
                        <label style = {{ fontSize: "1.5rem" }}>호선</label>
                        <div className = "row">
                            <div className = "col-12" style = {{  }}>
                                <label style = {{ marginTop: "1.5vh", backgroundColor: "blue", border: "solid 1px black", color: "white", marginLeft: "1.5vw", paddingLeft: "1.5vw", paddingRight: "1.5vw", borderRadius: "23px" }}>1호선</label>
                                <label style = {{ marginTop: "1.5vh", backgroundColor: "orange", border: "solid 1px black", color: "white", marginLeft: "1.5vw", paddingLeft: "1.5vw", paddingRight: "1.5vw", borderRadius: "23px" }}>2호선</label>
                                <label style = {{ marginTop: "1.5vh", backgroundColor: "purple", border: "solid 1px black", color: "white", marginLeft: "1.5vw", paddingLeft: "1.5vw", paddingRight: "1.5vw", borderRadius: "23px" }}>3호선</label>
                                <label style = {{ marginTop: "1.5vh", backgroundColor: "pink", border: "solid 1px black", color: "white", marginLeft: "1.5vw", paddingLeft: "1.5vw", paddingRight: "1.5vw", borderRadius: "23px" }}>4호선</label>
                                <label style = {{ marginTop: "1.5vh", backgroundColor: "red", border: "solid 1px black", color: "white", marginLeft: "1.5vw", paddingLeft: "1.5vw", paddingRight: "1.5vw", borderRadius: "23px" }}>5호선</label>
                                <label style = {{ marginTop: "1.5vh", backgroundColor: "green", border: "solid 1px black", color: "white", marginLeft: "1.5vw", paddingLeft: "1.5vw", paddingRight: "1.5vw", borderRadius: "23px" }}>6호선</label>
                                <label style = {{ marginTop: "1.5vh", backgroundColor: "skyblue", border: "solid 1px black", color: "white", marginLeft: "1.5vw", paddingLeft: "1.5vw", paddingRight: "1.5vw", borderRadius: "23px" }}>7호선</label>
                                <label style = {{ marginTop: "1.5vh", backgroundColor: "aqua", border: "solid 1px black", color: "white", marginLeft: "1.5vw", paddingLeft: "1.5vw", paddingRight: "1.5vw", borderRadius: "23px" }}>8호선</label>
                                <label style = {{ marginTop: "1.5vh", backgroundColor: "gray", border: "solid 1px black", color: "white", marginLeft: "1.5vw", paddingLeft: "1.5vw", paddingRight: "1.5vw", borderRadius: "23px" }}>9호선</label>
                            </div>
                        </div>
                    </div>
                    <div className = "col-12" style = {{ marginTop: "1vh", borderBottom: "solid 1px gray", marginLeft: "2vw", paddingBottom: "2vh" }}>
                        <label style = {{ fontSize: "1.5rem" }}>위치 확인</label>
                    </div>
                    <div 
                        id="map" 
                        style = {{ 
                            width: window.innerWidth <= 767 ? "100%" : "100%", 
                            height: window.innerWidth <= 767 ? "30vh" : "40vh",
                            marginLeft: window.innerWidth <= 767 ? "2.6vw" : "2vw",
                            marginTop: ""
                        }}
                    >
                    </div>
                </div>
            </div>
            <Menu />
        </div>
    );
}
export default SetMate;