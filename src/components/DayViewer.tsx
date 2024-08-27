import { parse } from 'date-fns';
import { FC, useContext } from 'react';
import { DataContext } from '../contexts/data.context';
import { formatDate } from '../services/date.service';
import ChatMessage from './ChatMessage';
import { ChannelContext } from '../contexts/channel.context';

interface DayViewerProps {
  /**
   * Day in the format of `YYYY-MM-DD`
   */
  day: string;
}

const DayViewer: FC<DayViewerProps> = ({ day }) => {
  const { data } = useContext(DataContext);
  const { channel } = useContext(ChannelContext);
  if (!channel) {
    throw new Error('Channel not found');
  }
  const days = data![channel.name!];
  const messages = days[day].filter(message => message.parent_user_id === undefined); // Filter out thread messages

  const dayDate = parse(day, 'yyyy-MM-dd', new Date());

  return (
    <div>
      <time dateTime={day}>{formatDate(dayDate)}</time>

      {messages.map(message => (
        <ChatMessage key={message.client_msg_id} message={message} />
      ))}

      <pre>
        <code>{JSON.stringify(messages, null, 2)}</code>
      </pre>
    </div>
  );
};

export default DayViewer;
