import React from 'react';

function Statistics() {
    return(
        <div className = "row" style = {{ width: "100%", marginTop: "1.5vh" }}>
            <div className = "col-6">
                <h4>내가 쓴 게시글</h4>
            </div>
            <div className = "col-6">
                <h5>개수</h5>
            </div>
            <div className = "col-6">
                <h4>내가 쓴 댓글</h4>
            </div>
            <div className = "col-6">
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