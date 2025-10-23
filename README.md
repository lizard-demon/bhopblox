# Voxel World - 3D WebAssembly Game

An immersive 3D voxel world that runs directly inside Reddit posts, powered by WebAssembly technology. Experience a fully interactive 3D environment with first-person exploration, all within your Reddit feed.

## What is This Game?

Voxel World is a 3D voxel-based exploration game that brings interactive 3D gaming directly to Reddit. The game features:

- **3D Voxel World**: A fully rendered 3D environment powered by a WebAssembly engine (voxels.wasm)
- **First-Person Exploration**: Navigate through the world using standard FPS controls
- **WebAssembly Engine**: Powered by a compiled WASM engine with JavaScript bridge for optimal performance
- **Reddit Integration**: Seamlessly integrated with Reddit's platform - no downloads or installations required
- **Personalized Experience**: Automatically greets you with your Reddit username when you launch the app
- **Dynamic Loading**: The voxel engine loads on-demand for optimal performance and faster initial page loads
- **Simplified Interface**: Clean, minimal UI with just Launch and Exit buttons for streamlined gameplay
- **Cross-Platform**: Works on both desktop and mobile browsers with responsive design

The game provides an immersive 3D experience with smooth controls and voxel-based graphics, all running directly in your browser within Reddit posts.

## What Makes This Game Innovative?

### 🎮 **3D Gaming in Reddit Posts**
- **Reddit-Native 3D**: A fully 3D voxel world that runs natively inside Reddit posts
- **WebAssembly Performance**: Leverages a high-performance WASM engine (voxels.wasm) with JavaScript bridge for smooth 3D graphics
- **Zero Installation**: Full 3D gaming experience with no downloads, plugins, or external software required
- **Devvit Platform**: Built on Reddit's official developer platform for seamless integration

### 🌍 **WebAssembly Voxel Technology**
- **WASM Engine**: Built with optimized WebAssembly for smooth 3D rendering
- **Real-time 3D Rendering**: Hardware-accelerated voxel world with smooth performance via HTML5 Canvas
- **Dynamic Engine Loading**: WASM engine loads only when needed, keeping initial load times fast
- **Canvas Integration**: Direct rendering to HTML5 canvas with right-click context menu disabled for gaming

### 🚀 **Seamless Reddit Integration**
- **Native Experience**: Runs directly within Reddit's interface without breaking the user flow
- **User Authentication**: Automatically recognizes and greets Reddit users by their username via `/api/init` endpoint
- **Mobile Optimized**: Responsive design that works on both desktop and mobile Reddit clients
- **Custom Splash Screen**: Engaging splash screen with "Tap to Start" button to invite players to play

### 🎯 **Simple Interface Design**
- **One-Click Launch**: Simple "Launch" button to enter the 3D world instantly
- **Instant Exit**: ESC key or Exit button for immediate return to Reddit
- **Status Feedback**: Clear loading status messages ("Loading...", "Ready!", "Failed to load")
- **Clean UI**: Minimal interface with dark theme and blue accent colors

## How to Play the Game

### Getting Started
1. **Find Voxel World**: Look for Voxel World posts in your Reddit feed or visit the development subreddit
2. **Launch the App**: Click the "Tap to Start" button on the splash screen when you see a Voxel World post
3. **Personal Welcome**: The app will automatically greet you with your Reddit username (e.g., "Welcome [username]!")
4. **Enter the World**: Click the blue "Launch" button to start loading the 3D engine

### Simple Interface
The game features a streamlined interface with just two main states:

#### Menu State
- **Title**: Shows "Voxel World" or personalized greeting with your Reddit username
- **Launch Button**: Blue button to enter the 3D world
- **Status Display**: Shows current loading status ("Ready to play", "Loading...", "Ready!", or "Failed to load")

