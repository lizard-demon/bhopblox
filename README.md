# BhopBlox - 3D Voxel World Explorer

An immersive 3D voxel world that runs directly inside Reddit posts, powered by cutting-edge WebAssembly technology. Experience a fully interactive 3D environment with first-person exploration, all within your Reddit feed.

## What is This Game?

BhopBlox is a revolutionary 3D voxel world explorer that brings console-quality gaming directly to Reddit. The game features:

- **3D Voxel World**: A fully rendered 3D environment powered by a high-performance WebAssembly engine (voxels.wasm)
- **First-Person Exploration**: Navigate through the world using standard FPS controls (WASD + mouse look)
- **WebAssembly Engine**: Powered by a compiled WASM engine with JavaScript bridge for optimal performance
- **Reddit Integration**: Seamlessly integrated with Reddit's platform - no downloads or installations required
- **Personalized Experience**: Automatically greets you with your Reddit username when you launch the app
- **Dynamic Loading**: The voxel engine loads on-demand for optimal performance and faster initial page loads
- **Simplified Interface**: Clean, minimal UI with just Launch and Exit buttons for streamlined gameplay
- **Cross-Platform**: Works on both desktop and mobile browsers with responsive design

The game provides an immersive 3D experience with smooth controls, realistic movement, and stunning voxel-based graphics, all running directly in your browser within Reddit posts.

## What Makes This Game Innovative?

### 🎮 **Console-Quality 3D in Reddit**
- **First-of-its-Kind**: The first fully 3D voxel world that runs natively inside Reddit posts
- **WebAssembly Performance**: Leverages a high-performance WASM engine (voxels.wasm) with JavaScript bridge for near-native 3D graphics performance
- **Zero Installation**: Full 3D gaming experience with no downloads, plugins, or external software required
- **Reddit Native**: Runs entirely within Reddit's ecosystem using the Devvit platform

### 🌍 **Advanced Voxel Technology**
- **High-Performance WASM Engine**: Built with optimized WebAssembly for smooth 3D rendering
- **Real-time 3D Rendering**: Hardware-accelerated voxel world with smooth performance via HTML5 Canvas
- **WebGL Graphics**: Built on modern web graphics standards for cross-platform compatibility
- **Optimized Pipeline**: Custom rendering pipeline designed specifically for web-based 3D experiences
- **Dynamic Engine Loading**: WASM engine loads only when needed, keeping initial load times fast

### 🚀 **Seamless Reddit Integration**
- **Native Experience**: Runs directly within Reddit's interface without breaking the user flow
- **User Authentication**: Automatically recognizes and greets Reddit users by their username via `/api/init` endpoint
- **Mobile Optimized**: Responsive design that works perfectly on both desktop and mobile Reddit clients
- **Devvit Platform**: Built on Reddit's official developer platform for maximum compatibility
- **Simplified UI**: Clean interface with just Launch and Exit buttons for immediate gameplay

### 🎯 **Intuitive Controls**
- **One-Click Launch**: Simple "Launch" button to enter the 3D world instantly
- **FPS Controls**: WASD movement with mouse look - just like desktop games
- **Pointer Lock**: Automatic mouse capture for immersive first-person experience
- **Instant Exit**: ESC key or Exit button for immediate return to Reddit

## How to Play the Game

### Getting Started
1. **Find BhopBlox**: Look for BhopBlox posts in your Reddit feed or visit r/bhopblox_dev
2. **Launch the App**: Click the "Launch App" button when you see a BhopBlox post
3. **Personal Welcome**: The app will automatically greet you with your Reddit username
4. **Enter the World**: Click the blue "Launch" button to start loading the 3D engine

### Simple Interface
The game features a streamlined interface with just two main states:

#### Menu State
- **Title**: Shows "Voxel World" or personalized greeting with your Reddit username
- **Launch Button**: Blue button to enter the 3D world
- **Status Display**: Shows current loading status or instructions

