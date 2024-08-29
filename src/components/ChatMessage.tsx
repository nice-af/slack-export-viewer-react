import { FC, useState } from 'react';
import { useUser } from '../hooks/useUser';
import {
  formatDate,
  formatTime
} from '../services/date.service';
import {
  getProfileName,
  removeUserFromMessage,
} from '../services/slack.service';
import { SlackMessage } from '../types/slackdump';
import * as Styled from './ChatMessage.styles';
import SlackBlockRenderer from './SlackBlockRenderer';
import SlackFileRenderer from './SlackFileRenderer';
import SlackReactionRenderer from './SlackReactionRenderer';
import SlackReplyRenderer from './SlackReplyRenderer';

interface ChatMessageProps {
  message: SlackMessage;
  postDate: Date;
}

const ChatMessage: FC<ChatMessageProps> = ({ message, postDate }) => {
  const [repliesOpen, setRepliesOpen] = useState(false);
  const author = useUser(message.user!);

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
            <Styled.RepliesButton onClick={() => setRepliesOpen(!repliesOpen)}>
              <span>{message.reply_count} Replies</span>
              <svg width={12} height={12} viewBox="0 0 256 256">
                <polyline
                  points="96 48 176 128 96 208"
                  fill="none"
                  stroke="currentColor"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="32"
                />
              </svg>
            </Styled.RepliesButton>
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