#### Game State  
- **Full-Screen Canvas**: The 3D voxel world takes up the entire view (90vw × 80vh with blue border)
- **Exit Button**: Red button positioned in top-right corner to return to the menu
- **Black Background**: Full-screen black background for immersive gaming experience

### Loading Process
1. **Engine Initialization**: Click "Launch" to start loading the voxel engine
2. **Status Updates**: Watch the status display for loading progress:
   - "Ready to play" (initial state)
   - "Loading..." (downloading WASM files and initializing engine)
   - "Ready!" (engine loaded successfully)
   - "Failed to load" (if engine fails to initialize)
3. **Automatic Transition**: Game canvas appears automatically when ready
4. **Button State**: Launch button is disabled during loading to prevent multiple attempts

### 3D World Controls

The WebAssembly voxel engine provides full 3D navigation controls. The exact control scheme depends on the WASM engine implementation, but typically includes:

#### Standard FPS Controls
- **Mouse Movement**: Look around in the 3D world
- **Keyboard Input**: Movement controls (likely WASD or arrow keys)
- **Interactive Navigation**: Explore the voxel-based 3D environment

#### Exit Methods
- **ESC Key**: Press Escape at any time to immediately exit the 3D world and return to menu
- **Exit Button**: Click the red "Exit" button in the top-right corner to return to the menu
- **Automatic Return**: Returns you to the main menu with the launch button ready for re-entry

### Game Features
- **3D Voxel Environment**: Explore a voxel-based world rendered in real-time by the WebAssembly engine
- **High-Performance WASM Engine**: Optimized voxels.wasm engine for smooth performance
- **Canvas Rendering**: Direct rendering to HTML5 canvas element with context menu disabled
- **Persistent Engine**: Once loaded, engine stays in memory for instant re-entry
- **Responsive Design**: Adapts to different screen sizes with maximum canvas dimensions (1200×800px)

### Technical Requirements
- **Modern Browser**: Chrome, Firefox, Safari, or Edge with WebAssembly support
- **WebGL Support**: Required for hardware-accelerated 3D graphics rendering
- **WebAssembly Support**: Required for the high-performance voxel engine
- **JavaScript Enabled**: Required for engine loading and Reddit integration
- **Stable Internet**: For initial download of WASM files (voxels.wasm and voxels.js)

### Tips for Best Experience
- **First Launch**: Initial engine load may take time depending on connection speed
- **Loading Patience**: Wait for "Ready!" status before expecting the game to respond
- **Quick Exit**: ESC key provides instant exit if you need to return to Reddit quickly
- **Desktop Recommended**: While mobile-compatible, desktop provides the best control experience
- **Clean Interface**: Minimal UI design keeps focus on the 3D experience

## Technical Architecture

### Frontend Technologies
- **TypeScript**: Type-safe client-side development with strict typing
- **Vite**: Lightning-fast build system and development server
- **HTML5 Canvas**: Hardware-accelerated 3D graphics rendering via canvas element
- **Dynamic Module Loading**: WASM engine loaded on-demand for optimal performance

### WebAssembly Engine
- **WASM Architecture**: High-performance WebAssembly module for 3D rendering
  - **voxels.wasm**: Compiled WebAssembly module for 3D voxel rendering
  - **voxels.js**: JavaScript bridge and loader for WASM integration
- **Dynamic Loading**: WASM module loaded only when user clicks "Launch" for faster initial page load
- **Canvas Integration**: Direct rendering to HTML5 canvas element with id="canvas"
- **Module System**: Uses global `Module` object for WASM configuration and callbacks
- **Context Menu Prevention**: Right-click disabled on canvas (`oncontextmenu="event.preventDefault()"`)

### Backend & Infrastructure
- **Express.js**: RESTful API server with `/api/` endpoints
- **Devvit Platform**: Reddit's official developer platform for hosting and integration
- **Node.js**: Modern JavaScript runtime with WebAssembly support

