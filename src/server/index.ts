import express from "express";
import { InitResponse, RemixRequest, PublishRequest, BuildModeResponse, WorldMetadata } from "../shared/types/api";
import { createServer, context, getServerPort, reddit, redis } from "@devvit/web/server";
import { createPost, createRemixPost } from "./core/post";

const app = express();
app.use(express.json());

// Default world metadata (lightweight - no map data)
const defaultMetadata: WorldMetadata = {
  title: "Voxel World Adventure",
  description: "Explore and master this 3D voxel world",
  author: "System",
  createdAt: new Date().toISOString(),
  leaderboard: [
    { username: "lizrd_demon", time: 42.5 },
    { username: "TestPlayer123", time: 50.17522 },
    { username: "borg23", time: 58.2 },
    { username: "okpineapple12", time: 61.7 }
  ]
};

// Default map data stored separately in Redis (from original state.json)
const defaultMapData = "/wJBAiIADQIzAA0C/wD/AP8A/wD/AP8A/wD/AP8A/wD/AP8A/wD/AF8AAQIC/zwAAgI+AAICPgACAj4ABAIBAAECAQABAgEAAQIBAAECAQABAgEAAQIBAAECAQABAgEAAQIBAAECAQABAgEAAQIBAAECAQABAgEAAwILAAICAQABAgEAAQIBAAECAQABAgEAAQIBAAUCAwABAgEAAQIBAAECAQABAgEAAQIBAAECAQABAgEAAQIBAAECAQABAgEAAQIBAAECAQABAgEAAQIBAAECAgABAgsAAQIBAAECAQABAgEAAQIBAAECAQABAgEAAQInAAECCwABAjQACwL/AP8A/wD/AP8A/wD/AP8A/wD/AP8A/wD/AP8AIAABAgL/AQABAgEAAgIBAAECAQACAgIAAf8BAAECAQABAgEAAQIDAAH/AQABAgIAAf8BAAECAQABAgEAAwIBAAICAwAB/wIAAf8BAAECAQABAgEAAQICAAH/AQABAgEAAQIBAAICPgACAj4AAgI+AAQCAQABAgEAAQIBAAECAQABAgEAAQIBAAECAQABAgEAAQIBAAECAQABAgEAAQIBAAECAQABAgEAAQIBAAMCCwACAgEAAQIBAAECAQABAgEAAQIBAAECAQAFAgMAAQIBAAECAQABAgEAAQIBAAECAQABAgEAAQIBAAECAQABAgEAAQIBAAECAQABAgEAAQIBAAECAQABAgIAAQILAAECAQABAgEAAQIBAAECAQABAgEAAQIBAAECJwABAgsAAQI0AAsC/wD/AP8A/wD/AP8A/wD/AP8A/wD/AP8A/wD/ACAAAQIC/zwAAgI+AAICPgACAj4ABAIBAAECAQABAgEAAQIBAAECAQABAgEAAQIBAAECAQABAgEAAQIBAAECAQABAgEAAQIBAAECAQABAgEAAwILAAICAQABAgEAAQIBAAECAQABAgEAAQIBAAUCAwABAgEAAQIBAAECAQABAgEAAQIBAAECAQABAgEAAQIBAAECAQABAgEAAQIBAAECAQABAgEAAQIBAAECAgABAgsAAQIBAAECAQABAgEAAQIBAAECAQABAgEAAQInAAECCwABAjQACwL/AP8A/wD/AP8A/wD/AP8A/wD/AP8A/wD/AP8AIAA8AgEAAQIBAD0CAwA9AgMAPQIDAEECIgANAjMADQL/AP8A/wD/AP8A/wD/AP8A/wD/AP8A/wD/AP8AmgABAgMAAQI7AAECAwABAjsAAQIDAAECOwABAgMAAQI7AAECAwABAjwAAwL/AP8A/wD/AP8A/wD/AP8A/wD/AP8A/wD/AP8AygABAgMAAQI7AAECAwABAjsAAQIDAAECOwABAgMAAQI7AAUC/wD/AP8A/wD/AP8A/wD/AP8A/wD/AP8A/wD/AP8ACgABAgEAAf8BAAECOwABAgMAAQI7AAECAwABAjsAAQIDAAECOwABAgMAAQI8AAMC/wD/AP8A/wD/AP8A/wD/AP8A/wD/AP8A/wD/AMoAAQIDAAECOwABAgMAAQI7AAECAwABAjsAAQIDAAECOwAFAv8A/wD/AP8A/wD/AP8A/wD/AP8A/wD/AP8A/wD/AAoAAQIBAAECAQABAjsAAQIDAAECOwABAgMAAQI7AAECAwABAjsAAQIDAAECPAADAv8A/wD/AP8A/wD/AP8A/wD/AP8A/wD/AP8A/wDKAAECAwABAjsAAQIDAAECOwABAgMAAQI7AAECAwABAjsABQL/AP8A/wD/AP8A/wD/AP8A/wD/AP8A/wD/AP8A/wAKAAECAQABAgEAAQI7AAECAwABAjsAAQIDAAECOwABAgMAAQI7AAECAwABAjwAAwL/AP8A/wD/AP8A/wD/AP8A/wD/AP8A/wD/AP8AygABAgMAAQI7AAECAwABAjsAAQIDAAECOwABAgMAAQI7AAUC/wD/AP8A/wD/AP8A/wD/AP8A/wD/AP8A/wD/AP8ACgABAgMAAQI7AAECAwABAjsAAQIDAAECOwABAgMAAQI7AAECAwABAjwAAwL/AP8A/wD/AP8A/wD/AP8A/wD/AP8A/wD/AP8AygABAgEAAf8BAAECOwABAgMAAQI7AAECAwABAjsAAQIDAAECOwAFAv8A/wD/AP8A/wD/AP8A/wD/AP8A/wD/AP8A/wD/AAoAAQIDAAECOwABAgMAAQI7AAECAwABAjsAAQIDAAECOwABAgMAAQI8AAMC/wD/AP8A/wD/AP8A/wD/AP8A/wD/AP8A/wD/AMoAAQIBAAECAQABAjsAAQIDAAECOwABAgMAAQI7AAECAwABAjsABQL/AP8A/wD/AP8A/wD/AP8A/wD/AP8A/wD/AP8A/wAKAAECAwABAjsAAQIDAAECOwABAgMAAQI7AAECAwABAjsAAQIDAAECPAADAv8A/wD/AP8A/wD/AP8A/wD/AP8A/wD/AP8A/wDKAAECAQABAgEAAQI7AAECAwABAjsAAQIDAAECOwABAgMAAQI7AAUC/wD/AP8A/wD/AP8A/wD/AP8A/wD/AP8A/wD/AP8ACgABAgMAAQI7AAECAwABAjsAAQIDAAECOwABAgMAAQI7AAECAwABAjwAAwL/AP8A/wD/AP8A/wD/AP8A/wD/AP8A/wD/AP8AygABAgMAAQI7AAECAwABAjsAAQIDAAECOwABAgMAAQI7AAUC/wD/AP8A/wD/AP8A/wD/AP8A/wD/AP8A/wD/AP8ACgABAgEAAf8BAAECOwABAgMAAQI7AAECAwABAjsAAQIDAAECOwABAgMAAQI8AAMC/wD/AP8A/wD/AP8A/wD/AP8A/wD/AP8A/wD/AMoAAQIDAAECOwABAgMAAQI7AAECAwABAjsAAQIDAAECOwAFAv8A/wD/AP8A/wD/AP8A/wD/AP8A/wD/AP8A/wD/AAoAAQIBAAECAQABAjsAAQIDAAECOwABAgMAAQI7AAECAwABAjsAAQIDAAECPAADAv8A/wD/AP8A/wD/AP8A/wD/AP8A/wD/AP8A/wDKAAECAQABAgEAAQI7AAECAwABAjsAAQIDAAECOwABAgMAAQI7AAUC/wD/AP8A/wD/AP8A/wD/AP8A/wD/AP8A/wD/AP8ACgABAgMAAQI7AAECAwABAjsAAQIDAAECOwABAgMAAQI7AAECAwABAjwAAwL/AP8A/wD/AP8A/wD/AP8A/wD/AP8A/wD/AP8AygABAgMAAQI7AAECAwABAjsAAQIDAAECOwABAgMAAQI7AAUC/wD/AP8A/wD/AP8A/wD/AP8A/wD/AP8A/wD/AP8ACgABAgEAAf8BAAECOwABAgMAAQI7AAECAwABAjsAAQIDAAECOwABAgMAAQI8AAMC/wD/AP8A/wD/AP8A/wD/AP8A/wD/AP8A/wD/AMoAAQIDAAECOwABAgMAAQI7AAECAwABAjsAAQIDAAECOwAFAv8A/wD/AP8A/wD/AP8A/wD/AP8A/wD/AP8A/wD/AAoAAQIBAAECAQABAjsAAQIDAAECOwABAgMAAQI7AAECAwABAjsAAQIDAAECPAADAv8A/wD/AP8A/wD/AP8A/wD/AP8A/wD/AP8A/wDKAAECAwABAjsAAQIDAAECOwABAgMAAQI7AAECAwABAjsABQL/AP8A/wD/AP8A/wD/AP8A/wD/AP8A/wD/AP8A/wAKAAECAQABAgEAAQI7AAECAwABAjsAAQIDAAECOwABAgMAAQI7AAECAwABAjwAAwL/AP8A/wD/AP8A/wD/AP8A/wD/AP8A/wD/AP8AygABAgMAAQI7AAECAwABAjsAAQIDAAECOwABAgMAAQI7AAUC/wD/AP8A/wD/AP8A/wD/AP8A/wD/AP8A/wD/AP8ACgABAgMAAQI7AAECAwABAjsAAQIDAAECOwABAgMAAQI7AAECAwABAjwAAwL/AP8A/wD/AP8A/wD/AP8A/wD/AP8A/wD/AP8AygABAgMAAQI7AAECAwABAjsAAQIDAAECOwABAgMAAQI7AAUC/wD/AP8A/wD/AP8A/wD/AP8A/wD/AP8A/wD/AP8ACgABAgEAAf8BAAECOwABAgMAAQI7AAECAwABAjsAAQIDAAECOwABAgMAAQI8AAMC/wD/AP8A/wD/AP8A/wD/AP8A/wD/AP8A/wD/AMoAAQIDAAECOwABAgMAAQI7AAECAwABAjsAAQIDAAECOwAFAv8A/wD/AP8A/wD/AP8A/wD/AP8A/wD/AP8A/wD/AAoAAQIBAAECAQABAjsAAQIDAAECOwABAgMAAQI7AAECAwABAjsAAQIDAAECPAADAv8A/wD/AP8A/wD/AP8A/wD/AP8A/wD/AP8A/wDKAAECAQABAgEAAQI7AAECAwABAjsAAQIDAAECOwABAgMAAQI7AAUC/wD/AP8A/wD/AP8A/wD/AP8A/wD/AP8A/wD/AP8ACgABAgMAAQI7AAECAwABAjsAAQIDAAECOwABAgMAAQI7AAECAwABAjwAAwL/AP8A/wD/AP8A/wD/AP8A/wD/AP8A/wD/AP8AygABAgEAAQIBAAECOwABAgMAAQI7AAECAwABAjsAAQIDAAECOwAFAv8A/wD/AP8A/wD/AP8A/wD/AP8A/wD/AP8A/wD/AAoAAQIDAAECOwABAgMAAQI7AAECAwABAjsAAQIDAAECOwABAgMAAQI8AAMC/wD/AP8A/wD/AP8A/wD/AP8A/wD/AP8A/wD/AMoAAQIBAAECAQABAjsAAQIDAAECOwABAgMAAQI7AAECAwABAjsABQL/AP8A/wD/AP8A/wD/AP8A/wD/AP8A/wD/AP8A/wAKAAECAwABAjsAAQIDAAECOwABAgMAAQI7AAECAwABAjsAAQIDAAECPAADAv8A/wD/AP8A/wD/AP8A/wD/AP8A/wD/AP8A/wDKAAECAwABAjsAAQIDAAECOwABAgMAAQI7AAECAwABAjsABQL/AP8A/wD/AP8A/wD/AP8A/wD/AP8A/wD/AP8A/wAKAAECAwABAjsAAQIDAAECOwABAgMAAQI7AAECAwABAjsAAQIDAAECPAADAv8A/wD/AP8A/wD/AP8A/wD/AP8A/wD/AP8A/wDKAAECAQAB/wEAAQI7AAECAwABAjsAAQIDAAECOwABAgMAAQI7AAUC/wD/AP8A/wD/AP8A/wD/AP8A/wD/AP8A/wD/AP8ACgABAgMAAQI7AAECAwABAjsAAQIDAAECOwABAgMAAQI7AAECAwABAjwAAwL/AP8A/wD/AP8A/wD/AP8A/wD/AP8A/wD/AP8AygABAgEAAQIBAAECOwABAgMAAQI7AAECAwABAjsAAQIDAAECOwAFAv8A/wD/AP8A/wD/AP8A/wD/AP8A/wD/AP8A/wD/AAoAAQIBAAECAQABAjsAAQIDAAECOwABAgMAAQI7AAECAwABAjsAAQIDAAECPAADAv8A/wD/AP8A/wD/AP8A/wD/AP8A/wD/AP8A/wDKAAECAwABAjsAAQIDAAECOwABAgMAAQI7AAECAwABAjsABQL/AP8A/wD/AP8A/wD/AP8A/wD/AP8A/wD/AP8A/wAKAAECAwABAjsAAQIDAAECOwABAgMAAQI7AAECAwABAjsAAQIDAAECPAADAv8A/wD/AP8A/wD/AP8A/wD/AP8A/wD/AP8A/wDKAAECAQAB/wEAAQI7AAECAwABAjsAAQIDAAECOwABAgMAAQI7AAUC/wD/AP8A/wD/AP8A/wD/AP8A/wD/AP8A/wD/AP8ACgABAgMAAQI7AAECAwABAjsAAQIDAAECOwABAgMAAQI7AAECAwABAjwAAwL/AP8A/wD/AP8A/wD/AP8A/wD/AP8A/wD/AP8AygABAgEAAQIBAAECOwABAgMAAQI7AAECAwABAjsAAQIDAAECOwAFAv8A/wD/AP8A/wD/AP8A/wD/AP8A/wD/AP8A/wD/AAoAAQIDAAECOwABAgMAAQI7AAECAwABAjsAAQIDAAECOwABAgMAAQI8AAMC/wD/AP8A/wD/AP8A/wD/AP8A/wD/AP8A/wD/AI8ACAIzAAECAQABAgEACQIzAAECAwAJAjMAAQIDAAkCMwABAgMACQIzAAUC/wD/AP8A/wD/AP8A/wD/AP8A/wD/AP8A/wD/AM4ABgIB/wECMwABAgMAAgIGAAECMwABAgMAAgIGAAECMwABAgMAAgIGAAECMwABAgMACQIzAAECAwABAjwAAwL/AP8A/wD/AP8A/wD/AP8A/wD/AP8A/wD/AP8AjwAFAgH/AgIzAAECAQABAgEAAgIGAAECMwABAgMAAgIGAAECMwABAgMAAgIGAAECMwABAgMACQIzAAUC/wD/AP8A/wD/AP8A/wD/AP8A/wD/AP8A/wD/AM4ABAIB/zcCAwACAgYANQIDAAICBgA1AgMAAgIGADUCAwBBAv8A/wD/AP8A/wD/AP8A/wD/AP8A/wD/AP8A/wDOAAECAf8BAgH/AwI4AAICPgACAj4AAgI+AAgCAQABAgEAAQIBAAECAQABAgEAAQIBAAECAQABAgEAAQIBAAECAQABAgEAAQIBAAECAQABAgEAAQIBAAECAQABAgEAAQIBAAECAQABAgEAAQIBAAECAQABAgEAAQIBAAECAQABAgEABgIHAAECAQABAgEAAQIBAAECAQABAgEAAQIBAAECAQABAgEAAQIBAAECAQABAgEAAQIBAAECAQABAgEAAQIBAAECAQABAgEAAQIBAAECAQABAgEAAQIBAAECAQABAgEAAQIBAAECAQABAv8A/wD/AP8A/wD/AP8A/wD/AP8A/wD/AP8A/wCUAAECAf8FAgEAAf8CAAECAQACAgEAAf8DAAICAQABAgEAAQIBAAICAQAB/wIAAQIBAAECAQADAgEAAf8CAAECAQABAgEAAf8DAAECAQABAgEAAQIBAAICAQAB/wEAAgI+AAICPgACAj4ACAIBAAECAQABAgEAAQIBAAECAQABAgEAAQIBAAECAQABAgEAAQIBAAECAQABAgEAAQIBAAECAQABAgEAAQIBAAECAQABAgEAAQIBAAECAQABAgEAAQIBAAECAQABAgEAAQIBAAECAQAGAgEAAQIFAAECAQABAgEAAQIBAAECAQABAgEAAQIBAAECAQABAgEAAQIBAAECAQABAgEAAQIBAAECAQABAgEAAQIBAAECAQABAgEAAQIBAAECAQABAgEAAQIBAAECAQABAgEAAQIBAAECAQABAgcAAQI/AAECPwABAj8AAQI/AAECPwABAj8AAQI/AAECPwABAj8AAQI/AAECPwABAj8AAQI/AAECPwABAj8AAQI/AAECPwABAj8AAQI/AAECPwABAj8AAQI/AAECPwABAj8AAQI/AAECPwABAj8AAQI/AAECPwABAj8AAQI/AAECPwABAj8AAQI/AAECPwABAj8AAQI/AAECPwABAj8AAQI/AAECPwABAj8AAQI/AAECPwABAj8AAQI/AAECPwABAj8AAQI/AAECPwABAj8AAQI/AAECPwABAj8AAQI/AAECPwABAj8AAQI+AAECA/8DAjgAAQIB/z4AAQIB/z4AAQIB/z4AAQIB/wEABQIBAAECAQABAgEAAQIBAAECAQABAgEAAQIBAAECAQABAgEAAQIBAAECAQABAgEAAQIBAAECAQABAgEAAQIBAAECAQABAgEAAQIBAAECAQABAgEAAQIBAAECAQABAgEAAQIBAAECAQAGAgH/AQABAgQAAQIBAAECAQABAgEAAQIBAAECAQABAgEAAQIBAAECAQABAgEAAQIBAAECAQABAgEAAQIBAAECAQABAgEAAQIBAAECAQABAgEAAQIBAAECAQABAgEAAQIBAAECAQABAgEAAQIBAAECBgAB/wEAAQI9AAH/AQABAj0AAf8BAAECPQAB/wEAAQI9AAH/AQABAj0AAf8BAAECPQAB/wEAAQI9AAH/AQABAj0AAf8BAAECPQAB/wEAAQI9AAH/AQABAj0AAf8BAAECPQAB/wEAAQI9AAH/AQABAj0AAf8BAAECPQAB/wEAAQI9AAH/AQABAj0AAf8BAAECPQAB/wEAAQI9AAH/AQABAj0AAf8BAAECPQAB/wEAAQI9AAH/AQABAj0AAf8BAAECPQAB/wEAAQI9AAH/AQABAj0AAf8BAAECPQAB/wEAAQI9AAH/AQABAj0AAf8BAAECPQAB/wEAAQI9AAH/AQABAj0AAf8BAAECPQAB/wEAAQI9AAH/AQABAj0AAf8BAAECPQAB/wEAAQI9AAH/AQABAj0AAf8BAAECPQAB/wEAAQI9AAH/AQABAj0AAf8BAAECPQAB/wEAAQI9AAH/AQABAj0AAf8BAAECPQAB/wEAAQI9AAH/AQABAj0AAf8BAAECPQAB/wEAAQI9AAH/AQABAj0AAf8BAAECPQAB/wEAAQI9AAH/AQABAj0AAf8BAAECPQAB/wEAAQI9AAH/AQABAj0AAf8BAAECPQAB/wEAAQI+AD8CAQAB/z4CAQAB/z4CAQAB/z4CAQAB/z4CAQAB/z8AAf8/AAH/PwAB/z8AAf8/AAH/PwAB/z8AAf8/AAH/PwAB/z8AAf8/AAH/PwAB/z8AAf8/AAH/PwAB/z8AAf8/AAH/PwAB/z8AAf8/AAH/PwAB/z8AAf8/AAH/PwAB/z8AAf8/AAH/PwAB/z8AAf8/AAH/PwAB/z8AAf8/AAH/PwAB/z8AAf8/AAH/PwAB/z8AAf8/AAH/PwAB/z8AAf8/AAH/PwAB/z8AAf8/AAH/PwAB/z8AAf8/AAH/PwAB/z8AAf8/AAH/PwAB/z8AAf8/AAH/PwAB/z4AAv8/AAH/PwAB/z8AAf8+AA==";

