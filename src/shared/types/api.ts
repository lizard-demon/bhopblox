export type InitResponse = {
  type: "init";
  postId: string;
  username: string;
  worldData: FullWorldData;
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