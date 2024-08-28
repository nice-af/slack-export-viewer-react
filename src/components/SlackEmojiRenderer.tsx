import { FC } from 'react';
import * as Styled from './SlackEmojiRenderer.styles';
import slackEmojiMap from '../assets/slack-emojis.json';

interface SlackEmojiRendererProps {
  emoji: string;
}

const SlackEmojiRenderer: FC<SlackEmojiRendererProps> = ({ emoji }) => {
  let url: string;

  // Remove skin tone modifier
  emoji = emoji.replace(/::skin-tone-\d/g, '');

  if ((slackEmojiMap as Record<string, string>)[emoji]) {
    url = (slackEmojiMap as Record<string, string>)[emoji];
  } else {
    url = `./emojis/${emoji}.png`;
  }

  return <Styled.Image src={url} alt={emoji} />;
};

export default SlackEmojiRenderer;
