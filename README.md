# BhopBlox - 3D Voxel World Explorer

An immersive 3D voxel world that runs directly inside Reddit posts, powered by cutting-edge WebAssembly technology. Experience a fully interactive 3D environment with first-person exploration, all within your Reddit feed.

## What is This Game?

BhopBlox is a revolutionary 3D voxel world explorer that brings console-quality gaming directly to Reddit. The game features:

- **3D Voxel World**: A fully rendered 3D environment built with advanced voxel technology
- **First-Person Exploration**: Navigate through the world using standard FPS controls (WASD + mouse)
- **WebAssembly Engine**: Powered by a high-performance Zig-compiled WASM engine for smooth 3D graphics
- **Reddit Integration**: Seamlessly integrated with Reddit's platform - no downloads or installations required
- **Personalized Experience**: Greets you with your Reddit username when you launch the app

The game provides an immersive 3D experience with smooth controls, realistic movement, and stunning voxel-based graphics, all running at 60fps directly in your browser.

## What Makes This Game Innovative?

### 🎮 **Console-Quality 3D in Reddit**
- **First-of-its-Kind**: The first fully 3D voxel world that runs natively inside Reddit posts
- **WebAssembly Performance**: Leverages Zig-compiled WASM for near-native 3D graphics performance
- **Zero Installation**: Full 3D gaming experience with no downloads, plugins, or external software required

### 🌍 **Advanced Voxel Technology**
- **Real-time 3D Rendering**: Hardware-accelerated voxel world with smooth 60fps performance
- **Sokol Graphics**: Built on the powerful Sokol graphics framework for cross-platform compatibility
- **Optimized Pipeline**: Custom rendering pipeline designed specifically for web-based 3D experiences

### 🚀 **Seamless Reddit Integration**
- **Native Experience**: Runs directly within Reddit's interface without breaking the user flow
- **User Authentication**: Automatically recognizes and greets Reddit users by their username
- **Mobile Optimized**: Responsive design that works perfectly on both desktop and mobile Reddit clients

## How to Play the Game

### Getting Started
1. **Find BhopBlox**: Look for BhopBlox posts in your Reddit feed or visit the dedicated subreddit
2. **Launch the App**: Click the "Launch App" button when you see a BhopBlox post
3. **Personal Welcome**: The app will greet you with your Reddit username
4. **Enter the World**: Click "Launch Voxel World" to start your 3D adventure

### 3D World Controls
1. **Movement**: Use WASD keys to move around the voxel world
   - **W**: Move forward
   - **A**: Strafe left
   - **S**: Move backward
   - **D**: Strafe right

2. **Camera Control**: Use your mouse to look around
   - **Mouse Movement**: Look around in all directions
   - **Smooth Rotation**: Natural first-person camera movement

3. **Exit Options**: Multiple ways to leave the 3D world
   - **ESC Key**: Press Escape to quickly exit back to the main menu
   - **Exit Button**: Click "Exit Voxel World" button in the game interface

### Game Features
- **Immersive 3D Environment**: Explore a detailed voxel-based world
- **Smooth Performance**: Optimized for 60fps gameplay on modern browsers
- **Responsive Controls**: Immediate response to keyboard and mouse input
- **Visual Feedback**: Real-time status updates and loading indicators

### Technical Requirements
- **Modern Browser**: Chrome, Firefox, Safari, or Edge (latest versions)
- **WebGL Support**: Required for 3D graphics rendering
- **Keyboard & Mouse**: For optimal control experience
- **Stable Internet**: For initial loading of the WebAssembly engine

### Tips for Best Experience
- **Full Screen**: Use Reddit's full-screen mode for maximum immersion
- **Good Lighting**: Play in a well-lit environment for better visibility
- **Stable Connection**: Ensure good internet connection for smooth loading
- **Modern Device**: Better performance on newer computers and mobile devices

## Technical Architecture

### Frontend Technologies
- **TypeScript**: Type-safe client-side development with strict typing
- **Vite**: Lightning-fast build system and development server
- **WebGL**: Hardware-accelerated 3D graphics rendering
- **HTML5 Canvas**: High-performance graphics surface for 3D rendering

### WebAssembly Engine
- **Zig Voxel Engine**: High-performance 3D voxel world compiled from Zig
- **Sokol Graphics**: Cross-platform graphics framework for optimal performance
- **Dynamic Loading**: WASM modules loaded on-demand for optimal startup time
- **Memory Management**: Efficient memory handling for smooth 3D performance

### Backend & Infrastructure
- **Express.js**: RESTful API server for user data and authentication
- **Redis**: Persistent data storage via Devvit platform
- **Devvit Platform**: Reddit integration and hosting infrastructure
- **Node.js 22+**: Modern JavaScript runtime with WebAssembly support

### Graphics & Rendering
- **Voxel Rendering**: Optimized 3D voxel world with smooth frame rates
- **First-Person Camera**: Smooth mouse-look and WASD movement controls
- **Real-time Graphics**: 60fps 3D rendering directly in the browser
- **Responsive Design**: Optimized for both desktop and mobile experiences

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

# Run code quality checks
npm run check

# Individual component builds
npm run build:client
npm run build:server
```

## Getting Started for Developers

### Prerequisites
- Node.js 22+ (required for WASM and Devvit compatibility)
- Zig compiler (for voxel engine development)
- Go 1.19+ (for WASM mathematical functions)

### Setup Instructions
1. Clone this repository
2. Run `npm install` to install dependencies
3. Run `npm run dev` to start development server
4. Visit the provided Reddit playtest URL to test live

The development server automatically creates a test subreddit where you can interact with the 3D voxel world in real-time.

### WASM Development

#### Voxel Engine (Zig)
The 3D voxel engine is pre-compiled and included in the project:
```bash
# Pre-compiled WASM files are located in:
src/client/public/voxels.wasm  # Main voxel engine
src/client/public/voxels.js   # JavaScript loader
```

#### Additional WASM Modules (Go)
```bash
cd src/wasm
make
# Output: lib.wasm in src/client/public/
```

## Advanced Features

### 3D Voxel World Engine
- **High-Performance Rendering**: Smooth 60fps 3D graphics using WebAssembly
- **Interactive Navigation**: Full first-person movement with WASD + mouse controls
- **Dynamic Loading**: WASM engine loads on-demand for optimal performance
- **Cross-Platform**: Works seamlessly on desktop and mobile browsers

### WebAssembly Integration
- **Zig-Compiled Engine**: High-performance 3D engine compiled from Zig
- **Sokol Graphics**: Industry-standard graphics framework for optimal rendering
- **Memory Efficient**: Optimized memory usage for smooth browser performance
- **Real-time Graphics**: Hardware-accelerated 3D rendering directly in Reddit

### Reddit Platform Integration
- **Native Experience**: Runs directly within Reddit posts with no external dependencies
- **User Authentication**: Automatic Reddit user recognition and personalization
- **Responsive Design**: Optimized for both desktop and mobile Reddit experiences
- **Zero Installation**: Complete 3D gaming experience with no downloads required

The voxel engine provides a complete 3D world exploration experience that loads dynamically when users click "Launch Voxel World", delivering console-quality graphics directly within Reddit posts.
