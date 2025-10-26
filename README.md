# Voxel World Explorer - 3D WebAssembly Game

An immersive 3D voxel world explorer that runs directly inside Reddit posts, powered by WebAssembly technology. Choose from a curated collection of unique voxel worlds and experience fully interactive 3D environments with first-person exploration, all within your Reddit feed.

## What is This Game?

Voxel World Explorer is a 3D voxel-based exploration game that brings interactive 3D gaming directly to Reddit. The game features:

- **World Selection Interface**: Browse and select from a curated database of unique voxel worlds, each with distinct themes and environments
- **12 Unique Worlds**: Pre-loaded with diverse worlds including Crystal Caves, Sky Islands, Ocean Mining, Volcano Bases, Ice Palaces, and more
- **3D Voxel Engine**: Fully rendered 3D environments powered by a WebAssembly engine (voxels.wasm) with smooth performance
- **First-Person Exploration**: Navigate through selected worlds using standard FPS controls
- **WebAssembly Performance**: Powered by a compiled WASM engine with JavaScript bridge for optimal 3D rendering
- **Reddit Integration**: Seamlessly integrated with Reddit's platform - no downloads or installations required
- **Personalized Experience**: Automatically greets you with your Reddit username and tracks your world selections
- **Dynamic Loading**: The voxel engine loads on-demand only when launching a world for optimal performance
- **World Database**: Persistent Redis-backed database storing world metadata, descriptions, and creation details
- **Cross-Platform**: Works on both desktop and mobile browsers with responsive design

The game provides an immersive world selection and 3D exploration experience, allowing players to discover and explore diverse voxel environments directly in their browser within Reddit posts.

## What Makes This Game Innovative?

### 🎮 **World Selection Gaming in Reddit Posts**
- **Reddit-Native 3D**: A fully 3D voxel world explorer that runs natively inside Reddit posts
- **Curated World Database**: Browse and select from 12 unique pre-loaded worlds with distinct themes and environments
- **WebAssembly Performance**: Leverages a high-performance WASM engine (voxels.wasm) with JavaScript bridge for smooth 3D graphics
- **Zero Installation**: Full 3D world exploration experience with no downloads, plugins, or external software required
- **Devvit Platform**: Built on Reddit's official developer platform for seamless integration

### 🌍 **Dynamic World Selection System**
- **World Database**: Redis-backed persistent storage of world metadata, descriptions, authors, and creation dates
- **Interactive Selection**: Click-to-select interface with visual feedback and world previews
- **Diverse Themes**: 12 unique worlds including Crystal Caves, Sky Islands, Ocean Mining, Volcano Bases, Ice Palaces, Desert Oases, and more
- **World Metadata**: Each world includes title, description, author, and creation timestamp for rich context
- **Selection Validation**: Must select a world before launching the 3D engine

### 🚀 **WebAssembly Voxel Technology**
- **WASM Engine**: Built with optimized WebAssembly for smooth 3D rendering of selected worlds
- **Real-time 3D Rendering**: Hardware-accelerated voxel world with smooth performance via HTML5 Canvas
- **Dynamic Engine Loading**: WASM engine loads only when launching a selected world, keeping initial load times fast
- **Canvas Integration**: Direct rendering to HTML5 canvas with right-click context menu disabled for gaming

### 🎯 **Seamless Reddit Integration**
- **Native Experience**: Runs directly within Reddit's interface without breaking the user flow
- **User Authentication**: Automatically recognizes and greets Reddit users by their username via `/api/init` endpoint
- **Persistent Data**: World database persists across sessions using Reddit's Redis infrastructure
- **Mobile Optimized**: Responsive design that works on both desktop and mobile Reddit clients
- **Custom Splash Screen**: Engaging splash screen with "Tap to Start" button to invite players to explore worlds

### 🎨 **Intuitive Interface Design**
- **World Browser**: Scrollable list of worlds with hover effects and selection highlighting
- **Visual Feedback**: Selected worlds are highlighted with teal accent and left border indicator
- **Dynamic Launch Button**: Button text updates to show selected world (e.g., "Launch 'Crystal Cave Explorer'")
- **Status Feedback**: Clear loading and selection status messages
- **Clean UI**: Dark theme with blue and teal accent colors for modern gaming aesthetic

## How to Play the Game

