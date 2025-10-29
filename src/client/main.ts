import { InitResponse, FullWorldData, RemixRequest } from "../shared/types/api";
import { audioSystem } from "./audio";

// DOM elements
const menu = document.getElementById("menu")!;
const game = document.getElementById("game")!;
const title = document.getElementById("title")!;
const status = document.getElementById("status")!;
const playBtn = document.getElementById("play")! as HTMLButtonElement;
const exitBtn = document.getElementById("exit")!;
const canvas = document.getElementById("canvas")!;
const worldInfo = document.getElementById("world-list")!;

let engineLoaded = false;
let engineModule: any = null;
let currentWorldData: FullWorldData | null = null;
let currentUsername: string = "anonymous";

// Force engine reload
function resetEngine() {
  engineLoaded = false;
  engineModule = null;
  delete (window as any).Module;

  // Remove any existing voxels.js script
  const existingScript = document.querySelector('script[src="voxels.js"]');
  if (existingScript) {
    existingScript.remove();
  }
}

// Display world info and leaderboard
function displayWorldInfo(worldData: FullWorldData) {
  worldInfo.innerHTML = `
    <div class="world-header">
      <h2>${worldData.title}</h2>
      <p class="world-description">${worldData.description}</p>
      <p class="world-author">Created by ${worldData.author}</p>
    </div>
    
    <div class="leaderboard">
      <h3>🏆 Leaderboard</h3>
      ${worldData.leaderboard.length > 0 ? 
        worldData.leaderboard.map((entry, index) => `
          <div class="leaderboard-entry ${entry.username === currentUsername ? 'current-user' : ''}">
            <span class="rank">#${index + 1}</span>
            <span class="username">${entry.username}</span>
            <span class="time">${entry.time.toFixed(2)}s</span>
          </div>
        `).join('') : 
        '<div class="no-scores">No scores yet - be the first!</div>'
      }
    </div>

    <div class="actions">
      <button id="remix-btn" class="remix-button">
        🎨 Remix This World
      </button>
    </div>
  `;

  // Add remix button handler
  const remixBtn = document.getElementById("remix-btn") as HTMLButtonElement;
  if (remixBtn) {
    remixBtn.onclick = () => showRemixDialog();
    remixBtn.onmouseenter = () => audioSystem.playButtonHover();
  }
}

// Show remix dialog
function showRemixDialog() {
  const dialog = document.createElement('div');
  dialog.className = 'remix-dialog';
  dialog.innerHTML = `
    <div class="remix-content">
      <h3>🎨 Remix This World</h3>
      <p>Create your own version of this world with custom settings!</p>
      
      <div class="form-group">
        <label for="remix-title">Title:</label>
        <input type="text" id="remix-title" value="${currentWorldData?.title} - Remix" maxlength="100">
      </div>
       
      <div class="form-group">
        <label for="remix-description">Description:</label>
        <textarea id="remix-description" maxlength="200">${currentWorldData?.description}</textarea>
      </div>
      
      <div class="form-actions">
        <button id="create-remix" class="create-button">Create Remix</button>
        <button id="cancel-remix" class="cancel-button">Cancel</button>
      </div>
    </div>
  `;

  document.body.appendChild(dialog);

  // Add event handlers
  const createBtn = document.getElementById("create-remix")!;
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
    (createBtn as HTMLButtonElement).disabled = true;

    try {
      const remixData: RemixRequest = {
        title,
        description,
        mapData: currentWorldData?.mapData || "",
        leaderboard: [] // Start with empty leaderboard for remix
      };

      const response = await fetch("/api/remix", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(remixData)
      });

      const result = await response.json();
      
      if (result.success) {
        audioSystem.playGameStart();
        alert(`Remix created successfully! Opening your new world...`);
        window.open(result.navigateTo, '_blank');
      } else {
        throw new Error(result.error || "Failed to create remix");
      }
    } catch (error) {
      console.error("Remix creation failed:", error);
      audioSystem.playError();
      alert("Failed to create remix. Please try again.");
    } finally {
      document.body.removeChild(dialog);
    }
  };

  cancelBtn.onclick = () => {
    audioSystem.playButtonHover();
    document.body.removeChild(dialog);
  };

  // Close on background click
  dialog.onclick = (e) => {
    if (e.target === dialog) {
      document.body.removeChild(dialog);
    }
  };
}

// Audio event handlers
function setupAudioEvents() {
  playBtn.addEventListener('mouseenter', () => audioSystem.playButtonHover());
  exitBtn.addEventListener('mouseenter', () => audioSystem.playButtonHover());
}

// Initialize app
async function init() {
  try {
    const response = await fetch("/api/init");
    const data: InitResponse = await response.json();
    
    currentWorldData = data.worldData;
    currentUsername = data.username;
    
    title.textContent = "BHOPBLOX";
    displayWorldInfo(currentWorldData);
    setupAudioEvents();
    
    playBtn.textContent = `Play "${currentWorldData.title}"`;
    playBtn.disabled = false;
  } catch (error) {
    console.error('Failed to initialize:', error);
    status.textContent = "Failed to load world data";
  }
}

