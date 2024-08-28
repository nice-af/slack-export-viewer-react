import { FC, useContext } from 'react';
import { DataContext } from '../contexts/data.context';
import ChatMessage from './ChatMessage';

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
    <div>
      <h1>&#35; {channel.name}</h1>
      {filteredMessages.map(message => (
        <ChatMessage key={message.ts} message={message} />
      ))}
    </div>
  );
};

export default ChannelViewer;
