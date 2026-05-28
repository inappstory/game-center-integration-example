# GameCenter API Integration Example

Example integration of a custom HTML5/React game with the InAppStory platform using `GameCenterApi`.

---

## Overview

This repository demonstrates how to integrate a custom game with the InAppStory Game Center platform.

To build your own game integration, you need to connect and use `GameCenterApi`, which provides communication between the game and the InAppStory SDK through the `postMessage` API.

---

# Project Structure

```text
src/
├── assets/         # Game assets: images, audio, fonts, etc.
├── components/     # UI components
├── config/         # Development configuration and stub data
├── helpers/        # Utility functions and helpers
├── hooks/          # React hooks
├── styles/         # Global styles
├── App.tsx         # Root application component
├── createSdkApi.ts # Wrapper around GameCenterApi.createSdkApi
└── index.tsx       # Application entry point
```

> Note: The project structure is provided as an example and can be adjusted according to your game architecture.

## `/assets`

Contains all game assets:

* images
* audio files
* fonts
* other static resources

---

## `/components`

Contains reusable UI components for the game.

---

## `/config`

Contains:

* development `GameLaunchConfig`
* stub data for:

  * game variables
  * text placeholders
  * image placeholders

---

## `/helpers`

Contains utility functions and helper modules.

---

## `/hooks`

Contains custom React hooks.

Includes the `useGameActions` hook — an abstraction layer over the core `GameCenterApi` methods.

---

## `/styles`

Contains global application styles.

---

# Getting Started

## Development

Run the local development server:

```bash
npm run dev
```

This starts a local environment for game development and debugging.

---

## Production Build

Build the production bundle:

```bash
npm run build
```

The generated files will be placed in:

```text
/build
```

---

## Bundle Analyzer

Analyze bundle size and build output:

```bash
npm run analyze
```

---

# Development Environment

During local development, the project uses `window.initGame` with a predefined development configuration implementing the `GameLaunchConfig` interface.

Development config location:

```text
src/config/gameLaunchConfig.dev.ts
```

## Important

> Do **not** use `window.initGame` in production builds. 
> In production, the configuration is provided directly by the InAppStory SDK through the `postMessage` API.

# Production Build 

## Build structure

