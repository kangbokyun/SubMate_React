import React from 'react';
import { useEffect } from 'react';
import { useState } from 'react';

function Statistics(props) {
    const [ writedBoard, setWritedBoard ] = useState([]);
    const [ writedReply, setWritedReply ] = useState([]);
    const [ takeHeart, setTakeHeart ] = useState({});
    
    const { WritedBoard, WritedReply, TakeHeart } = props;

    useEffect(() => {
        setWritedBoard( WritedBoard );
        setWritedReply( WritedReply );
        setTakeHeart( TakeHeart );
        console.log("props : ", props);
    });

    return(
        <div className = { window.innerWidth <= 767 ? "" : "container" } style = {{ height: "100%" }}>
            <div className = "row" style = {{ width: "100%", marginTop: "1.5vh", marginLeft: "0.1vw" }}>
                <div className = "col-6 col-md-6">
                    <h4>내가 쓴 게시글</h4>
                </div>
                <div className = "col-6 col-md-6">
                    <h5>개수　<span style = {{ color: "orange" }}>{ writedBoard.length }</span> 개</h5>
                </div>
                <div className = "col-12 col-md-12" style = {{ width: "100%", height: "25vh", overflowY: "auto" }}>
                    <table className = "table-striped" style = {{ width: "100%" }}>
                        <thead style = {{ position: "sticky", top: "0", backgroundColor: "white" }}>
                            <tr className = "row" style = {{ width: "100%", borderBottom: "solid 1px #e4e4e4" }}>
                                <td className = "col-2 col-md-2" style = {{ textAlign: "center" }}>번호</td>
                                <td className = "col-6 col-md-6" style = {{ textAlign: "center" }}>제목</td>
                                <td className = "col-4 col-md-4" style = {{ textAlign: "center" }}>작성일</td>
                            </tr>    
                        </thead>
                        <tbody style = {{  }}>
                            { writedBoard.map(list => 
                                <tr key = { list.wno } className = "row" style = {{ width: "100%" }}>
                                    <td className = "col-2 col-md-2" style = {{ textAlign: "center", fontSize: window.innerWidth <= 767 ? "0.8rem" : "1.2rem" }}>{ list.wno }</td>
                                    <td className = "col-6 col-md-6" style = {{ textAlign: "center", fontSize: window.innerWidth <= 767 ? "0.8rem" : "1.2rem" }}>{ list.wname }</td>
                                    <td className = "col-4 col-md-4" style = {{ textAlign: "center", fontSize: window.innerWidth <= 767 ? "0.8rem" : "1.2rem" }}>{ list.wdate.substring(2, 10).replaceAll("-", ". ") }</td>
                                </tr>    
                            ) }
                        </tbody>
                    </table>
                </div>
            </div>
            <div className = "row" style = {{ width: "100%", marginTop: "3vh", marginLeft: "0.1vw" }}>
                <div className = "col-6 col-md-6">
                    <h4>내가 쓴 댓글</h4>
                </div>
                <div className = "col-6 col-md-6">
                <h5>개수　<span style = {{ color: "orange" }}>{ writedReply.length }</span> 개</h5>
                </div>
                <div className = "col-12 col-md-12">
                    <table className = "table-striped" style = {{ width: "100%", height: "25vh", overflowY: "auto" }}>
                        <thead>
                            <tr className = "row" style = {{ width: "100%", position: "stiky", top: "0" }}>
                                <td className = "col-2 col-md-2" style = {{ textAlign: "center", fontSize: window.innerWidth <= 767 ? "0.8rem" : "1.2rem" }}>글번호</td>
                                <td className = "col-6 col-md-6" style = {{ textAlign: "center", fontSize: window.innerWidth <= 767 ? "0.8rem" : "1.2rem" }}>댓글내용</td>
                                <td className = "col-4 col-md-4" style = {{ textAlign: "center", fontSize: window.innerWidth <= 767 ? "0.8rem" : "1.2rem" }}>작성일</td>
                            </tr>
                        </thead>
                        <tbody>
                            { writedReply.map((list) => 
                                <tr className = "row" style = {{ width: "100%" }}>
                                    <td className = "col-2 col-md-2" style = {{ textAlign: "center", fontSize: window.innerWidth <= 767 ? "0.8rem" : "1.2rem" }}>{ list.rno }</td>
                                    <td className = "col-6 col-md-6" style = {{ textAlign: "center", fontSize: window.innerWidth <= 767 ? "0.8rem" : "1.2rem" }}>{ list.rcontents }</td>
                                    <td className = "col-4 col-md-4" style = {{ textAlign: "center", fontSize: window.innerWidth <= 767 ? "0.8rem" : "1.2rem" }}>{ list.wdate.substring(2, 10).replaceAll("-", ". ") }</td>
                                </tr>
                            ) }
                        </tbody>
                    </table>
                </div>
            </div>
            <div className = "row" style = {{ width: "100%", marginTop: "3vh", marginLeft: "0.1vw" }}>
                <div className = "col-12">
                    <h4>받은 좋아요</h4>
                </div>
                <div className = "col-12">
                    <table className = "table">
                        <thead>
                            <tr className = "row" style = {{ textAlign: "center" }}>
                                <td className = "col-3">메이트</td>
                                <td className = "col-3">게시글</td>
                                <td className = "col-3">댓글</td>
                                <td className = "col-3">대댓글</td>
                            </tr>
                            <tr className = "row" style = {{ textAlign: "center" }}>
                                <td className = "col-3">{ takeHeart.htypem }개</td>
                                <td className = "col-3">{ takeHeart.htypeb }개</td>
                                <td className = "col-3">{ takeHeart.htyper }개</td>
                                <td className = "col-3">{ takeHeart.htyperr }개</td>
                            </tr>
                        </thead>
                    </table>
                </div>
            </div>
        </div>
    )
}
export default Statistics;