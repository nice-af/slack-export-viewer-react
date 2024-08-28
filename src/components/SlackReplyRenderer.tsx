import { FC, useContext } from 'react';
import { ChannelContext } from '../contexts/channel.context';
import { DataContext } from '../contexts/data.context';
import ChatMessage from './ChatMessage';

interface SlackReplyRendererProps {
  threadTs: string;
}

const SlackReplyRenderer: FC<SlackReplyRendererProps> = ({ threadTs }) => {
  const { data } = useContext(DataContext);
  const { channel } = useContext(ChannelContext);
  const threadMessages = data.messages[channel!.id!]
    .filter(message => message.thread_ts === threadTs)
    .filter(message => message.ts !== message.thread_ts)
    .sort((a, b) => Number(a.ts) - Number(b.ts));

  return (
    <div>
      {threadMessages.map(message => (
        <ChatMessage key={message.ts!} message={message} />
      ))}
    </div>
  );
};

export default SlackReplyRenderer;
