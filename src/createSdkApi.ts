import GameCenterApi from "@inappstory/game-center-api";

/**
 * Registers all lifecycle hooks used by the InAppStory SDK to communicate
 * with the game through the `postMessage` bridge.
 */
export const createSdkApi = (mounted: () => Promise<void>) => {
    GameCenterApi.createSdkApi({
        // SDK calls this after initialization; React mounting starts from here.
        mounted,
        beforeUnmount: () => {
            // Clear timers, stop sounds, and remove subscriptions here if the game creates them.
            console.log("beforeUnmount");
        },
        onPause: () => {
            // Pause gameplay or mute sounds when the game loses focus.
            console.log("onPause (loose focus)");
        },
        onResume: () => {
            // Resume paused gameplay when focus returns to the GameReader.
            console.log("onResume (return focus)");
        },
        onBackGesture: () => {
            // Android hardware back button or back gesture can be handled here.
            console.log("Android back button triggered");
        },
        onSdkCloseGameReaderIntent: () => {
            // For example, SDK sends this intent after a backdrop click on Tablet/Desktop.
            GameCenterApi.closeGameReader();
        },
        // Transform or filter placeholders received from SDK before the game consumes them.
        filterPlaceholders: placeholders => placeholders,
        gameShouldForeground: () => {
            // Called after the SDK splash animation is finished and the GameReader is ready to show the game foreground UI.
            // This is a good place to start music, animations, or other visible gameplay.

            setTimeout(() => {
                // Notify SDK that the game can be shown and the loader can be removed.
                GameCenterApi.gameShouldForegroundCallback();
            }, 50);
        },
    });
};
