import { createGlobalStyle } from "styled-components";


export const GlobalStyles = createGlobalStyle`

    * {
        margin: 0;
        padding: 0;
        box-sizing: border-box;
        outline: none;
        user-select: none;
        -webkit-touch-callout: none;
        -webkit-user-drag: none;
        -webkit-tap-highlight-color: rgba(0, 0, 0, 0);
    }

    *::before,
    *::after {
        box-sizing: border-box;
    }

    html, body, #root {
        height: 100%;
        width: 100%;
        overflow: hidden;
    }

    html { }

    body {
    }

`;
