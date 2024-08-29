import { FC, useState } from 'react';
import {
  formatDate,
  formatTime,
  parseSlackTimestamp,
} from '../services/date.service';
import { SlackMessage } from '../types/slackdump';
import SlackBlockRenderer from './SlackBlockRenderer';
import SlackFileRenderer from './SlackFileRenderer';
import SlackReactionRenderer from './SlackReactionRenderer';
import { useUser } from '../hooks/useUser';
import SlackReplyRenderer from './SlackReplyRenderer';
import * as Styled from './ChatMessage.styles';
import {
  getProfileName,
  removeUserFromMessage,
} from '../services/slack.service';

interface ChatMessageProps {
  message: SlackMessage;
}

const ChatMessage: FC<ChatMessageProps> = ({ message }) => {
  const [repliesOpen, setRepliesOpen] = useState(false);
  const author = useUser(message.user!);

  const postDate = parseSlackTimestamp(message.ts!);

  return (
    <Styled.Container>
      {author && (
        <Styled.AvatarImage
          src={author.profile.image_192}
          alt={`Profile picture of ${getProfileName(author.profile)}`}
        />
      )}

      <div>
        <Styled.MessageHeader>
          {author && (
            <Styled.MessageHeaderAuthorName>
              {getProfileName(author.profile)}
            </Styled.MessageHeaderAuthorName>
          )}
          <Styled.MessageHeaderTimestamp>
            {formatDate(postDate)} - {formatTime(postDate)}
          </Styled.MessageHeaderTimestamp>
        </Styled.MessageHeader>

        {/* System messages */}
        {[
          'channel_join',
          'channel_leave',
          'channel_topic',
          'channel_purpose',
          'channel_convert_to_private',
          'channel_convert_to_public',
        ].includes(message.subtype!) && (
          <Styled.SystemMessage>
            {removeUserFromMessage(message.text!)}.
          </Styled.SystemMessage>
        )}

        {/* Blocks */}
        {message.blocks &&
          message.blocks.map(block => (
            <SlackBlockRenderer key={block.block_id} block={block} />
          ))}

        {/* Files */}
        {message.files && (
          <Styled.FilesContainer>
            {message.files.map(file => (
              <SlackFileRenderer key={file.id!} file={file} />
            ))}
          </Styled.FilesContainer>
        )}

        {/* Reactions */}
        {message.reactions && (
          <Styled.ReactionsContainer>
            {message.reactions.map(reaction => (
              <SlackReactionRenderer
                key={`${message.client_msg_id}-reaction-${reaction.name}`}
                reaction={reaction}
              />
            ))}
          </Styled.ReactionsContainer>
        )}

        {/* Replies / thread */}
        {message.reply_count && (
          <div>
            {/* TODO make pretty */}
            <button onClick={() => setRepliesOpen(!repliesOpen)}>
              {message.reply_count} Replies
            </button>
            {repliesOpen && (
              <Styled.RepliesContainer>
                <SlackReplyRenderer threadTs={message.thread_ts!} />
              </Styled.RepliesContainer>
            )}
          </div>
        )}

        {/* <pre>
          <code>{JSON.stringify(message, null, 2)}</code>
        </pre> */}
      </div>
    </Styled.Container>
  );
};

export default ChatMessage;
