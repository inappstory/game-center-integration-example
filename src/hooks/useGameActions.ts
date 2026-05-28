import GameCenterApi from "@inappstory/game-center-api";

/**
 * Small wrappers around GameCenterApi methods used by demo buttons.
 * In a real game these calls usually live near the gameplay action that triggers them.
 */
export const useGameActions = () => {
    // Open an external URL and close GameReader before leaving the game context.
    const openUrl = () => GameCenterApi.openUrl({ url: "https://google.com", closeGameReader: true });

    // Explicitly close GameReader from game UI.
    const closeGame = () => GameCenterApi.closeGameReader();

    // Send a custom analytics/gameplay event to the SDK.
    const emitGameEvent = () => GameCenterApi.eventGame({ name: "customGameEvent", index: 0 });

    // Ask SDK to reload the current game instance, for example after a critical error.
    const reloadGame = () => GameCenterApi.reloadGameReader();

    const shareUrl = async () => {
        // Delegate sharing a link to the host SDK/native layer.
        GameCenterApi.shareUrl("https://example.com");
    };

    const shareText = () => {
        // Delegate sharing text content to the host SDK/native layer.
        GameCenterApi.shareText("This is a test text that contains a link to https://example.com");
    };

    return { openUrl, closeGame, emitGameEvent, reloadGame, shareUrl, shareText };
};
