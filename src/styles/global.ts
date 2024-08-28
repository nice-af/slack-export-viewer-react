import { createGlobalStyle } from 'styled-components';
import { Color } from './color';

export const GlobalStyles = createGlobalStyle`
  :root {
    font-family: Inter, system-ui, Avenir, Helvetica, Arial, sans-serif;
    line-height: 1.5;
    font-weight: 400;

    color: ${Color.Neutral_100};
    background-color: ${Color.Neutral_900};

    font-synthesis: none;
    text-rendering: optimizeLegibility;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
  }

  body {
    margin: 0 auto;
    padding: 10px 20px 40px;
    max-width: 1280px;
    min-height: 100vh;
  }
`;
