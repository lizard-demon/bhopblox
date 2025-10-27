# Voxel World Explorer - 3D WebAssembly Game

An immersive 3D voxel world explorer that runs directly inside Reddit posts, powered by WebAssembly technology. Choose from a curated collection of unique voxel worlds and experience fully interactive 3D environments with first-person exploration, all within your Reddit feed.

## What is This Game?

Voxel World Explorer is a revolutionary 3D voxel-based exploration game that brings interactive 3D gaming directly to Reddit. The game features:

- **Interactive World Selection**: Browse and select from a curated database of unique voxel worlds, each with distinct themes and environments
- **6 Unique Pre-loaded Worlds**: Diverse collection including Crystal Cave, Sky Islands, Ocean Mining, Volcano Base, Ice Palace, and Desert Oasis
- **High-Performance 3D Engine**: Fully rendered 3D environments powered by a WebAssembly engine (voxels.wasm) with smooth performance
- **First-Person 3D Exploration**: Navigate through selected worlds using standard FPS controls with mouse look and keyboard movement
- **WebAssembly Performance**: Powered by a compiled WASM engine with JavaScript bridge for optimal 3D rendering
- **Reddit Native Integration**: Seamlessly integrated with Reddit's platform - no downloads or installations required
- **Personalized Experience**: Automatically greets you with your Reddit username and tracks your world selections
- **On-Demand Engine Loading**: The voxel engine loads dynamically only when launching a world for optimal performance
- **Persistent World Database**: Redis-backed database storing world metadata, descriptions, and creation details
- **Cross-Platform Compatibility**: Works on both desktop and mobile browsers with responsive design
- **Immersive Canvas Rendering**: Full-screen 3D rendering (90vw × 80vh) with WebGL acceleration
- **Generative Audio System**: Dynamic ambient music and interactive sound effects using Web Audio API
- **Animated Cyberpunk Theme**: Beautiful floating cloud animations with animated gradient background and CRT scanline effects for a futuristic gaming experience

The game provides a complete world selection and 3D exploration experience, allowing players to discover and explore diverse voxel environments directly in their browser within Reddit posts.

## What Makes This Game Innovative?

### 🎮 **Reddit-Native 3D Voxel Gaming**
- **First-of-its-Kind**: A fully 3D voxel world explorer that runs natively inside Reddit posts using WebAssembly
- **Zero Installation Gaming**: Complete 3D world exploration experience with no downloads, plugins, or external software required
- **WebAssembly Performance**: Leverages a high-performance WASM engine (voxels.wasm) with JavaScript bridge for smooth 3D graphics
- **Devvit Platform Pioneer**: Built on Reddit's official developer platform for seamless social media gaming integration
- **Cross-Platform 3D**: Works seamlessly on desktop and mobile browsers within Reddit's interface

