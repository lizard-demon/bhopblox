import { context, reddit, redis } from "@devvit/web/server";
import { WorldMetadata } from "../../shared/types/api";

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

export const createRemixPost = async (worldMetadata: WorldMetadata, mapData: string) => {
  const { subredditName } = context;
  if (!subredditName) {
    throw new Error("subredditName is required");
  }

  const post = await reddit.submitCustomPost({
    splash: {
      appDisplayName: 'bhopblox', 
      backgroundUri: 'default-splash.png',
      buttonLabel: 'Play',
      description: worldMetadata.description,
      heading: worldMetadata.title,
      appIconUri: 'default-icon.png',
    },
    subredditName,
    title: `${worldMetadata.title} - Remixed by ${worldMetadata.author}`,
  });

  // Set the lightweight metadata in postData
  const createdPost = await reddit.getPostById(post.id);
  await createdPost.setPostData({ worldData: worldMetadata });

  // Store the heavy map data in Redis using postId as key
  await redis.set(`map:${post.id}`, mapData);

  return post;
};
