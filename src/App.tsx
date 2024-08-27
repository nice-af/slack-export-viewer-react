import type { FC } from 'react';
import Viewer from './components/Viewer';
import DataContainer from './containers/DataContainer';

export const App: FC = () => {
  return (
    <DataContainer>
      <Viewer />
    </DataContainer>
  );
};

export default App;
