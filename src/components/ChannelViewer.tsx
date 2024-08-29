import { useVirtualizer } from '@tanstack/react-virtual';
import { FC, useContext, useRef } from 'react';
import { DataContext } from '../contexts/data.context';
import { parseSlackTimestamp } from '../services/date.service';
import { Color } from '../styles/color';
import AvatarsList from './AvatarsList';
import * as Styled from './ChannelViewer.styles';
import ChatMessage from './ChatMessage';

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
  );

  const virtualizer = useVirtualizer({
    count: filteredMessages.length,
    getScrollElement: () => scrollParentRef.current,
    estimateSize: () => 257,
  });
  const items = virtualizer.getVirtualItems();

  return (
    <Styled.Container
      ref={scrollParentRef}
    >
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
          height: `${virtualizer.getTotalSize()}px`,
          width: '100%',
          position: 'relative',
        }}
      >
        <div
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100%',
            transform: `translateY(${items[0]?.start ?? 0}px)`,
          }}
        >
          {/* Only the visible items in the virtualizer, manually positioned to be in view */}
          {items.map(virtualItem => {
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
              <div
                key={virtualItem.key}
                data-index={virtualItem.index}
                ref={virtualizer.measureElement}
              >
                {hasLine && <hr />}
                <ChatMessage message={message} postDate={postDate} />
              </div>
            );
          })}
        </div>
      </div>
    </Styled.Container>
  );
};

export default ChannelViewer;
