// https://github.com/zloirock/core-js
import "core-js/actual";
import "regenerator-runtime/runtime.js";

import { App } from "./App";
import { onAllMediaLoaded } from "../helpers/media";

import GameCenterApi, { PlaceholderType } from "@inappstory/game-center-api";
import { createRoot } from "react-dom/client";

import React from "react";

const gameShouldForeground = () => {
    // splash animation finished, now we can start bg music and etc

    setTimeout(() => {
        // Wait for render complete - then remove native loader screen
        GameCenterApi.gameShouldForegroundCallback();
    }, 50);
};

const main = () => {
    const mount = () => {
        const mounted = () => {
            const bgImage = GameCenterApi.getDynamicResourceAsset("backgroundImage", require("./../../assets/background.jpg"));

            const cb = () => {
                GameCenterApi.gameLoadedSdkCallback();
            };

            const rootElement = document.getElementById("root");
            const root = createRoot(rootElement!);
            root.render(<App backgroundImageSrc={bgImage} renderedCb={() => onAllMediaLoaded(rootElement!, cb)} />);
        };

        GameCenterApi.createSdkApi({
            mounted,
            beforeUnmount: () => {
                console.log("beforeUnmount");
            },
            onPause: () => {
                console.log("onPause (loose focus)");
            },
            onResume: () => {
                console.log("onResume (return focus)");
            },
            onBackGesture: () => {
                console.log("Android back button triggered");
            },
            onSdkCloseGameReaderIntent: () => {
                // for instance - click on GameReader backdrop on Tablet or Desktop
                GameCenterApi.closeGameReader();
            },
            filterPlaceholders: placeholders => placeholders,
            gameShouldForeground,
        });
    };

    mount();

    // if dev only
    if (process.env.NODE_ENV === "development") {
        window.onload = () =>
            typeof window.initGame === "function" &&
            window.initGame({
                gameInstanceId: 35,
                gameResources: {
                    fonts: {},
                    assets: {
                        backgroundImage: "https://cs.test.inappstory.com/np/file/i2/l8/5x/jqxtjth04io7ritifom6hgbtxi.webp?k=AQAAAAAAAAAC",
                    },
                },
                verbose: true,
                projectSlug: "test",
                demoMode: false,
                projectEnv: "test",
                gameSlug: "integration-example",
                gameDomain: "",
                gameVersion: "1.0.0",
                clientConfig: {
                    apiBaseUrl: "https://api.test.inappstory.ru/",
                    apiKey: "test-key",
                    appPackageId: "com.inappstory.android",
                    deviceId: "293f420fc39908d1",
                    fullScreen: false,
                    lang: "ru-RU",
                    placeholders: [
                        {
                            name: "sadsad",
                            type: PlaceholderType.TEXT,
                            value: "2222222222222222",
                        },
                        {
                            name: "oooooooooooo",
                            type: PlaceholderType.TEXT,
                            value: "ooooooooooo",
                        },
                        {
                            name: "rrrrrrrrrrr",
                            type: PlaceholderType.TEXT,
                            value: "rrrrrrrrrrrrr",
                        },
                        {
                            name: "zvukomania_username",
                            type: PlaceholderType.TEXT,
                            value: "Default username",
                        },
                        {
                            name: "pppppppppp",
                            type: PlaceholderType.TEXT,
                            value: "pppppppppppp",
                        },
                        {
                            name: "tttttttttt",
                            type: PlaceholderType.TEXT,
                            value: "ttttttttttttt",
                        },
                        {
                            name: "iiiiiiiiiiiiiiii",
                            type: PlaceholderType.TEXT,
                            value: "iiiiiiiiiiiiiiiiii",
                        },
                        {
                            name: "qqqq",
                            type: PlaceholderType.TEXT,
                            value: "qqqqqq",
                        },
                        {
                            name: "uuuuuuuuuuuuu",
                            type: PlaceholderType.TEXT,
                            value: "uuuuuuuuuuuuuuuu",
                        },
                        {
                            name: "wwwwww",
                            type: PlaceholderType.TEXT,
                            value: "wwwwwwwwwww",
                        },
                        {
                            name: "aaaaaaaaaaaaa",
                            type: PlaceholderType.TEXT,
                            value: "aaaaaaaaaaaaaaaa",
                        },
                        {
                            name: "eeeeee",
                            type: PlaceholderType.TEXT,
                            value: "eeeeeeeeeeee",
                        },
                        {
                            name: "username",
                            type: PlaceholderType.TEXT,
                            value: "default username'000",
                        },
                        {
                            name: "zvukomania_avatar",
                            type: PlaceholderType.IMAGE,
                            value: "https://i1.sndcdn.com/avatars-000102655488-sr66dh-t500x500.jpg",
                        },
                        {
                            name: "avatar",
                            type: PlaceholderType.IMAGE,
                            value: "https://i1.sndcdn.com/avatars-000102655488-sr66dh-t500x500.jpg",
                        },
                        {
                            name: "img1",
                            type: PlaceholderType.IMAGE,
                            value: "https://snob.ru/indoc/original_images/8f4/glavnai",
                        },
                    ],
                    safeAreaInsets: {
                        bottom: 16,
                        left: 0,
                        right: 0,
                        top: 0,
                    },
                    screenOrientation: GameCenterApi.ScreenOrientation.PORTRAIT,
                    sdkVersion: "1.16.0",
                    sessionId: "A2glAAAAAAAAAQAAAKTI2WQCCQgAAAAamGs7wP4RcYiEwdMi19Z7aE68fT6QW5S18Oe812f6pw",
                    userAgent:
                        "InAppStorySDK/750 Dalvik/2.1.0 (Linux; U; Android 11; XQ-AT51 Build/58.1.A.5.530) Application/258 (com.inappstory.android 3.1.0)",
                    userId: "",
                },
            });
    }
};

main();