// Initialize world data
app.get("/api/init", async (_req, res) => {
  try {
    const username = await reddit.getCurrentUsername();
    const postId = context.postId || "unknown";

    // Get metadata from postData or use default
    const metadata = (context.postData?.worldData as WorldMetadata) || defaultMetadata;

    // Check if this is a build mode post (empty leaderboard indicates build mode)
    const isBuildMode = !metadata.leaderboard || metadata.leaderboard.length === 0;
    const isCreator = username === metadata.author;

    // Get map data from Redis
    let mapData = await redis.get(`map:${postId}`);
    if (!mapData) {
      mapData = defaultMapData;
      await redis.set(`map:${postId}`, defaultMapData);
    }

    res.json({
      type: "init",
      postId,
      username: username || "anonymous",
      worldData: { ...metadata, mapData },
      mode: isBuildMode ? "build" : "speedrun",
      isCreator
    } as InitResponse);
  } catch (error) {
    console.error("Init error:", error);
    res.status(500).json({ error: "Failed to initialize" });
  }
});

// Update leaderboard
app.post("/api/leaderboard", async (req, res) => {
  try {
    const { username, time } = req.body;
    if (!username || typeof time !== 'number') {
      return res.status(400).json({ error: "Invalid data" });
    }

    // Get current metadata
    const metadata = { ...(context.postData?.worldData as WorldMetadata) || defaultMetadata };

    // Update leaderboard
    const existingIndex = metadata.leaderboard.findIndex(entry => entry.username === username);
    if (existingIndex >= 0) {
      if (time < metadata.leaderboard[existingIndex]!.time) {
        metadata.leaderboard[existingIndex]!.time = time;
      }
    } else {
      metadata.leaderboard.push({ username, time });
    }

    // Sort and limit to top 10
    metadata.leaderboard.sort((a, b) => a.time - b.time).splice(10);

    // Save to postData
    const post = await reddit.getPostById(context.postId!);
    await post.setPostData({ worldData: metadata });

    res.json({ success: true, leaderboard: metadata.leaderboard });
  } catch (error) {
    console.error("Leaderboard error:", error);
    res.status(500).json({ error: "Failed to update leaderboard" });
  }
});

