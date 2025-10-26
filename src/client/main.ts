import { InitResponse, GetEntriesResponse, DatabaseEntry } from "../shared/types/api";

// Elements
const menu = document.getElementById("menu")!;
const game = document.getElementById("game")!;
const title = document.getElementById("title")!;
const status = document.getElementById("status")!;
const launch = document.getElementById("launch")! as HTMLButtonElement;
const exit = document.getElementById("exit")!;
const canvas = document.getElementById("canvas")!;
const entriesList = document.getElementById("entries-list")!

let engineLoaded = false;
let selectedEntry: DatabaseEntry | null = null;

// Load and display database entries
async function loadEntries() {
  entriesList.innerHTML = '<div class="loading">Loading worlds...</div>';
  
  try {
    const response = await fetch("/api/entries");
    const data: GetEntriesResponse = await response.json();
    
    if (data.entries.length === 0) {
      entriesList.innerHTML = '<div class="loading">No worlds found</div>';
      return;
    }
    
    entriesList.innerHTML = '';
    
    data.entries.forEach(entry => {
      const entryElement = document.createElement('div');
      entryElement.className = 'entry-item';
      
      const createdDate = new Date(entry.createdAt).toLocaleDateString();
      
      entryElement.innerHTML = `
        <div class="entry-title">${entry.title}</div>
        <div class="entry-description">${entry.description}</div>
        <div class="entry-meta">By ${entry.author} • ${createdDate}</div>
      `;
      
      entryElement.addEventListener('click', () => {
        // Remove previous selection
        document.querySelectorAll('.entry-item').forEach(el => {
          el.classList.remove('selected');
        });
        
        // Select this entry
        entryElement.classList.add('selected');
        selectedEntry = entry;
        
        // Update launch button text
        launch.textContent = `Launch "${entry.title}"`;
      });
      
      entriesList.appendChild(entryElement);
    });
  } catch (error) {
    console.error('Failed to load entries:', error);
    entriesList.innerHTML = '<div class="loading">Failed to load worlds</div>';
  }
}

// Initialize app
async function init() {
  try {
    const response = await fetch("/api/init");
    const data: InitResponse = await response.json();
    title.textContent = `Welcome ${data.username}!`;
    await loadEntries();
  } catch {
    title.textContent = "Voxel World";
    await loadEntries();
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
  if (!selectedEntry) {
    status.textContent = "Please select a world first";
    return;
  }
  
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