import { createContext } from 'react';
import { SlackDumpData } from '../types/slackdump';

export const DataContext = createContext<{
  data?: SlackDumpData;
}>({});
