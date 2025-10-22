import { InitResponse } from "../shared/types/api";

// Declare global Module interface for voxel engine
declare global {
  interface Window {
    Module: any;
  }
}

// Voxel engine elements
const voxelLaunchButton = document.getElementById("voxel-launch") as HTMLButtonElement;
const voxelCloseButton = document.getElementById("voxel-close") as HTMLButtonElement;
const voxelStatus = document.getElementById("voxel-status") as HTMLDivElement;
const voxelContainer = document.getElementById("voxel-container") as HTMLDivElement;
const voxelCanvas = document.getElementById("voxel-canvas") as HTMLCanvasElement;
const titleElement = document.getElementById("title") as HTMLHeadingElement;

let voxelEngineLoaded = false;

// Initialize user greeting
async function initializeApp() {
  try {
    const response = await fetch("/api/init");
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const data = (await response.json()) as InitResponse;
    if (data.type === "init") {
      titleElement.textContent = `Welcome ${data.username}!`;
    }
  } catch (error) {
    console.error("Error initializing app:", error);
    titleElement.textContent = "Voxel World";
  }
}

// Load voxel engine dynamically
async function loadVoxelEngine(): Promise<void> {
  return new Promise((resolve, reject) => {
    if (voxelEngineLoaded) {
      resolve();
      return;
    }

    voxelStatus.textContent = "Loading voxel engine...";
    voxelStatus.classList.add("loading");
    
    // Set up the Module object for the voxel engine
    (window as any).Module = {
      canvas: voxelCanvas,
      preRun: [],
      postRun: [() => {
        voxelEngineLoaded = true;
        voxelStatus.textContent = "Ready to explore!";
        voxelStatus.classList.remove("loading");
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
        voxelStatus.textContent = "Failed to load voxel engine";
        voxelStatus.classList.remove("loading");
        reject(new Error(what));
      }
    };

    const script = document.createElement('script');
    script.src = 'voxels.js';
    script.onload = () => {
      console.log("Voxel engine script loaded");
    };
    script.onerror = () => {
      voxelStatus.textContent = "Failed to load voxel engine";
      voxelStatus.classList.remove("loading");
      reject(new Error('Failed to load voxels.js'));
    };
    document.head.appendChild(script);
  });
}

// Launch voxel engine
async function launchVoxelEngine() {
  try {
    voxelLaunchButton.disabled = true;
    voxelLaunchButton.textContent = "Loading...";
    
    if (!voxelEngineLoaded) {
      await loadVoxelEngine();
    }
    
    // Show the voxel container
    voxelContainer.style.display = 'flex';
    
    // Hide the launch controls
    const voxelControls = document.getElementById("voxel-controls");
    if (voxelControls) {
      voxelControls.style.display = 'none';
    }
    
  } catch (error) {
    console.error("Failed to launch voxel engine:", error);
    voxelStatus.textContent = "Failed to launch voxel engine";
    voxelLaunchButton.disabled = false;
    voxelLaunchButton.textContent = "Launch Voxel World";
  }
}

// Close voxel engine
function closeVoxelEngine() {
  voxelContainer.style.display = 'none';
  
  // Show the launch controls again
  const voxelControls = document.getElementById("voxel-controls");
  if (voxelControls) {
    voxelControls.style.display = 'flex';
  }
  
  voxelStatus.textContent = "Click to enter the voxel world";
  voxelLaunchButton.disabled = false;
  voxelLaunchButton.textContent = "Launch Voxel World";
}

// Event listeners
voxelLaunchButton.addEventListener("click", launchVoxelEngine);
voxelCloseButton.addEventListener("click", closeVoxelEngine);

// Handle escape key to exit voxel world
document.addEventListener("keydown", (event) => {
  if (event.key === "Escape" && voxelContainer.style.display === 'flex') {
    closeVoxelEngine();
  }
});

// Initialize the app
initializeApp();