# bhopblox - Retro-Futuristic World Explorer

A stunning retro-futuristic world selection interface that runs directly inside Reddit posts, featuring a complete CRT monitor aesthetic with atmospheric effects and generative audio. Browse through a curated collection of unique worlds in an immersive retro-tech environment with dynamic visual effects and evolving ambient soundscapes.

## What is This Game?

bhopblox is a retro-futuristic world browser that brings an immersive CRT monitor experience directly to Reddit with distinctive atmospheric aesthetics. The game features:

- **Authentic CRT Monitor Experience**: Complete CRT monitor simulation with realistic bezel, atmospheric effects, and retro-tech styling
- **Interactive World Browser**: Browse and select from 6 curated worlds through an elegant glass-morphism interface with floating hexagonal elements
- **6 Unique Pre-loaded Worlds**: Diverse collection including Crystal Cave, Sky Islands, Ocean Mining, Volcano Base, Ice Palace, and Desert Oasis
- **Generative Audio System**: Dynamic ambient music with evolving harmonic layers across multiple musical scales (pentatonic, Japanese, Hirajoshi), plus interactive sound effects for every interaction
- **Atmospheric Visual Effects**: Floating 3D hexagons, minimal light particles, and animated geometric patterns create a living, breathing retro-futuristic environment
- **Reddit Native Integration**: Seamlessly integrated with Reddit's platform - no downloads or installations required
- **WebAssembly Engine Integration**: Includes WASM-powered engine loading system for future 3D world exploration
- **Persistent World Database**: Redis-backed database storing world metadata, descriptions, and author information
- **Glass Morphism Interface**: Semi-transparent panels with backdrop blur and frosted glass effects within the CRT screen
- **Cross-Platform Compatibility**: Works on both desktop and mobile browsers with responsive retro-tech design
- **Interactive Sound Design**: Every hover, click, and selection has unique audio feedback with procedural ambient music

The game provides a complete retro-futuristic world browsing experience, combining nostalgic CRT aesthetics with modern web technologies and immersive audio design.

## What Makes This Game Innovative?

### 🖥️ **Authentic Retro-Futuristic CRT Experience**
- **Complete CRT Monitor Simulation**: Full CRT monitor aesthetic with realistic bezel and atmospheric effects
- **Glass Morphism Interface**: Semi-transparent panels with backdrop blur and frosted glass effects within the CRT screen
- **Atmospheric Visual Elements**: Floating 3D hexagons and minimal light particles create a living, breathing retro-futuristic environment
- **3D Geometric Background**: Animated geometric patterns with subtle cyan highlights that shift continuously for depth
- **Orbitron & Exo 2 Typography**: Retro-futuristic fonts with glowing text effects and gradient styling
- **Dynamic Visual Effects**: Floating hexagonal glass orbs and light particles with smooth animations

### 🚀 **Reddit-Native 3D Voxel Gaming**
- **First-of-its-Kind**: A fully 3D voxel world explorer that runs natively inside Reddit posts using WebAssembly
- **Zero Installation Gaming**: Complete 3D world exploration experience with no downloads, plugins, or external software required
- **WebAssembly Performance**: Leverages a high-performance WASM engine (voxels.wasm) with JavaScript bridge for smooth 3D graphics
- **Devvit Platform Pioneer**: Built on Reddit's official developer platform for seamless social media gaming integration
- **Cross-Platform 3D**: Works seamlessly on desktop and mobile browsers within Reddit's interface
- **Dynamic Engine Loading**: WASM engine only loads when needed, with automatic cleanup and force reload capabilities (R key for manual reset)

### 🌍 **Curated World Selection System**
- **Interactive Dimension Browser**: Browse and select from 6 unique pre-loaded worlds through the "SELECT DIMENSION" interface
- **Rich World Metadata**: Each world includes detailed descriptions and author information stored in Redis database
- **Visual Selection Interface**: Click-to-select with bright cyan highlighting and hover effects for intuitive world browsing
- **Dynamic Launch System**: "INITIALIZE WORLD" button updates to show selected world with retro-tech styling
- **Persistent World Database**: Redis-backed storage ensures worlds persist across sessions and users
- **Scrollable World List**: Elegant scrollable interface with custom styling and CRT scanline effects
- **Audio Feedback**: Every interaction has unique sound effects - hover sounds, selection chimes, and error alerts

