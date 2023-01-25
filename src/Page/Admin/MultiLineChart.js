import React, { useEffect, useState } from 'react';
import { CartesianGrid, Legend, Line, LineChart, Tooltip, XAxis, YAxis } from 'recharts';
import { call } from '../../Service/APIService';

function MultiLineChart(chartData) {
    // name: "Page G", => 차트 기준
    // uv: 3490, => data1
    // pv: 4300, => data2
    // amt: 2100
    // type : 차트 타입
    // dataKey : 반복해서 찍을 데이터명
    // stroke : 차트 색상
    // activeDot : 차트 꼭지점 크기
    // const [ data, setData ] = useState([]);    
    const data = [
        {
          name: 'Page A', uv: 4000, pv: 2400, amt: 2400,
        },
        {
          name: 'Page B', uv: 3000, pv: 1398, amt: 2210,
        },
        {
          name: 'Page C', uv: 2000, pv: 9800, amt: 2290,
        },
        {
          name: 'Page D', uv: 2780, pv: 3908, amt: 2000,
        },
        {
          name: 'Page E', uv: 1890, pv: 4800, amt: 2181,
        },
        {
          name: 'Page F', uv: 2390, pv: 3800, amt: 2500,
        },
        {
          name: 'Page G', uv: 3490, pv: 4300, amt: 2100,
        },
      ];

    return(
        // <LineChart data = { chartData } >
        //     <XAxis dataKey = { chartData.chartdate } />
        //     <YAxis />
        //     <Line type = "monotone" dataKey = { chartData.chartqna } stroke = "#f00505" activeDot = {{ r : 8 }} />
        // </LineChart>
        
        <LineChart
            width = { window.innerWidth <= 767 ? 390 : 1100 }
            height = { window.innerWidth <= 767 ? 200 : 250 }
            data = { chartData.data }
            style = {{ marginLeft: "0", paddingLeft: "0", marginRight: "1.5vw" }}
      >
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey = "chartdate" />
        <YAxis />
        <Tooltip />
        <Legend />
        <Line type="monotone" dataKey = "chartqna"  stroke="#8884d8" activeDot={{ r : 8 }} />
        <Line type="monotone" dataKey = "chartreport"  stroke="#dc143c" activeDot={{ r : 8 }} />
        <Line type="monotone" dataKey = "charttendinous" stroke="#82ca9d" activeDot={{ r : 8 }} />
      </LineChart>
    );
}
export default MultiLineChart;