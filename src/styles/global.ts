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

  code {
    display: inline-block;
    padding: 0.1em 0.4em;
    margin: 0 5px;
    background-color: ${Color.Neutral_800};
    border-radius: 4px;
    border: 1px solid ${Color.Neutral_700};
    font-size: 0.85em;
    font-family: 'IBM Plex Mono', monospace;
  }

  a {
    color: ${Color.Blue_500};
    text-decoration: underline;
    transition: color 0.25s ease;

    &:hover {
      color: ${Color.Blue_600};
    }
  }
`;
