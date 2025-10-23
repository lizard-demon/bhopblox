import { InitResponse } from "../shared/types/api";

// Elements
const menu = document.getElementById("menu")!;
const game = document.getElementById("game")!;
const title = document.getElementById("title")!;
const status = document.getElementById("status")!;
const launch = document.getElementById("launch")! as HTMLButtonElement;
const exit = document.getElementById("exit")!;
const canvas = document.getElementById("canvas")!;

let engineLoaded = false;

// Initialize app
async function init() {
  try {
    const response = await fetch("/api/init");
    const data: InitResponse = await response.json();
    title.textContent = `Welcome ${data.username}!`;
  } catch {
    title.textContent = "Voxel World";
  }
}

// Load voxel engine
async function loadEngine() {
  if (engineLoaded) return;
  
  status.textContent = "Loading...";
  launch.disabled = true;
  
  return new Promise<void>((resolve, reject) => {
    // Setup WASM module
    (window as any).Module = {
      canvas,
      postRun: [() => {
        engineLoaded = true;
        status.textContent = "Ready!";
        launch.disabled = false;
        resolve();
      }],
      onAbort: reject
    };
    
    // Load WASM script
    const script = document.createElement("script");
    script.src = "voxels.js";
    script.onerror = reject;
    document.head.appendChild(script);
  });
}

// Event handlers
launch.onclick = async () => {
  try {
    await loadEngine();
    menu.style.display = "none";
    game.style.display = "flex";
  } catch {
    status.textContent = "Failed to load engine";
    launch.disabled = false;
  }
};

exit.onclick = () => {
  menu.style.display = "block";
  game.style.display = "none";
};

// ESC key to exit game
document.addEventListener("keydown", (e) => {
  if (e.key === "Escape" && game.style.display === "flex") {
    exit.click();
  }
});

// Initialize on load
init();