### Reddit Integration
- **User Authentication**: Automatic Reddit user recognition via `/api/init` endpoint
- **Post Integration**: Runs directly within Reddit posts as webview content
- **Custom Splash Screen**: Configured splash screen with app branding and "Tap to Start" button
- **Native Experience**: No external redirects or separate websites required

## Development Commands

```bash
# Start development with live Reddit integration
npm run dev

# Build optimized production bundles
npm run build

# Deploy to Reddit's platform
npm run deploy

# Publish for community review
npm run launch

# Individual component builds
npm run build:client
npm run build:server
```

## Getting Started for Developers

### Prerequisites
- Node.js 22+ (required for Devvit platform compatibility)
- Modern browser with WebGL and WebAssembly support
- Reddit account for testing

### Setup Instructions
1. Clone this repository
2. Run `npm install` to install dependencies
3. Run `npm run dev` to start development server
4. Visit the provided Reddit playtest URL to test the game

The development server automatically creates a test subreddit where you can interact with the 3D voxel world in real-time.

### WASM Files

#### Pre-compiled Voxel Engine
The 3D voxel engine is pre-compiled and included in the project:
```bash
# WASM files are located in:
src/client/public/voxels.wasm  # Main voxel engine
src/client/public/voxels.js   # JavaScript loader and bridge
src/client/public/snoo.png    # Reddit mascot asset
src/client/public/default-icon.png  # App icon
```

### Development Workflow
1. **Client Development**: Edit files in `src/client/` - changes auto-rebuild
2. **Server Development**: Edit files in `src/server/` - API endpoints auto-reload
3. **Testing**: Use the Reddit playtest URL to test in real Reddit environment
4. **WASM Updates**: Replace WASM files in `src/client/public/` if updating the engine

## Advanced Features

### 3D Voxel World Engine
- **WebAssembly Rendering**: High-performance 3D graphics using WebAssembly engine
- **Interactive Navigation**: 3D world exploration with user controls
- **Dynamic Loading**: WASM engine loads on-demand for optimal startup performance
- **Cross-Platform**: Works seamlessly on desktop and mobile browsers

### WebAssembly Integration
- **WASM Engine**: Optimized WebAssembly module (voxels.wasm) for 3D rendering
- **JavaScript Bridge**: WASM loading with JavaScript bridge (voxels.js) for seamless integration
- **Canvas Rendering**: Direct rendering to HTML5 canvas element with id="canvas"
- **Dynamic Script Loading**: WASM engine loaded via dynamic script injection when needed
- **On-Demand Loading**: Engine files only load when user clicks "Launch" for faster initial page load
- **Context Menu Prevention**: Right-click disabled on canvas for seamless gaming experience
- **Module Configuration**: Uses global `Module` object with `postRun` callbacks for initialization

### Reddit Platform Integration
- **Devvit Platform**: Built on Reddit's official developer platform
- **Native Experience**: Runs directly within Reddit posts with no external dependencies
- **User Authentication**: Automatic Reddit user recognition via server API (`/api/init` endpoint)
- **Custom Splash Screen**: Engaging splash screen with app branding and call-to-action
- **Responsive Design**: Optimized for both desktop and mobile Reddit experiences
- **Zero Installation**: Complete 3D gaming experience with no downloads required

### Technical Implementation
- **Express API**: RESTful `/api/init` endpoint for user authentication and Reddit integration
- **TypeScript**: Full type safety across client, server, and shared code
- **Vite Build System**: Optimized builds for both client and server components
- **Error Handling**: Graceful fallbacks for engine loading failures
- **Clean UI**: Dark theme interface with blue accent colors and minimal design
- **Canvas Management**: Responsive canvas sizing with maximum dimensions and blue border
- **Modular Architecture**: Clean separation between client, server, and shared components

The voxel engine provides a 3D world exploration experience that loads dynamically when users click "Launch", delivering interactive graphics directly within Reddit posts using modern web technologies.
