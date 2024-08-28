import styled from 'styled-components';
import { Color } from '../styles/color';
import { transparentize } from 'polished';

export const Broadcast = styled.span`
  padding: 0 4px 0 2px;
  border-radius: ${props => props.theme.borderRadius.small};
  color: ${Color.Orange_500_Primary};
  background-color: ${transparentize(0.9, Color.Orange_500_Primary)};
`;
