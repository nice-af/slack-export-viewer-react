import { MessageElement } from '@slack/web-api/dist/types/response/ConversationsHistoryResponse';
import { FC, useContext } from 'react';
import { DataContext } from '../contexts/data.context';
import { getProfileName } from '../services/slack.service';
import SlackEmojiRenderer from './SlackEmojiRenderer';
import * as Styled from './SlackReactionRenderer.styles';

interface SlackReactionRendererProps {
  reaction: NonNullable<MessageElement['reactions']>[number];
}

const SlackReactionRenderer: FC<SlackReactionRendererProps> = ({
  reaction,
}) => {
  const { data } = useContext(DataContext);

  const userNames: string[] = [];
  reaction.users?.forEach(userId => {
    const user = data?.users.find(user => user.id === userId);
    if (user) {
      userNames.push(getProfileName(user.profile)!);
    }
  });

  return (
    <Styled.Container title={userNames?.join(', ')}>
      <SlackEmojiRenderer emoji={reaction.name!} />
      <Styled.Count>{reaction.count}</Styled.Count>
    </Styled.Container>
  );
};

export default SlackReactionRenderer;
