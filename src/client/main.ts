import {
  IncrementResponse,
  DecrementResponse,
  InitResponse,
} from "../shared/types/api";
import { navigateTo } from "@devvit/web/client";

// Declare global Go class from wasm_exec.js
declare global {
  class Go {
    importObject: WebAssembly.Imports;
    run(instance: WebAssembly.Instance): void;
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
const wasmButton = document.getElementById("wasm-multiply") as HTMLButtonElement;
const wasmResult = document.getElementById("wasm-result") as HTMLDivElement;

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
let wasmInstance: WebAssembly.Instance | null = null;

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

// Load wasm_exec.js dynamically
async function loadWasmExec(): Promise<void> {
  return new Promise((resolve, reject) => {
    const script = document.createElement('script');
    script.src = 'wasm_exec.js';
    script.onload = () => resolve();
    script.onerror = () => reject(new Error('Failed to load wasm_exec.js'));
    document.head.appendChild(script);
  });
}

// WASM initialization
async function initWasm() {
  try {
    wasmResult.textContent = "Loading WASM...";
    
    // Load wasm_exec.js first
    await loadWasmExec();
    
    const go = new Go();
    
    const result = await WebAssembly.instantiateStreaming(
      fetch("lib.wasm"),
      go.importObject
    );
    
    wasmInstance = result.instance;
    go.run(result.instance);
    
    wasmResult.textContent = "WASM loaded successfully";
    wasmButton.disabled = false;
    
    console.log("WASM loaded successfully");
  } catch (error) {
    console.error("Failed to load WASM:", error);
    wasmResult.textContent = "Failed to load WASM";
    wasmButton.disabled = true;
  }
}

// WASM multiply function
function testWasmMultiply() {
  if (!wasmInstance) {
    wasmResult.textContent = "WASM not loaded";
    return;
  }
  
  try {
    // Access the multiply function from the global scope (set by Go WASM)
    const multiplyFn = (window as any).multiply;
    if (typeof multiplyFn === 'function') {
      const result = multiplyFn(3, 2);
      wasmResult.textContent = `3 × 2 = ${result}`;
      console.log("WASM multiply result:", result);
    } else {
      wasmResult.textContent = "Multiply function not found";
    }
  } catch (error) {
    console.error("Error calling WASM function:", error);
    wasmResult.textContent = "Error calling WASM function";
  }
}

// Event listeners
wasmButton.addEventListener("click", testWasmMultiply);

// Initialize everything when the page loads
fetchInitialCount();
initWasm();
