import styled, { css } from 'styled-components';
import { Color } from '../styles/color';

export const Container = styled.div`
  display: flex;
  align-items: center;
  gap: 0;
`;

const BaseCircleStyles = css`
  width: 24px;
  height: 24px;
  border-radius: 999px;
  overflow: hidden;
  margin-left: -12px;

  &:first-child {
    margin-left: 0;
  }
`;

export const EmptyCircle = styled.div<{ $borderColor: Color }>`
  ${BaseCircleStyles}
  background-color: ${Color.Neutral_700};
  border: 3px solid ${props => props.$borderColor};
`;

export const AvatarCircle = styled.img<{ $borderColor: Color }>`
  ${BaseCircleStyles}
  border: 3px solid ${props => props.$borderColor};
`;

export const OtherUsersCount = styled.div<{ $backgroundColor: Color }>`
  display: flex;
  align-items: center;
  justify-content: center;
  min-width: 28px;
  height: 28px;
  margin-left: -12px;
  font-size: 0.8rem;
  background-color: ${props => props.$backgroundColor};
  color: ${Color.Neutral_200_OffWhite};
  line-height: 1;
  border-radius: 999px;
`;
