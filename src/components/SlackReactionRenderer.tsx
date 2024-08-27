import { MessageElement } from '@slack/web-api/dist/types/response/ConversationsHistoryResponse';
import { FC, useContext } from 'react';
import { DataContext } from '../contexts/data.context';

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
      userNames.push(user.profile.display_name!);
    }
  });

  return (
    <span title={userNames?.join(', ')}>
      [{reaction.name} ({reaction.count})]
    </span>
  );
};

export default SlackReactionRenderer;
