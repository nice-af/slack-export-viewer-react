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
  profile: {
    /** @example "slackbot" */
    first_name: string;
    /** @example "Slackbot" */
    real_name: string;
    /** @example "Slackbot" */
    real_name_normalized: string;
    /** @example "Slackbot" */
    display_name: string;
    /** @example "Slackbot" */
    display_name_normalized: string;
    /** @example "sv41d8cd98f0" */
    avatar_hash: string;
    /** @example "https://a.slack-edge.com/80588/img/slackbot_24.png" */
    image_24: string;
    /** @example "https://a.slack-edge.com/80588/img/slackbot_32.png" */
    image_32: string;
    /** @example "https://a.slack-edge.com/80588/img/slackbot_48.png" */
    image_48: string;
    /** @example "https://a.slack-edge.com/80588/img/slackbot_72.png" */
    image_72: string;
    /** @example "https://a.slack-edge.com/80588/marketing/img/avatars/slackbot/avatar-slackbot.png" */
    image_192: string;
    /** @example "https://a.slack-edge.com/80588/img/slackbot_512.png" */
    image_512: string;
    /** @example "T03997PH1" */
    team: string;
    fields: unknown[];
  };
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
  enterprise_user: {
    id: string;
    enterprise_id: string;
    enterprise_name: string;
    is_admin: boolean;
    is_owner: boolean;
    teams: unknown | null;
  };
}

interface Channel {
  /** @example "CJMS2UQQ3" */
  id: string;
  /** @example 1558698314 */
  created: number;
  is_open: boolean;
  /** @example "1706889298.423619" */
  last_read: string;
  is_group: boolean;
  is_shared: boolean;
  is_im: boolean;
  is_ext_shared: boolean;
  is_org_shared: boolean;
  is_global_shared: boolean;
  is_pending_ext_shared: boolean;
  is_private: boolean;
  is_mpim: boolean;
  unlinked: number;
  /** @example "slack-diamonds" */
  name_normalized: string;
  num_members: number;
  priority: number;
  user: string;
  /** @example ["T03997PH1"] */
  shared_team_ids: string[];
  /** @example "slack-diamonds" */
  name: string;
  /** @example "UE4A2DVDG" */
  creator: string;
  is_archived: boolean;
  /** @example ["U2XECPPV4", "U6338PXAL", "U8EEETZNV", "U9CCTFYM9", "UAZAAN15X", "UE4AADVDG", "UG5AH9JRH", "UNXAUUBSR", "UUAL2U21H", "U018DMAHTRR", "U021EAZVDEC"] */
  members: string[];
  topic: {
    /** @example "whatever you think is funny or weird from our slack universe" */
    value: string;
    /** @example "U9CCTFYM9" */
    creator: string;
    /** @example 1582547827 */
    last_set: number;
  };
  purpose: {
    /** @example "Die besten Slack-Nachricht der Woche für den Weekly Checkout" */
    value: string;
    /** @example "UAZAAN15X" */
    creator: string;
    /** @example 1558698314 */
    last_set: number;
  };
  is_channel: boolean;
  is_general: boolean;
  is_member: boolean;
  /** @example "de-DE" */
  locale: string;
}

interface SlackMessage {
  client_msg_id: string;
  type: string;
  user: string;
  text: string;
  ts: string;
  edited?: {
    user: string;
    ts: string;
  };
  files?: SlackFile[];
  reactions?: Reaction[];
  replace_original: boolean;
  delete_original: boolean;
  metadata: {
    event_type: string;
    event_payload: unknown | null;
  };
  blocks?: Block[];
  user_team: string;
  source_team: string;
  user_profile: UserProfile;
  reply_users_count: number;
}

interface SlackFile {
  id: string;
  created: number;
  timestamp: number;
  name: string;
  title: string;
  mimetype: string;
  image_exif_rotation: number;
  filetype: string;
  pretty_type: string;
  user: string;
  mode: string;
  editable: boolean;
  is_external: boolean;
  external_type: string;
  size: number;
  url: string;
  url_download: string;
  url_private: string;
  url_private_download: string;
  original_h: number;
  original_w: number;
  thumb_64: string;
  thumb_80: string;
  thumb_160: string;
  thumb_360: string;
  thumb_360_gif: string;
  thumb_360_w: number;
  thumb_360_h: number;
  thumb_480: string;
  thumb_480_w: number;
  thumb_480_h: number;
  thumb_720: string;
  thumb_720_w: number;
  thumb_720_h: number;
  thumb_960: string;
  thumb_960_w: number;
  thumb_960_h: number;
  thumb_1024: string;
  thumb_1024_w: number;
  thumb_1024_h: number;
  permalink: string;
  permalink_public: string;
  edit_link: string;
  preview: string;
  preview_highlight: string;
  lines: number;
  lines_more: number;
  is_public: boolean;
  public_url_shared: boolean;
  channels: string[] | null;
  groups: string[] | null;
  ims: string[] | null;
  initial_comment: unknown;
  comments_count: number;
  num_stars: number;
  is_starred: boolean;
  shares: {
    public: unknown | null;
    private: unknown | null;
  };
}

interface Reaction {
  name: string;
  count: number;
  users: string[];
}

interface Block {
  type: string;
  block_id: string;
  elements: Element[];
}

interface Element {
  type: string;
  elements?: Element[];
  text?: string;
  name?: string;
  skin_tone?: number;
  user_id?: string;
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
  channels: Channel[];
} & { [channelName: string]: ChannelData };

export type ChannelData = { [date: string]: SlackMessage[] };