#### Game State  
- **Full-Screen Canvas**: The 3D voxel world takes up the entire view
- **Exit Button**: Red button to return to the menu
- **Automatic Controls**: Mouse and keyboard controls activate immediately

### Loading Process
1. **Engine Initialization**: Click "Launch" to start loading the voxel engine
2. **Status Updates**: Watch the status display for loading progress:
   - "Test" (initial state)
   - "Loading..." (downloading WASM files)
   - "Ready!" (engine loaded successfully)
3. **Automatic Transition**: Game canvas appears automatically when ready

### 3D World Controls

#### Movement System
- **W**: Move forward through the voxel world
- **A**: Strafe left (move sideways without turning)
- **S**: Move backward  
- **D**: Strafe right (move sideways without turning)

#### Camera Control System
1. **Automatic Activation**: Mouse look activates immediately when entering the game
2. **Pointer Lock**: Mouse cursor disappears for immersive first-person experience
3. **Mouse Look**: Move your mouse in any direction to look around naturally
4. **Full Control**: Complete 360-degree horizontal and vertical camera movement
5. **Smooth Response**: Immediate response to mouse movement with no lag

#### Exit Methods
- **ESC Key**: Press Escape at any time to immediately exit the 3D world
- **Exit Button**: Click the red "Exit" button to return to the menu
- **Automatic Return**: Returns you to the main menu with the launch button ready

### Game Features
- **Immersive 3D Environment**: Explore a detailed voxel-based world rendered in real-time using Sokol graphics
- **High-Performance WASM Engine**: Optimized voxels.wasm engine compiled from Zig source code for smooth performance
- **Instant Controls**: No need to click canvas - controls activate immediately upon entering the game
- **Smooth Performance**: Optimized WebAssembly engine for consistent frame rates
- **Responsive Controls**: Immediate response to keyboard and mouse input
- **Persistent Engine**: Once loaded, engine stays in memory for instant re-entry

### Technical Requirements
- **Modern Browser**: Chrome, Firefox, Safari, or Edge (latest versions recommended)
- **WebGL Support**: Required for hardware-accelerated 3D graphics rendering
- **WebAssembly Support**: Required for the high-performance voxel engine
- **Keyboard & Mouse**: Essential for movement and camera control
- **Stable Internet**: For initial download of WASM files (voxels.wasm ~several MB)

### Tips for Best Experience
- **First Launch**: Initial engine load may take 10-30 seconds depending on connection speed
- **Immediate Control**: Controls activate instantly - no need to click the canvas
- **Smooth Movement**: Use WASD for movement while moving mouse for camera - just like any FPS game
- **Quick Exit**: ESC key provides instant exit if you need to return to Reddit quickly
- **Mobile Compatibility**: Works on mobile devices but desktop provides the best control experience
- **Clean Interface**: Minimal UI design keeps focus on the 3D experience

## Technical Architecture

### Frontend Technologies
- **TypeScript**: Type-safe client-side development with strict typing
- **Vite**: Lightning-fast build system and development server
- **WebGL**: Hardware-accelerated 3D graphics rendering via HTML5 Canvas
- **Dynamic Module Loading**: WASM engines loaded on-demand for optimal performance

### WebAssembly Engine
- **Single WASM Architecture**: High-performance WebAssembly module for optimal 3D rendering
  - **voxels.wasm**: High-performance 3D voxel renderer with advanced graphics capabilities
  - **voxels.js**: JavaScript bridge and loader for seamless WASM integration
- **Dynamic Loading**: WASM module loaded only when user clicks "Launch" for faster initial page load
- **Canvas Integration**: Direct rendering to HTML5 canvas element with id="canvas"
- **Memory Management**: Efficient WASM memory handling for smooth 3D performance
- **Context Menu Prevention**: Right-click disabled on canvas for seamless gaming experience

### Backend & Infrastructure
- **Express.js**: RESTful API server with `/api/` endpoints
- **Redis**: Persistent data storage via Devvit platform for user data and game state
- **Devvit Platform**: Reddit's official developer platform for hosting and integration
- **Node.js 22+**: Modern JavaScript runtime with full WebAssembly support

