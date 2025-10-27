# bhopblox - Minecraft-Style Voxel World Browser

A Minecraft-inspired voxel world selection interface that runs directly inside Reddit posts, featuring authentic pixelated block textures and generative audio. Browse through a curated collection of unique worlds in an immersive blocky environment with dynamic sound effects and evolving ambient music.

## What is This Game?

bhopblox is a Minecraft-style voxel world browser that brings an immersive blocky experience directly to Reddit. The game features:

- **Authentic Minecraft Aesthetic**: Complete block-textured interface with dirt/grass backgrounds, stone panels, and pixelated styling
- **Interactive World Browser**: Browse and select from 6 curated worlds through an elegant interface with hover effects and block-style borders
- **6 Unique Pre-loaded Worlds**: Diverse collection including Crystal Cave, Sky Islands, Ocean Mining, Volcano Base, Ice Palace, and Desert Oasis
- **Generative Audio System**: Dynamic ambient music with evolving harmonic layers across multiple musical scales (pentatonic, Japanese, Hirajoshi), plus interactive sound effects for every interaction
- **Reddit Native Integration**: Seamlessly integrated with Reddit's platform - no downloads or installations required
- **WebAssembly Voxel Engine**: Includes WASM-powered 3D voxel rendering engine for immersive world exploration
- **Persistent World Database**: Redis-backed database storing world metadata, descriptions, and author information
- **Minecraft-Style Interface**: Stone-textured panels with block button styling and authentic pixelated visual elements
- **Cross-Platform Compatibility**: Works on both desktop and mobile browsers with responsive design
- **Interactive Sound Design**: Every hover, click, and selection has unique audio feedback with procedural ambient music

The game provides a complete Minecraft-style world browsing experience, combining authentic block aesthetics with modern web technologies and immersive audio design.

## What Makes This Game Innovative?

### 🧱 **Authentic Minecraft Block Experience**
- **Complete Block Simulation**: Full Minecraft-style aesthetic with authentic dirt/grass backgrounds and stone panel textures
- **Pixelated Interface**: Stone-textured panels with 3D block button effects and authentic Minecraft styling
- **Block-Perfect Visual Design**: Minimalist interface focused on world selection with authentic block patterns and pixelated rendering
- **Minecraft Typography**: Courier New monospace fonts for authentic blocky game styling
- **Responsive Block Design**: Adaptive interface that maintains Minecraft block aesthetics across all screen sizes

### 🚀 **Reddit-Native Interactive Experience**
- **First-of-its-Kind**: A fully immersive Minecraft-style voxel world browser that runs natively inside Reddit posts
- **Zero Installation Experience**: Complete interactive world browsing with no downloads, plugins, or external software required
- **WebAssembly Integration**: Includes WASM voxel engine infrastructure (voxels.wasm) with JavaScript bridge for 3D block world capabilities
- **Devvit Platform Pioneer**: Built on Reddit's official developer platform for seamless social media integration
- **Cross-Platform Interface**: Works seamlessly on desktop and mobile browsers within Reddit's interface
- **Dynamic Engine Loading**: WASM voxel engine loads on-demand with automatic cleanup and force reload capabilities (R key for manual reset)

### 🌍 **Curated World Selection System**
- **Interactive Dimension Browser**: Browse and select from 6 unique pre-loaded worlds through the "SELECT DIMENSION" interface
- **Rich World Metadata**: Each world includes detailed descriptions and author information stored in Redis database
- **Visual Selection Interface**: Click-to-select with bright cyan highlighting and hover effects for intuitive world browsing
- **Dynamic Launch System**: "INITIALIZE WORLD" button updates to show selected world with authentic Minecraft button styling
- **Persistent World Database**: Redis-backed storage ensures worlds persist across sessions and users
- **Scrollable World List**: Elegant scrollable interface with custom wood texture styling and Minecraft-style borders
- **Audio Feedback**: Every interaction has unique sound effects - hover sounds, selection chimes, and error alerts

### ⚡ **Advanced Audio & Visual Systems**
- **Generative Audio Engine**: Procedurally generated ambient soundscapes using Web Audio API with 2-4 oscillator layers
- **Interactive Sound Design**: Contextual audio feedback for all user interactions with distinct tonal signatures
- **Multiple Musical Scales**: Evolving between major pentatonic, minor pentatonic, Japanese, and Hirajoshi scales
- **Authentic Block Interface**: Focused on world selection with elegant Minecraft-style block textures and pixelated styling
- **Memory Management**: Efficient audio system with proper initialization and cleanup
- **Dynamic Audio Elements**: Continuously evolving ambient music with harmonic layering

### 🤝 **Seamless Social Gaming Integration**
- **Reddit Native Experience**: Runs directly within Reddit's interface without breaking user flow or requiring external sites
- **Social Context Preservation**: Maintains Reddit post context while providing immersive Minecraft-style block experience
- **Mobile-First Design**: Responsive block interface optimized for Reddit's mobile user base
- **Instant Access**: No account creation or separate login required - uses existing Reddit authentication
- **Custom Splash Screen**: Engaging "bhopblox" splash with "Play" button and app description