### 🌍 **Curated World Selection System**
- **Interactive World Browser**: Browse and select from 6 unique pre-loaded worlds with distinct themes and environments
- **Rich World Metadata**: Each world includes detailed descriptions, author information, and creation timestamps
- **Visual Selection Interface**: Click-to-select with bright teal highlighting (#4fc3f7) and hover effects for intuitive world browsing
- **Dynamic Launch System**: Button text updates to show selected world (e.g., "Play 'Crystal Cave'")
- **Persistent World Database**: Redis-backed storage ensures worlds persist across sessions and users
- **Scrollable World List**: Elegant scrollable interface (max-height: 250px) with modern gradient styling

### 🚀 **Advanced WebAssembly Integration**
- **On-Demand Engine Loading**: WASM engine loads only when launching a selected world, keeping initial load times fast
- **Hardware-Accelerated 3D**: Real-time voxel rendering with WebGL support via HTML5 Canvas
- **Optimized Performance**: Compiled WebAssembly module with JavaScript bridge for optimal 3D graphics performance
- **Canvas-First Design**: Full-screen 3D rendering (90vw × 80vh, max 1000x700px) with context menu disabled for immersive gaming
- **Memory Management**: Efficient WASM memory handling with proper initialization and cleanup
- **Dynamic Script Injection**: voxels.js script dynamically loaded and removed as needed for optimal performance

### 🎯 **Seamless Social Gaming Integration**
- **Reddit User Recognition**: Automatically greets users by their Reddit username via server-side authentication
- **Native Reddit Experience**: Runs directly within Reddit's interface without breaking user flow or requiring external sites
- **Social Context Preservation**: Maintains Reddit post context while providing full 3D gaming experience
- **Mobile-First Design**: Responsive interface optimized for Reddit's mobile user base with touch support
- **Instant Access**: No account creation or separate login required - uses existing Reddit authentication

### 🎨 **Sophisticated User Experience Design**
- **Two-Phase Interface**: Clean separation between world selection menu and full-screen 3D gaming modes
- **Status-driven Feedback**: Real-time status updates ("Loading engine...", "Ready", "Select a world first")
- **Escape-Key Navigation**: Instant exit from 3D mode back to world selection with ESC key
- **Animated Cyberpunk Theme**: Dynamic gradient background with animated color shifting, floating cloud animations, and CRT scanline effects
- **Modern Glass Morphism UI**: Frosted glass effect with backdrop blur and subtle transparency for the menu interface
- **Loading State Management**: Proper button disabling and status messaging during engine initialization
- **Animated Loading Indicators**: CSS-based loading spinner during WebAssembly engine initialization
- **Floating Menu Animation**: Gentle floating animation on the main menu for added visual appeal
- **Retro-Futuristic Aesthetics**: Subtle dot matrix patterns, texture floating animations, and cyberpunk color schemes

### 🎵 **Generative Audio System**
- **Dynamic Ambient Music**: Procedurally generated ambient soundscapes using Web Audio API with evolving harmonic layers
- **Interactive Sound Effects**: Contextual audio feedback for all user interactions (hover, select, launch, exit, error states)
- **Multiple Musical Scales**: Evolving between major pentatonic, minor pentatonic, Japanese, and Hirajoshi scales for varied ambient music
- **Layered Audio Architecture**: Separate gain nodes for ambient music and sound effects with independent volume control
- **Automatic Audio Initialization**: Audio system activates on first user interaction to comply with browser autoplay policies
- **Immersive Audio Experience**: Ambient music starts when entering 3D worlds and stops when exiting for full immersion
- **Frequency Modulation**: Subtle LFO (Low Frequency Oscillator) effects on ambient tones for organic, evolving soundscapes
- **Harmonic Layering**: Multiple oscillators create rich, evolving harmonic textures with different waveforms (sine, triangle, sawtooth)

## How to Play the Game

### Getting Started
1. **Find Voxel World Explorer**: Look for Voxel World Explorer posts in your Reddit feed or visit the development subreddit
2. **Launch the App**: Click the "Tap to Start" button on the splash screen when you see a Voxel World Explorer post
3. **Personal Welcome**: The app will automatically greet you with your Reddit username (e.g., "Welcome [username]!")
4. **Browse Available Worlds**: You'll see the world selection interface with 6 unique voxel worlds to choose from

### World Selection Interface

The game starts with an elegant world selection menu featuring a dynamic animated gradient background (cyan to blue with shifting colors) with cyberpunk aesthetics, CRT scanline effects, and floating cloud animations:

#### Main Interface Elements
- **Title Header**: Shows "Voxel World" or personalized greeting with your Reddit username in bright blue (#4fc3f7)
- **World Browser**: Scrollable list (max-height: 250px) displaying all 6 available worlds with detailed information
- **Play Button**: Initially shows "Select a World" - updates dynamically when you make a selection
- **Status Display**: Shows current game status and loading information at the bottom
- **Animated Cyberpunk Background**: Dynamic gradient shifting between cyan and blue tones with 5 floating clouds, CRT scanlines, and dot matrix texture patterns
- **Glass Morphism Menu**: Semi-transparent menu with frosted glass effect, backdrop blur, and subtle border highlights

#### World Selection Process
1. **Browse Available Worlds**: Scroll through the world list to see all 6 unique environments
2. **Read World Details**: Each world card displays:
   - **Title**: Name of the world (e.g., "Crystal Cave", "Sky Islands") in bold
   - **Description**: Brief description of the world's theme and features (author information is stored but not displayed in the current UI)
3. **Select Your World**: Click on any world card to select it
   - Hover effects show #444 background for better interactivity
   - Selected worlds are highlighted with a bright teal background (#4fc3f7) and dark text (#222)
   - The play button updates to show "Play '[World Name]'"
4. **Launch the 3D Experience**: Click the blue play button to enter your selected world

#### Available Worlds (6 Unique Environments)
1. **Crystal Cave** (by Explorer) - Explore underground caverns filled with mysterious crystals
2. **Sky Islands** (by Architect) - Build floating structures high above the clouds  
3. **Ocean Mining** (by Diver) - Deep sea operations and underwater exploration
4. **Volcano Base** (by Scientist) - Research station setup near active volcanic activity
5. **Ice Palace** (by Builder) - Frozen architecture in a winter wonderland
6. **Desert Oasis** (by Survivor) - Survival challenge in harsh desert conditions

### Game States & Navigation

#### Menu State (World Selection)
- **Interactive World Cards**: Hover effects (#444 background) and click-to-select functionality with audio feedback
- **Visual Feedback**: Selected worlds show bright teal highlighting (#4fc3f7) with dark text (#2c3e50) for clear visual indicators
- **Dynamic Button**: Play button text updates to reflect your current selection (e.g., "Play 'Crystal Cave'")
- **Selection Validation**: Must select a world before the 3D engine can be launched - shows "Select a world first" error message with error sound
- **Responsive Design**: Interface adapts to different screen sizes with max-width: 400px and 90vw width
- **Audio Feedback**: Hover sounds on buttons and world cards, plus selection confirmation sounds

#### Loading State (Engine Initialization)
- **Status Updates**: Real-time feedback during WebAssembly engine loading
  - "Loading engine..." - WASM files (voxels.js, voxels.wasm) are being downloaded and initialized
  - "Ready" - Engine successfully loaded and ready for 3D exploration
  - "Failed to load engine" - Error occurred during initialization with automatic fallback to menu
- **Button Management**: Play button is disabled during loading to prevent multiple attempts
- **Canvas Preparation**: Game canvas is prepared and sized for optimal 3D rendering (90vw × 80vh, max 1000x700px)
- **Animated Loading**: CSS-based loading spinner animation on canvas during engine initialization

#### Game State (3D Voxel World)
- **Full-Screen 3D Canvas**: Immersive voxel world rendered at 90vw × 80vh with subtle border (#555) on black background
- **WebAssembly Engine**: High-performance 3D rendering using compiled WASM module (voxels.wasm) with JavaScript bridge (voxels.js)
- **Interactive 3D Environment**: Explore the selected voxel world with full 3D navigation and WebGL acceleration
- **Exit Options**: Multiple ways to return to world selection menu
- **Context Menu Disabled**: Right-click disabled on canvas for seamless gaming experience
- **Ambient Audio**: Generative ambient music plays during 3D exploration with evolving harmonic layers

### 3D World Controls & Navigation

The WebAssembly voxel engine provides full 3D navigation controls with hardware acceleration:

#### Input Controls
- **Mouse Movement**: Look around and navigate the 3D voxel environment with smooth mouse look
- **Keyboard Controls**: Standard FPS movement controls (WASD or arrow keys for movement)
- **Interactive Elements**: Explore and interact with voxel-based world features and environments
- **Pointer Lock**: Engine automatically requests pointer lock for immersive first-person controls
- **Touch Support**: Mobile-friendly touch controls for navigation on tablets and phones
- **WebGL Acceleration**: Hardware-accelerated 3D graphics with WebGL support for smooth performance

#### Exit Methods
- **ESC Key**: Press Escape at any time to immediately return to world selection menu
- **Exit Button**: Click the red "Exit" button (#f44336, hover: #d32f2f) in the top-right corner of the game canvas
- **Automatic Return**: Seamlessly returns to the world selection interface with proper cleanup
- **Engine Reset**: Automatically resets the engine for next world selection to prevent blank screen issues
- **Clean Transitions**: Smooth transitions between 3D mode and world selection menu

### Advanced Features & Controls

#### Debug & Development Features
- **Force Engine Reload**: Press 'R' key while in 3D mode to force reload the WebAssembly engine
- **Engine Cleanup**: Automatic cleanup when exiting to prevent memory leaks and ensure clean state
- **Canvas Resizing**: Automatic canvas resizing on window resize events for responsive gameplay
- **Error Recovery**: Graceful error handling with fallback to world selection menu and clear error messages
- **Console Logging**: Comprehensive logging for engine initialization, errors, and state changes

#### Performance Optimizations
- **On-Demand Loading**: WASM engine only loads when launching a world (not during world browsing)
- **Dynamic Script Injection**: voxels.js script is dynamically loaded and removed as needed for optimal memory usage
- **Memory Management**: Proper WebAssembly memory allocation and cleanup between sessions
- **Canvas Optimization**: Canvas dimensions are optimized for performance (max 1000x700px) with responsive scaling
- **Efficient State Management**: Clean separation between menu and game states with proper resource management
- **Loading State Optimization**: Canvas preparation and layout calculations before engine initialization

### Technical Features & Performance

#### WebAssembly Engine Architecture
- **High-Performance 3D**: Compiled WASM module (voxels.wasm) for optimal rendering performance with WebGL acceleration
- **JavaScript Bridge**: Seamless integration between WASM engine and web interface via voxels.js loader
- **Canvas Rendering**: Direct WebGL rendering to HTML5 canvas element with hardware acceleration and pointer lock support
- **Module System**: Uses global Module object with postRun callbacks for initialization and proper cleanup
- **Context Menu Prevention**: Right-click disabled on canvas (`oncontextmenu="event.preventDefault()"`) for seamless gaming experience
- **Memory Management**: Efficient WASM memory handling with proper initialization and cleanup between sessions

#### User Experience Optimizations
- **Responsive Design**: Adapts to different screen sizes with maximum canvas dimensions (90vw × 80vh, max 1000x700px)
- **Loading States**: Clear feedback during all loading and initialization phases with status messages
- **Error Handling**: Graceful fallbacks for engine loading failures with automatic retry mechanisms and menu fallback
- **Status-driven Interface**: Real-time status updates guide user through each step of the process
- **Visual Loading Indicator**: Animated CSS loading spinner during engine initialization with SVG-based animation
- **Dark Theme Optimization**: Carefully designed dark theme (#222 background) with blue accents (#4fc3f7) for optimal gaming experience

### Technical Requirements
- **Modern Browser**: Chrome, Firefox, Safari, or Edge with WebAssembly support
- **WebGL Support**: Required for hardware-accelerated 3D graphics rendering
- **WebAssembly Support**: Required for the high-performance voxel engine (voxels.wasm)
- **JavaScript Enabled**: Required for engine loading, Reddit integration, and dynamic script injection
- **Stable Internet Connection**: For initial download of WASM files (voxels.wasm and voxels.js)
- **Pointer Lock Support**: For immersive first-person 3D navigation controls

### Pro Tips for Best Experience
- **World Exploration**: Try all 6 worlds to experience different themes and environments
- **Read Descriptions**: Each world has unique features - descriptions help you choose the best fit for your interests
- **Selection First**: Always select a world before clicking play to avoid "Select a world first" error messages
- **Patient Loading**: Initial engine load may take time depending on connection speed - wait for "Ready" status before proceeding
- **Quick Navigation**: ESC key provides instant exit back to world selection menu if needed
- **World Switching**: Exit and select different worlds to experience various voxel environments without reloading the page
- **Desktop Recommended**: While mobile-compatible with touch support, desktop provides optimal control experience for 3D navigation
- **Engine Refresh**: Use 'R' key if the 3D world appears blank or unresponsive to force engine reload
- **Clean Interface**: Modern cyberpunk gradient theme UI design with animated backgrounds keeps focus on world selection and immersive 3D experience
- **Visual Feedback**: Pay attention to teal highlighting (#4fc3f7) to confirm world selection before launching
- **Status Monitoring**: Watch status messages for real-time feedback during loading and initialization phases
- **Audio Experience**: Enjoy the generative ambient music that starts automatically when entering worlds, with interactive sound effects for all UI interactions including hover sounds and selection confirmations

## Technical Architecture

### Frontend Technologies
- **TypeScript**: Type-safe client-side development with strict typing and shared API types
- **Vite**: Lightning-fast build system and development server with hot module replacement
- **HTML5 Canvas**: Hardware-accelerated 3D graphics rendering via canvas element with WebGL support
- **Dynamic Module Loading**: WASM engine loaded on-demand for optimal performance and memory usage
- **CSS3**: Modern styling with dark theme, animations, and responsive design

### WebAssembly Engine
- **WASM Architecture**: High-performance WebAssembly module for 3D voxel rendering
  - **voxels.wasm**: Compiled WebAssembly module for 3D voxel rendering with WebGL acceleration
  - **voxels.js**: JavaScript bridge and loader for WASM integration with Module system
- **Dynamic Loading**: WASM module loaded only when user launches a world for faster initial page load
- **Canvas Integration**: Direct rendering to HTML5 canvas element with id="canvas" (90vw × 80vh, max 1000x700px)
- **Module System**: Uses global `Module` object for WASM configuration, postRun callbacks, and error handling
- **Context Menu Prevention**: Right-click disabled on canvas for seamless gaming experience
- **Memory Management**: Proper WASM memory allocation and cleanup between sessions

### Backend & Infrastructure
- **Express.js**: RESTful API server with `/api/init` and `/api/entries` endpoints
- **Redis Database**: Persistent world database using Redis sorted sets (`voxel_entries`) and hash maps (`entry:*`)
- **World Management**: Automatic database initialization with 6 pre-loaded worlds with metadata
- **Devvit Platform**: Reddit's official developer platform for hosting and integration
- **Node.js**: Modern JavaScript runtime with WebAssembly support and Reddit API integration

### Reddit Integration & Data Persistence
- **User Authentication**: Automatic Reddit user recognition via `/api/init` endpoint with username display
- **World Database**: `/api/entries` endpoint serves world metadata from Redis with proper error handling
- **Persistent Storage**: World data persists across sessions using Redis infrastructure with sorted sets for ordering
- **Post Integration**: Runs directly within Reddit posts as webview content with full-screen capability
- **Custom Splash Screen**: Configured splash screen with app branding and "Tap to Start" button
- **Native Experience**: No external redirects or separate websites required - fully contained within Reddit

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
voxel_entries          # Sorted set for world ordering (by creation time)
entry:entry_1          # Hash map for each world's metadata
entry:entry_2          # Contains: id, title, description, createdAt, author
# ... (entry_1 through entry_6)
```

### Development Workflow
1. **Client Development**: Edit files in `src/client/` - changes auto-rebuild
2. **Server Development**: Edit files in `src/server/` - API endpoints auto-reload
3. **Testing**: Use the Reddit playtest URL to test in real Reddit environment
4. **WASM Updates**: Replace WASM files in `src/client/public/` if updating the engine

## Advanced Features

### World Selection & Database System
- **Redis-Backed Database**: Persistent world storage using Redis sorted sets (`voxel_entries`) and hash maps (`entry:*`)
- **6 Pre-loaded Worlds**: Diverse collection including Crystal Cave, Sky Islands, Ocean Mining, Volcano Base, Ice Palace, and Desert Oasis
- **World Metadata**: Each world includes id, title, description, author, and creation timestamp with proper data validation
- **Dynamic Loading**: World list loads from `/api/entries` endpoint on app initialization with error handling
- **Selection Interface**: Interactive world browser with click-to-select, hover effects (#444), and visual feedback
- **Selection Validation**: Prevents launching without world selection with clear "Select a world first" error messaging
- **Scrollable Interface**: Elegant scrollable world list (max-height: 250px) with dark theme styling

### 3D Voxel World Engine
- **WebAssembly Rendering**: High-performance 3D graphics using WebAssembly engine (voxels.wasm) for selected worlds
- **Interactive Navigation**: 3D world exploration with FPS controls, mouse look, and keyboard movement in chosen environments
- **Dynamic Loading**: WASM engine loads on-demand only when launching a selected world with proper initialization
- **Cross-Platform**: Works seamlessly on desktop and mobile browsers with touch support and responsive design
- **Hardware Acceleration**: WebGL-accelerated 3D rendering with pointer lock support for immersive experience

### WebAssembly Integration
- **WASM Engine**: Optimized WebAssembly module (voxels.wasm) for 3D rendering of selected worlds with memory management
- **JavaScript Bridge**: WASM loading with JavaScript bridge (voxels.js) for seamless integration and error handling
- **Canvas Rendering**: Direct rendering to HTML5 canvas element with id="canvas" (90vw × 80vh, max 1000x700px)
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
- **Express API**: RESTful `/api/init` and `/api/entries` endpoints for user authentication and world data with error handling
- **TypeScript**: Full type safety across client, server, and shared code with defined API types (`InitResponse`, `GetEntriesResponse`, `DatabaseEntry`)
- **Vite Build System**: Optimized builds for both client and server components with hot module replacement
- **Error Handling**: Graceful fallbacks for world loading and engine initialization failures with user-friendly messages and audio feedback
- **Animated UI**: Dynamic cyberpunk gradient background with color shifting animation, 5 floating cloud animations, CRT scanline effects, and glass morphism menu design
- **Canvas Management**: Responsive canvas sizing with maximum dimensions and subtle border for optimal gaming experience
- **Modular Architecture**: Clean separation between client (`src/client`), server (`src/server`), and shared (`src/shared`) components
- **Selection State Management**: Client-side state tracking for selected worlds with visual feedback and dynamic button updates
- **CSS Animations**: Smooth cloud floating animations with different speeds and delays for natural movement patterns

The world selection system provides a curated browsing experience before launching into 3D voxel environments, delivering both discovery and interactive graphics directly within Reddit posts using modern web technologies and WebAssembly performance.
