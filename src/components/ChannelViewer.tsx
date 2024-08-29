import { FC, Fragment, useContext, useRef } from 'react';
import { DataContext } from '../contexts/data.context';
import ChatMessage from './ChatMessage';
import * as Styled from './ChannelViewer.styles';
import AvatarsList from './AvatarsList';
import { Color } from '../styles/color';
import { parseSlackTimestamp } from '../services/date.service';
import { useVirtualizer } from '@tanstack/react-virtual';

interface ChannelViewerProps {
  channelId: string;
}

const ChannelViewer: FC<ChannelViewerProps> = ({ channelId }) => {
  const { data } = useContext(DataContext);
  const scrollParentRef = useRef<HTMLDivElement>(null);
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

  const rowVirtualizer = useVirtualizer({
    count: filteredMessages.length,
    getScrollElement: () => scrollParentRef.current,
    estimateSize: () => 257,
  });

  return (
    <Styled.Container ref={scrollParentRef}>
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

      <div
        style={{
          height: `${rowVirtualizer.getTotalSize()}px`,
          width: '100%',
          position: 'relative',
        }}
      >
        {/* Only the visible items in the virtualizer, manually positioned to be in view */}
        {rowVirtualizer.getVirtualItems().map(virtualItem => {
          const message = filteredMessages[virtualItem.index];
          const previousMessage = filteredMessages[virtualItem.index - 1];
          const postDate = parseSlackTimestamp(message.ts!);
          let hasLine = false;

          if (previousMessage) {
            // Insert a hr if the day is different from the previous message
            const previousPostDate = parseSlackTimestamp(previousMessage.ts!);
            const dateString = postDate.toISOString().split('T')[0];
            const previousDateString = previousPostDate
              .toISOString()
              .split('T')[0];
            hasLine = dateString !== previousDateString;
          }

          return (
            <Fragment key={virtualItem.key}>
              {hasLine && <hr />}
              <ChatMessage message={message} postDate={postDate} />
            </Fragment>
          );
        })}
      </div>
    </Styled.Container>
  );
};

export default ChannelViewer;
