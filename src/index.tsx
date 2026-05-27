import React from "react";
// https://github.com/zloirock/core-js
import "core-js/actual";
import "regenerator-runtime/runtime.js";
import { devGameLaunchConfig } from "./config";
import { createSdkApi } from "./createSdkApi";
import { createRoot } from "react-dom/client";
import GameCenterApi from "@inappstory/game-center-api";
import { onAllMediaLoaded } from "./helpers";
import { App } from "./App";
import "./styles/app.scss";

const mounted = async () => {
    const bgImage = GameCenterApi.getDynamicResourceAsset("backgroundImage", require("./assets/background.jpg"));

    const cb = () => {
        GameCenterApi.gameLoadedSdkCallback();
    };

    const rootElement = document.getElementById("root");
    const root = createRoot(rootElement!);
    root.render(<App backgroundImageSrc={bgImage} renderedCb={() => onAllMediaLoaded(rootElement!, cb)} />);
};

createSdkApi(mounted);

// Dev only
if (process.env.NODE_ENV === "development") {
    try {
        window.initGame(devGameLaunchConfig);
    } catch (err) {
        console.error(err);
    }
}