### 🎵 **Advanced Generative Audio System**
- **Dynamic Ambient Music**: Procedurally generated ambient soundscapes with evolving harmonic layers
- **Interactive Sound Effects**: Contextual audio feedback for hover, select, launch, exit, and error states
- **Multiple Musical Scales**: Evolving between different scales with 30% chance of scale changes for variety
- **Layered Audio Architecture**: Separate gain nodes for ambient music (15% volume) and sound effects (40% volume)
- **Automatic Audio Initialization**: Audio system activates on first user interaction to comply with browser policies
- **Frequency Modulation**: Subtle LFO effects (0.1-0.4 Hz) on ambient tones for organic, evolving soundscapes
- **Harmonic Layering**: Multiple oscillators (sine, triangle, sawtooth) create rich textures with lowpass filtering
- **Temporal Evolution**: Ambient layers evolve every 8-12 seconds with 15-35 second durations for continuous development

## How to Play the Game

### Getting Started
1. **Find bhopblox**: Look for bhopblox posts in your Reddit feed or visit the development subreddit
2. **Launch the App**: Click the "Play" button on the splash screen when you see a bhopblox post
3. **Enter the Block Interface**: You'll be immersed in a complete Minecraft-style block world experience
4. **Experience the Atmosphere**: Enjoy the authentic block textures and generative ambient music

### The Minecraft-Style Block Interface

The game presents itself as an authentic Minecraft-style interface with pixelated block aesthetics:

#### Block World Elements
- **Authentic Block Styling**: Complete Minecraft-style dirt/grass background with repeating block patterns
- **Pixelated Interface Design**: Minimalist approach focused on world selection with authentic block textures
- **Stone Panel Interface**: Elegant stone-textured panels with authentic Minecraft 3D block styling effects
- **Block Typography**: Courier New monospace fonts for authentic blocky game styling

#### Main Interface Elements
- **Title Display**: "VOXEL WORLD" title with yellow/green glowing effects in Minecraft styling
- **Dimension Selection**: "◦ SELECT DIMENSION ◦" header introduces the world browser with diamond symbols
- **Stone Block Interface**: Stone-textured panels with authentic Minecraft 3D block borders and pixelated styling
- **Initialize Button**: "INITIALIZE WORLD" button with authentic Minecraft block button styling and hover effects
- **System Status**: "● SYSTEM READY" indicator with green status dot and block-style text

### Step-by-Step World Browsing Process

#### 1. Browse Available Worlds
- Scroll through the world list to see all 6 unique environments
- Each world card displays:
  - **Title**: Name of the world (e.g., "Crystal Cave", "Sky Islands") 
  - **Description**: Brief description of the world's theme and features
  - **Author**: Creator information (Explorer, Architect, Diver, etc.)

#### 2. Select Your World
- **Click on any world card** to select it
- **Audio Feedback**: Hover sounds and selection confirmation sounds enhance interactivity
- **Visual Confirmation**: Selected worlds are highlighted with bright cyan background and left border
- **Button Update**: The "INITIALIZE WORLD" button updates to show your selected world (e.g., "Play 'Crystal Cave'")

#### 3. Launch the Engine
- **Click "INITIALIZE WORLD"** to load the WebAssembly engine
- **Important**: You must select a world first - the game will show an error message with audio feedback if you try to launch without selecting
- **Engine Loading**: Watch the status change from "Loading engine..." to "Ready" as the WASM module initializes

#### Available Worlds (6 Unique Environments)
1. **Crystal Cave** (by Explorer) - Explore underground caverns filled with mysterious crystals
2. **Sky Islands** (by Architect) - Build floating structures high above the clouds  
3. **Ocean Mining** (by Diver) - Deep sea operations and underwater exploration
4. **Volcano Base** (by Scientist) - Research station setup near active volcanic activity
5. **Ice Palace** (by Builder) - Frozen architecture in a winter wonderland
6. **Desert Oasis** (by Survivor) - Survival challenge in harsh desert conditions

### Game States & Navigation

#### 1. World Selection State (Main Interface)
- **Authentic Block Interface**: Complete Minecraft-style interface with dirt/grass backgrounds and stone panel styling
- **Interactive World Cards**: Hover effects and click-to-select functionality with audio feedback and visual transitions
- **Visual Feedback**: Selected worlds show bright cyan highlighting with clear visual indicators within the stone block interface
- **Dynamic Initialize Button**: "INITIALIZE WORLD" button updates to reflect your current selection with authentic Minecraft block button styling
- **Selection Validation**: Must select a world before the engine can be launched - shows error message with audio feedback if you try to launch without selecting
- **Block Design**: Focused interface design that emphasizes world selection with authentic Minecraft block textures
- **Audio Feedback**: Hover sounds, selection confirmation sounds, and ambient atmospheric audio