### ⚡ **Advanced WebAssembly Integration**
- **On-Demand Engine Loading**: WASM engine loads only when launching a selected world, keeping initial load times fast
- **Hardware-Accelerated 3D**: Real-time voxel rendering with WebGL support via HTML5 Canvas within CRT frame
- **Optimized Performance**: Compiled WebAssembly module with JavaScript bridge for optimal 3D graphics performance
- **Canvas-First Design**: Full-screen 3D rendering (90vw × 75vh, max 1000x650px) with CRT bezel styling
- **Memory Management**: Efficient WASM memory handling with proper initialization and cleanup
- **Dynamic Script Injection**: voxels.js script dynamically loaded and removed as needed for optimal performance
- **Engine Reset System**: Automatic engine cleanup between sessions and manual reset capability (R key) for troubleshooting

### 🤝 **Seamless Social Gaming Integration**
- **Reddit User Recognition**: Automatically greets users by their Reddit username in the retro interface
- **Native Reddit Experience**: Runs directly within Reddit's interface without breaking user flow or requiring external sites
- **Social Context Preservation**: Maintains Reddit post context while providing full 3D gaming experience
- **Mobile-First Design**: Responsive retro-tech interface optimized for Reddit's mobile user base
- **Instant Access**: No account creation or separate login required - uses existing Reddit authentication
- **Custom Splash Screen**: Engaging "Voxel World Adventure" splash with "Play" button and app description

### 🎵 **Generative Audio System**
- **Dynamic Ambient Music**: Procedurally generated ambient soundscapes using Web Audio API with 2-4 oscillator layers per generation cycle
- **Interactive Sound Effects**: Contextual audio feedback for all user interactions (hover, select, launch, exit, error states) with distinct tonal signatures
- **Multiple Musical Scales**: Evolving between major pentatonic, minor pentatonic, Japanese, and Hirajoshi scales with 30% chance of scale changes
- **Layered Audio Architecture**: Separate gain nodes for ambient music (15% volume) and sound effects (40% volume) with master volume control (30%)
- **Automatic Audio Initialization**: Audio system activates on first user interaction to comply with browser autoplay policies
- **Immersive Audio Experience**: Ambient music starts when entering 3D worlds and stops when exiting with fade transitions
- **Frequency Modulation**: Subtle LFO (Low Frequency Oscillator) effects (0.1-0.4 Hz) on ambient tones for organic, evolving soundscapes
- **Harmonic Layering**: Multiple oscillators (sine, triangle, sawtooth) create rich, evolving harmonic textures with lowpass filtering (800-2000 Hz)
- **Temporal Evolution**: Ambient layers evolve every 8-12 seconds with 15-35 second layer durations for continuous musical development

## How to Play the Game

### Getting Started
1. **Find Voxel World**: Look for Voxel World posts in your Reddit feed or visit the development subreddit
2. **Launch the App**: Click the "Play" button on the splash screen when you see a Voxel World post
3. **Enter the CRT Interface**: You'll be immersed in a complete retro-futuristic CRT monitor experience with the "FUTURO-TECH CRT-2085"
4. **Personal Welcome**: The app will automatically greet you with your Reddit username (e.g., "Welcome [username]!")

### The Retro-Futuristic CRT Interface

The game presents itself as a complete CRT monitor simulation with authentic retro-tech aesthetics:

#### CRT Monitor Elements
- **Complete CRT Monitor Frame**: Realistic bezel and authentic retro-tech styling
- **CRT Screen Effects**: Atmospheric visual effects and subtle glow enhance the nostalgic atmosphere
- **Atmospheric Elements**: Floating 3D hexagons and minimal light particles create a living retro-futuristic environment
- **3D Geometric Patterns**: Animated background patterns with subtle cyan highlights that shift continuously

#### Main Interface Elements
- **Retro Title Display**: "VOXEL WORLD" title with glowing effects and personalized greeting using your Reddit username
- **Dimension Selection**: "◦ SELECT DIMENSION ◦" header introduces the world browser with retro-tech styling
- **Glass Panel Interface**: Semi-transparent panels with backdrop blur and frosted glass effects within the CRT screen
- **Initialize Button**: "INITIALIZE WORLD" button with retro-tech styling and glow effects
- **System Status**: "● SYSTEM READY" indicator with status dot and retro terminal-style text

