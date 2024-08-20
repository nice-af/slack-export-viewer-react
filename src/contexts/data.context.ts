import { createContext } from 'react';

export const DataContext = createContext<{
  data?: SlackDumpData;
}>({});