// Create remix (build mode)
app.post("/api/remix", async (req, res) => {
  try {
    const { title, description, mapData }: RemixRequest = req.body;
    if (!title || !description || !mapData) {
      return res.status(400).json({ error: "Missing fields" });
    }

    const username = await reddit.getCurrentUsername();
    const metadata: WorldMetadata = {
      title,
      description,
      author: username || "Anonymous",
      createdAt: new Date().toISOString(),
      leaderboard: [] // Empty leaderboard indicates build mode
    };

    const post = await createRemixPost(metadata, mapData);
    res.json({
      success: true,
      postId: post.id,
      navigateTo: `https://reddit.com/r/${context.subredditName}/comments/${post.id}`
    });
  } catch (error) {
    console.error("Remix error:", error);
    res.status(500).json({ error: "Failed to create remix" });
  }
});

// Publish from build mode
app.post("/api/publish", async (req, res) => {
  try {
    const { title, description, mapData }: PublishRequest = req.body;
    if (!title || !description || !mapData) {
      return res.status(400).json({ error: "Missing fields" });
    }

    const username = await reddit.getCurrentUsername();
    
    // Verify user is the creator of the current post
    const currentMetadata = (context.postData?.worldData as WorldMetadata) || defaultMetadata;
    if (username !== currentMetadata.author) {
      return res.status(403).json({ error: "Only the creator can publish this world" });
    }

    const metadata: WorldMetadata = {
      title,
      description,
      author: username || "Anonymous",
      createdAt: new Date().toISOString(),
      leaderboard: [
        // Add a dummy entry to indicate this is speedrun mode
        { username: "System", time: 999999 }
      ]
    };

    const post = await createRemixPost(metadata, mapData);
    res.json({
      success: true,
      postId: post.id,
      navigateTo: `https://reddit.com/r/${context.subredditName}/comments/${post.id}`
    } as BuildModeResponse);
  } catch (error) {
    console.error("Publish error:", error);
    res.status(500).json({ error: "Failed to publish world" });
  }
});

