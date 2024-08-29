import { FC, useContext, useState } from 'react';
import { DataContext } from '../contexts/data.context';
import ChannelViewer from './ChannelViewer';
import { ChannelContext } from '../contexts/channel.context';
import * as Styled from './Viewer.styles';
import AvatarsList from './AvatarsList';
import { Color } from '../styles/color';

const Viewer: FC = () => {
  const { data } = useContext(DataContext);

  const [selectedChannelId, setSelectedChannelId] = useState<string>();

  if (!selectedChannelId) {
    return (
      <Styled.Container>
        <h1>Select a channel</h1>
        <Styled.Ul>
          {data?.channels.map(channel => (
            <li key={channel.id}>
              <Styled.Button onClick={() => setSelectedChannelId(channel.id)}>
                <Styled.Name>#{channel.name}</Styled.Name>
                <AvatarsList
                  userIds={channel.members}
                  backgroundColor={Color.Neutral_800}
                />
              </Styled.Button>
            </li>
          ))}
        </Styled.Ul>
      </Styled.Container>
    );
  }

  const selectedChannel = data?.channels.find(
    channel => channel.id === selectedChannelId,
  );

  return (
    <ChannelContext.Provider value={{ channel: selectedChannel }}>
      <ChannelViewer channelId={selectedChannelId} />
    </ChannelContext.Provider>
  );
};

export default Viewer;
