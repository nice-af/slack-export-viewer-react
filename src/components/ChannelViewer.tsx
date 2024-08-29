import { FC, useContext } from 'react';
import { DataContext } from '../contexts/data.context';
import ChatMessage from './ChatMessage';
import * as Styled from './ChannelViewer.styles';

interface ChannelViewerProps {
  channelId: string;
}

const ChannelViewer: FC<ChannelViewerProps> = ({ channelId }) => {
  const { data } = useContext(DataContext);
  const channel = data!.channels.find(channel => channel.id === channelId);
  if (!channel) {
    throw new Error('Channel not found');
  }
  const messages = data!.messages[channel.id!];
  const filteredMessages = messages.filter(
    message => message.parent_user_id === undefined,
  ); // Filter out thread messages

  // const subTypes = new Set();
  // messages.forEach(message => subTypes.add(message.subtype));
  // console.log(subTypes);

  return (
    <Styled.Container>
      <Styled.StickyHeader>
        <Styled.Headline>&#35; {channel.name}</Styled.Headline>
        {channel.topic?.value && (
          <Styled.Topic>{channel.topic?.value}</Styled.Topic>
        )}
      </Styled.StickyHeader>
      {filteredMessages.map(message => (
        <ChatMessage key={message.ts} message={message} />
      ))}
    </Styled.Container>
  );
};

export default ChannelViewer;
