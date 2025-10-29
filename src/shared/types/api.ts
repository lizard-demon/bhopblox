export type InitResponse = {
  type: "init";
  postId: string;
  username: string;
  worldData: FullWorldData;
  mode?: "speedrun" | "build";
  isCreator?: boolean;
};

export type WorldData = {
  title: string;
  description: string;
  author: string;
  createdAt: string;
  leaderboard: LeaderboardEntry[];
};

export type WorldMetadata = WorldData;

export type FullWorldData = WorldData & {
  mapData: string;
};

export type LeaderboardEntry = {
  username: string;
  time: number;
};

export type RemixRequest = {
  title: string;
  description: string;
  mapData: string;
  leaderboard: LeaderboardEntry[];
};

export type PublishRequest = {
  title: string;
  description: string;
  mapData: string;
};

export type BuildModeResponse = {
  success: boolean;
  postId?: string;
  navigateTo?: string;
  error?: string;
};