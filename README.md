# bhopblox - Minecraft-Style Voxel World Browser

A Minecraft-inspired voxel world browser that runs directly inside Reddit posts, featuring authentic block aesthetics, WebAssembly-powered 3D engine infrastructure, and generative ambient audio. Browse and select from 6 unique voxel worlds through an immersive block-style interface with complete Minecraft visual theming.

## What is This Game?

bhopblox is a Minecraft-style voxel world browser that brings authentic block world aesthetics directly to Reddit. The game features:

- **Authentic Minecraft Interface**: Complete block-textured interface with dirt/grass backgrounds, stone panels, and pixelated styling that perfectly recreates the Minecraft aesthetic
- **6 Unique Voxel Worlds**: Curated collection including Crystal Cave, Sky Islands, Ocean Mining, Volcano Base, Ice Palace, and Desert Oasis - each with detailed descriptions and author information
- **Interactive World Selection System**: Browse worlds through an elegant stone-panel interface with hover effects, selection highlighting, and block-style borders
- **WebAssembly 3D Engine Infrastructure**: High-performance WASM voxel engine (voxels.wasm + voxels.js) with proper memory management and canvas rendering
- **Generative Audio System**: Dynamic ambient music with evolving harmonic layers across multiple musical scales (pentatonic, Japanese, Hirajoshi), plus contextual sound effects for every interaction
- **Reddit Native Integration**: Seamlessly integrated with Reddit's platform - no downloads or installations required, runs directly in posts
- **Persistent World Database**: Redis-backed database storing world metadata, descriptions, creation dates, and author information
- **Cross-Platform Design**: Works on both desktop and mobile browsers with responsive design optimized for Reddit's interface
- **Complete Audio Experience**: Every hover, click, and selection has unique audio feedback with procedural ambient music that evolves during gameplay

The game provides an immersive Minecraft-style world browsing experience, combining authentic block aesthetics with modern web technologies and sophisticated audio design.

## What Makes This Game Innovative?

### 🧱 **Authentic Minecraft Block Experience in Reddit**
- **Complete Block Simulation**: Full Minecraft-style aesthetic with authentic dirt/grass backgrounds, stone panel textures, and pixelated rendering
- **Block-Perfect Visual Design**: Stone-textured panels with 3D block button effects, authentic Minecraft styling, and proper block borders
- **Minecraft Typography**: Courier New monospace fonts with pixelated text shadows for authentic blocky game styling
- **Responsive Block Design**: Adaptive interface that maintains Minecraft block aesthetics across all screen sizes while preserving the authentic feel
- **First-of-its-Kind**: A fully immersive Minecraft-style interface that runs natively inside Reddit posts without breaking the block aesthetic

### 🌍 **Curated Voxel World Selection System**
- **Interactive World Browser**: Browse and select from 6 unique pre-loaded voxel worlds through the "◦ SELECT DIMENSION ◦" interface
- **Rich World Metadata**: Each world includes detailed descriptions and author information stored in Redis database (Explorer, Architect, Diver, Scientist, Builder, Survivor)
- **Visual Selection Interface**: Click-to-select with bright green highlighting and hover effects for intuitive world browsing within stone panels
- **Dynamic Launch System**: "INITIALIZE WORLD" button updates to show selected world (e.g., "Play 'Crystal Cave'") with authentic Minecraft button styling
- **Persistent World Database**: Redis-backed storage ensures worlds persist across sessions and users with proper data validation
- **Selection Validation**: Must select a world before launching - shows error message with audio feedback if attempting to launch without selection

### ⚡ **WebAssembly 3D Engine Infrastructure**
- **WASM Engine Architecture**: High-performance WebAssembly module (voxels.wasm) with JavaScript bridge (voxels.js) for 3D voxel rendering
- **Dynamic Engine Loading**: WASM voxel engine loads on-demand with automatic cleanup and force reload capabilities (R key for manual reset)
- **Canvas Integration**: HTML5 canvas with WebGL acceleration for immersive voxel world display (responsive sizing up to 1000x650px)
- **Memory Management**: Efficient WASM memory management with proper initialization, cleanup between sessions, and error handling
- **Engine State Management**: Real-time status updates ("Loading engine...", "Ready", error states) with graceful fallback to block interface
- **Ready for Expansion**: Engine infrastructure is prepared for future voxel world content and interactive features

