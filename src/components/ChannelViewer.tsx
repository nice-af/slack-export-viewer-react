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
  const filteredMessages = messages.filter(message => message.parent_user_id === undefined); // Filter out thread messages

  // const fileTypes = new Set();
  // Object.keys(days).forEach(day => {
  //   const dayData = days[day];
  //   dayData.forEach(message =>
  //     message.files?.forEach(file => fileTypes.add(file.filetype)),
  //   );
  // });
  // console.log(fileTypes);

  return (
    <div>
      <h1>{channel.name}</h1>
      <ul>
        {filteredMessages.map(message => (
          <ChatMessage key={message.ts} message={message} />
        ))}
      </ul>
    </div>
  );
};

export default ChannelViewer;
