import { FC } from 'react';
import { useUser } from '../hooks/useUser';
import * as Styled from './AvatarsList.styles';
import { Color } from '../styles/color';

interface AvatarCicleProps {
  userId: string;
  borderColor: Color;
}

const AvatarsCircle: FC<AvatarCicleProps> = ({ userId, borderColor }) => {
  const user = useUser(userId);

  if (!user) {
    return <Styled.EmptyCircle $borderColor={borderColor} />;
  }

  return (
    <Styled.AvatarCircle
      src={user.profile.image_48}
      alt={user.profile.real_name}
      $borderColor={borderColor}
    />
  );
};

interface AvatarListProps {
  userIds: string[];
  backgroundColor: Color;
  othersBackgroundColor?: Color;
  maxAvatars?: number;
}

const AvatarsList: FC<AvatarListProps> = ({
  userIds,
  backgroundColor,
  othersBackgroundColor,
  maxAvatars,
}) => {
  const finalMaxAvatars = maxAvatars ?? 3;
  const finalOthersBackgroundColor = othersBackgroundColor ?? Color.Neutral_800;

  return (
    <Styled.Container>
      {userIds.slice(0, finalMaxAvatars).map(userId => (
        <AvatarsCircle
          borderColor={backgroundColor}
          key={userId}
          userId={userId}
        />
      ))}
      <Styled.OtherUsersCount $backgroundColor={finalOthersBackgroundColor}>
        +{userIds.length - finalMaxAvatars}
      </Styled.OtherUsersCount>
    </Styled.Container>
  );
};

export default AvatarsList;
