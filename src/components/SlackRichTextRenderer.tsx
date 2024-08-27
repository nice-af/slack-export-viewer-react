import { FC, ReactNode } from 'react';
import { SlackMessageRichTextBlock } from '../types/slackdump';
import SlackRichTextUser from './SlackRichTextUser';

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
        // TODO convert emoji name to image
        content.push(<span key={index}>:{element.name}:</span>);
        break;
      }
      case 'link': {
        content.push(
          <a key={index} href={element.url}>
            {element.text ? element.text : element.url}
          </a>,
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
          <span key={index} style={{ color: 'blue' }}>
            @{element.range}
          </span>,
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
