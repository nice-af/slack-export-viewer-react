import { FileElement } from '@slack/web-api/dist/types/response/ConversationsHistoryResponse';
import mediumZoom, { Zoom } from 'medium-zoom';
import { FC, useContext, useRef } from 'react';
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
  const imageRef = useRef<HTMLImageElement>(null);
  const mediumZoomInstance = useRef<Zoom | null>(null);

  function createZoomAndOpen() {
    console.log('createZoomAndOpen');
    if (!imageRef.current) {
      return;
    }

    if (!mediumZoomInstance.current) {
      mediumZoomInstance.current = mediumZoom(imageRef.current, {
        margin: 24,
        background: 'rgba(0, 0, 0, 0.5)',
      });
    }
    mediumZoomInstance.current.open();
  }

  if (IMAGE_FILE_TYPES.includes(file.filetype!)) {
    return (
      <Styled.Container>
        <img
          data-zoomable
          onClick={createZoomAndOpen}
          ref={imageRef}
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
