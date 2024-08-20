import { FC, useContext, useState } from 'react';
import { DataContext } from '../contexts/data.context';
import ChannelViewer from './ChannelViewer';

const Viewer: FC = () => {
  const { data } = useContext(DataContext);

  const [selectedChannelId, setSelectedChannelId] = useState<string>();

  if (!selectedChannelId) {
    return (
      <div>
        <h1>Select a channel</h1>
        <ul>
          {data?.channels.map(channel => (
            <li key={channel.id}>
              <button onClick={() => setSelectedChannelId(channel.id)}>
                {channel.name}
              </button>
            </li>
          ))}
        </ul>
      </div>
    );
  }

  return <ChannelViewer channelId={selectedChannelId} />;
};

export default Viewer;
