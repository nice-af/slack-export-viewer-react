import styled from 'styled-components';
import { Color } from '../styles/color';

export const Container = styled.div`
  max-width: 760px;
  margin: 0 auto;
  background-color: ${Color.Neutral_900};
  border: 1px solid ${Color.Neutral_700};
`;

export const StickyHeader = styled.div`
  position: sticky;
  top: 0;
  z-index: 1;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 12px;
  padding: 14px 24px;
  background-color: ${Color.Neutral_900};
  border-bottom: 1px solid ${Color.Neutral_700};
`;

export const Headline = styled.h1`
  display: inline-block;
  margin: 0;
`;

export const Topic = styled.span`
  display: inline-block;
  font-size: 13px;
  margin-left: 16px;
  color: ${Color.Neutral_300};
`;
