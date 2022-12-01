import { calculateNewValue } from '@testing-library/user-event/dist/utils';
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { call } from '../../Service/APIService';
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
        call("/Setting/Mate", "GET", null);
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
    const [ startTime, setStartTime ] = useState(0);
    const [ endTime, setEndTime ] = useState(0);
    const saveMateSetting = (e) => {
        if(e.target.name === "mategwst") { 
            if(e.target.value >= 2400) { alert("밤 12시는 00시로 입력해주세요.");
            } else { setMateSetting({ ...mateSetting, [e.target.name] : e.target.value}); }
        }
        if(e.target.name === "mategwet") { 
            if(e.target.value >= 2400) { alert("밤 12시는 00시로 입력해주세요.");
            } else { setMateSetting({ ...mateSetting, [e.target.name] : e.target.value}); }
        }
        if(e.target.name === "matelwst") { 
            if(e.target.value >= 2400) { alert("밤 12시는 00시로 입력해주세요.");
            } else { setMateSetting({ ...mateSetting, [e.target.name] : e.target.value}); }
        }
        if(e.target.name === "matelwet") { 
            if(e.target.value >= 2400) { alert("밤 12시는 00시로 입력해주세요.");
            } else { setMateSetting({ ...mateSetting, [e.target.name] : e.target.value}); }
        }
        // console.log("startTime : ", startTime);
        // console.log("endTime : ", endTime);
        // console.log("endTime - startTime : ", endTime - startTime);
        if(e.target.name === "startStation") {
            if(e.target.value.length !== 0) {
                setMateSetting({ ...mateSetting, 'matestartstaion' : e.target.value });
            } else {
                alert("출발역을 입력해주세요.");
            }
        }
        if(e.target.name === "endStation") {
            if(e.target.value.length !== 0) {
                setMateSetting({ ...mateSetting, 'mateendstation' : e.target.value });
            } else {
                alert("도착역을 입력해주세요.");
            }
        }
    };

    const saveSetting = () => {
        call("/Setting/Mate/Station", "POST", mateSetting)
        .then((res) => {
            console.log("StationRes : ", res);
        })
    };

    const [ selected, setSelected ] = useState("--선택--");
    const selectData = ['01호선', '02호선'];
    const selectLine = (e) => {
        setSelected(e.target.value);
        console.log("e.target.value: ", e.target.value)
    };

    return(
        <div>
            <Header />
            { window.innerWidth <= 767 ? 
                <div style = {{ borderBottom: "solid 1px gray" }}>
                    <h1 style = {{ marginLeft: "1vw", marginTop: "8vh", marginBottom: "1.5vh" }}>
                        <span onClick = { GoBack } style = {{ marginRight: "1.5vw" }}>&#10094;</span>
                        Setting_Mate
                        <button onClick = { saveSetting } type = "button" className = "btn btn-info" style = {{ float: "right", marginRight: "1vw", color: "white" }}>저장</button>
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
                                <input onChange = { saveMateSetting } name = "mategwst" type = "text" className = "form-control" style = {{ textAlign: "right" }} placeholder = "00" />
                            </div>
                            <div className = "col-2">
                                <label style = {{ fontSize: "1.5rem" }}>부터</label>
                            </div>
                            <div className = "col-4">
                                <input onChange = { saveMateSetting } name = "mategwet" type = "text" className = "form-control" style = {{ textAlign: "right" }} placeholder = "00" />
                            </div>
                            <div className = "col-2">
                                <label style = {{ fontSize: "1.5rem" }}>까지</label>
                            </div>
                        </div>
                    </div>
                    <div className = "col-12" style = {{ marginTop: "1vh", borderBottom: "solid 1px gray", marginLeft: "2.5vw", paddingBottom: "2vh" }}>
                        <label style = {{ fontSize: "1.5rem" }}>퇴근시간</label>
                        <div className = "row">
                            <div className = "col-4">
                                <input onChange = { saveMateSetting } name = "matelwst" type = "text" className = "form-control" style = {{ textAlign: "right" }} placeholder = "00" />
                            </div>
                            <div className = "col-2">
                                <label style = {{ fontSize: "1.5rem" }}>부터</label>
                            </div>
                            <div className = "col-4">
                                <input onChange = { saveMateSetting } name = "matelwet" type = "text" className = "form-control" style = {{ textAlign: "right" }} placeholder = "00" />
                            </div>
                            <div className = "col-2">
                                <label style = {{ fontSize: "1.5rem" }}>까지</label>
                            </div>
                        </div>
                    </div>
                    <div className = "col-12" style = {{ marginTop: "1vh", borderBottom: "solid 1px gray", marginLeft: "2vw", paddingBottom: "2vh" }}>
                        <label style = {{ fontSize: "1.5rem" }}>노선</label>
                        <div className = "row">
                            <div className = "col-12" style = {{  }}>
                                <label>출발역</label>
                                <select className = "form-control" onChange = { selectLine } value = { selected } style = {{ width: "20vw" }}>
                                    { selectData.map((data) =>
                                        <option key = { data }>{ data }</option>
                                    ) }
                                </select>
                                <input name = "startStation" onChange = { saveMateSetting } type = "text" className = "form-control" />
                                <label>도착역</label><input name = "endStation" onChange = { saveMateSetting } type = "text" className = "form-control" />
                                {/* <label style = {{ marginTop: "1.5vh", backgroundColor: "#263C96", color: "white", marginLeft: "1.5vw", paddingLeft: "1.5vw", paddingRight: "1.5vw", borderRadius: "23px" }}>1호선</label>
                                <label style = {{ marginTop: "1.5vh", backgroundColor: "#3CB44A", color: "white", marginLeft: "1.5vw", paddingLeft: "1.5vw", paddingRight: "1.5vw", borderRadius: "23px" }}>2호선</label>
                                <label style = {{ marginTop: "1.5vh", backgroundColor: "#F06E00", color: "white", marginLeft: "1.5vw", paddingLeft: "1.5vw", paddingRight: "1.5vw", borderRadius: "23px" }}>3호선</label>
                                <label style = {{ marginTop: "1.5vh", backgroundColor: "#2C9EDE", color: "white", marginLeft: "1.5vw", paddingLeft: "1.5vw", paddingRight: "1.5vw", borderRadius: "23px" }}>4호선</label>
                                <label style = {{ marginTop: "1.5vh", backgroundColor: "#996CAC", color: "white", marginLeft: "1.5vw", paddingLeft: "1.5vw", paddingRight: "1.5vw", borderRadius: "23px" }}>5호선</label>
                                <label style = {{ marginTop: "1.5vh", backgroundColor: "#CD7C2F", color: "white", marginLeft: "1.5vw", paddingLeft: "1.5vw", paddingRight: "1.5vw", borderRadius: "23px" }}>6호선</label>
                                <label style = {{ marginTop: "1.5vh", backgroundColor: "#747F00", color: "white", marginLeft: "1.5vw", paddingLeft: "1.5vw", paddingRight: "1.5vw", borderRadius: "23px" }}>7호선</label>
                                <label style = {{ marginTop: "1.5vh", backgroundColor: "#E6186C", color: "white", marginLeft: "1.5vw", paddingLeft: "1.5vw", paddingRight: "1.5vw", borderRadius: "23px" }}>8호선</label>
                                <label style = {{ marginTop: "1.5vh", backgroundColor: "#AA9872", color: "white", marginLeft: "1.5vw", paddingLeft: "1.5vw", paddingRight: "1.5vw", borderRadius: "23px" }}>9호선</label>
                                <label style = {{ marginTop: "1.5vh", backgroundColor: "#73C7A6", color: "white", marginLeft: "1.5vw", paddingLeft: "1.5vw", paddingRight: "1.5vw", borderRadius: "23px" }}>경의중앙선</label>
                                <label style = {{ marginTop: "1.5vh", backgroundColor: "#FF8C00", color: "white", marginLeft: "1.5vw", paddingLeft: "1.5vw", paddingRight: "1.5vw", borderRadius: "23px" }}>분당선</label>
                                <label style = {{ marginTop: "1.5vh", backgroundColor: "#FF8C00", color: "white", marginLeft: "1.5vw", paddingLeft: "1.5vw", paddingRight: "1.5vw", borderRadius: "23px" }}>수인선</label>
                                <label style = {{ marginTop: "1.5vh", backgroundColor: "#32C6A6", color: "white", marginLeft: "1.5vw", paddingLeft: "1.5vw", paddingRight: "1.5vw", borderRadius: "23px" }}>경춘선</label>
                                <label style = {{ marginTop: "1.5vh", backgroundColor: "#0054A6", color: "white", marginLeft: "1.5vw", paddingLeft: "1.5vw", paddingRight: "1.5vw", borderRadius: "23px" }}>경강선</label>
                                <label style = {{ marginTop: "1.5vh", backgroundColor: "#8BC53F", color: "white", marginLeft: "1.5vw", paddingLeft: "1.5vw", paddingRight: "1.5vw", borderRadius: "23px" }}>서해선</label>
                                <label style = {{ marginTop: "1.5vh", backgroundColor: "#3681B7", color: "white", marginLeft: "1.5vw", paddingLeft: "1.5vw", paddingRight: "1.5vw", borderRadius: "23px" }}>공항철도선</label>
                                <label style = {{ marginTop: "1.5vh", backgroundColor: "#8CADCB", color: "white", marginLeft: "1.5vw", paddingLeft: "1.5vw", paddingRight: "1.5vw", borderRadius: "23px" }}>인천1호선</label>
                                <label style = {{ marginTop: "1.5vh", backgroundColor: "#ED8000", color: "white", marginLeft: "1.5vw", paddingLeft: "1.5vw", paddingRight: "1.5vw", borderRadius: "23px" }}>인천2호선</label>
                                <label style = {{ marginTop: "1.5vh", backgroundColor: "#C82127", color: "white", marginLeft: "1.5vw", paddingLeft: "1.5vw", paddingRight: "1.5vw", borderRadius: "23px" }}>신분당선</label>
                                <label style = {{ marginTop: "1.5vh", backgroundColor: "#FDA600", color: "white", marginLeft: "1.5vw", paddingLeft: "1.5vw", paddingRight: "1.5vw", borderRadius: "23px" }}>의경부경전철</label>
                                <label style = {{ marginTop: "1.5vh", backgroundColor: "#4EA346", color: "white", marginLeft: "1.5vw", paddingLeft: "1.5vw", paddingRight: "1.5vw", borderRadius: "23px" }}>용인경전철</label>
                                <label style = {{ marginTop: "1.5vh", backgroundColor: "#BFC932", color: "white", marginLeft: "1.5vw", paddingLeft: "1.5vw", paddingRight: "1.5vw", borderRadius: "23px" }}>우이신설경전철</label>
                                <label style = {{ marginTop: "1.5vh", backgroundColor: "#B38E00", color: "white", marginLeft: "1.5vw", paddingLeft: "1.5vw", paddingRight: "1.5vw", borderRadius: "23px" }}>김포도시철도</label> */}
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