import { Profile } from '@slack/web-api/dist/types/response/UsersInfoResponse';

export function removeUserFromMessage(message: string): string {
  return message.replace(/<@[A-Z0-9]+>/g, '').trim();
}

export function getProfileName(profile: Profile): string {
  if (profile.display_name) {
    return profile.display_name;
  }
  if (profile.real_name) {
    return profile.real_name;
  }
  if (profile.first_name) {
    return profile.first_name;
  }
  return 'User';
}
