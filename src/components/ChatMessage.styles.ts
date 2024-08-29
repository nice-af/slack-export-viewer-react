import styled from 'styled-components';
import { Color } from '../styles/color';

export const Container = styled.div`
  display: flex;
  gap: 10px;
  padding: 12px 24px;
  transition: ${props => props.theme.transition};

  &:hover {
    background-color: ${Color.Neutral_800};
  }
`;

export const AvatarImage = styled.img`
  width: 40px;
  height: 40px;
  border-radius: ${props => props.theme.borderRadius.medium};
`;

export const MessageHeader = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
  margin-bottom: 5px;
  line-height: 1;
`;

export const MessageHeaderAuthorName = styled.span`
  font-weight: 900;
`;

export const MessageHeaderTimestamp = styled.span`
  font-size: 12px;
  color: ${Color.Neutral_300};
`;

export const SystemMessage = styled.span`
  color: ${Color.Neutral_300};
`;

export const FilesContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
`;

export const RepliesContainer = styled.div`
  border-left: 1px solid ${Color.Neutral_700};
`;

export const ReactionsContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
  flex-wrap: wrap;
  margin-top: 10px;
`;
