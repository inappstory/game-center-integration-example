import GameCenterApi from "@inappstory/game-center-api";

export const useGameActions = () => {
    const openUrl = () => GameCenterApi.openUrl({ url: "https://google.com", closeGameReader: true });

    const closeGame = () => GameCenterApi.closeGameReader();

    const emitGameEvent = () => GameCenterApi.eventGame({ name: "customGameEvent", index: 0 });

    const reloadGame = () => GameCenterApi.reloadGameReader();

    const shareUrl = async () => {
        GameCenterApi.shareUrl("https://example.com");
    };

    const shareText = () => {
        GameCenterApi.shareText("This is a test text that contains a link to https://example.com");
    };

    return { openUrl, closeGame, emitGameEvent, reloadGame, shareUrl, shareText };
};
