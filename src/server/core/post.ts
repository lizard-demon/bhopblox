import { context, reddit } from "@devvit/web/server";

export const createPost = async () => {
  const { subredditName } = context;
  if (!subredditName) {
    throw new Error("subredditName is required");
  }

  return await reddit.submitCustomPost({
    splash: {
      appDisplayName: 'BhopBlox', 
      backgroundUri: 'default-splash.png',
      buttonLabel: 'Play Now',
      description: 'A 3D voxel world adventure',
      heading: 'Enter the Voxel World',
      appIconUri: 'default-icon.png',
    },
    subredditName,
    title: "BhopBlox - 3D Voxel Adventure",
  });
};
