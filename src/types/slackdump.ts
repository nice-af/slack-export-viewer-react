import { Channel } from '@slack/web-api/dist/types/response/ConversationsInfoResponse';
import {
  MessageElement,
  BlockType,
} from '@slack/web-api/dist/types/response/ConversationsHistoryResponse';
import {
  EnterpriseUser,
  Profile,
} from '@slack/web-api/dist/types/response/UsersInfoResponse';

interface User {
  /** @example "USLACKBOT" */
  id: string;
  /** @example "T03997PH1" */
  team_id: string;
  /** @example "slackbot" */
  name: string;
  deleted: boolean;
  /**
   * Hex code, without a leading hash sign
   * @example "757575" */
  color: string;
  /** @example "Slackbot" */
  real_name: string;
  /** @example "America/Los_Angeles" */
  tz: string;
  /** @example "Pacific Daylight Time" */
  tz_label: string;
  /** @example -25200 */
  tz_offset: number;
  profile: Profile;
  is_bot: boolean;
  is_admin: boolean;
  is_owner: boolean;
  is_primary_owner: boolean;
  is_restricted: boolean;
  is_ultra_restricted: boolean;
  is_stranger: boolean;
  is_app_user: boolean;
  is_invited_user: boolean;
  has_2fa: boolean;
  two_factor_type: string | null;
  has_files: boolean;
  presence: string;
  locale: string;
  updated: number;
  enterprise_user: EnterpriseUser;
}

export interface SlackChannel extends Channel {
  is_open: boolean;
  priority: number;
  user: string;
  /** @example ["U2XECPPV4", "U6338PXAL", "U8EEETZNV", "U9CCTFYM9", "UAZAAN15X", "UE4AADVDG", "UG5AH9JRH", "UNXAUUBSR", "UUAL2U21H", "U018DMAHTRR", "U021EAZVDEC"] */
  members: string[];
}

// TODO can we improve the types here?
export interface SlackMessage extends Omit<MessageElement, 'blocks'> {
  type: 'message';
  replace_original: boolean;
  delete_original: boolean;
  blocks?: (SlackMessageUnknownBlock | SlackMessageRichTextBlock)[];
  user_team: string;
  source_team: string;
  user_profile: UserProfile;
}

interface SlackMessageUnknownBlock {
  type: never;
  block_id: string;
  elements: SlackMessageUnknownElement[];
}

export interface SlackMessageRichTextBlock {
  type: BlockType.RichText;
  block_id: string;
  elements: (
    | SlackMessageRichTextTextElement
    | SlackMessageRichTextEmojiElement
    | SlackMessageRichTextUserElement
    | SlackMessageRichTextRichTextSectionElement
  )[];
}

// TODO add more types
interface SlackMessageUnknownElement {
  type: never;
  elements?: SlackMessageUnknownElement[];
  text?: string;
  name?: string;
  skin_tone?: number;
  user_id?: string;
}

export interface SlackMessageRichTextTextElement {
  type: 'text';
  text: string;
}
export interface SlackMessageRichTextEmojiElement {
  type: 'emoji';
  name: string;
  skin_tone?: number;
}
export interface SlackMessageRichTextUserElement {
  type: 'user';
  user_id: string;
}

export interface SlackMessageRichTextRichTextSectionElement {
  type: 'rich_text_section';
  elements: SlackMessageRichTextBlock['elements'];
}

export function isSlackMessageRichTextBlock(
  block: SlackMessageUnknownBlock | SlackMessageRichTextBlock,
): block is SlackMessageRichTextBlock {
  return block.type === 'rich_text';
}

export function isSlackMessageRichTextTextElement(
  element:
    | SlackMessageRichTextTextElement
    | SlackMessageRichTextRichTextSectionElement,
): element is SlackMessageRichTextTextElement {
  return element.type === 'text';
}
export function isSlackMessageRichTextRichTextSectionElement(
  element:
    | SlackMessageRichTextTextElement
    | SlackMessageRichTextRichTextSectionElement,
): element is SlackMessageRichTextRichTextSectionElement {
  return element.type === 'rich_text_section';
}

interface UserProfile {
  avatar_hash: string;
  image_72: string;
  first_name: string;
  real_name: string;
  display_name: string;
  team: string;
  name: string;
  is_restricted: boolean;
  is_ultra_restricted: boolean;
}

export type SlackDumpData = {
  users: User[];
  mpims: unknown[];
  groups: unknown[];
  dms: unknown[];
  channels: SlackChannel[];
} & { [channelName: string]: ChannelData };

export type ChannelData = { [date: string]: SlackMessage[] };
