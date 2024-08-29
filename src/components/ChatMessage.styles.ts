import styled from 'styled-components';
import { Color } from '../styles/color';

export const Container = styled.div`
  display: flex;
  gap: 10px;
  padding: 12px 24px;
  transition: 0.15s ease;

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

export const RepliesButton = styled.button`
  display: flex;
  align-items: center;
  gap: 24px;
  padding: 8px 12px;
  margin: 4px -12px 0;
  color: ${Color.Blue_500};
  font-size: 13px;
  font-family: inherit;
  font-weight: 700;
  border: 1px solid transparent;
  border-radius: ${props => props.theme.borderRadius.medium};
  appearance: none;
  cursor: pointer;
  transition: 0.25s ease;
  line-height: 1;
  text-align: left;
  background-color: transparent;

  &:hover {
    text-decoration: none;
    background-color: ${Color.Neutral_900};
    border-color: ${Color.Neutral_700};

    svg {
      opacity: 1;
    }
  }

  svg {
    display: block;
    opacity: 0;
    transition: 0.25s ease;
  }
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
