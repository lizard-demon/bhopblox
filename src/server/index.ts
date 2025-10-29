import express from "express";
import { InitResponse, RemixRequest, WorldMetadata, FullWorldData, LeaderboardEntry } from "../shared/types/api";
import { createServer, context, getServerPort, reddit, redis } from "@devvit/web/server";
import { createPost, createRemixPost } from "./core/post";

const app = express();
app.use(express.json());

// Default world metadata for new posts (lightweight - no map data)
const defaultWorldMetadata: WorldMetadata = {
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

// Get user info and world data
app.get("/api/init", async (_req, res) => {
  try {
    const username = await reddit.getCurrentUsername();
    const postId = context.postId || "unknown";

    // Get world metadata from context.postData or use default
    let worldMetadata: WorldMetadata;
    if (context.postData && context.postData.worldData && typeof context.postData.worldData === 'object') {
      worldMetadata = context.postData.worldData as WorldMetadata;
    } else {
      worldMetadata = defaultWorldMetadata;
    }

    // Get map data from Redis using postId as key
    let mapData: string;
    try {
      const storedMapData = await redis.get(`map:${postId}`);
      mapData = storedMapData || defaultMapData;
    } catch (error) {
      console.log("No map data found in Redis, using default");
      mapData = defaultMapData;
      // Store default map data for this post
      await redis.set(`map:${postId}`, defaultMapData);
    }

    // Combine metadata and map data
    const fullWorldData: FullWorldData = {
      ...worldMetadata,
      mapData
    };

    res.json({
      type: "init",
      postId,
      username: username || "anonymous",
      worldData: fullWorldData
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
      return res.status(400).json({ error: "Invalid username or time" });
    }

    // Get current world metadata
    let worldMetadata: WorldMetadata;
    if (context.postData && context.postData.worldData && typeof context.postData.worldData === 'object') {
      worldMetadata = JSON.parse(JSON.stringify(context.postData.worldData)) as WorldMetadata;
    } else {
      worldMetadata = JSON.parse(JSON.stringify(defaultWorldMetadata));
    }

    // Update leaderboard
    const existingIndex = worldMetadata.leaderboard.findIndex((entry: LeaderboardEntry) => entry.username === username);
    if (existingIndex >= 0) {
      // Update existing entry if time is better
      if (time < worldMetadata.leaderboard[existingIndex]!.time) {
        worldMetadata.leaderboard[existingIndex]!.time = time;
      }
    } else {
      // Add new entry
      worldMetadata.leaderboard.push({ username, time });
    }

    // Sort by time and keep top 10
    worldMetadata.leaderboard.sort((a: LeaderboardEntry, b: LeaderboardEntry) => a.time - b.time);
    worldMetadata.leaderboard = worldMetadata.leaderboard.slice(0, 10);

    // Save updated metadata to postData (lightweight)
    const post = await reddit.getPostById(context.postId!);
    await post.setPostData({ worldData: worldMetadata });

    res.json({ success: true, leaderboard: worldMetadata.leaderboard });
  } catch (error) {
    console.error("Leaderboard update error:", error);
    res.status(500).json({ error: "Failed to update leaderboard" });
  }
});

// Create remix post
app.post("/api/remix", async (req, res) => {
  try {
    const { title, description, mapData, leaderboard }: RemixRequest = req.body;

    if (!title || !description || !mapData) {
      return res.status(400).json({ error: "Missing required fields" });
    }

    const username = await reddit.getCurrentUsername();

    // Create metadata (lightweight for postData)
    const remixMetadata: WorldMetadata = {
      title,
      description,
      author: username || "Anonymous",
      createdAt: new Date().toISOString(),
      leaderboard: leaderboard || []
    };

    const post = await createRemixPost(remixMetadata, mapData);

    res.json({
      success: true,
      postId: post.id,
      navigateTo: `https://reddit.com/r/${context.subredditName}/comments/${post.id}`
    });
  } catch (error) {
    console.error("Remix creation error:", error);
    res.status(500).json({ error: "Failed to create remix" });
  }
});

// Auto-create post on install
app.post("/internal/on-app-install", async (_req, res) => {
  try {
    const post = await createPost();
    res.json({ status: "success", postId: post.id });
  } catch (error) {
    console.error("Post creation error:", error);
    res.status(500).json({ error: "Failed to create post" });
  }
});

// Manual post creation
app.post("/internal/menu/post-create", async (_req, res) => {
  try {
    const post = await createPost();
    res.json({
      navigateTo: `https://reddit.com/r/${context.subredditName}/comments/${post.id}`,
    });
  } catch (error) {
    console.error("Menu post creation error:", error);
    res.status(500).json({ error: "Failed to create post" });
  }
});

createServer(app).listen(getServerPort());