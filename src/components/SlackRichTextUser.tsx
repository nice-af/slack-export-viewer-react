import { FC } from 'react';
import { useUser } from '../hooks/useUser';
import { getProfileName } from '../services/slack.service';
import * as StyledBroadcast from './Broadcast.styles';

interface SlackRichTextUserProps {
  userId: string;
}

const SlackRichTextUser: FC<SlackRichTextUserProps> = ({ userId }) => {
  const user = useUser(userId);

  if (!user) {
    console.error(`User not found: ${userId}`);
    return null;
  }

  return (
    <StyledBroadcast.Broadcast>
      @{getProfileName(user.profile)}
    </StyledBroadcast.Broadcast>
  );
};

export default SlackRichTextUser;