### 🤝 **Seamless Social Gaming Integration**
- **Reddit Native Gaming**: Runs directly within Reddit's interface without breaking user flow or requiring external sites
- **Social Context Preservation**: Maintains Reddit post context while providing immersive Minecraft-style world browsing experience
- **Mobile-First Design**: Responsive interface optimized for Reddit's mobile user base with touch-friendly controls and adaptive block styling
- **Instant Access**: No account creation or separate login required - uses existing Reddit authentication seamlessly
- **Auto-Installation**: Automatically creates posts on app install with manual creation option for moderators

### 🎵 **Advanced Generative Audio System**
- **Dynamic Ambient Music**: Procedurally generated ambient soundscapes with evolving harmonic layers using Web Audio API
- **Interactive Sound Effects**: Contextual audio feedback for hover, select, launch, exit, and error states with distinct tonal signatures
- **Multiple Musical Scales**: Evolving between major pentatonic, minor pentatonic, Japanese, and Hirajoshi scales with 30% chance of scale changes
- **Layered Audio Architecture**: Separate gain nodes for ambient music (15% volume) and sound effects (40% volume) with master volume control
- **Automatic Audio Initialization**: Audio system activates on first user interaction to comply with browser policies
- **Frequency Modulation**: Subtle LFO effects (0.1-0.4 Hz) on ambient tones for organic, evolving soundscapes
- **Harmonic Layering**: Multiple oscillators (sine, triangle, sawtooth) create rich textures with lowpass filtering (800-2000Hz)
- **Temporal Evolution**: Ambient layers evolve every 8-12 seconds with 15-35 second durations for continuous musical development

## How to Play the Game

### Getting Started
1. **Find bhopblox**: Look for bhopblox posts in your Reddit feed or visit the development subreddit
2. **Launch the App**: Click the "Play" button on the splash screen when you see a bhopblox post
3. **Enter the Block Interface**: You'll be immersed in a complete Minecraft-style block world selection experience
4. **Experience the Atmosphere**: Enjoy the authentic block textures, pixelated styling, and generative ambient music

### The Minecraft-Style Block Interface

The game presents itself as an authentic Minecraft-style interface with complete block world aesthetics:

#### Block World Visual Elements
- **Authentic Block Background**: Complete Minecraft-style dirt/grass background with repeating 16x16 block patterns and overlay grid
- **Stone Panel Interface**: Elegant stone-textured panels with authentic Minecraft 3D block borders (white top/left, dark bottom/right)
- **Pixelated Rendering**: All elements use `image-rendering: pixelated` for authentic blocky appearance
- **Block Typography**: Courier New monospace fonts with pixelated text shadows for authentic game styling
- **Minecraft Color Palette**: Yellow/green glowing title text, bright green selection highlights, authentic block colors

#### Main Interface Elements
- **Title Display**: "VOXEL WORLD" title with yellow "VOXEL" and green "WORLD" text, both with glowing effects
- **World Selection**: "◦ SELECT DIMENSION ◦" header with diamond symbols (◆) and yellow glow effects
- **World Browser**: Scrollable stone-textured panel with wood-textured interior for world selection
- **Initialize Button**: "INITIALIZE WORLD" button with authentic Minecraft stone button styling and 3D press effects
- **System Status**: "● SYSTEM READY" indicator with animated green status dot and block-style text

### Step-by-Step World Selection Process

#### 1. Browse Available Voxel Worlds
- **Scroll through the world list** to see all 6 unique voxel environments in the wood-textured panel
- **Each world card displays**:
  - **Title**: Name of the voxel world (e.g., "Crystal Cave", "Sky Islands") in bold white text with black outline
  - **Description**: Brief description of the world's theme and features in light gray text
  - **Author**: Creator information (Explorer, Architect, Diver, Scientist, Builder, Survivor)
- **Hover Effects**: World cards have subtle white overlay and yellow border on hover with audio feedback