### Step-by-Step World Selection Process

#### 1. Browse Available Worlds
- Scroll through the world list to see all 6 unique voxel environments
- Each world card displays:
  - **Title**: Name of the world (e.g., "Crystal Cave", "Sky Islands") 
  - **Description**: Brief description of the world's theme and features
  - **Author**: Creator information (Explorer, Architect, Diver, etc.)

#### 2. Select Your World
- **Click on any world card** to select it
- **Audio Feedback**: Hover sounds and selection confirmation sounds enhance interactivity
- **Visual Confirmation**: Selected worlds are highlighted with bright cyan background and left border
- **Button Update**: The "INITIALIZE WORLD" button updates to show your selected world (e.g., "Play 'Crystal Cave'")

#### 3. Launch the 3D Experience
- **Click "INITIALIZE WORLD"** to enter your selected world
- **Important**: You must select a world first - the game will show an error message with audio feedback if you try to launch without selecting

#### Available Worlds (6 Unique Environments)
1. **Crystal Cave** (by Explorer) - Explore underground caverns filled with mysterious crystals
2. **Sky Islands** (by Architect) - Build floating structures high above the clouds  
3. **Ocean Mining** (by Diver) - Deep sea operations and underwater exploration
4. **Volcano Base** (by Scientist) - Research station setup near active volcanic activity
5. **Ice Palace** (by Builder) - Frozen architecture in a winter wonderland
6. **Desert Oasis** (by Survivor) - Survival challenge in harsh desert conditions

### Game States & Navigation

#### 1. CRT Interface State (World Selection)
- **Retro-Tech Interface**: Complete CRT monitor simulation with authentic retro-futuristic styling
- **Interactive World Cards**: Hover effects and click-to-select functionality with audio feedback and visual transitions
- **Visual Feedback**: Selected worlds show bright cyan highlighting with clear visual indicators within the glass panel interface
- **Dynamic Initialize Button**: "INITIALIZE WORLD" button updates to reflect your current selection with retro-tech styling
- **Selection Validation**: Must select a world before the 3D engine can be launched - shows error message with audio feedback if you try to launch without selecting
- **Atmospheric Effects**: Floating 3D hexagons and minimal light particles create an immersive retro-futuristic environment
- **Audio Feedback**: Hover sounds, selection confirmation sounds, and ambient atmospheric audio

#### 2. Loading State (Engine Initialization)
- **Status Updates**: Real-time feedback during WebAssembly engine loading within the CRT interface
  - "Loading engine..." - WASM files (voxels.js, voxels.wasm) are being downloaded and initialized
  - "Ready" - Engine successfully loaded and ready for 3D exploration
  - "Failed to load engine" - Error occurred during initialization with automatic fallback to CRT menu
- **Button Management**: Initialize button is disabled during loading to prevent multiple attempts
- **Canvas Preparation**: Game canvas is prepared within the CRT frame for optimal 3D rendering
- **Animated Loading**: CSS-based loading spinner animation on canvas during engine initialization

#### 3. Game State (3D Voxel World)
- **CRT-Framed 3D Canvas**: Immersive voxel world rendered within authentic CRT monitor bezel (90vw × 75vh, max 1000x650px)
- **WebAssembly Engine**: High-performance 3D rendering using compiled WASM module (voxels.wasm) with JavaScript bridge (voxels.js)
- **Interactive 3D Environment**: Explore the selected voxel world with full 3D navigation and WebGL acceleration
- **Clean CRT Styling**: Canvas features clean CRT monitor bezel with subtle glow effects and modern styling
- **Exit Options**: "◀ EXIT" button in retro styling and ESC key for instant return to world selection
- **Ambient Audio**: Generative ambient music plays during 3D exploration with evolving harmonic layers across multiple musical scales

### 3D World Controls & Navigation

The WebAssembly voxel engine provides full 3D navigation controls within the CRT-framed interface:

#### Current Engine Status
- **WebAssembly Engine**: The game includes a pre-compiled voxel engine (voxels.wasm + voxels.js) that loads when you select and launch a world
- **3D Canvas**: A dedicated 3D rendering canvas appears within the CRT monitor frame when you initialize a world
- **Engine Loading**: The system shows "Loading engine..." status and "Ready" when the WASM module is successfully initialized