#### 2. Loading State (Engine Initialization)
- **Status Updates**: Real-time feedback during WebAssembly voxel engine loading within the block interface
  - "Loading engine..." - WASM files (voxels.js, voxels.wasm) are being downloaded and initialized
  - "Ready" - Voxel engine successfully loaded and initialized
  - "Failed to load engine" - Error occurred during initialization with automatic fallback to block menu
- **Button Management**: Initialize button is disabled during loading to prevent multiple attempts
- **Canvas Preparation**: Game canvas is prepared for voxel world rendering
- **Animated Loading**: CSS-based loading animation on canvas during voxel engine initialization

#### 3. Engine State (Canvas Display)
- **Voxel World Canvas**: Canvas rendered for 3D voxel world display with responsive sizing and Minecraft-style block background
- **WebAssembly Voxel Engine**: WASM module (voxels.wasm) with JavaScript bridge (voxels.js) loaded and initialized
- **Canvas Interface**: HTML5 canvas element prepared for 3D voxel world rendering capabilities
- **Block Canvas Styling**: Canvas features Minecraft-style block background with authentic dirt/grass textures
- **Exit Options**: "◀ EXIT" button and ESC key for instant return to world selection
- **Ambient Audio**: Generative ambient music plays during engine state with evolving harmonic layers

### Engine Controls & Navigation

The WebAssembly voxel engine system provides infrastructure for 3D block world capabilities:

#### Current Engine Status
- **WebAssembly Voxel Engine**: The game includes a pre-compiled voxel engine (voxels.wasm + voxels.js) that loads when you select and launch a world
- **Canvas Display**: A dedicated rendering canvas appears for voxel world display when you initialize the engine
- **Engine Loading**: The system shows "Loading engine..." status and "Ready" when the WASM voxel module is successfully initialized

#### Exit Methods
- **ESC Key**: Press Escape at any time to immediately return to the world selection interface
- **Exit Button**: Click the "◀ EXIT" button in the top-right corner of the canvas frame
- **Automatic Return**: Seamlessly returns to the block interface with proper cleanup and atmospheric effects
- **Engine Reset**: Automatically resets the voxel engine for next world selection to prevent issues
- **Block Transitions**: Smooth transitions between engine mode and block interface with audio feedback

#### Debug Controls
- **Force Engine Reload**: Press 'R' key while in engine mode to force reload the WebAssembly voxel engine if needed

### Quick Start Summary

1. **Launch the app** from a Reddit post by clicking "Play"
2. **Browse the 6 available worlds** and enjoy the authentic Minecraft-style block atmosphere
3. **Select a world** by clicking on it to see it highlighted in cyan
4. **Click "INITIALIZE WORLD"** to load the WebAssembly engine
5. **Experience the block interface** with authentic Minecraft textures and generative ambient music
6. **Press ESC or click "◀ EXIT"** to return to world selection

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
- **Browse All Worlds**: Explore all 6 worlds to see different themes and descriptions
- **Read Descriptions**: Each world has unique features - descriptions help you choose what interests you most
- **Select First**: Always select a world before clicking "INITIALIZE WORLD" to avoid error messages
- **Be Patient**: Initial voxel engine load may take time - watch for status updates in the block interface
- **Quick Exit**: ESC key provides instant return to world selection
- **World Switching**: Exit and select different worlds to browse various environments
- **Desktop Recommended**: While mobile-compatible, desktop provides optimal experience
- **Engine Refresh**: Use 'R' key if needed to force voxel engine reload
- **Enjoy the Atmosphere**: Notice the authentic Minecraft block styling and pixelated effects that enhance the blocky experience
- **Listen to the Music**: The generative ambient music evolves continuously - each session has unique soundscapes

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

**Note**: This is an active development project. The WebAssembly voxel engine infrastructure (voxels.wasm + voxels.js) is included in the project structure and loads successfully. The complete retro-futuristic CRT interface, world browsing system, audio system, and Reddit integration are fully functional. Users can browse and select from 6 unique worlds and experience the immersive atmosphere.

### What's Currently Working
- ✅ **Complete Block Interface**: Fully functional Minecraft-style interface with stone-textured panels and authentic block styling
- ✅ **World Browsing System**: Browse and select from 6 unique worlds with descriptions and metadata
- ✅ **Generative Audio System**: Dynamic ambient music and interactive sound effects
- ✅ **Reddit Integration**: Native Reddit experience with seamless post integration
- ✅ **WebAssembly Loading**: Dynamic WASM voxel engine loading with proper error handling and status feedback
- ✅ **Responsive Design**: Mobile and desktop compatibility with adaptive pixelated styling
- ✅ **Database System**: Redis-backed world storage with persistent data
- ✅ **Authentic Block Design**: Focused world selection interface with Minecraft-style block textures and pixelated styling
- ✅ **Interactive Audio**: Contextual sound effects for all user interactions

### Future Development
- 🔄 **3D Voxel World Content**: Enhanced voxel world environments and interactive block elements
- 🔄 **Navigation Systems**: Advanced movement and interaction capabilities within voxel worlds
- 🔄 **World-Specific Features**: Unique mechanics and content for each of the 6 voxel worlds