### Getting Started
1. **Find Voxel World Explorer**: Look for Voxel World Explorer posts in your Reddit feed or visit the development subreddit
2. **Launch the App**: Click the "Tap to Start" button on the splash screen when you see a Voxel World Explorer post
3. **Personal Welcome**: The app will automatically greet you with your Reddit username (e.g., "Welcome [username]!")
4. **Browse Available Worlds**: Scroll through the "Explore Worlds" section to see all available voxel worlds

### World Selection Process
The game features a world selection interface before entering the 3D environment:

#### World Browser Interface
- **Title**: Shows "Voxel World" or personalized greeting with your Reddit username
- **Explore Worlds Section**: Scrollable list displaying all available worlds with detailed information
- **World Cards**: Each world shows:
  - **Title**: Name of the world (e.g., "Crystal Cave Explorer", "Sky Island Builder")
  - **Description**: Brief description of what makes the world unique
  - **Author**: Creator of the world (e.g., "CaveExplorer42", "SkyArchitect")
  - **Creation Date**: When the world was created
- **Selection Feedback**: Click any world to select it - selected worlds are highlighted with teal background and left border
- **Dynamic Launch Button**: Button text updates to show selected world (e.g., "Launch 'Crystal Cave Explorer'")
- **Status Display**: Shows current status ("Ready to play", "Please select a world first", "Loading...", etc.)

#### Available Worlds (12 Unique Environments)
1. **Crystal Cave Explorer** - Discover hidden crystals in underground caverns
2. **Sky Island Builder** - Build floating islands in the clouds  
3. **Ocean Floor Mining** - Deep sea mining operation with submarines
4. **Volcano Base Camp** - Establish a research station near active volcanoes
5. **Ice Palace Construction** - Build magnificent structures from ice blocks
6. **Desert Oasis Project** - Create a thriving oasis in the harsh desert
7. **Jungle Treehouse Network** - Connect treehouses with bridges and ziplines
8. **Mountain Peak Observatory** - Build a stargazing observatory on the highest peak
9. **Underground City** - Construct a sprawling underground metropolis
10. **Floating Garden Paradise** - Create beautiful floating gardens with waterfalls
11. **Ancient Temple Restoration** - Restore and expand mysterious ancient temples
12. **Space Station Assembly** - Build a massive space station orbiting the planet

### World Selection Steps
1. **Browse Worlds**: Scroll through the world list to see all available options
2. **Read Descriptions**: Each world has a unique theme and description to help you choose
3. **Select a World**: Click on any world card to select it (it will highlight in teal)
4. **Confirm Selection**: The launch button will update to show your selected world
5. **Launch**: Click the launch button to enter the selected 3D world

### Game States

#### Menu State (World Selection)
- **World Browser**: Scrollable list of 12 unique worlds with hover effects
- **Selection Highlighting**: Selected worlds show teal background with left border indicator
- **Dynamic Launch Button**: Updates text to show selected world name
- **Selection Validation**: Must select a world before the launch button becomes functional

#### Game State (3D World)
- **Full-Screen Canvas**: The selected 3D voxel world takes up the entire view (90vw × 80vh with blue border)
- **Exit Button**: Red button positioned in top-right corner to return to world selection
- **Black Background**: Full-screen black background for immersive gaming experience

### Loading Process
1. **World Selection Required**: You must first select a world from the list
2. **Selection Validation**: If no world is selected, status shows "Please select a world first"
3. **Engine Initialization**: Click "Launch [World Name]" to start loading the voxel engine for that world
4. **Status Updates**: Watch the status display for loading progress:
   - "Ready to play" (initial state)
   - "Please select a world first" (no world selected)
   - "Loading..." (downloading WASM files and initializing engine for selected world)
   - "Ready!" (engine loaded successfully)
   - "Failed to load engine" (if engine fails to initialize)
5. **Automatic Transition**: Game canvas appears automatically when ready
6. **Button State**: Launch button is disabled during loading to prevent multiple attempts

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
- **Explore All Worlds**: Browse through all 12 unique worlds to find your favorite themes
- **Read Descriptions**: Each world has unique features - read descriptions to choose the best fit
- **Selection Required**: Always select a world before clicking launch to avoid error messages
- **First Launch**: Initial engine load may take time depending on connection speed
- **Loading Patience**: Wait for "Ready!" status before expecting the game to respond
- **Quick Exit**: ESC key provides instant exit if you need to return to Reddit quickly
- **World Switching**: Exit and select different worlds to experience various environments
- **Desktop Recommended**: While mobile-compatible, desktop provides the best control experience for world selection and 3D navigation
- **Clean Interface**: Minimal UI design keeps focus on world selection and 3D experience

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
- **Express.js**: RESTful API server with `/api/init` and `/api/entries` endpoints
- **Redis Database**: Persistent world database using Redis sorted sets and hash maps
- **World Management**: Automatic database initialization with 12 pre-loaded worlds
- **Devvit Platform**: Reddit's official developer platform for hosting and integration
- **Node.js**: Modern JavaScript runtime with WebAssembly support

