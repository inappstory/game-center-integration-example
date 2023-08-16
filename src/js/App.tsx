import React, { useEffect } from "react";
import styled from "styled-components";
import {GlobalStyles} from "../styles/global";


type AppProps = { backgroundImageSrc: string, renderedCb: () => void };
export const App = ({backgroundImageSrc, renderedCb}: AppProps) => {
    useEffect(() => {
        renderedCb();
    });
    return <><GlobalStyles /><Wrapper><BackgroundImage src={backgroundImageSrc}/></Wrapper></>;
};

const Wrapper = styled.div`
    height: 100%;
    width: 100%;
    display: flex;

    position: relative;
`;

const BackgroundImage = styled.img`
    position: absolute;
    pointer-events: none;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    display: block;
    width: 100%;
    height: 100%;
    object-fit: cover;
    z-index: 1;
`;
