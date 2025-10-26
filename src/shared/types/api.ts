export type InitResponse = {
  type: "init";
  postId: string;
  username: string;
};

export type DatabaseEntry = {
  id: string;
  title: string;
  description: string;
  createdAt: string;
  author: string;
};

export type GetEntriesResponse = {
  entries: DatabaseEntry[];
};