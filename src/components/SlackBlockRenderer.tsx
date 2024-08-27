import { FC } from 'react';
import { isSlackMessageRichTextBlock, SlackMessage } from '../types/slackdump';
import SlackRichTextRenderer from './SlackRichTextRenderer';

interface SlackBlockRendererProps {
  block: NonNullable<SlackMessage['blocks']>[number];
}

const SlackBlockRenderer: FC<SlackBlockRendererProps> = ({ block }) => {
  if (isSlackMessageRichTextBlock(block)) {
    return <SlackRichTextRenderer elements={block.elements} />;
  }

  throw new Error(`Unsupported block type: ${block.type}`);
};

export default SlackBlockRenderer;
