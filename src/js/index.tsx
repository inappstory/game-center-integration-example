// https://github.com/zloirock/core-js
import "core-js/actual";
import "regenerator-runtime/runtime.js";

import {App} from "./App";
import {onAllMediaLoaded} from "../helpers/media";

import {
    createSdkApi,
    gameLaunchConfig,
    gameLoadedSdkCallback,
    gameLocalData,
    isWeb,
    isIos,
    isAndroid,
    getDynamicResourceAsset
} from "@inappstory/game-center-api";
import React from "react";
import { createRoot } from "react-dom/client";

const main = () => {

    const mount = () => {

        const mounted = () => {
            const bgImage = getDynamicResourceAsset("backgroundImage", require("./../../assets/background.jpg"));

            const cb = () => {
                gameLoadedSdkCallback();
            };

            const rootElement = document.getElementById("root");
            const root = createRoot(rootElement!);
            root.render(<App backgroundImageSrc={bgImage} renderedCb={() => onAllMediaLoaded(rootElement!, cb)}/>);

        };

        createSdkApi({
            mounted,
            // beforeUnmount,
            // onPause: () => {},
            // onResume: () => {},
            // onBackGesture: () => {},
        });
    };

    mount();

    // if dev only
    if (process.env.NODE_ENV === "development") {
        window.onload = () => typeof window.initGame === "function" &&
            window.initGame({
                "gameInstanceId": 35,
                "gameResources": {
                    "assets": {
                        //@ts-ignore
                        "backgroundImage": "https://cs.test.inappstory.com/np/file/i2/l8/5x/jqxtjth04io7ritifom6hgbtxi.webp?k=AQAAAAAAAAAC"
                    }
                },
                "verbose": true,
                "projectSlug": "test",
                "demoMode": false,
                "projectEnv": "test",
                "gameSlug": "integration-example",
                "gameVersion": "1.0.0",
                "clientConfig": {
                    "apiBaseUrl": "https://api.test.inappstory.ru/",
                    "apiKey": "test-key",
                    "appPackageId": "com.inappstory.android",
                    "deviceId": "293f420fc39908d1",
                    "fullScreen": false,
                    "lang": "ru-RU",
                    "placeholders": [],
                    "safeAreaInsets": {
                        "bottom": 16,
                        "left": 0,
                        "right": 0,
                        "top": 0
                    },
                    "screenOrientation": "portrait",
                    "sdkVersion": "1.16.0",
                    "sessionId": "A2glAAAAAAAAAQAAAKTI2WQCCQgAAAAamGs7wP4RcYiEwdMi19Z7aE68fT6QW5S18Oe812f6pw",
                    "userAgent": "InAppStorySDK/750 Dalvik/2.1.0 (Linux; U; Android 11; XQ-AT51 Build/58.1.A.5.530) Application/258 (com.inappstory.android 3.1.0)"
                },

            });
    }


};

main();


