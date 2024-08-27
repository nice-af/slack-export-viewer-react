import { FC } from 'react';
import { useUser } from '../hooks/useUser';

interface SlackRichTextUserProps {
  userId: string;
}

const SlackRichTextUser: FC<SlackRichTextUserProps> = ({ userId }) => {
  const user = useUser(userId);

  if (!user) {
    console.error(`User not found: ${userId}`);
    return null;
  }

  return <span style={{ color: 'blue' }}>@{user.profile.display_name}</span>;
};

export default SlackRichTextUser;
