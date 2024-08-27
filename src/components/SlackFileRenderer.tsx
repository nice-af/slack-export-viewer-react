import { FileElement } from '@slack/web-api/dist/types/response/ConversationsHistoryResponse';
import { FC, useContext } from 'react';
import { ChannelContext } from '../contexts/channel.context';

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
      <div>
        <img
          src={`./${channel!.name_normalized}/attachments/${file.id!}-${file.name}`}
          alt={file.title}
        />
      </div>
    );
  }

  if (VIDEO_FILE_TYPES.includes(file.filetype!)) {
    return (
      <video controls>
        <source
          src={`./${channel!.name_normalized}/attachments/${file.id!}-${file.name}`}
          type={`video/${file.filetype}`}
        />
      </video>
    );
  }

  if (AUDIO_FILE_TYPES.includes(file.filetype!)) {
    return (
      <audio controls>
        <source
          src={`./${channel!.name_normalized}/attachments/${file.id!}-${file.name}`}
          type={`audio/${file.filetype}`}
        />
      </audio>
    );
  }

  return null;
};

export default SlackFileRenderer;
