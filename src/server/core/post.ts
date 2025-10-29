import { context, reddit } from "@devvit/web/server";

export const createPost = async () => {
  const { subredditName } = context;
  if (!subredditName) {
    throw new Error("subredditName is required");
  }

  return await reddit.submitCustomPost({
    splash: {
      appDisplayName: 'bhopblox', 
      backgroundUri: 'default-splash.png',
      buttonLabel: 'Play',
      description: 'Explore 3D voxel worlds',
      heading: 'Voxel World Adventure',
      appIconUri: 'default-icon.png',
    },
    subredditName,
    title: "Voxel World - 3D Adventure Game",
  });
};
