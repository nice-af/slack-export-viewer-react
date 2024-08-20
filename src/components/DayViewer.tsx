import React, { FC, useContext } from 'react';
import { DataContext } from '../contexts/data.context';

interface DayViewerProps {
  channelId: string;
  /**
   * Day in the format of `YYYY-MM-DD`
   */
  day: string;
}

const DayViewer: FC<DayViewerProps> = ({ channelId, day }) => {
  const { data } = useContext(DataContext);
  const channel = data!.channels.find(channel => channel.id === channelId);
  if (!channel) {
    throw new Error('Channel not found');
  }
  const days = data![channel.name];
  const messages = days[day];

  return (
    <div>
      <pre>
        <code>{JSON.stringify(messages, null, 2)}</code>
      </pre>
    </div>
  );
};

export default DayViewer;
