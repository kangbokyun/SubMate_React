import React from 'react';
import { useEffect } from 'react';
import { useState } from 'react';

function Statistics(props) {
    const [ writedBoard, setWritedBoard ] = useState([]);
    const { WritedBoard } = props;
    useEffect(() => {
        setWritedBoard( WritedBoard );
        console.log("props : ", WritedBoard);
    });

    return(
        <div className = { window.innerWidth <= 767 ? "" : "container" } style = {{ height: "55vh", overflowY: "auto" }}>
            <div className = "row" style = {{ width: "100%", marginTop: "1.5vh", height: "30vh", marginLeft: "0.1vw" }}>
                <div className = "col-6 col-md-3">
                    <h4>내가 쓴 게시글</h4>
                </div>
                <div className = "col-6 col-md-3">
                    <h5>개수　<span style = {{ color: "orange" }}>{writedBoard.length}</span> 개</h5>
                </div>
                <div className = "col-12 col-md-12" style = {{ height: "100%", overflowY: "auto", width: "100%" }}>
                    <table className = "table-striped" style = {{ width: "100%" }}>
                        <tbody style = {{  }}>
                            <tr className = "row" style = {{ width: "100%", borderBottom: "solid 1px #e4e4e4" }}>
                                <td className = "col-2 col-md-2" style = {{ textAlign: "center" }}>번호</td>
                                <td className = "col-6 col-md-6" style = {{ textAlign: "center" }}>제목</td>
                                <td className = "col-4 col-md-4" style = {{ textAlign: "center" }}>작성일</td>
                            </tr>    
                            { writedBoard.map(list => 
                                <tr key = { list.wno } className = "row" style = {{ width: "100%" }}>
                                    <td className = "col-2 col-md-2" style = {{ textAlign: "center" }}>{list.wno}</td>
                                    <td className = "col-6 col-md-6" style = {{ textAlign: "center" }}>{list.wname}</td>
                                    <td className = "col-4 col-md-4" style = {{ textAlign: "center" }}>{list.wdate}</td>
                                </tr>    
                            ) }
                        </tbody>
                    </table>
                </div>
            </div>
            <div className = "row" style = {{ width: "100%", marginTop: "1.5vh" }}>
                <div className = "col-6 col-md-3">
                    <h4>내가 쓴 댓글</h4>
                </div>
                <div className = "col-6 col-md-3">
                    <h5>개수</h5>
                </div>
                <div className = "col-12 col-md-12">
                    <table className = "table-striped"></table>
                </div>
            </div>
            <div className = "row" style = {{ width: "100%", marginTop: "1.5vh" }}>
                <div className = "col-12">
                    <h4>받은 좋아요</h4>
                </div>
                <div className = "col-12">
                    <table className = "table">
                        <thead>
                            <tr className = "row" style = {{ textAlign: "center" }}>
                                <td className = "col-4">메이트</td>
                                <td className = "col-4">게시글</td>
                                <td className = "col-4">댓글</td>
                            </tr>
                        </thead>
                    </table>
                </div>
            </div>
        </div>
    )
}
export default Statistics;