#### 2. Select Your Voxel World
- **Click on any world card** to select it for exploration
- **Audio Feedback**: Hover sounds (440Hz sine wave) and selection confirmation (ascending chord: E4, G#4, C5)
- **Visual Confirmation**: Selected worlds are highlighted with bright green background and green border
- **Button Update**: The "INITIALIZE WORLD" button updates to show your selected world (e.g., "Play 'Crystal Cave'")
- **Selection Required**: Must select a world before proceeding - error message with dissonant chord if attempting to launch without selection

#### 3. Launch the WebAssembly Engine
- **Click "INITIALIZE WORLD"** to load the WebAssembly voxel engine infrastructure
- **Engine Loading Process**: Watch the status change from "Loading engine..." to "Ready" as the WASM module initializes
- **Canvas Preparation**: Game canvas appears with Minecraft-style block background and proper responsive sizing
- **Engine Initialization**: The WebAssembly voxel engine initializes and prepares for rendering
- **Audio Enhancement**: Generative ambient music begins playing with evolving harmonic layers

#### Available Voxel Worlds (6 Unique Environments)
1. **Crystal Cave** (by Explorer) - "Explore underground caverns" - mysterious crystal formations and cave systems
2. **Sky Islands** (by Architect) - "Build floating structures" - aerial platforms and cloud-level construction
3. **Ocean Mining** (by Diver) - "Deep sea operations" - underwater exploration and resource extraction
4. **Volcano Base** (by Scientist) - "Research station setup" - volcanic terrain with scientific installations
5. **Ice Palace** (by Builder) - "Frozen architecture" - winter wonderland with ice-based construction
6. **Desert Oasis** (by Survivor) - "Survival challenge" - harsh desert environment with oasis features

### Game States & Navigation

#### 1. World Selection State (Main Minecraft Interface)
- **Authentic Block Interface**: Complete Minecraft-style interface with dirt/grass backgrounds, stone panel styling, and pixelated rendering
- **Interactive World Cards**: Hover effects (white overlay + yellow border) and click-to-select functionality with audio feedback
- **Visual Selection Feedback**: Selected worlds show bright green background and border highlighting within the wood-textured panel
- **Dynamic Initialize Button**: "INITIALIZE WORLD" button updates to reflect your current world selection (e.g., "Play 'Crystal Cave'")
- **Selection Validation**: Must select a world before the engine can be launched - shows error message with dissonant audio if attempting to launch without selection
- **Focused Block Design**: Clean interface design that emphasizes world selection with authentic Minecraft block textures and typography
- **Comprehensive Audio**: Hover sounds (440Hz), selection chimes (ascending chord), and ambient atmospheric audio

#### 2. Engine Loading State (WebAssembly Initialization)
- **Real-Time Status Updates**: Live feedback during WebAssembly voxel engine loading process
  - "Loading engine..." - WASM files (voxels.js, voxels.wasm) are being downloaded and initialized
  - "Ready" - Voxel engine successfully loaded and initialized
  - "Failed to load engine" - Error occurred during initialization with automatic fallback to block interface
- **Button State Management**: Initialize button is disabled during engine loading to prevent multiple initialization attempts
- **Canvas Preparation**: Game canvas appears with Minecraft-style block background and responsive sizing (up to 1000x650px)
- **Loading Animation**: CSS-based loading effects on canvas during engine initialization

#### 3. Engine State (Canvas Display Mode)
- **WebAssembly Engine Canvas**: Full canvas display for voxel world interaction with responsive sizing and block-style background
- **WASM Module Integration**: WebAssembly module (voxels.wasm) with JavaScript bridge (voxels.js) loaded and initialized
- **Canvas Interface**: HTML5 canvas element with WebGL acceleration capabilities and Minecraft-style block frame
- **Block-Themed Canvas**: Canvas features authentic Minecraft-style block background with dirt/grass textures and grid overlay
- **Exit Controls**: "◀ EXIT" button (top-right) and ESC key for instant return to world selection interface
- **Enhanced Audio**: Generative ambient music with evolving harmonic layers and multiple musical scales during engine state

### Engine Controls & Navigation

The WebAssembly voxel engine system provides the infrastructure for world interaction:

#### Current Engine Capabilities
- **WebAssembly Voxel Engine**: Pre-compiled voxel engine (voxels.wasm + voxels.js) loads when you select and launch a world
- **Canvas Display System**: Dedicated rendering canvas appears for world interaction when you initialize the engine
- **Engine Status Tracking**: Real-time status updates ("Loading engine...", "Ready") with proper error handling
- **Memory Management**: Proper WASM memory allocation and management for voxel rendering
- **Infrastructure Ready**: Engine successfully initializes and provides the foundation for future voxel world content

#### Navigation Controls
- **ESC Key**: Press Escape at any time to immediately return to the world selection interface
- **Exit Button**: Click the "◀ EXIT" button in the top-right corner of the canvas frame
- **Seamless Transitions**: Smooth transitions between engine mode and block interface with proper cleanup
- **Engine Reset**: Automatically resets the voxel engine for next world selection to prevent blank screen issues
- **Audio Transitions**: Ambient music starts when entering engine state, stops when exiting with descending sweep sound

#### Debug & Maintenance
- **Force Engine Reload**: Press 'R' key while in engine mode to force reload the WebAssembly voxel engine if needed
- **Automatic Cleanup**: Engine automatically cleans up resources when exiting to prevent memory leaks
- **Error Recovery**: Graceful fallback to block interface if engine loading fails with user-friendly error messages

### Quick Start Summary

1. **Launch the app** from a Reddit post by clicking "Play" on the splash screen
2. **Browse the 6 available voxel worlds** and enjoy the authentic Minecraft-style block interface with stone panels and pixelated styling
3. **Select a voxel world** by clicking on it to see it highlighted in bright green with audio confirmation
4. **Click "INITIALIZE WORLD"** to load the WebAssembly voxel engine infrastructure
5. **Experience the engine state** with immersive canvas display, block-themed background, and generative ambient music
6. **Press ESC or click "◀ EXIT"** to return to the world selection interface

### Audio Experience

The game features a sophisticated generative audio system:
- **Interactive Sound Effects**: Every button hover, click, and selection has unique audio feedback
- **Generative Ambient Music**: Procedural ambient soundscapes that evolve during engine state
- **Multiple Musical Scales**: Music evolves between different scales (pentatonic, Japanese, Hirajoshi) for variety
- **Automatic Initialization**: Audio activates on your first interaction to comply with browser policies

### Troubleshooting

#### Common Issues
- **Engine Loading Failed**: The game will automatically return to the block interface - try selecting a world again
- **No Audio**: Audio activates on your first interaction - click anywhere to enable sound
- **Canvas Issues**: Press 'R' key to force reload the WebAssembly voxel engine if needed

#### Browser Requirements
- **Modern Browser**: Chrome, Firefox, Safari, or Edge with WebAssembly support
- **JavaScript Enabled**: Required for engine loading and Reddit integration
- **Audio Support**: Web Audio API support for generative music system

### Pro Tips for Best Experience
- **Browse All Worlds**: Explore all 6 voxel worlds to see different themes and unique features - each has distinct descriptions and authors
- **Read World Descriptions**: Each world has unique characteristics - descriptions help you choose what interests you most (caves, sky islands, ocean mining, etc.)
- **Select First**: Always select a world before clicking "INITIALIZE WORLD" to avoid error messages with dissonant audio feedback
- **Be Patient**: Initial engine load may take time - watch for status updates ("Loading engine..." → "Ready") in the block interface
- **Quick Exit**: ESC key provides instant return to world selection from engine mode with smooth transitions
- **World Switching**: Exit and select different worlds to experience various voxel environments and their unique characteristics
- **Desktop Recommended**: While mobile-compatible, desktop provides optimal performance and WebGL acceleration for the engine
- **Engine Refresh**: Use 'R' key if needed to force reload the WebAssembly voxel engine (useful for troubleshooting)
- **Enjoy the Block Atmosphere**: Notice the authentic Minecraft styling, pixelated effects, and stone-textured panels that create the immersive block experience
- **Listen to the Music**: The generative ambient music evolves continuously with multiple scales and harmonic layers - each session has unique soundscapes

## Technical Architecture

### Frontend Technologies
- **TypeScript**: Type-safe client-side development with strict typing and shared API types (`InitResponse`, `GetEntriesResponse`, `DatabaseEntry`)
- **Vite**: Lightning-fast build system and development server with hot module replacement and watch mode
- **HTML5 Canvas**: Hardware-accelerated 3D graphics rendering within CRT frame (90vw × 75vh, max 1000x650px) with WebGL support
- **Dynamic Module Loading**: WASM engine loaded on-demand with cleanup and force reload capabilities for optimal performance and memory usage
- **CSS3**: Complete Minecraft-style block interface with authentic dirt/grass backgrounds, stone textures, and pixelated effects
- **Web Audio API**: Generative audio system with procedural ambient music across multiple musical scales and interactive sound effects
- **Google Fonts**: Orbitron and Exo 2 fonts for authentic block game typography

### WebAssembly Voxel Engine
- **WASM Architecture**: High-performance WebAssembly module for 3D voxel world rendering
  - **voxels.wasm**: Compiled WebAssembly module for 3D voxel rendering with WebGL acceleration
  - **voxels.js**: JavaScript bridge and loader for WASM integration with Module system
- **Dynamic Loading**: WASM voxel module loaded only when user launches a dimension with proper script injection and cleanup
- **Canvas Integration**: Direct rendering to HTML5 canvas element (90vw × 75vh, max 1000x650px)
- **Module System**: Uses global `Module` object with postRun callbacks, onAbort error handling, and runtime initialization
- **Context Menu Prevention**: Right-click disabled on canvas for seamless gaming experience
- **Memory Management**: Proper WASM memory allocation, cleanup between sessions, and force reload capability (R key)
- **Engine State Management**: Tracks loading state, handles failures gracefully, and provides status feedback through CRT interface

### Backend & Infrastructure
- **Express.js**: RESTful API server with `/api/init` and `/api/entries` endpoints plus internal Reddit integration endpoints
- **Redis Database**: Persistent world database using Redis sorted sets (`voxel_entries`) and hash maps (`entry:world_*`) with automatic initialization
- **World Management**: 6 pre-loaded worlds (Crystal Cave, Sky Islands, Ocean Mining, Volcano Base, Ice Palace, Desert Oasis) with metadata
- **Devvit Platform**: Reddit's official developer platform (@devvit/web) for hosting, authentication, and Reddit API integration
- **Node.js**: Modern JavaScript runtime with automatic post creation, user authentication, and Redis operations
- **Auto-Installation**: Automatic post creation on app install with manual creation option for moderators

### Reddit Integration & Data Persistence
- **User Authentication**: Automatic Reddit user recognition via `/api/init` endpoint with personalized greeting in block interface
- **Dimension Database**: `/api/entries` endpoint serves dimension metadata from Redis with proper error handling
- **Persistent Storage**: Dimension data persists across sessions using Redis infrastructure with sorted sets for ordering
- **Post Integration**: Runs directly within Reddit posts as webview content with full Minecraft-style block interface
- **Custom Splash Screen**: Configured splash screen with app branding and "Tap to Start" button
- **Native Experience**: No external redirects or separate websites required - fully contained within Reddit with authentic Minecraft-style interface

## Development Commands

```bash
# Start development with live Reddit integration (runs client, server, and devvit in parallel)
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

# Type checking across all projects
npm run type-check

# Login to Devvit platform
npm run login
```

## Getting Started for Developers

### Prerequisites
- Node.js 22+ (required for Devvit platform compatibility)
- Modern browser with WebGL and WebAssembly support
- Reddit account for testing

### Setup Instructions
1. Clone this repository
2. Run `npm install` to install dependencies (includes automatic build via postinstall)
3. Run `npm run dev` to start development server
4. Visit the provided Reddit playtest URL to test the game

The development server automatically creates a test subreddit where you can interact with the 3D voxel world in real-time.

### WASM Files & World Database

#### Pre-compiled Voxel Engine
The 3D voxel engine is pre-compiled and included in the project:
```bash
# WASM files are located in:
src/client/public/voxels.wasm  # Main voxel engine
src/client/public/voxels.js   # JavaScript loader and bridge
src/client/public/world.dat   # World data file
src/client/public/snoo.png    # Reddit mascot asset
src/client/public/default-icon.png  # App icon
```

#### World Database Structure
The game includes a Redis-backed world database with 6 pre-loaded worlds:
```bash
# Redis data structure:
voxel_entries          # Sorted set for world ordering (by creation time, negative scores)
entry:world_1          # Hash map for each world's metadata
entry:world_2          # Contains: id, title, description, createdAt, author
# ... (world_1 through world_6)

# Sample worlds automatically initialized:
# Crystal Cave (Explorer), Sky Islands (Architect), Ocean Mining (Diver)
# Volcano Base (Scientist), Ice Palace (Builder), Desert Oasis (Survivor)
```

### Development Workflow
1. **Client Development**: Edit files in `src/client/` - changes auto-rebuild
2. **Server Development**: Edit files in `src/server/` - API endpoints auto-reload
3. **Testing**: Use the Reddit playtest URL to test in real Reddit environment
4. **WASM Updates**: Replace WASM files in `src/client/public/` if updating the engine

## Advanced Features

### Dimension Selection & Database System
- **Redis-Backed Database**: Persistent dimension storage using Redis sorted sets (`voxel_entries`) and hash maps (`entry:*`)
- **6 Pre-loaded Dimensions**: Diverse collection including Crystal Cave, Sky Islands, Ocean Mining, Volcano Base, Ice Palace, and Desert Oasis
- **Dimension Metadata**: Each dimension includes id, title, description, author, and creation timestamp with proper data validation
- **Dynamic Loading**: Dimension list loads from `/api/entries` endpoint on app initialization with error handling
- **Selection Interface**: Interactive dimension browser within glass panel interface with click-to-select and audio feedback
- **Selection Validation**: Prevents launching without dimension selection with clear error messaging and audio feedback
- **Scrollable Interface**: Elegant scrollable dimension list with CRT scanline effects and custom styling

### 3D Voxel Dimension Engine
- **WebAssembly Rendering**: High-performance 3D graphics using WebAssembly engine (voxels.wasm) within CRT frame for selected dimensions
- **Interactive Navigation**: 3D dimension exploration with FPS controls, mouse look, and keyboard movement in chosen environments
- **Dynamic Loading**: WASM engine loads on-demand only when launching a selected dimension with proper initialization
- **Cross-Platform**: Works seamlessly on desktop and mobile browsers with touch support and responsive CRT design
- **Hardware Acceleration**: WebGL-accelerated 3D rendering with pointer lock support for immersive experience within authentic CRT monitor

### WebAssembly Integration
- **WASM Engine**: Optimized WebAssembly module (voxels.wasm) for 3D rendering of selected worlds with memory management
- **JavaScript Bridge**: WASM loading with JavaScript bridge (voxels.js) for seamless integration and error handling
- **Canvas Rendering**: Direct rendering to HTML5 canvas element with id="canvas" (90vw × 75vh, max 1000x650px)
- **Dynamic Script Loading**: WASM engine loaded via dynamic script injection when launching worlds with cleanup
- **On-Demand Loading**: Engine files only load when user selects and launches a world for faster initial page load
- **Context Menu Prevention**: Right-click disabled on canvas for seamless gaming experience
- **Module Configuration**: Uses global `Module` object with `postRun` callbacks for initialization and proper cleanup

### Reddit Platform Integration
- **Devvit Platform**: Built on Reddit's official developer platform with full integration
- **Native Experience**: Runs directly within Reddit posts with no external dependencies or redirects
- **User Authentication**: Automatic Reddit user recognition via server API (`/api/init` endpoint) with personalized greeting
- **Persistent Data**: World database persists across sessions using Reddit's Redis infrastructure with proper data structure
- **Custom Splash Screen**: Engaging splash screen with app branding and "Tap to Start" call-to-action
- **Responsive Design**: Optimized for both desktop and mobile Reddit experiences with adaptive pixelated UI
- **Zero Installation**: Complete world selection and 3D voxel gaming experience with no downloads required

### Technical Implementation
- **Express API**: RESTful `/api/init` and `/api/entries` endpoints for user authentication and dimension data with error handling
- **TypeScript**: Full type safety across client, server, and shared code with defined API types (`InitResponse`, `GetEntriesResponse`, `DatabaseEntry`)
- **Vite Build System**: Optimized builds for both client and server components with hot module replacement
- **Error Handling**: Graceful fallbacks for dimension loading and engine initialization failures with user-friendly messages and audio feedback
- **CRT Interface**: Complete retro-futuristic CRT interface with clean styling and atmospheric effects
- **Canvas Management**: Responsive canvas sizing (1000x650px max) with clean styling for voxel world display
- **Modular Architecture**: Clean separation between client (`src/client`), server (`src/server`), and shared (`src/shared`) components
- **Selection State Management**: Client-side state tracking for selected dimensions with green highlighting and dynamic button updates
- **Clean Visual Design**: Focused interface design with retro-futuristic CRT styling and atmospheric effects
- **Engine Management**: Dynamic WASM voxel loading with cleanup, force reload capability (R key), and proper memory management between sessions
- **Audio Integration**: Comprehensive audio system with generative ambient music, interactive sound effects, and multiple musical scales

The world selection system provides a curated browsing experience within an authentic Minecraft-style block interface before launching into 3D voxel environments, delivering both discovery and interactive graphics directly within Reddit posts using modern web technologies and WebAssembly performance.

## Current Development Status

**Note**: This is an active development project. The WebAssembly voxel engine infrastructure (voxels.wasm + voxels.js) is included in the project structure and loads successfully. The complete Minecraft-style block interface, world browsing system, audio system, and Reddit integration are fully functional. Users can browse and select from 6 unique voxel worlds and experience the immersive block-themed atmosphere.

### What's Currently Working
- ✅ **Complete Minecraft Block Interface**: Fully functional Minecraft-style interface with stone-textured panels, dirt/grass backgrounds, and authentic pixelated styling
- ✅ **6 Unique Voxel Worlds**: Crystal Cave, Sky Islands, Ocean Mining, Volcano Base, Ice Palace, and Desert Oasis with full metadata and descriptions
- ✅ **Interactive World Selection**: Click-to-select functionality with bright green highlighting, hover effects, and audio feedback
- ✅ **WebAssembly Engine Loading**: WASM voxel engine (voxels.wasm + voxels.js) loads successfully with proper initialization and error handling
- ✅ **Engine Infrastructure**: WebAssembly voxel engine initializes properly and provides the foundation for future voxel content
- ✅ **Generative Audio System**: Complete audio system with procedural ambient music, interactive sound effects, and multiple musical scales
- ✅ **Reddit Integration**: Full Devvit platform integration with automatic post creation, user authentication, and Redis database
- ✅ **Responsive Design**: Mobile-optimized interface that maintains Minecraft aesthetics across all screen sizes
- ✅ **Canvas Display**: HTML5 canvas with WebGL acceleration and Minecraft-style block frame for engine rendering
- ✅ **Navigation Controls**: ESC key and exit button for seamless transitions between states with proper cleanup
- ✅ **Engine Management**: Force reload capability (R key), automatic cleanup, and graceful error recovery

### Technical Implementation Status
- ✅ **Frontend**: Complete TypeScript client with Minecraft-style UI, audio system, and WASM integration
- ✅ **Backend**: Express server with Reddit API integration, Redis database, and world management endpoints
- ✅ **Database**: Redis-backed world storage with 6 pre-loaded worlds and proper data validation
- ✅ **Build System**: Vite-based build system with client/server separation and TypeScript project references
- ✅ **Audio**: Web Audio API implementation with generative ambient music and contextual sound effects
- ✅ **WASM Integration**: WebAssembly voxel engine with JavaScript bridge and memory management

The game provides a complete Minecraft-style world browsing experience with WebAssembly engine infrastructure, running natively within Reddit posts.

### Current Gameplay Experience

**What You Can Do Right Now:**
- **Browse 6 Unique Voxel Worlds**: Explore detailed descriptions of Crystal Cave, Sky Islands, Ocean Mining, Volcano Base, Ice Palace, and Desert Oasis
- **Experience Authentic Minecraft Interface**: Enjoy complete block-style aesthetics with stone panels, dirt/grass backgrounds, and pixelated styling
- **Interactive World Selection**: Click to select worlds with visual feedback (bright green highlighting) and audio confirmation
- **Launch WebAssembly Engine**: Initialize the voxel engine infrastructure and see the canvas display with Minecraft-style frame
- **Immersive Audio Experience**: Listen to generative ambient music that evolves across multiple musical scales, plus contextual sound effects
- **Seamless Navigation**: Switch between world selection and engine states using ESC key or exit button with smooth transitions

**The Experience:**
The game currently focuses on the world browsing and selection experience within an authentic Minecraft-style interface. When you select and launch a world, the WebAssembly voxel engine initializes successfully, displaying a canvas ready for future voxel content. The emphasis is on the immersive block-themed atmosphere, sophisticated audio system, and seamless Reddit integration.

### Future Development
- 🔄 **Enhanced Voxel Content**: Expanded voxel world environments and interactive block elements within the engine state
- 🔄 **Advanced Engine Features**: Enhanced movement and interaction capabilities within the WebAssembly voxel engine
- 🔄 **World-Specific Features**: Unique mechanics and content tailored to each of the 6 voxel worlds (Crystal Cave, Sky Islands, etc.)