### Reddit Integration
- **User Authentication**: Automatic Reddit user recognition via Devvit context
- **Post Integration**: Runs directly within Reddit posts as webview content
- **Subreddit Management**: Automatic test subreddit creation for development (r/bhopblox_dev)
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

# Type checking
npm run type-check

# Individual component builds
npm run build:client
npm run build:server
npm run build:wasm
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
4. Visit the provided Reddit playtest URL (e.g., `https://www.reddit.com/r/bhopblox_dev?playtest=bhopblox`)

The development server automatically creates a test subreddit (`r/bhopblox_dev`) where you can interact with the 3D voxel world in real-time.

### WASM Development

#### Pre-compiled Voxel Engine
The 3D voxel engine is pre-compiled and included in the project:
```bash
# WASM files are located in:
src/client/public/voxels.wasm  # Main voxel engine with 3D graphics capabilities
src/client/public/voxels.js   # JavaScript loader and bridge
src/client/public/snoo.png    # Reddit mascot asset
```

#### Source Code
The voxel engine source code and build artifacts are available in:
```bash
bhopblox-wasm4/zig-source/     # Complete source project
bhopblox-wasm4/wasm/          # Compiled WASM artifacts
```

### Development Workflow
1. **Client Development**: Edit files in `src/client/` - changes auto-rebuild
2. **Server Development**: Edit files in `src/server/` - API endpoints auto-reload
3. **Testing**: Use the Reddit playtest URL to test in real Reddit environment
4. **WASM Updates**: Rebuild WASM modules if modifying engine code

## Advanced Features

### 3D Voxel World Engine
- **High-Performance Rendering**: Smooth 3D graphics using dual WebAssembly engines
- **Interactive Navigation**: Full first-person movement with WASD + mouse controls
- **Dynamic Loading**: WASM engines load on-demand for optimal startup performance
- **Cross-Platform**: Works seamlessly on desktop and mobile browsers

### WebAssembly Integration
- **High-Performance WASM Engine**: Optimized WebAssembly module (voxels.wasm) for smooth 3D rendering
- **JavaScript Bridge**: WASM loading with JavaScript bridge (voxels.js) for seamless integration
- **Canvas Rendering**: Direct rendering to HTML5 canvas element with id="canvas" for optimal performance
- **Memory Efficient**: Optimized WASM memory usage for smooth browser performance
- **Dynamic Script Loading**: WASM engine loaded via dynamic script injection when needed
- **On-Demand Loading**: Engine files only load when user clicks "Launch" for faster initial page load
- **Context Menu Prevention**: Right-click disabled on canvas for seamless gaming experience

### Reddit Platform Integration
- **Devvit Platform**: Built on Reddit's official developer platform
- **Native Experience**: Runs directly within Reddit posts with no external dependencies
- **User Authentication**: Automatic Reddit user recognition via server API (`/api/init` endpoint)
- **Responsive Design**: Optimized for both desktop and mobile Reddit experiences
- **Zero Installation**: Complete 3D gaming experience with no downloads required
- **Test Subreddit**: Automatic development subreddit creation (r/bhopblox_dev)

### Technical Implementation
- **Express API**: RESTful `/api/init` endpoint for user authentication and Reddit integration
- **TypeScript**: Full type safety across client, server, and shared code
- **Vite Build System**: Optimized builds for both client and server components
- **Dynamic Script Loading**: WASM engine loaded via dynamic script injection when needed
- **Simplified UI**: Clean interface with just Launch and Exit buttons for immediate gameplay
- **Canvas ID Management**: Canvas element uses id="canvas" for WASM engine compatibility
- **Modular Architecture**: Clean separation between client, server, and shared components

The voxel engine provides a complete 3D world exploration experience that loads dynamically when users click "Launch", delivering high-quality graphics directly within Reddit posts using modern web technologies. The sophisticated input system with pointer lock creates a true first-person gaming experience that rivals desktop applications.
