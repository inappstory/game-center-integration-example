import GameCenterApi, { GameLaunchConfig } from "@inappstory/game-center-api";
import { textPlaceholders, imagePlaceholders } from "./placeholders";
import { variables } from "./variables";

export const gameLaunchConfig: GameLaunchConfig = {
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
        placeholders: [...textPlaceholders, ...imagePlaceholders],
        safeAreaInsets: {
            bottom: 16,
            left: 0,
            right: 0,
            top: 0,
        },
        screenOrientation: GameCenterApi.ScreenOrientation.PORTRAIT,
        sdkVersion: "1.16.0",
        sessionId: "A2glAAAAAAAAAQAAAKTI2WQCCQgAAAAamGs7wP4RcYiEwdMi19Z7aE68fT6QW5S18Oe812f6pw",
        userAgent: "InAppStorySDK/750 Dalvik/2.1.0 (Linux; U; Android 11; XQ-AT51 Build/58.1.A.5.530) Application/258 (com.inappstory.android 3.1.0)",
        userId: "",
        widescreen: false,
        dir: "ltr",
        variables,
    },
    authUrl: "",
    payload: "",
    localization: {
        lang: "",
        resources: null,
    },
};
