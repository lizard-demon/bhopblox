import express from "express";
import { InitResponse, GetEntriesResponse, DatabaseEntry } from "../shared/types/api";
import { createServer, context, getServerPort, reddit, redis } from "@devvit/web/server";
import { createPost } from "./core/post";

const app = express();
app.use(express.json());

// Sample worlds data
const sampleWorlds = [
  { title: "Crystal Cave", description: "Explore underground caverns", author: "Explorer" },
  { title: "Sky Islands", description: "Build floating structures", author: "Architect" },
  { title: "Ocean Mining", description: "Deep sea operations", author: "Diver" },
  { title: "Volcano Base", description: "Research station setup", author: "Scientist" },
  { title: "Ice Palace", description: "Frozen architecture", author: "Builder" },
  { title: "Desert Oasis", description: "Survival challenge", author: "Survivor" }
];

// Initialize database with sample data
async function initDatabase() {
  try {
    const entriesKey = "voxel_entries";
    const count = await redis.zCard(entriesKey);

    if (count === 0) {
      const baseTime = Date.now();
      
      for (let i = 0; i < sampleWorlds.length; i++) {
        const world = sampleWorlds[i]!;
        const id = `world_${i + 1}`;
        const createdAt = new Date(baseTime - (i * 3600000)).toISOString();

        await redis.hSet(`entry:${id}`, {
          id,
          title: world.title,
          description: world.description,
          createdAt,
          author: world.author
        });

        await redis.zAdd(entriesKey, { member: id, score: -(baseTime - (i * 3600000)) });
      }
    }
  } catch (error) {
    console.error("Database init error:", error);
  }
}

// Get user info
app.get("/api/init", async (_req, res) => {
  try {
    const username = await reddit.getCurrentUsername();
    res.json({
      type: "init",
      postId: context.postId || "unknown",
      username: username || "anonymous",
    } as InitResponse);
  } catch (error) {
    console.error("Init error:", error);
    res.status(500).json({ error: "Failed to initialize" });
  }
});

// Get world entries
app.get("/api/entries", async (_req, res) => {
  try {
    await initDatabase();

    const entriesKey = "voxel_entries";
    const entryIds = await redis.zRange(entriesKey, 0, -1);

    const entries: DatabaseEntry[] = [];
    for (const entryObj of entryIds) {
      const id = typeof entryObj === 'string' ? entryObj : entryObj.member;
      const entryData = await redis.hGetAll(`entry:${id}`);

      if (entryData.id && entryData.title && entryData.description && entryData.createdAt && entryData.author) {
        entries.push({
          id: entryData.id,
          title: entryData.title,
          description: entryData.description,
          createdAt: entryData.createdAt,
          author: entryData.author
        });
      }
    }

    res.json({ entries } as GetEntriesResponse);
  } catch (error) {
    console.error("Get entries error:", error);
    res.status(500).json({ error: "Failed to get entries" });
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