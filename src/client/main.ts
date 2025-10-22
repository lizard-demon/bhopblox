import {
  IncrementResponse,
  DecrementResponse,
  InitResponse,
} from "../shared/types/api";
import { navigateTo } from "@devvit/web/client";

// Declare global Module interface for voxel engine
declare global {
  interface Window {
    Module: any;
  }
}

const counterValueElement = document.getElementById(
  "counter-value"
) as HTMLSpanElement;
const incrementButton = document.getElementById(
  "increment-button"
) as HTMLButtonElement;
const decrementButton = document.getElementById(
  "decrement-button"
) as HTMLButtonElement;

const docsLink = document.getElementById("docs-link") as HTMLDivElement;
const playtestLink = document.getElementById("playtest-link") as HTMLDivElement;
const discordLink = document.getElementById("discord-link") as HTMLDivElement;

// WASM elements
const wasmLaunchButton = document.getElementById("wasm-launch") as HTMLButtonElement;
const wasmCloseButton = document.getElementById("wasm-close") as HTMLButtonElement;
const wasmResult = document.getElementById("wasm-result") as HTMLDivElement;
const voxelContainer = document.getElementById("voxel-container") as HTMLDivElement;
const voxelCanvas = document.getElementById("voxel-canvas") as HTMLCanvasElement;

docsLink.addEventListener("click", () => {
  navigateTo("https://developers.reddit.com/docs");
});

playtestLink.addEventListener("click", () => {
  navigateTo("https://www.reddit.com/r/Devvit");
});

discordLink.addEventListener("click", () => {
  navigateTo("https://discord.com/invite/R7yu2wh9Qz");
});

const titleElement = document.getElementById("title") as HTMLHeadingElement;

let currentPostId: string | null = null;
let voxelEngineLoaded = false;

async function fetchInitialCount() {
  try {
    const response = await fetch("/api/init");
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const data = (await response.json()) as InitResponse;
    if (data.type === "init") {
      counterValueElement.textContent = data.count.toString();
      currentPostId = data.postId; // Store postId for later use
      titleElement.textContent = `Hey ${data.username} 👋`;
    } else {
      console.error("Invalid response type from /api/init", data);
      counterValueElement.textContent = "Error";
    }
  } catch (error) {
    console.error("Error fetching initial count:", error);
    counterValueElement.textContent = "Error";
  }
}

async function updateCounter(action: "increment" | "decrement") {
  if (!currentPostId) {
    console.error("Cannot update counter: postId is not initialized.");
    // Optionally, you could try to re-initialize or show an error to the user.
    return;
  }

  try {
    const response = await fetch(`/api/${action}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      // The body can be an empty JSON object or include the postId if your backend expects it,
      // but based on your server code, postId is taken from req.devvit.
      body: JSON.stringify({}),
    });
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const data = (await response.json()) as
      | IncrementResponse
      | DecrementResponse;
    counterValueElement.textContent = data.count.toString();
  } catch (error) {
    console.error(`Error ${action}ing count:`, error);
    // Optionally, display an error message to the user in the UI
  }
}

incrementButton.addEventListener("click", () => updateCounter("increment"));
decrementButton.addEventListener("click", () => updateCounter("decrement"));

// Load voxel engine dynamically
async function loadVoxelEngine(): Promise<void> {
  return new Promise((resolve, reject) => {
    if (voxelEngineLoaded) {
      resolve();
      return;
    }

    wasmResult.textContent = "Loading voxel engine...";
    
    // Set up the Module object for the voxel engine
    (window as any).Module = {
      canvas: voxelCanvas,
      preRun: [],
      postRun: [() => {
        voxelEngineLoaded = true;
        wasmResult.textContent = "Voxel engine loaded successfully!";
        resolve();
      }],
      print: (text: string) => {
        console.log("Voxel Engine:", text);
      },
      printErr: (text: string) => {
        console.error("Voxel Engine Error:", text);
      },
      onAbort: (what: string) => {
        console.error("Voxel Engine Aborted:", what);
        wasmResult.textContent = "Voxel engine failed to load";
        reject(new Error(what));
      }
    };

    const script = document.createElement('script');
    script.src = 'voxels.js';
    script.onload = () => {
      console.log("Voxel engine script loaded");
    };
    script.onerror = () => {
      wasmResult.textContent = "Failed to load voxel engine";
      reject(new Error('Failed to load voxels.js'));
    };
    document.head.appendChild(script);
  });
}

// Launch voxel engine
async function launchVoxelEngine() {
  try {
    wasmLaunchButton.disabled = true;
    
    if (!voxelEngineLoaded) {
      await loadVoxelEngine();
    }
    
    // Show the voxel container
    voxelContainer.style.display = 'flex';
    wasmResult.textContent = "Voxel engine running! Use WASD to move, mouse to look around.";
    
  } catch (error) {
    console.error("Failed to launch voxel engine:", error);
    wasmResult.textContent = "Failed to launch voxel engine";
    wasmLaunchButton.disabled = false;
  }
}

// Close voxel engine
function closeVoxelEngine() {
  voxelContainer.style.display = 'none';
  wasmResult.textContent = "Voxel engine closed. Click Launch to restart.";
  wasmLaunchButton.disabled = false;
}

// Event listeners
wasmLaunchButton.addEventListener("click", launchVoxelEngine);
wasmCloseButton.addEventListener("click", closeVoxelEngine);

// Initialize everything when the page loads
fetchInitialCount();
