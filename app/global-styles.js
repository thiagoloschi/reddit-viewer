import { createGlobalStyle } from 'styled-components';

const GlobalStyle = createGlobalStyle`
  html,
  body {
    height: 100%;
    width: 100%;
    background-color: rgb(218, 225, 230);
    line-height: 1;
    -webkit-font-smoothing: antialiased;
  }

  body {
    font-family: 'IBMPlexSans', 'Helvetica Neue', 'Segoe UI', Helvetica, Verdana, Arial, sans-serif;
  }

  body.fontLoaded {
    font-family: IBMPlexSans, 'Helvetica Neue', 'Segoe UI', Helvetica, Verdana, Arial, sans-serif;
  }

  #app {
    min-height: 100%;
    min-width: 100%;
  }

  p,
  label {
    line-height: 1.5em;
    margin: 0;
  }
`;

export default GlobalStyle;