### Reddit Integration & Data Persistence
- **User Authentication**: Automatic Reddit user recognition via `/api/init` endpoint
- **World Database**: `/api/entries` endpoint serves world metadata from Redis
- **Persistent Storage**: World data persists across sessions using Redis infrastructure
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
The game includes a Redis-backed world database with 12 pre-loaded worlds:
```bash
# Redis data structure:
voxel_entries          # Sorted set for world ordering (by creation time)
entry:entry_1          # Hash map for each world's metadata
entry:entry_2          # Contains: id, title, description, createdAt, author
# ... (entry_1 through entry_12)
```

### Development Workflow
1. **Client Development**: Edit files in `src/client/` - changes auto-rebuild
2. **Server Development**: Edit files in `src/server/` - API endpoints auto-reload
3. **Testing**: Use the Reddit playtest URL to test in real Reddit environment
4. **WASM Updates**: Replace WASM files in `src/client/public/` if updating the engine

## Advanced Features

### World Selection & Database System
- **Redis-Backed Database**: Persistent world storage using Redis sorted sets and hash maps
- **12 Pre-loaded Worlds**: Diverse collection including caves, sky islands, ocean mining, volcanoes, ice palaces, and more
- **World Metadata**: Each world includes title, description, author, and creation timestamp
- **Dynamic Loading**: World list loads from `/api/entries` endpoint on app initialization
- **Selection Interface**: Interactive world browser with click-to-select and visual feedback
- **Selection Validation**: Prevents launching without world selection with clear error messaging

### 3D Voxel World Engine
- **WebAssembly Rendering**: High-performance 3D graphics using WebAssembly engine for selected worlds
- **Interactive Navigation**: 3D world exploration with user controls in chosen environments
- **Dynamic Loading**: WASM engine loads on-demand only when launching a selected world
- **Cross-Platform**: Works seamlessly on desktop and mobile browsers

### WebAssembly Integration
- **WASM Engine**: Optimized WebAssembly module (voxels.wasm) for 3D rendering of selected worlds
- **JavaScript Bridge**: WASM loading with JavaScript bridge (voxels.js) for seamless integration
- **Canvas Rendering**: Direct rendering to HTML5 canvas element with id="canvas"
- **Dynamic Script Loading**: WASM engine loaded via dynamic script injection when launching worlds
- **On-Demand Loading**: Engine files only load when user selects and launches a world for faster initial page load
- **Context Menu Prevention**: Right-click disabled on canvas for seamless gaming experience
- **Module Configuration**: Uses global `Module` object with `postRun` callbacks for initialization

### Reddit Platform Integration
- **Devvit Platform**: Built on Reddit's official developer platform
- **Native Experience**: Runs directly within Reddit posts with no external dependencies
- **User Authentication**: Automatic Reddit user recognition via server API (`/api/init` endpoint)
- **Persistent Data**: World database persists across sessions using Reddit's Redis infrastructure
- **Custom Splash Screen**: Engaging splash screen with app branding and call-to-action
- **Responsive Design**: Optimized for both desktop and mobile Reddit experiences
- **Zero Installation**: Complete world selection and 3D gaming experience with no downloads required

### Technical Implementation
- **Express API**: RESTful `/api/init` and `/api/entries` endpoints for user authentication and world data
- **TypeScript**: Full type safety across client, server, and shared code with defined API types
- **Vite Build System**: Optimized builds for both client and server components
- **Error Handling**: Graceful fallbacks for world loading and engine initialization failures
- **Clean UI**: Dark theme interface with blue and teal accent colors for modern gaming aesthetic
- **Canvas Management**: Responsive canvas sizing with maximum dimensions and blue border
- **Modular Architecture**: Clean separation between client, server, and shared components
- **Selection State Management**: Client-side state tracking for selected worlds with visual feedback

The world selection system provides a curated browsing experience before launching into 3D voxel environments, delivering both discovery and interactive graphics directly within Reddit posts using modern web technologies.