The project uses [Webpack](https://webpack.js.org/) as the build tool.

```text
/build
├── css/        # CSS files
├── js/         # Compiled and obfuscated JavaScript
└── index.html  # Application entry point
```

---

## Build Packaging

For iOS SDK and Android SDK integration, the `/build` directory should be archived into a ZIP file with the following format:

```text
game-center-example_v1.1.0.zip
```

Archive naming convention:

```text
{name}_{version}.zip
```

Values for `name` and `version` are taken from `package.json`.

---

## Important Requirements

The game bundle structure is strictly defined.

Do not modify:

* directory structure
* file names
* entry point (`index.html`)

These requirements are necessary for proper compatibility with the InAppStory SDK.

---

# GameCenter API

## `createSdkApi(config: GameLaunchConfig): void`

Creates an `SdkAPI` instance used for communication between the game and the SDK through the `postMessage` API.

### Example

```ts
/**
 * Initialize communication between the game and InAppStory SDK.
 * All lifecycle hooks and SDK events are registered here.
 */
GameCenterApi.createSdkApi({
    /**
     * Called after SDK initialization is completed.
     *
     * Recommended place to:
     * - mount React application
     * - initialize game state
     * - preload assets
     */
    mounted: () => {
        // Mount your React application here
        renderReactApp();
    },

    /**
     * Called right before the game is destroyed/unmounted.
     *
     * Use this hook to:
     * - clear timers
     * - stop music/sounds
     * - remove subscriptions/listeners
     * - save progress if needed
     */
    beforeUnmount: () => {
        console.log("beforeUnmount");

        clearAllTimers();
        stopBackgroundMusic();
    },

    /**
     * Triggered when the game loses focus.
     *
     * Examples:
     * - app moved to background
     * - user switched tabs/apps
     * - incoming system overlay
     */
    onPause: () => {
        console.log("Game paused");

        pauseGameplay();
        muteAudio();
    },

    /**
     * Triggered when focus returns to the game.
     */
    onResume: () => {
        console.log("Game resumed");

        resumeGameplay();
        unmuteAudio();
    },

    /**
     * Android-specific back navigation handler.
     *
     * Triggered by:
     * - hardware back button
     * - Android back gesture
     */
    onBackGesture: () => {
        console.log("Android back button triggered");

        // Example:
        // Open pause menu instead of closing game immediately
        openPauseMenu();
    },

    /**
     * Called when SDK requests GameReader closing.
     *
     * Common case:
     * - user clicked backdrop on Tablet/Desktop
     */
    onSdkCloseGameReaderIntent: () => {
        console.log("SDK requested game closing");

        // Close game manually
        GameCenterApi.closeGameReader();
    },

    /**
     * Allows modifying placeholders received from SDK.
     *
     * Useful for:
     * - filtering invalid placeholders
     * - replacing fallback values
     * - transforming placeholder structure
     */
    filterPlaceholders: placeholders => placeholders;
    },

    /**
     * Called after GameReader becomes visible and splash animation is completed.
     *
     * SDK triggers this hook after the game calls gameLoadedSdkCallback().
     *
     * This is the right place to:
     * - start gameplay
     * - show main UI
     * - enable user interactions
     */
    gameShouldForeground: () => {
        console.log("Game can now enter foreground");

        // Example:
        // Wait for intro animation before notifying SDK
        setTimeout(() => {
            /**
             * Notify SDK that:
             * - game is fully ready
             * - splash screen can be hidden
             * - loader can be removed
             */
            GameCenterApi.gameShouldForegroundCallback();
        }, 50);
    },
});
```

---

## `getDynamicResourceAsset(resourceName: string, fallbackAsset: string): string`

Returns a game asset URL provided by the SDK in `GameLaunchConfig.gameResources.assets`.
The `resourceName` value must match a resource key from `GameLaunchConfig.gameResources.assets`.

Use this method when an asset can be configured dynamically from the InAppStory platform, but the game also needs a local fallback for development or missing SDK data.

### Example

```ts
/**
 * Resolve background image from SDK launch config.
 *
 * Params:
 * - resourceName: resource key from GameLaunchConfig.gameResources.assets
 * - fallbackAsset: bundled local asset used when SDK asset is not available
 */
const backgroundImageSrc = GameCenterApi.getDynamicResourceAsset(
    "backgroundImage",
    require("./assets/background.jpg")
);

/**
 * Use resolved asset in your game UI.
 */
root.render(
    <App backgroundImageSrc={backgroundImageSrc} />
);
```

---

## `gameLoadedSdkCallback(): void`

Notifies the SDK that the game has been fully initialized.

After this callback is called, the SDK can continue the GameReader flow and trigger the `gameShouldForeground` lifecycle hook.

This callback should be triggered only after:

* all assets are loaded
* required API requests are completed
* the first render is finished

### Example

```ts
async function bootstrapGame() {
    try {
        /**
         * Load game assets:
         * - textures
         * - sounds
         * - fonts
         */
        await loadAssets();

        /**
         * Fetch required backend data
         */
        await loadGameConfig();

        /**
         * Render first application screen
         */
        renderGame();

        /**
         * Notify SDK that game loading is completed.
         *
         * IMPORTANT:
         * After this callback SDK:
         * - continue GameReader flow
         * - trigger gameShouldForeground
         */
        GameCenterApi.gameLoadedSdkCallback();
    } catch (error) {
        /**
         * Notify SDK that loading failed
         */
        GameCenterApi.gameLoadFailedSdkCallback(
            "Failed to initialize game",
            true
        );
    }
}
```

---

## `gameShouldForegroundCallback(): void`

Notifies the SDK that the game has finished foreground preparation after the `gameShouldForeground` lifecycle hook.

Use this callback when the game UI is ready to be shown and the native loader or splash screen can be removed.

### Example

```ts
GameCenterApi.createSdkApi({
    /**
     * SDK calls this hook after gameLoadedSdkCallback().
     * Wait for any final foreground animation or render work here.
     */
    gameShouldForeground: () => {
        startBackgroundMusic();
        showMainScreen();

        /**
         * Notify SDK that foreground preparation is complete:
         * - game UI is ready
         * - splash screen can be hidden
         * - loader can be removed
         */
        GameCenterApi.gameShouldForegroundCallback();
    },
});
```

---

## `gameLoadFailedSdkCallback(reason: string, canTryReload: boolean): void`

Notifies the SDK that the game failed to initialize.

### Example

```ts
try {
    await initializeGame();
} catch (error) {
    /**
     * Inform SDK about initialization failure.
     *
     * Params:
     * - reason: readable error message
     * - canTryReload: whether SDK should show reload option
     */
    GameCenterApi.gameLoadFailedSdkCallback(
        "Network error while loading game assets",
        true
    );
}
```

---

## `openUrl(params: { url: string, closeGameReader: boolean }): void`

Opens an external link from the game.

### Example

```ts
/**
 * Open external website from game.
 */
GameCenterApi.openUrl({
    /**
     * Destination URL
     */
    url: "https://example.com",

    /**
     * Whether GameReader should be closed before opening URL
     */
    closeGameReader: true,
});
```

---

## `eventGame(event: Record<string, any>): void`

Sends a custom analytics or gameplay event to SDK.

### Example

```ts
/**
 * Send analytics/gameplay event to SDK.
 */
GameCenterApi.eventGame({
    /**
     * Event identifier
     */
    name: "levelCompleted",

    /**
     * Custom payload
     */
    level: 3,
    score: 1200,
    timeSpent: 45,
});
```

---

## `reloadGameReader(): void`

Reloads the game instance.

### Example

```ts
/**
 * Example:
 * Reload game after critical runtime error.
 */
showErrorModal({
    title: "Something went wrong",

    onRetry: () => {
        GameCenterApi.reloadGameReader();
    },
});
```

# Lifecycle Hooks

## `mounted`

Triggered when the SDK is initialized.

Recommended actions:

* mount the React application
* start game initialization

---

## `beforeUnmount`

Triggered before the application is unmounted.

Typically used for:

* clearing timers
* stopping audio
* removing event listeners

---

## `onPause`

Triggered when the game loses focus or goes into the background.

---

## `onResume`

Triggered when focus returns to the game.

---

## `onBackGesture`

Triggered by Android back gesture or hardware back button.

---

## `onSdkCloseGameReaderIntent`

Triggered when the SDK intents to close the GameReader.

Example:

* backdrop click on Tablet/Desktop

---

## `gameShouldForeground`

Triggered by the SDK after the game calls `gameLoadedSdkCallback()` and when:

* the GameReader is fully initialized
* the splash animation is completed

Recommended actions:

* start background music
* launch game animations
* display the main UI
* call `gameShouldForegroundCallback()` when foreground preparation is complete

---

# Useful Links

* MDN Web Docs — postMessage API
  https://developer.mozilla.org/en-US/docs/Web/API/Window/postMessage

---