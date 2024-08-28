import type { FC } from 'react';
import Viewer from './components/Viewer';
import DataContainer from './containers/DataContainer';
import { theme } from './styles/theme';
import { ThemeProvider } from 'styled-components';
import { GlobalStyles } from './styles/global';

export const App: FC = () => {
  return (
    <ThemeProvider theme={theme}>
      <GlobalStyles />
      <DataContainer>
        <Viewer />
      </DataContainer>
    </ThemeProvider>
  );
};

export default App;
