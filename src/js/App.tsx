import React, { useEffect } from "react";
import styled from "styled-components";
import {GlobalStyles} from "../styles/global";
import * as C from "../styles/components";

import GameCenterApi, {type Placeholder} from "@inappstory/game-center-api";

type AppProps = { backgroundImageSrc: string, renderedCb: () => void };
export const App = ({backgroundImageSrc, renderedCb}: AppProps) => {
    useEffect(() => {
        renderedCb();
    }, []);

    const openUrl = () => GameCenterApi.openUrl({url: "https://google.com", closeGameReader: true});
    const closeGame = () => GameCenterApi.closeGameReader();

    console.log("GameCenterApi.gameLaunchConfig.clientConfig.placeholders", GameCenterApi.gameLaunchConfig.clientConfig.placeholders);

    return <><GlobalStyles />
        <Wrapper>
            <BackgroundImage src={backgroundImageSrc}/>
            <C.ScrollView>
                <C.Divider/>
                <Placeholders models={Array.isArray(GameCenterApi.gameLaunchConfig.clientConfig.placeholders) ? GameCenterApi.gameLaunchConfig.clientConfig.placeholders : []}/>
                <C.Divider/>
                <Button onClick={openUrl}>Open url</Button>
                <C.Divider/>
                <Button onClick={closeGame}>Close game</Button>
                <C.Divider/>
            </C.ScrollView>
        </Wrapper>
    </>;
};



const Wrapper = styled.div`
    height: 100%;
    width: 100%;
    display: flex;
    flex-direction: column;
    position: relative;
    padding: 0 20px;
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
    z-index: -1;
`;


const Placeholders = ({models}: {models: Array<Placeholder>}) => {

    return <div>
        <C.Title1 color="black" width="100%" size={24}>Placeholders</C.Title1>

        {models.map((placeholder, index) => {
            return <C.Flex key={placeholder.name} direction="row" justifyContent="start">
                <C.Title2 color="black" margin={[0, 0, 0, 20]} size={16}>{placeholder.name}</C.Title2>
                <C.Title2 color="black" margin={[0, 0, 0, 20]} size={16}>{placeholder.type}</C.Title2>
                {placeholder.type === "text" ? <C.Text1 size={16} margin={[0, 0, 0, 20]} color="black">{placeholder.value}</C.Text1> : <div><C.DividerH/><Avatar src={placeholder.value}/></div>}
                <C.Divider/>
            </C.Flex>
        })}


    </div>
}

 const Button = styled.button`
    display: inline-flex;
    align-items: center;
    justify-content: center;
    padding: 5px 15px;
    //border: none;
    font-weight: 400;
    user-select: none;
    white-space: nowrap;
    outline: transparent solid 2px;
    outline-offset: 2px;
    cursor: pointer;

     :active {
         transform: scale(0.92);
     }

     border: 2px solid #3d1b0f;
     border-radius: 75px;
     font-size: 32px;
     background-color: #fcc5a9;
     color: #3c1c13;
 `;

const Avatar = styled.img`
    display: flex;
    height: 120px;
    min-width: 120px;
    margin: 0 auto;
    padding: 4px;
    border-radius: 16px;
`;
