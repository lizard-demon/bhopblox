import { InitResponse, GetEntriesResponse, DatabaseEntry } from "../shared/types/api";

// DOM elements
const menu = document.getElementById("menu")!;
const game = document.getElementById("game")!;
const title = document.getElementById("title")!;
const status = document.getElementById("status")!;
const playBtn = document.getElementById("play")! as HTMLButtonElement;
const exitBtn = document.getElementById("exit")!;
const canvas = document.getElementById("canvas")!;
const worldList = document.getElementById("world-list")!;

let engineLoaded = false;
let selectedWorld: DatabaseEntry | null = null;

// Load worlds from server
async function loadWorlds() {
  worldList.innerHTML = '<div class="loading">Loading worlds...</div>';

  try {
    const response = await fetch("/api/entries");
    const data: GetEntriesResponse = await response.json();

    if (data.entries.length === 0) {
      worldList.innerHTML = '<div class="loading">No worlds available</div>';
      return;
    }

    worldList.innerHTML = '';

    data.entries.forEach(entry => {
      const worldItem = document.createElement('div');
      worldItem.className = 'world-item';
      worldItem.innerHTML = `
        <div class="world-title">${entry.title}</div>
        <div class="world-description">${entry.description}</div>
      `;

      worldItem.onclick = () => {
        document.querySelectorAll('.world-item').forEach(el => el.classList.remove('selected'));
        worldItem.classList.add('selected');
        selectedWorld = entry;
        playBtn.textContent = `Play "${entry.title}"`;
        playBtn.disabled = false;
      };

      worldList.appendChild(worldItem);
    });
  } catch (error) {
    console.error('Failed to load worlds:', error);
    worldList.innerHTML = '<div class="loading">Failed to load worlds</div>';
  }
}

// Initialize app
async function init() {
  try {
    const response = await fetch("/api/init");
    const data: InitResponse = await response.json();
    title.textContent = `Welcome ${data.username}!`;
  } catch {
    title.textContent = "Voxel World";
  }
  await loadWorlds();
}

// Load voxel engine
async function loadEngine() {
  if (engineLoaded) return;

  status.textContent = "Loading engine...";
  playBtn.disabled = true;

  return new Promise<void>((resolve, reject) => {
    (window as any).Module = {
      canvas,
      postRun: [() => {
        engineLoaded = true;
        status.textContent = "Ready";
        resolve();
      }],
      onAbort: reject
    };

    const script = document.createElement("script");
    script.src = "voxels.js";
    script.onerror = reject;
    document.head.appendChild(script);
  });
}

// Event handlers
playBtn.onclick = async () => {
  if (!selectedWorld) {
    status.textContent = "Select a world first";
    return;
  }

  try {
    await loadEngine();
    menu.style.display = "none";
    game.style.display = "flex";
  } catch {
    status.textContent = "Failed to load engine";
    playBtn.disabled = false;
  }
};

exitBtn.onclick = () => {
  menu.style.display = "block";
  game.style.display = "none";
};

document.addEventListener("keydown", (e) => {
  if (e.key === "Escape" && game.style.display === "flex") {
    exitBtn.click();
  }
});

init();