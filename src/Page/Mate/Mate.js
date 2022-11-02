import React from 'react';
import Header from '../Header';
import Menu from '../Menu';
import '../../Component/Card/Card2.css';

function Mate() {
    return(
        <div>
            <Header />
            { window.innerWidth <= 767 ? 
                <div><h1 style = {{ marginLeft: "3vw", marginTop: "10vh" }}>Mate</h1></div> : 
                <h1 style = {{ marginLeft: "6vw", marginTop: "10vh" }}>Mate</h1> 
            }
            { window.innerWidth <= 767 ?
                <section class="section-6" style = {{ borderBottom: "none", marginTop: "3vh", marginBottom: "2vh" }}>
                    <figure class="figure" style = {{ backgroundColor: "black", borderRadius: "8px" }}>
                        <img alt = "Setting" src = { require('../../IMG/임시프사.png') } style = {{ width: "100%", marginLeft: "0px", height: "67.5vh", objectFit: "contain", backgroundColor: "gray" }} />
                        <figcaption style = {{ color: "white", marginTop: "32vh", height: "5vh" }}>
                            <h3>아이린</h3>
                        </figcaption>
                        <figcaption style = {{ color: "white", marginTop: "37vh", height: "25vh" }}>
                            <label>노래, 춤을 좋아해요</label>
                        </figcaption>
                        <figcaption style = {{ color: "white", marginTop: "62vh", paddingTop: "5px" }}>
                            <div className = "row" style = {{ fontSize: "30px", marginTop: "0", padding: "0" }}>
                                <div className = "col-1">♡　</div>
                                <div className = "col-1">...</div>
                            </div>
                        </figcaption>
                    </figure>
                    <figure class="figure" style = {{ backgroundColor: "black", borderRadius: "8px" }}>
                        <img alt = "Setting" src = { require('../../IMG/임시프사3.jpg') } style = {{ width: "100%", marginLeft: "0px", height: "67.5vh", objectFit: "contain", backgroundColor: "gray" }} />
                        <figcaption style = {{ color: "white", marginTop: "32vh", height: "5vh" }}>
                            <h3>아이린</h3>
                        </figcaption>
                        <figcaption style = {{ color: "white", marginTop: "37vh", height: "25vh" }}>
                            <label>노래, 춤을 좋아해요</label>
                        </figcaption>
                        <figcaption style = {{ color: "white", marginTop: "62vh", paddingTop: "5px" }}>
                            <div className = "row" style = {{ fontSize: "30px", marginTop: "0", padding: "0" }}>
                                <div className = "col-1">♥　</div>
                                <div className = "col-1">...</div>
                            </div>
                        </figcaption>
                    </figure>
                </section>
                :
                <div className = "container" style = {{ marginTop: "3vh" }}>
                    <div className = "row">
                        <div className = "col-md-3 col-sm-3">
                            <section class="section-6" style = {{ borderBottom: "none", marginBottom: "2vh", width: "20vw" }}>
                                <figure class="figure" style = {{ backgroundColor: "black", borderRadius: "8px" }}>
                                    <img alt = "Setting" src = { require('../../IMG/임시프사.png') } style = {{ width: "100%", marginLeft: "0px", height: "29vh", objectFit: "contain", backgroundColor: "gray" }} />
                                    <figcaption style = {{ color: "white", marginTop: "13vh", height: "5vh", paddingLeft: "15px" }}>
                                        <h4>아이린</h4>
                                    </figcaption>
                                    <figcaption style = {{ color: "white", marginTop: "16vh", height: "25vh", paddingLeft: "15px" }}>
                                        <label>노래, 춤을 좋아해요</label>
                                    </figcaption>
                                    <figcaption style = {{ color: "white", marginTop: "25vh", paddingTop: "0", paddingLeft: "15px" }}>
                                        <div className = "row" style = {{ fontSize: "30px", marginTop: "0", padding: "0" }}>
                                            <div className = "col-1">♡</div>
                                            <div className = "col-1">...</div>
                                        </div>
                                    </figcaption>
                                </figure>
                            </section>
                        </div>
                        <div className = "col-md-3 col-sm-3">
                            <section class="section-6" style = {{ borderBottom: "none", marginBottom: "2vh", width: "20vw" }}>
                                <figure class="figure" style = {{ backgroundColor: "black", borderRadius: "8px" }}>
                                    <img alt = "Setting" src = { require('../../IMG/임시프사2.jpg') } style = {{ width: "100%", marginLeft: "0px", height: "29vh", objectFit: "contain", backgroundColor: "gray" }} />
                                    <figcaption style = {{ color: "white", marginTop: "13vh", height: "5vh", paddingLeft: "15px" }}>
                                        <h4>윈터</h4>
                                    </figcaption>
                                    <figcaption style = {{ color: "white", marginTop: "16vh", height: "25vh", paddingLeft: "15px" }}>
                                        <label>셀카 찍는 것을 좋아해요</label>
                                        <label>여행가는 것을 좋아해요</label>
                                        <label>MBTI를 굉장히 싫어해요</label>
                                        <label>자신감 없는 사람 싫어해요</label>
                                    </figcaption>
                                    <figcaption style = {{ color: "white", marginTop: "25vh", paddingTop: "0", paddingLeft: "15px" }}>
                                        <div className = "row" style = {{ fontSize: "30px", marginTop: "0", padding: "0" }}>
                                            <div className = "col-1">♥</div>
                                            <div className = "col-1">...</div>
                                        </div>
                                    </figcaption>
                                </figure>
                            </section>
                        </div>
                        <div className = "col-md-3 col-sm-3">
                            <section class="section-6" style = {{ borderBottom: "none", marginBottom: "2vh", width: "20vw" }}>
                                <figure class="figure" style = {{ backgroundColor: "black", borderRadius: "8px" }}>
                                    <img alt = "Setting" src = { require('../../IMG/임시프사3.jpg') } style = {{ width: "100%", marginLeft: "0px", height: "29vh", objectFit: "contain", backgroundColor: "gray" }} />
                                    <figcaption style = {{ color: "white", marginTop: "13vh", height: "5vh", paddingLeft: "15px" }}>
                                        <h4>윈터</h4>
                                    </figcaption>
                                    <figcaption style = {{ color: "white", marginTop: "16vh", height: "25vh", paddingLeft: "15px" }}>
                                        <label>노래, 춤을 좋아해요</label>
                                    </figcaption>
                                    <figcaption style = {{ color: "white", marginTop: "25vh", paddingTop: "0", paddingLeft: "15px" }}>
                                        <div className = "row" style = {{ fontSize: "30px", marginTop: "0", padding: "0" }}>
                                            <div className = "col-1">♥</div>
                                            <div className = "col-1">...</div>
                                        </div>
                                    </figcaption>
                                </figure>
                            </section>
                        </div>
                    </div>
                </div>
            }
            <Menu />
        </div>
    );
}
export default Mate;