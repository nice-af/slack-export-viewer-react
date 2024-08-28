import { FileElement } from '@slack/web-api/dist/types/response/ConversationsHistoryResponse';
import { FC, useContext } from 'react';
import { ChannelContext } from '../contexts/channel.context';
import * as Styled from './SlackFileRenderer.styles';

interface SlackFileRendererProps {
  file: FileElement;
}

const IMAGE_FILE_TYPES = ['png', 'jpg', 'gif', 'heic'];
const VIDEO_FILE_TYPES = ['mp4', 'mov'];
const AUDIO_FILE_TYPES = ['mp3', 'm4a'];

const SlackFileRenderer: FC<SlackFileRendererProps> = ({ file }) => {
  const { channel } = useContext(ChannelContext);

  if (IMAGE_FILE_TYPES.includes(file.filetype!)) {
    return (
      <Styled.Container>
        <img
          src={`./${channel!.name_normalized}/attachments/${file.id!}-${file.name}`}
          alt={file.title}
        />
      </Styled.Container>
    );
  }

  if (VIDEO_FILE_TYPES.includes(file.filetype!)) {
    return (
      <Styled.Container>
        <video controls>
          <source
            src={`./${channel!.name_normalized}/attachments/${file.id!}-${file.name}`}
            type={`video/${file.filetype}`}
          />
        </video>
      </Styled.Container>
    );
  }

  if (AUDIO_FILE_TYPES.includes(file.filetype!)) {
    return (
      <Styled.Container>
        <audio controls>
          <source
            src={`./${channel!.name_normalized}/attachments/${file.id!}-${file.name}`}
            type={`audio/${file.filetype}`}
          />
        </audio>
      </Styled.Container>
    );
  }

  return null;
};

export default SlackFileRenderer;
