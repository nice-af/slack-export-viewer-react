import styled from 'styled-components';

export const Container = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
  width: 300px;
  max-height: 360px;
  margin-top: 6px;
  border-radius: 4px;
  overflow: hidden;

  > img {
    cursor: pointer;
  }

  > img,
  video,
  audio {
    // TODO check audio styles
    max-width: 100%;
    max-height: 100%;
    object-fit: contain;
  }
`;
