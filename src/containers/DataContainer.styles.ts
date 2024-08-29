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

export const Dropzone = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 120px;
  width: 100%;
  max-width: 200px;
  padding: 24px;
  margin-top: 20px;
  border: 1px dashed ${Color.Neutral_700};
  background-color: ${Color.Neutral_800};
  border-radius: ${props => props.theme.borderRadius.medium};
  transition: 0.25s ease;
  cursor: pointer;

  &:hover {
    border-color: ${Color.Neutral_600};
  }

  svg {
    margin-bottom: 10px;
  }

  label {
    font-size: inherit;
    font-family: inherit;
    cursor: pointer;
    text-align: center;
    color: ${Color.Neutral_300};
  }
`;

export const Input = styled.input`
  position: absolute;
  top: 0;
  left: 0;
  z-index: 2;
  width: 100%;
  height: 100%;
  opacity: 0;
`;
