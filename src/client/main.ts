import { InitResponse, FullWorldData, RemixRequest, PublishRequest, BuildModeResponse } from "../shared/types/api";
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
let gameMode: "speedrun" | "build" = "speedrun";
let isCreator: boolean = false;

// Clean up engine resources
function cleanupEngine() {
  engineModule = null;
  delete (window as any).Module;
  document.querySelector('script[src="voxels.js"]')?.remove();
}

// Display world info in clean format
function displayWorldInfo(data: FullWorldData) {
  if (gameMode === "build") {
    // Build mode interface
    worldInfo.innerHTML = `
      <div class="world-info">
        <h2 class="world-title">${data.title}</h2>
        <p class="world-description">${data.description}</p>
        <p class="world-author">by ${data.author}</p>
        <div class="build-mode-indicator">
          <span class="build-badge">🔨 BUILD MODE</span>
          <p class="build-description">Edit and modify this world. Only you can play it until published.</p>
        </div>
      </div>
      
      ${isCreator ? '<button id="main-publish-btn" class="publish-button">🚀 Publish World</button>' : ''}
    `;

    // Setup publish button if creator
    if (isCreator) {
      const publishBtn = document.getElementById("main-publish-btn")!;
      publishBtn.onclick = showPublishDialog;
      publishBtn.onmouseenter = () => audioSystem.playButtonHover();
    }
  } else {
    // Speedrun mode interface
    const leaderboardHTML = data.leaderboard.length > 0
      ? data.leaderboard.slice(0, 5).map((entry, index) => `
          <div class="leaderboard-entry ${entry.username === username ? 'current-user' : ''}">
            <span class="rank">#${index + 1}</span>
            <span class="username">${entry.username}</span>
            <span class="time">${entry.time.toFixed(2)}s</span>
          </div>
        `).join('')
      : '<div class="no-scores">No scores yet - be the first!</div>';

    worldInfo.innerHTML = `
      <div class="world-info">
        <h2 class="world-title">${data.title}</h2>
        <p class="world-description">${data.description}</p>
        <p class="world-author">by ${data.author}</p>
      </div>
      
      <div class="leaderboard">
        <h3 class="leaderboard-title">🏆 Leaderboard 🏆</h3>
        <div class="leaderboard-list">
          ${leaderboardHTML}
        </div>
      </div>
      
      <button id="main-remix-btn" class="remix-button">🎨 Remix World</button>
    `;

    // Setup main remix button
    const mainRemixBtn = document.getElementById("main-remix-btn")!;
    mainRemixBtn.onclick = showRemixDialog;
    mainRemixBtn.onmouseenter = () => audioSystem.playButtonHover();
  }
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
  dialog.onclick = (e) => {
    if (e.target === dialog) {
      document.body.removeChild(dialog);
    }
  };

  // Prevent dialog from closing when clicking on form elements
  const remixContent = dialog.querySelector('.remix-content')! as HTMLElement;
  remixContent.onclick = (e: Event) => e.stopPropagation();
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
    gameMode = data.mode || "speedrun";
    isCreator = data.isCreator || false;

    displayWorldInfo(worldData);

    // Update play button based on mode
    if (gameMode === "build") {
      playBtn.querySelector('.button-text')!.textContent = isCreator ? "BUILD" : "VIEW";
      if (!isCreator) {
        playBtn.disabled = true;
        status.textContent = "Only the creator can access build mode";
      }
    } else {
      playBtn.querySelector('.button-text')!.textContent = "PLAY";
    }

    if (isCreator || gameMode === "speedrun") {
      playBtn.disabled = false;
    }

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
    local: { player: { username }, state: gameMode },
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

        // Setup callbacks based on mode
        if (gameMode === "speedrun" && engineModule._setScoreCallback) {
          engineModule._setScoreCallback(submitScore);
        }

        // Always setup save callback for build mode
        if (gameMode === "build" && engineModule._setSaveCallback) {
          engineModule._setSaveCallback(saveMapData);
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

// Save map data in build mode
async function saveMapData(mapData: string) {
  try {
    const response = await fetch("/api/save-map", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ mapData })
    });

    const result = await response.json();
    if (result.success && worldData) {
      worldData.mapData = mapData;
      console.log("Map saved successfully");
    }
  } catch (error) {
    console.error("Map save failed:", error);
  }
}

