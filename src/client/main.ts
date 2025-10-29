import { InitResponse, FullWorldData, RemixRequest } from "../shared/types/api";
import { audioSystem } from "./audio";

// DOM elements
const menu = document.getElementById("menu")!;
const game = document.getElementById("game")!;
const status = document.getElementById("status")!;
const playBtn = document.getElementById("play")! as HTMLButtonElement;
const exitBtn = document.getElementById("exit")!;
const canvas = document.getElementById("canvas")!;
const worldInfo = document.getElementById("world-list")!;

// App state
let engineModule: any = null;
let worldData: FullWorldData | null = null;
let username: string = "anonymous";

// Clean up engine resources
function cleanupEngine() {
  engineModule = null;
  delete (window as any).Module;
  document.querySelector('script[src="voxels.js"]')?.remove();
}

// Display world info and leaderboard
function displayWorldInfo(data: FullWorldData) {
  const leaderboardHTML = data.leaderboard.length > 0
    ? data.leaderboard.map((entry, index) => `
        <div class="leaderboard-entry ${entry.username === username ? 'current-user' : ''}">
          <span class="rank">#${index + 1}</span>
          <span class="username">${entry.username}</span>
          <span class="time">${entry.time.toFixed(2)}s</span>
        </div>
      `).join('')
    : '<div class="no-scores">No scores yet - be the first!</div>';

  worldInfo.innerHTML = `
    <div class="world-header">
      <h2>${data.title}</h2>
      <p class="world-description">${data.description}</p>
      <p class="world-author">Created by ${data.author}</p>
    </div>
    
    <div class="leaderboard">
      <h3>🏆 Leaderboard</h3>
      ${leaderboardHTML}
    </div>

    <div class="actions">
      <button id="remix-btn" class="remix-button">🎨 Remix This World</button>
    </div>
  `;

  // Setup remix button
  const remixBtn = document.getElementById("remix-btn")!;
  remixBtn.onclick = showRemixDialog;
  remixBtn.onmouseenter = () => audioSystem.playButtonHover();
}

// Show remix dialog
function showRemixDialog() {
  if (!worldData) return;

  const dialog = document.createElement('div');
  dialog.className = 'remix-dialog';
  dialog.innerHTML = `
    <div class="remix-content">
      <h3>🎨 Remix This World</h3>
      <p>Create your own version of this world!</p>
      
      <div class="form-group">
        <label for="remix-title">Title:</label>
        <input type="text" id="remix-title" value="${worldData.title} - Remix" maxlength="100">
      </div>
       
      <div class="form-group">
        <label for="remix-description">Description:</label>
        <textarea id="remix-description" maxlength="200">${worldData.description}</textarea>
      </div>
      
      <div class="form-actions">
        <button id="create-remix" class="create-button">Create Remix</button>
        <button id="cancel-remix" class="cancel-button">Cancel</button>
      </div>
    </div>
  `;

  document.body.appendChild(dialog);

  const createBtn = document.getElementById("create-remix") as HTMLButtonElement;
  const cancelBtn = document.getElementById("cancel-remix")!;
  const titleInput = document.getElementById("remix-title") as HTMLInputElement;
  const descInput = document.getElementById("remix-description") as HTMLTextAreaElement;

  createBtn.onclick = async () => {
    const title = titleInput.value.trim();
    const description = descInput.value.trim();

    if (!title || !description) {
      alert("Please fill in all fields");
      return;
    }

    createBtn.textContent = "Creating...";
    createBtn.disabled = true;

    try {
      const response = await fetch("/api/remix", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          title,
          description,
          mapData: worldData!.mapData,
          leaderboard: []
        } as RemixRequest)
      });

      const result = await response.json();
      if (result.success) {
        audioSystem.playGameStart();
        showRemixSuccess(result.navigateTo);
      } else {
        throw new Error(result.error);
      }
    } catch (error) {
      console.error("Remix failed:", error);
      audioSystem.playError();
      alert("Failed to create remix. Please try again.");
    } finally {
      document.body.removeChild(dialog);
    }
  };

  cancelBtn.onclick = () => document.body.removeChild(dialog);
  dialog.onclick = (e) => e.target === dialog && document.body.removeChild(dialog);
}