// Load voxel engine
async function loadEngine() {
  if (engineLoaded) return;

  status.textContent = "Loading world data...";
  playBtn.disabled = true;

  // Create dynamic state.json from current world data
  const stateData = JSON.stringify({
    local: {
      player: {
        username: currentUsername
      },
      state: "speedrun"
    },
    leaderboard: currentWorldData?.leaderboard || [],
    data: currentWorldData?.mapData || ""
  });

  status.textContent = "Loading engine...";

  // Ensure canvas is visible and properly sized before initializing
  menu.style.display = "none";
  game.style.display = "flex";
  canvas.classList.add("loading");

  // Wait for next frame to ensure layout is complete
  await new Promise(resolve => requestAnimationFrame(resolve));

  // Force a layout reflow to ensure canvas dimensions are calculated
  const rect = canvas.getBoundingClientRect();
  console.log("Canvas dimensions:", rect.width, "x", rect.height);

  return new Promise<void>((resolve, reject) => {
    // Clear any existing Module
    delete (window as any).Module;

    (window as any).Module = {
      canvas,
      preRun: [() => {
        // Write dynamic state.json into Emscripten filesystem
        (window as any).Module.FS.writeFile('/state.json', stateData);
        console.log(`Dynamic state.json written: ${stateData.length} characters`);
      }],
      postRun: [() => {
        engineLoaded = true;
        engineModule = (window as any).Module;
        canvas.classList.remove("loading");
        status.textContent = "Ready";
        console.log("Engine loaded successfully");

        // Set up score submission callback
        if (typeof (window as any).Module._setScoreCallback === 'function') {
          (window as any).Module._setScoreCallback((time: number) => {
            submitScore(time);
          });
        }

        resolve();
      }],
      onAbort: (error: any) => {
        console.error("Engine aborted:", error);
        reject(error);
      },
      onRuntimeInitialized: () => {
        console.log("Engine runtime initialized");
      },
      print: (text: string) => {
        console.log("Engine:", text);
      },
      printErr: (text: string) => {
        console.error("Engine error:", text);
      }
    };

    const script = document.createElement("script");
    script.src = "voxels.js";
    script.onerror = (error) => {
      canvas.classList.remove("loading");
      console.error("Failed to load voxels.js:", error);
      reject(error);
    };
    document.head.appendChild(script);
  });
}

// Submit score to leaderboard
async function submitScore(time: number) {
  try {
    const response = await fetch("/api/leaderboard", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ username: currentUsername, time })
    });

    const result = await response.json();
    if (result.success) {
      console.log("Score submitted successfully:", time);
      // Update local leaderboard data
      if (currentWorldData) {
        currentWorldData.leaderboard = result.leaderboard;
      }
    }
  } catch (error) {
    console.error("Failed to submit score:", error);
  }
}

// Event handlers
playBtn.onclick = async () => {
  if (!currentWorldData) {
    audioSystem.playError();
    status.textContent = "World data not loaded";
    return;
  }

  try {
    audioSystem.playGameStart();
    audioSystem.startAmbient();
    await loadEngine();
    // Engine loading now handles the display switching

    // If engine loaded but canvas is still blank, try to refresh it
    setTimeout(() => {
      if (engineModule && typeof engineModule._refresh === 'function') {
        try {
          engineModule._refresh();
        } catch (e) {
          console.warn("Engine refresh failed:", e);
        }
      }
    }, 100);

  } catch (error) {
    console.error("Engine loading failed:", error);
    audioSystem.playError();
    audioSystem.stopAmbient();
    status.textContent = "Failed to load engine";
    playBtn.disabled = false;
    // Revert display if loading failed
    menu.style.display = "block";
    game.style.display = "none";
  }
};

exitBtn.onclick = () => {
  audioSystem.playGameExit();
  audioSystem.stopAmbient();

  // Clean up engine if needed
  if (engineModule && typeof engineModule._cleanup === 'function') {
    try {
      engineModule._cleanup();
    } catch (e) {
      console.warn("Engine cleanup failed:", e);
    }
  }

  menu.style.display = "block";
  game.style.display = "none";

  // Reset engine for next load to avoid blank screen issue
  resetEngine();
};

document.addEventListener("keydown", (e) => {
  if (e.key === "Escape" && game.style.display === "flex") {
    exitBtn.click();
  }

  // Debug: Press 'R' to force engine reload
  if (e.key === "r" || e.key === "R") {
    if (game.style.display === "flex") {
      console.log("Force reloading engine...");
      resetEngine();
      loadEngine().catch(console.error);
    }
  }
});

// Handle window resize to ensure canvas stays properly sized
window.addEventListener("resize", () => {
  if (game.style.display === "flex" && engineLoaded) {
    // Force canvas to recalculate its size
    canvas.style.width = "";
    canvas.style.height = "";
    // Trigger a reflow
    canvas.offsetWidth;
  }
});

init();