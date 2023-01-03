import React, { useEffect, useState } from 'react';
import { Line, LineChart, XAxis } from 'recharts';
import { call } from '../../Service/APIService';

function MultiLineChart() {
    useEffect(() => {
        call("/Admin/MainChart", "POST", null)
        .then((res) => {
            if(res) {
                console.log("/Admin/MainChart/Res : ", res);
            }
        });
    });
    // name: "Page G", => 차트 기준
    // uv: 3490, => data1
    // pv: 4300, => data2
    // amt: 2100
    // type : 차트 타입
    // dataKey : 반복해서 찍을 데이터명
    // stroke : 차트 색상
    // activeDot : 차트 꼭지점 크기
    const [ data, setData ] = useState([]);    
    return(
        <LineChart data = { data } >
            <XAxis dataKey = "name" />
            <Line type = "monotone" dataKey = "datakey" stroke = "#color" activeDot = {{ r : 8 }} />
        </LineChart>
    );
}
export default MultiLineChart;