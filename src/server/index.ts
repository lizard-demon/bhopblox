import express from "express";
import { InitResponse } from "../shared/types/api";
import { createServer, context, getServerPort, reddit } from "@devvit/web/server";
import { createPost } from "./core/post";

const app = express();
app.use(express.json());

// Get username for personalization
app.get("/api/init", async (_req, res) => {
  try {
    const username = await reddit.getCurrentUsername();
    res.json({
      type: "init",
      postId: context.postId || "unknown",
      count: 0, // Not used but kept for compatibility
      username: username || "anonymous",
    } as InitResponse);
  } catch (error) {
    console.error("Init error:", error);
    res.status(500).json({ error: "Failed to initialize" });
  }
});

// Create post when app is installed
app.post("/internal/on-app-install", async (_req, res) => {
  try {
    const post = await createPost();
    res.json({ status: "success", postId: post.id });
  } catch (error) {
    console.error("Post creation error:", error);
    res.status(500).json({ error: "Failed to create post" });
  }
});

// Create post from menu
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

const server = createServer(app);
server.listen(getServerPort());