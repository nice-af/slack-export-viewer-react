import { createContext } from 'react';
import { SlackDataParsed } from '../types/slackdump';

export const DataContext = createContext<{
  data: SlackDataParsed;
}>({
  data: {
    channels: [],
    users: [],
    messages: {},
  },
});
