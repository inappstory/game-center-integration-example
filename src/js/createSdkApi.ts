import GameCenterApi from "@inappstory/game-center-api";

const gameShouldForeground = () => {
    // splash animation finished, now we can start bg music and etc

    setTimeout(() => {
        // Wait for render complete - then remove native loader screen
        GameCenterApi.gameShouldForegroundCallback();
    }, 50);
};

export const createSdkApi = (mounted: () => Promise<void>) => {
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