// Show remix success with clickable link
function showRemixSuccess(url: string) {
  const dialog = document.createElement('div');
  dialog.className = 'remix-dialog';
  dialog.innerHTML = `
    <div class="remix-content">
      <h3>🎉 Remix Created!</h3>
      <p>Your world has been created successfully!</p>
      
      <div class="success-link">
        <a href="${url}" target="_top" class="remix-link">
          🚀 Open Your New World
        </a>
      </div>
      
      <div class="form-actions">
        <button id="close-success" class="create-button">Close</button>
      </div>
    </div>
  `;

  document.body.appendChild(dialog);

  const closeBtn = document.getElementById("close-success")!;
  closeBtn.onclick = () => document.body.removeChild(dialog);
  dialog.onclick = (e) => e.target === dialog && document.body.removeChild(dialog);
}

// Initialize app
async function init() {
  try {
    const response = await fetch("/api/init");
    const data: InitResponse = await response.json();

    worldData = data.worldData;
    username = data.username;

    displayWorldInfo(worldData);
    playBtn.textContent = `Play "${worldData.title}"`;
    playBtn.disabled = false;

    // Setup audio events
    playBtn.onmouseenter = () => audioSystem.playButtonHover();
    exitBtn.onmouseenter = () => audioSystem.playButtonHover();
  } catch (error) {
    console.error('Failed to initialize:', error);
    status.textContent = "Failed to load world data";
  }
}

// Load voxel engine
async function loadEngine() {
  if (!worldData || engineModule) return;

  status.textContent = "Loading engine...";
  playBtn.disabled = true;

  // Build state.json dynamically in WASM memory
  const stateData = JSON.stringify({
    local: { player: { username }, state: "speedrun" },
    leaderboard: worldData.leaderboard,
    data: worldData.mapData
  });

  // Switch to game view
  menu.style.display = "none";
  game.style.display = "flex";
  canvas.classList.add("loading");

  await new Promise(resolve => requestAnimationFrame(resolve));

  return new Promise<void>((resolve, reject) => {
    delete (window as any).Module;

    (window as any).Module = {
      canvas,
      preRun: [() => {
        (window as any).Module.FS.writeFile('/state.json', stateData);
      }],
      postRun: [() => {
        engineModule = (window as any).Module;
        canvas.classList.remove("loading");
        status.textContent = "Ready";

        // Setup score callback
        if (engineModule._setScoreCallback) {
          engineModule._setScoreCallback(submitScore);
        }
        resolve();
      }],
      onAbort: reject,
      print: (text: string) => console.log("Engine:", text),
      printErr: (text: string) => console.error("Engine:", text)
    };

    const script = document.createElement("script");
    script.src = "voxels.js";
    script.onerror = reject;
    document.head.appendChild(script);
  });
}

// Submit score to leaderboard
async function submitScore(time: number) {
  try {
    const response = await fetch("/api/leaderboard", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ username, time })
    });

    const result = await response.json();
    if (result.success && worldData) {
      worldData.leaderboard = result.leaderboard;
    }
  } catch (error) {
    console.error("Score submission failed:", error);
  }
}

// Event handlers
playBtn.onclick = async () => {
  if (!worldData) return;

  try {
    audioSystem.playGameStart();
    audioSystem.startAmbient();
    await loadEngine();
  } catch (error) {
    console.error("Engine failed:", error);
    audioSystem.playError();
    audioSystem.stopAmbient();
    status.textContent = "Engine failed to load";
    playBtn.disabled = false;
    menu.style.display = "block";
    game.style.display = "none";
  }
};

exitBtn.onclick = () => {
  audioSystem.playGameExit();
  audioSystem.stopAmbient();
  menu.style.display = "block";
  game.style.display = "none";
  cleanupEngine();
};

// Keyboard shortcuts
document.addEventListener("keydown", (e) => {
  if (e.key === "Escape" && game.style.display === "flex") {
    exitBtn.click();
  }
});

init();