#### Input Controls
- **Mouse Movement**: Look around and navigate the 3D voxel environment with smooth mouse look within the CRT screen
- **Keyboard Controls**: Standard FPS movement controls (WASD or arrow keys for movement)
- **Interactive Elements**: Explore and interact with voxel-based world features and environments
- **Pointer Lock**: Engine automatically requests pointer lock for immersive first-person controls
- **Touch Support**: Mobile-friendly touch controls for navigation on tablets and phones
- **WebGL Acceleration**: Hardware-accelerated 3D graphics with WebGL support for smooth performance within the CRT frame

#### Exit Methods
- **ESC Key**: Press Escape at any time to immediately return to the CRT world selection interface
- **Exit Button**: Click the "◀ EXIT" button in retro styling in the top-right corner of the game frame
- **Automatic Return**: Seamlessly returns to the CRT interface with proper cleanup and atmospheric effects
- **Engine Reset**: Automatically resets the engine for next world selection to prevent blank screen issues
- **Clean Transitions**: Smooth transitions between 3D mode and CRT interface with audio feedback

#### Debug Controls
- **Force Engine Reload**: Press 'R' key while in 3D mode to force reload the WebAssembly engine if the world appears blank or unresponsive

### Quick Start Summary

1. **Launch the app** from a Reddit post by clicking "Play"
2. **Select a world** from the 6 available options by clicking on it
3. **Click "INITIALIZE WORLD"** to launch the 3D experience
4. **Explore the voxel world** using mouse and keyboard controls
5. **Press ESC or click "◀ EXIT"** to return to world selection

### Audio Experience

The game features a sophisticated generative audio system:
- **Interactive Sound Effects**: Every button hover, click, and selection has unique audio feedback
- **Generative Ambient Music**: Procedural ambient soundscapes that evolve during 3D exploration
- **Multiple Musical Scales**: Music evolves between different scales (pentatonic, Japanese, Hirajoshi) for variety
- **Automatic Initialization**: Audio activates on your first interaction to comply with browser policies

### Troubleshooting

#### Common Issues
- **Blank 3D World**: Press 'R' key to force reload the WebAssembly engine
- **Engine Loading Failed**: The game will automatically return to the CRT interface - try selecting a world again
- **No Audio**: Audio activates on your first interaction - click anywhere to enable sound
- **Performance Issues**: The game works best on desktop browsers with WebGL support

#### Browser Requirements
- **Modern Browser**: Chrome, Firefox, Safari, or Edge with WebAssembly support
- **WebGL Support**: Required for hardware-accelerated 3D graphics rendering
- **JavaScript Enabled**: Required for engine loading and Reddit integration

### Pro Tips for Best Experience
- **Try All Worlds**: Explore all 6 worlds to experience different themes and environments
- **Read Descriptions**: Each world has unique features - descriptions help you choose what interests you most
- **Select First**: Always select a world before clicking "INITIALIZE WORLD" to avoid error messages
- **Be Patient**: Initial engine load may take time - watch for status updates in the CRT interface
- **Quick Exit**: ESC key provides instant return to world selection
- **World Switching**: Exit and select different worlds to experience various voxel environments
- **Desktop Recommended**: While mobile-compatible, desktop provides optimal 3D navigation experience
- **Engine Refresh**: Use 'R' key if the 3D world appears blank to force engine reload
- **Enjoy the Atmosphere**: Notice the floating glass orbs, particles, and CRT effects that enhance the retro-futuristic experience

## Technical Architecture

### Frontend Technologies
- **TypeScript**: Type-safe client-side development with strict typing and shared API types (`InitResponse`, `GetEntriesResponse`, `DatabaseEntry`)
- **Vite**: Lightning-fast build system and development server with hot module replacement and watch mode
- **HTML5 Canvas**: Hardware-accelerated 3D graphics rendering within CRT frame (90vw × 75vh, max 1000x650px) with WebGL support
- **Dynamic Module Loading**: WASM engine loaded on-demand with cleanup and force reload capabilities for optimal performance and memory usage
- **CSS3**: Complete CRT monitor simulation with authentic bezel, glass morphism, and atmospheric effects
- **Web Audio API**: Generative audio system with procedural ambient music across multiple musical scales and interactive sound effects
- **Google Fonts**: Orbitron and Exo 2 fonts for retro-futuristic typography

