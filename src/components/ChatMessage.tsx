import { FC } from 'react';
import { formatDate, formatTime, parseSlackTimestamp } from '../services/date.service';
import { SlackMessage } from '../types/slackdump';
import SlackBlockRenderer from './SlackBlockRenderer';
import SlackFileRenderer from './SlackFileRenderer';
import SlackReactionRenderer from './SlackReactionRenderer';
import { useUser } from '../hooks/useUser';

interface ChatMessageProps {
  message: SlackMessage;
}

const ChatMessage: FC<ChatMessageProps> = ({ message }) => {
  const author = useUser(message.user!);

  const postDate = parseSlackTimestamp(message.ts!);

  return (
    <div>
      {author && <p>Author: {author.profile.display_name}</p>}
      <p>Date: {formatDate(postDate)} - {formatTime(postDate)}</p>
      {message.blocks &&
        message.blocks.map(block => (
          <SlackBlockRenderer key={block.block_id} block={block} />
        ))}
      {message.files && (
        <div>
          {message.files.map(file => (
            <SlackFileRenderer key={file.id!} file={file} />
          ))}
        </div>
      )}

      {message.reactions && (
        <div>
          {message.reactions.map(reaction => (
            <SlackReactionRenderer
              key={`${message.client_msg_id}-reaction-${reaction.name}`}
              reaction={reaction}
            />
          ))}
        </div>
      )}

      {message.reply_count && <p>Replies: {message.reply_count}</p>}

      <br />

      <pre>
        <code>{JSON.stringify(message, null, 2)}</code>
      </pre>

      <hr />
    </div>
  );
};

export default ChatMessage;