import { GetEntriesResponse, DatabaseEntry } from "../shared/types/api";
import { audioSystem } from "./audio";

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
let engineModule: any = null;

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
        audioSystem.playWorldSelect();
        document.querySelectorAll('.world-item').forEach(el => el.classList.remove('selected'));
        worldItem.classList.add('selected');
        selectedWorld = entry;
        playBtn.textContent = `Play "${entry.title}"`;
        playBtn.disabled = false;
      };

      // Add hover sound
      worldItem.onmouseenter = () => {
        audioSystem.playButtonHover();
      };

      worldList.appendChild(worldItem);
    });
  } catch (error) {
    console.error('Failed to load worlds:', error);
    worldList.innerHTML = '<div class="loading">Failed to load worlds</div>';
  }
}

// Audio event handlers
function setupAudioEvents() {
  // Button hover effects
  playBtn.addEventListener('mouseenter', () => audioSystem.playButtonHover());
  exitBtn.addEventListener('mouseenter', () => audioSystem.playButtonHover());
}

// Initialize app
async function init() {
  title.textContent = "bhopblox";
  await loadWorlds();
  setupAudioEvents();
}

// Load voxel engine
async function loadEngine() {
  if (engineLoaded) return;

  status.textContent = "Loading engine...";
  playBtn.disabled = true;

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
      postRun: [() => {
        engineLoaded = true;
        engineModule = (window as any).Module;
        canvas.classList.remove("loading");
        status.textContent = "Ready";
        console.log("Engine loaded successfully");

        // Load world.dat into WASM memory for blocks[64][64][64]u8 structure
        try {
          // Get blocks memory pointer
          const blocksPtr = (window as any).Module._map();
          // Create view for 64x64x64 u8 array (262,144 bytes)
          const blocksArray = new Uint8Array((window as any).Module.HEAPU8.buffer, blocksPtr, 64 * 64 * 64);

          // Load world.dat file
          fetch('/world.dat')
            .then(r => r.arrayBuffer())
            .then(b => {
              const worldData = new Uint8Array(b);
              blocksArray.set(worldData);
              console.log(`World.dat loaded: ${worldData.length} bytes into blocks[64][64][64]u8`);
            })
            .catch(error => {
              console.error("Failed to load world.dat:", error);
            });
        } catch (error) {
          console.error("Failed to initialize blocks memory:", error);
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

// Event handlers
playBtn.onclick = async () => {
  if (!selectedWorld) {
    audioSystem.playError();
    status.textContent = "Select a world first";
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