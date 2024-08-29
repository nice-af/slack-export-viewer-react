import styled from 'styled-components';
import { Color } from '../styles/color';

export const Container = styled.span`
  display: inline-flex;
  padding: 5px 10px;
  gap: 10px;
  border-radius: ${props => props.theme.borderRadius.medium};
  background-color: ${Color.Neutral_800};
`;

export const Count = styled.span`
  font-size: 12px;
  font-weight: 700;
  color: ${Color.Neutral_0_White};
`;