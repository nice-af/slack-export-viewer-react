import { FC, ReactNode } from 'react';
import { SlackMessageRichTextBlock } from '../types/slackdump';
import SlackRichTextUser from './SlackRichTextUser';
import * as StyledBroadcast from './Broadcast.styles';
import SlackEmojiRenderer from './SlackEmojiRenderer';
import * as Styled from './SlackRichTextRenderer.styles';

interface SlackRichTextRendererProps {
  elements: SlackMessageRichTextBlock['elements'];
}

const SlackRichTextRenderer: FC<SlackRichTextRendererProps> = ({
  elements,
}) => {
  const content: ReactNode[] = [];

  elements.forEach((element, index) => {
    switch (element.type) {
      case 'text': {
        content.push(<span key={index}>{element.text}</span>);
        break;
      }
      case 'rich_text_section': {
        content.push(
          <SlackRichTextRenderer key={index} elements={element.elements} />,
        );
        break;
      }
      case 'emoji': {
        content.push(
          <SlackEmojiRenderer
            key={index}
            emoji={element.name}
          ></SlackEmojiRenderer>,
        );
        break;
      }
      case 'link': {
        content.push(
          <Styled.Link key={index} href={element.url}>
            {element.text ? element.text : element.url}
          </Styled.Link>,
        );
        break;
      }
      case 'user': {
        content.push(
          <SlackRichTextUser key={index} userId={element.user_id} />,
        );
        break;
      }
      case 'broadcast': {
        content.push(
          <StyledBroadcast.Broadcast key={index}>
            @{element.range}
          </StyledBroadcast.Broadcast>,
        );
        break;
      }
      default: {
        // TODO handle more types
        break;
      }
    }
  });

  return content;
};

export default SlackRichTextRenderer;
