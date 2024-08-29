import { FC, useContext } from 'react';
import { DataContext } from '../contexts/data.context';
import ChatMessage from './ChatMessage';
import * as Styled from './ChannelViewer.styles';
import AvatarsList from './AvatarsList';
import { Color } from '../styles/color';

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
        <div>
          <Styled.Headline>&#35; {channel.name}</Styled.Headline>
          {channel.topic?.value && (
            <Styled.Topic>{channel.topic?.value}</Styled.Topic>
          )}
        </div>
        <AvatarsList
          userIds={channel.members}
          backgroundColor={Color.Neutral_900}
          othersBackgroundColor={Color.Neutral_800}
        />
      </Styled.StickyHeader>
      {filteredMessages.map(message => (
        <ChatMessage key={message.ts} message={message} />
      ))}
    </Styled.Container>
  );
};

export default ChannelViewer;
