import React from 'react';
import { ClockLoader } from "react-spinners/ClockLoader";

export const Loding = ({ isLoding }) => {
    // 여 : #fdc6d5
    // 남 : #a7c2f7
    return(
        <ClockLoader
            color = "#a7c2f7"
            loading = { isLoding }
        />
    );
};