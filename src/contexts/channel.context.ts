import { createContext } from 'react';
import { SlackChannel } from '../types/slackdump';

export const ChannelContext = createContext<{
  channel?: SlackChannel;
}>({});
