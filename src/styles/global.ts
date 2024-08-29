import { createGlobalStyle } from 'styled-components';
import { Color } from './color';

export const GlobalStyles = createGlobalStyle`
  :root {
    font-family: 'Lato', Arial, Helvetica, sans-serif;
    line-height: 1.5;
    font-weight: 400;
    font-size: 15px;

    color: ${Color.Neutral_100};
    background-color: ${Color.Neutral_900};

    font-synthesis: none;
    text-rendering: optimizeLegibility;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
  }

  body {
    margin: 0;
    padding: 0;
    min-height: 100vh;
  }

  h1 {
    font-size: 18px;
  }
`;
