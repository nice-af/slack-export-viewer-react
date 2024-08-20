import { FC, useContext, useState } from 'react';
import { DataContext } from '../contexts/data.context';
import DayViewer from './DayViewer';

interface ChannelViewerProps {
  channelId: string;
}

const ChannelViewer: FC<ChannelViewerProps> = ({ channelId }) => {
  const { data } = useContext(DataContext);
  const [currentDay, setCurrentDay] = useState<string>();

  const channel = data!.channels.find(channel => channel.id === channelId);
  if (!channel) {
    throw new Error('Channel not found');
  }
  const days = data![channel.name];

  return (
    <div>
      <h1>{channel.name}</h1>
      <ul>
        {Object.keys(days).map(day => (
          <li key={day}>
            <button onClick={() => setCurrentDay(day)}>{day}</button>
          </li>
        ))}
      </ul>

      {currentDay && <DayViewer channelId={channelId} day={currentDay} />}
    </div>
  );
};

export default ChannelViewer;