### WebAssembly Engine
- **WASM Architecture**: High-performance WebAssembly module for 3D voxel rendering within CRT frame
  - **voxels.wasm**: Compiled WebAssembly module for 3D voxel rendering with WebGL acceleration
  - **voxels.js**: JavaScript bridge and loader for WASM integration with Module system
- **Dynamic Loading**: WASM module loaded only when user launches a dimension with proper script injection and cleanup
- **Canvas Integration**: Direct rendering to HTML5 canvas element within authentic CRT monitor bezel (90vw × 75vh, max 1000x650px)
- **Module System**: Uses global `Module` object with postRun callbacks, onAbort error handling, and runtime initialization
- **Context Menu Prevention**: Right-click disabled on canvas for seamless gaming experience within CRT interface
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
- **User Authentication**: Automatic Reddit user recognition via `/api/init` endpoint with personalized greeting in CRT interface
- **Dimension Database**: `/api/entries` endpoint serves dimension metadata from Redis with proper error handling
- **Persistent Storage**: Dimension data persists across sessions using Redis infrastructure with sorted sets for ordering
- **Post Integration**: Runs directly within Reddit posts as webview content with full CRT monitor simulation
- **Custom Splash Screen**: Configured splash screen with app branding and "Tap to Start" button
- **Native Experience**: No external redirects or separate websites required - fully contained within Reddit with retro-futuristic interface

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
- **Responsive Design**: Optimized for both desktop and mobile Reddit experiences with adaptive UI
- **Zero Installation**: Complete world selection and 3D gaming experience with no downloads required

### Technical Implementation
- **Express API**: RESTful `/api/init` and `/api/entries` endpoints for user authentication and dimension data with error handling
- **TypeScript**: Full type safety across client, server, and shared code with defined API types (`InitResponse`, `GetEntriesResponse`, `DatabaseEntry`)
- **Vite Build System**: Optimized builds for both client and server components with hot module replacement
- **Error Handling**: Graceful fallbacks for dimension loading and engine initialization failures with user-friendly messages and audio feedback
- **CRT Interface**: Complete CRT monitor simulation with authentic bezel and atmospheric effects
- **Canvas Management**: Responsive canvas sizing within CRT frame (1000x650px max) with authentic monitor bezel styling
- **Modular Architecture**: Clean separation between client (`src/client`), server (`src/server`), and shared (`src/shared`) components
- **Selection State Management**: Client-side state tracking for selected dimensions with cyan highlighting and dynamic button updates
- **Atmospheric Effects**: Floating glass orbs, light particles, bubble effects, and animated gradients create immersive retro-futuristic environment
- **Engine Management**: Dynamic WASM loading with cleanup, force reload capability (R key), and proper memory management between sessions
- **Audio Integration**: Comprehensive audio system with generative ambient music, interactive sound effects, and multiple musical scales

The dimension selection system provides a curated browsing experience within an authentic retro-futuristic CRT interface before launching into 3D voxel environments, delivering both discovery and interactive graphics directly within Reddit posts using modern web technologies and WebAssembly performance.

## Current Development Status

**Note**: This is an active development project. The WebAssembly voxel engine (voxels.wasm + voxels.js) is included in the project structure but the 3D worlds are currently in development. The complete CRT interface, world selection system, audio system, and Reddit integration are fully functional. Users can browse and select from 6 unique worlds, but the 3D exploration experience is being refined.

### What's Currently Working
- ✅ **Complete CRT Interface**: Fully functional retro-futuristic interface with glass morphism panels
- ✅ **World Selection System**: Browse and select from 6 unique voxel worlds with descriptions
- ✅ **Generative Audio System**: Dynamic ambient music and interactive sound effects
- ✅ **Reddit Integration**: User authentication, personalized greetings, and native Reddit experience
- ✅ **WebAssembly Loading**: Dynamic WASM engine loading with proper error handling
- ✅ **Responsive Design**: Mobile and desktop compatibility with adaptive CRT styling
- ✅ **Database System**: Redis-backed world storage with persistent data

### In Development
- 🔄 **3D World Content**: Voxel world environments and interactive elements
- 🔄 **Navigation Controls**: First-person movement and interaction systems
- 🔄 **World-Specific Features**: Unique mechanics for each of the 6 worlds
