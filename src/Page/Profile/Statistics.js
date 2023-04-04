import React from 'react';
import { useEffect } from 'react';
import { useState } from 'react';

function Statistics(props) {
    const [ WritedBoard ] = props;
    useEffect(() => {
        // const [ WritedBoard ] = props;
        console.log("WritedBoard : ", props);
        console.log("props.props : ", props.WritedBoard);
    });


    return(
        <div className = "row" style = {{ width: "100%", marginTop: "1.5vh" }}>
            <div className = "col-6 col-md-3">
                <h4>내가 쓴 게시글</h4>
                <table className = "" style = {{ border: "solid 1px black", width: "100%" }}>
                    <tbody>
                        {/* { props.props.data.map((list) => {
                            <tr className = "row" style = {{ width: "100%" }}>
                                <td className = "col-2 col-md-3">{list.wno}</td>
                            </tr>

                        }) } */}
                    </tbody>
                </table>
            </div>
            <div className = "col-6 col-md-3">
                <h5>개수</h5>
            </div>
            <div className = "col-6 col-md-3">
                <h4>내가 쓴 댓글</h4>
            </div>
            <div className = "col-6 col-md-3">
                <h5>개수</h5>
            </div>
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
    )
}
export default Statistics;