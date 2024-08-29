import styled from 'styled-components';
import { Color } from '../styles/color';

export const Container = styled.div`
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100vh;
  height: 100dvh;
  width: 100vw;
  padding: 72px 0;
`;

export const Ul = styled.ul`
  list-style: none;
  padding: 0;
  margin: 0;
`;

export const Button = styled.button`
  display: flex;
  align-items: center;
  gap: 16px;
  position: relative;
  padding: 10px 24px;
  margin-top: 12px;
  border: 1px solid ${Color.Neutral_700};
  background-color: ${Color.Neutral_800};
  color: ${Color.Neutral_200_OffWhite};
  border-radius: ${props => props.theme.borderRadius.medium};
  transition: 0.25s ease;
  appearance: none;
  font-family: inherit;
  font-size: inherit;
  cursor: pointer;

  &:hover {
    /* border-color: ${Color.Neutral_600}; */
    background-color: ${Color.Neutral_750};
  }
`;

export const Name = styled.span`
  font-weight: 700;
  font-size: 18px;
`;