// Show publish dialog
function showPublishDialog() {
  if (!worldData) return;

  const dialog = document.createElement('div');
  dialog.className = 'remix-dialog';
  dialog.innerHTML = `
    <div class="remix-content">
      <h3>🚀 Publish World</h3>
      <p>Make your world public for everyone to play!</p>
      
      <div class="form-group">
        <label for="publish-title">Title:</label>
        <input type="text" id="publish-title" value="${worldData.title}" maxlength="100">
      </div>
       
      <div class="form-group">
        <label for="publish-description">Description:</label>
        <textarea id="publish-description" maxlength="200">${worldData.description}</textarea>
      </div>
      
      <div class="form-actions">
        <button id="confirm-publish" class="create-button">Publish</button>
        <button id="cancel-publish" class="cancel-button">Cancel</button>
      </div>
    </div>
  `;

  document.body.appendChild(dialog);

  const publishBtn = document.getElementById("confirm-publish") as HTMLButtonElement;
  const cancelBtn = document.getElementById("cancel-publish")!;
  const titleInput = document.getElementById("publish-title") as HTMLInputElement;
  const descInput = document.getElementById("publish-description") as HTMLTextAreaElement;

  publishBtn.onclick = async () => {
    const title = titleInput.value.trim();
    const description = descInput.value.trim();

    if (!title || !description) {
      alert("Please fill in all fields");
      return;
    }

    publishBtn.textContent = "Publishing...";
    publishBtn.disabled = true;

    try {
      const response = await fetch("/api/publish", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          title,
          description,
          mapData: worldData!.mapData
        } as PublishRequest)
      });

      const result: BuildModeResponse = await response.json();
      if (result.success) {
        audioSystem.playGameStart();
        showPublishSuccess(result.navigateTo!);
      } else {
        throw new Error(result.error);
      }
    } catch (error) {
      console.error("Publish failed:", error);
      audioSystem.playError();
      alert("Failed to publish world. Please try again.");
    } finally {
      document.body.removeChild(dialog);
    }
  };

  cancelBtn.onclick = () => document.body.removeChild(dialog);
  dialog.onclick = (e) => {
    if (e.target === dialog) {
      document.body.removeChild(dialog);
    }
  };

  // Prevent dialog from closing when clicking on form elements
  const publishContent = dialog.querySelector('.remix-content')! as HTMLElement;
  publishContent.onclick = (e: Event) => e.stopPropagation();
}

// Show publish success
function showPublishSuccess(url: string) {
  const dialog = document.createElement('div');
  dialog.className = 'remix-dialog';
  dialog.innerHTML = `
    <div class="remix-content">
      <h3>🎉 World Published!</h3>
      <p>Your world is now live for everyone to play!</p>
      
      <div class="success-link">
        <a href="${url}" target="_top" class="remix-link">
          🏃 Play Your Published World
        </a>
      </div>
      
      <div class="form-actions">
        <button id="close-publish-success" class="create-button">Close</button>
      </div>
    </div>
  `;

  document.body.appendChild(dialog);

  const closeBtn = document.getElementById("close-publish-success")!;
  closeBtn.onclick = () => document.body.removeChild(dialog);
  dialog.onclick = (e) => e.target === dialog && document.body.removeChild(dialog);
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

exitBtn.onclick = async () => {
  // Auto-save in build mode before exiting
  if (gameMode === "build" && isCreator && engineModule && engineModule._getMapData) {
    try {
      const currentMapData = engineModule._getMapData();
      if (currentMapData && currentMapData !== worldData?.mapData) {
        await saveMapData(currentMapData);
        console.log("Auto-saved map data on exit");
      }
    } catch (error) {
      console.error("Auto-save failed:", error);
    }
  }

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