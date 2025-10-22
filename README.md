# BhopBlox - 3D Voxel Counter Game with WebAssembly Integration

An innovative Reddit-based interactive application that combines a persistent counter with an embedded 3D voxel engine. This app demonstrates the power of WebAssembly integration within the Devvit platform, featuring both traditional web interactions and cutting-edge 3D graphics powered by Zig and WASM4.

## What is This Game?

BhopBlox is a dual-experience application that runs directly inside Reddit posts. It features:

1. **Personal Counter**: A persistent counter tied to your Reddit identity with real-time synchronization
2. **3D Voxel Engine**: An embedded voxel-based 3D world engine built with Zig and compiled to WebAssembly
3. **WASM Integration**: Demonstrates multiple WebAssembly technologies including Go-based mathematical functions

The app provides a clean, mobile-first interface with Reddit's signature styling while showcasing advanced WebAssembly capabilities in a browser environment.

## What Makes This App Innovative?

### 🎮 **Dual WebAssembly Architecture**
- **Zig-Powered Voxel Engine**: Advanced 3D voxel rendering using Zig compiled to WASM with Sokol graphics
- **Go Mathematical Functions**: Separate WASM module for mathematical operations
- **Multi-WASM Integration**: Demonstrates how multiple WebAssembly modules can coexist in a single application
- **3D Graphics in Reddit**: First-class 3D voxel world rendering directly within Reddit posts

### 🌍 **Advanced Voxel World**
- **Real-time 3D Rendering**: Hardware-accelerated voxel world with player movement
- **Physics Simulation**: Player physics and world collision detection
- **Shader-based Graphics**: Custom GLSL shaders for optimized voxel rendering
- **Interactive 3D Environment**: Explorable voxel world with first-person controls

### 🚀 **Reddit-Native Experience**
- **Zero Installation**: Runs directly within Reddit posts - no downloads required
- **Seamless Integration**: Leverages Reddit's authentication and infrastructure
- **Cross-Platform**: Works on desktop and mobile Reddit clients
- **Instant Loading**: Fast startup with optimized WASM modules

### 🔄 **Persistent Data & Real-time Updates**
- **Redis-Powered Storage**: Counter state persists across all sessions
- **User-Specific Data**: Each user's progress tied to their Reddit account
- **Instant Synchronization**: Changes reflected immediately across devices

## How to Play the Game

### Getting Started
1. **Launch the App**: Click the "Launch App" button when you see BhopBlox in your Reddit feed
2. **Personal Welcome**: The app greets you with your Reddit username
3. **Choose Your Experience**: Use the counter or launch the 3D voxel engine

### Counter Controls
1. **Increment Counter**: Click the orange "+" button to increase your counter by 1
2. **Decrement Counter**: Click the orange "-" button to decrease your counter by 1
3. **Persistent Progress**: Your counter value automatically saves and restores

### 3D Voxel Engine
1. **Launch Voxel Engine**: Click "Launch Voxel Engine" to start the 3D experience
2. **3D World Exploration**: Navigate through a procedurally-generated voxel world
3. **First-Person Controls**: Use standard FPS controls to move through the environment
4. **Real-time Rendering**: Experience smooth 3D graphics powered by WebAssembly
5. **Close Engine**: Click "Close Voxel Engine" to return to the main interface

### WASM Integration Testing
- **Mathematical Functions**: Test Go-compiled WASM functions for mathematical operations
- **Performance Benchmarking**: See WebAssembly performance in action
- **Cross-Language Integration**: Observe JavaScript calling WASM functions seamlessly

### Key Features
- **Dual Experience**: Switch between 2D counter interface and 3D voxel world
- **Persistent Storage**: All progress automatically saved to Redis
- **Mobile Optimized**: Responsive design works on all devices
- **Hardware Accelerated**: Uses WebGL for optimal 3D performance
- **Multi-WASM Architecture**: Demonstrates advanced WebAssembly integration patterns

## Technical Architecture

### Frontend Technologies
- **TypeScript**: Type-safe client-side development
- **Vite**: Lightning-fast build system and development server
- **WebGL**: Hardware-accelerated 3D graphics
- **Canvas API**: 2D rendering and UI elements

### WebAssembly Modules
- **Zig Voxel Engine**: 3D world rendering with Sokol graphics framework
- **Go Mathematical Functions**: High-performance computational operations
- **WASM4 Integration**: Optimized WebAssembly runtime

### Backend & Infrastructure
- **Express.js**: RESTful API server
- **Redis**: Persistent data storage
- **Devvit Platform**: Reddit integration and hosting
- **Node.js 22+**: Modern JavaScript runtime

### Graphics & Rendering
- **Custom GLSL Shaders**: Optimized voxel rendering pipeline
- **Sokol Graphics**: Cross-platform graphics abstraction
- **ImGui Integration**: Debug and development UI
- **Real-time Physics**: Player movement and collision detection

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

The development server automatically creates a test subreddit where you can interact with both the counter and 3D voxel engine in real-time.

### WASM Development

#### Voxel Engine (Zig)
```bash
cd bhopblox-wasm4/zig-source
zig build -Doptimize=ReleaseSmall -Dtarget=wasm32-freestanding
# Output: voxels.wasm in src/client/public/
```

#### Mathematical Functions (Go)
```bash
cd src/wasm
make
# Output: lib.wasm in src/client/public/
```

## Advanced Features

### 3D Voxel World
- **Procedural Generation**: Dynamic world creation
- **Optimized Rendering**: Efficient voxel mesh generation
- **Player Physics**: Realistic movement and collision
- **Shader Pipeline**: Custom GLSL for performance

### Multi-WASM Architecture
- **Module Isolation**: Separate WASM modules for different functions
- **Shared Memory**: Efficient data passing between modules
- **Performance Optimization**: Targeted compilation for specific use cases

### Reddit Integration
- **User Authentication**: Seamless Reddit login
- **Post Embedding**: Native Reddit post integration
- **Community Features**: Built for Reddit's social environment### Advanced Voxel Engine (voxels.wasm)
- Sophisticated 3D graphics engine
- Pre-compiled using Sokol graphics library
- Provides full 3D voxel world rendering
- Supports real-time navigation and interaction

The voxel engine is loaded dynamically when the user clicks "Launch Voxel Engine" and provides a complete 3D experience within the Reddit post.