// Save map data in build mode
app.post("/api/save-map", async (req, res) => {
  try {
    const { mapData } = req.body;
    if (!mapData) {
      return res.status(400).json({ error: "Missing map data" });
    }

    const username = await reddit.getCurrentUsername();
    const postId = context.postId || "unknown";
    
    // Verify user is the creator
    const metadata = (context.postData?.worldData as WorldMetadata) || defaultMetadata;
    if (username !== metadata.author) {
      return res.status(403).json({ error: "Only the creator can save this world" });
    }

    // Save map data to Redis
    await redis.set(`map:${postId}`, mapData);
    
    res.json({ success: true });
  } catch (error) {
    console.error("Save map error:", error);
    res.status(500).json({ error: "Failed to save map" });
  }
});

// Post creation handlers
app.post("/internal/on-app-install", async (_req, res) => {
  try {
    const post = await createPost();
    res.json({ status: "success", postId: post.id });
  } catch (error) {
    res.status(500).json({ error: "Failed to create post" });
  }
});

app.post("/internal/menu/post-create", async (_req, res) => {
  try {
    const post = await createPost();
    res.json({ navigateTo: `https://reddit.com/r/${context.subredditName}/comments/${post.id}` });
  } catch (error) {
    res.status(500).json({ error: "Failed to create post" });
  }
});

createServer(app).listen(getServerPort());