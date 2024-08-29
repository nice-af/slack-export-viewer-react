import styled from 'styled-components';
import { Color } from '../styles/color';
import { transparentize } from 'polished';

export const Container = styled.span`
  display: inline-flex;
  padding: 5px 10px;
  gap: 10px;
  border-radius: ${props => props.theme.borderRadius.medium};
  background-color: ${transparentize(0.3, Color.Neutral_700)};
`;

export const Count = styled.span`
  font-size: 12px;
  font-weight: 700;
  color: ${Color.Neutral_0_White};
`;