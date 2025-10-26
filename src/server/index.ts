import express from "express";
import { InitResponse, GetEntriesResponse, DatabaseEntry } from "../shared/types/api";
import { createServer, context, getServerPort, reddit, redis } from "@devvit/web/server";
import { createPost } from "./core/post";

const app = express();
app.use(express.json());

// Initialize database with test entries
async function initializeDatabase() {
  try {
    const entriesKey = "voxel_entries";
    const existingEntries = await redis.zCard(entriesKey);
    console.log("Existing entries count:", existingEntries);

    if (existingEntries === 0) {
      console.log("Initializing database with test entries...");

      const testEntries = [
        { title: "Crystal Cave", description: "Explore underground caverns", author: "Explorer" },
        { title: "Sky Islands", description: "Build floating structures", author: "Architect" },
        { title: "Ocean Mining", description: "Deep sea operations", author: "Diver" },
        { title: "Volcano Base", description: "Research station setup", author: "Scientist" },
        { title: "Ice Palace", description: "Frozen architecture", author: "Builder" },
        { title: "Desert Oasis", description: "Survival challenge", author: "Survivor" }
      ];

      const baseTime = Date.now();
      for (let i = 0; i < testEntries.length; i++) {
        const entry = testEntries[i];
        if (!entry) continue;

        const id = `entry_${i + 1}`;
        const createdAt = new Date(baseTime - (i * 3600000)).toISOString();

        console.log(`Creating entry ${id}:`, entry);

        await redis.hSet(`entry:${id}`, {
          id,
          title: entry.title,
          description: entry.description,
          createdAt,
          author: entry.author
        });

        await redis.zAdd(entriesKey, { member: id, score: -(baseTime - (i * 3600000)) });
      }

      console.log("Database initialized successfully");
    } else {
      console.log("Database already has entries, skipping initialization");
    }
  } catch (error) {
    console.error("Database initialization error:", error);
  }
}

// Initialize client with user info
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

// Get database entries
app.get("/api/entries", async (_req, res) => {
  try {
    console.log("Getting entries...");

    // Initialize database if needed (within request context)
    await initializeDatabase();

    const entriesKey = "voxel_entries";
    const entryIds = await redis.zRange(entriesKey, 0, -1);
    console.log("Entry IDs found:", entryIds);

    const entries: DatabaseEntry[] = [];
    for (const entryObj of entryIds) {
      // Extract the member (entry ID) from the zRange result
      const id = typeof entryObj === 'string' ? entryObj : entryObj.member;
      console.log("Processing entry:", id);
      const entryData = await redis.hGetAll(`entry:${id}`);
      console.log("Entry data:", entryData);

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

    console.log("Final entries:", entries);
    res.json({ entries } as GetEntriesResponse);
  } catch (error) {
    console.error("Get entries error:", error);
    res.status(500).json({ error: "Failed to get entries" });
  }
});

// Auto-create post on app install
app.post("/internal/on-app-install", async (_req, res) => {
  try {
    const post = await createPost();
    res.json({ status: "success", postId: post.id });
  } catch (error) {
    console.error("Post creation error:", error);
    res.status(500).json({ error: "Failed to create post" });
  }
});

// Manual post creation from menu
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