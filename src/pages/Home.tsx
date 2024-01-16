import {useNavigate} from "react-router-dom";
import {MuiLayout} from "../components/MuiLayout";
import React from "react";

export const Home = () => {
    const navigate = useNavigate()
    return(
        <>
            <MuiLayout/>
        </>
    )
}