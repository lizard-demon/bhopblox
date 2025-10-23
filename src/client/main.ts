import { InitResponse } from "../shared/types/api";

// Elements
const menu = document.getElementById("menu")!;
const game = document.getElementById("game")!;
const title = document.getElementById("title")!;
const status = document.getElementById("status")!;
const launch = document.getElementById("launch")! as HTMLButtonElement;
const exit = document.getElementById("exit")!;
const canvas = document.getElementById("canvas")!;

let loaded = false;

// Get username
fetch("/api/init")
  .then(res => res.json())
  .then((data: InitResponse) => {
    if (data.type === "init") {
      title.textContent = `Welcome ${data.username}!`;
    }
  })
  .catch(() => {
    title.textContent = "Voxel World";
  });

// Load voxel engine
function loadEngine(): Promise<void> {
  return new Promise((resolve, reject) => {
    if (loaded) return resolve();
    
    status.textContent = "Loading...";
    launch.disabled = true;
    
    // Setup WASM module
    (window as any).Module = {
      canvas,
      postRun: [() => {
        loaded = true;
        status.textContent = "Ready!";
        launch.disabled = false;
        resolve();
      }],
      onAbort: reject
    };
    
    // Load script
    const script = document.createElement("script");
    script.src = "voxels.js";
    script.onerror = reject;
    document.head.appendChild(script);
  });
}

// Launch game
launch.onclick = async () => {
  try {
    await loadEngine();
    menu.style.display = "none";
    game.style.display = "flex";
  } catch {
    status.textContent = "Failed to load";
    launch.disabled = false;
  }
};

// Exit game
exit.onclick = () => {
  menu.style.display = "block";
  game.style.display = "none";
};

// ESC to exit
document.onkeydown = (e) => {
  if (e.key === "Escape" && game.style.display === "flex") {
    exit.click();
  }
};