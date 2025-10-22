# Reddit Counter Game with WebAssembly Integration

An innovative Reddit-based interactive counter application that demonstrates the power of WebAssembly (WASM) integration within the Devvit platform. This app combines traditional web technologies with cutting-edge WASM functionality to create a unique interactive experience directly within Reddit posts.

## What is This Game?

This is a personalized counter application that runs directly inside Reddit posts. Users can interact with a persistent counter that's tied to their Reddit identity, with all data stored using Redis for real-time synchronization across sessions. The app features a clean, mobile-first interface with Reddit's signature orange styling and includes experimental WASM integration powered by Go for mathematical operations.

## What Makes This App Innovative?

### 🚀 **WebAssembly Integration**
- **Go-Powered WASM**: Demonstrates WebAssembly integration using Go compiled to WASM for mathematical operations
- **Cross-Language Architecture**: Seamlessly combines JavaScript frontend with Go-compiled WASM functions
- **Performance Showcase**: Shows how WASM can enhance computational capabilities within Reddit apps

### 🎮 **Reddit-Native Experience**
- **Zero Installation**: Runs directly within Reddit posts - no downloads or external apps required
- **User Authentication**: Leverages Reddit's built-in user authentication system
- **Cross-Platform**: Works seamlessly on desktop and mobile Reddit clients

### 🔄 **Real-time Persistence**
- **Redis-Powered Storage**: All counter state persists across sessions using Reddit's Redis infrastructure
- **Instant Updates**: Counter changes are immediately saved and reflected
- **User-Specific Data**: Each user's counter value is tied to their Reddit account

### 🎨 **Modern Web Technologies**
- **TypeScript-First**: Full type safety across client, server, and shared modules
- **Vite Build System**: Lightning-fast development and optimized production builds
- **Express API**: Clean RESTful endpoints for counter operations

## How to Use the App

### Getting Started
1. **Launch the App**: Click the "Launch App" button when you see the counter app post in your Reddit feed
2. **Personalized Welcome**: The app will greet you by your Reddit username (e.g., "Hey username 👋")
3. **View Your Counter**: See your current counter value, which persists across all your sessions

### App Controls
1. **Increment Counter**: Click the orange "+" button to increase your counter by 1
2. **Decrement Counter**: Click the orange "-" button to decrease your counter by 1
3. **Test WASM Function**: Click "Test WASM Multiply (3 × 2)" to demonstrate WebAssembly integration

### Key Features
- **Persistent Storage**: Your counter value is automatically saved and restored each time you use the app
- **Real-time Updates**: Changes are instantly reflected and saved to Redis
- **Mobile Optimized**: Fully responsive design works perfectly on mobile devices
- **Reddit Integration**: Seamlessly integrated with Reddit's user authentication system

### WASM Integration
- **Go-Compiled Functions**: The app loads a WebAssembly module compiled from Go
- **Mathematical Operations**: Demonstrates calling WASM functions from JavaScript
- **Performance Testing**: Shows how WASM can enhance computational capabilities

### Navigation Links
- **Docs**: Links to Reddit Developer documentation
- **r/Devvit**: Links to the Devvit community subreddit
- **Discord**: Links to the Devvit Discord server for developer support

## Technical Architecture

- **Frontend**: TypeScript + Vite for the client-side interface
- **Backend**: Express.js server with Reddit Devvit integration
- **Database**: Redis for persistent counter state storage
- **WASM**: Go-compiled WebAssembly modules for mathematical operations
- **Platform**: Reddit Devvit for seamless Reddit integration

## Development Commands

- `npm run dev`: Starts development server with live Reddit integration
- `npm run build`: Builds optimized client and server bundles
- `npm run deploy`: Deploys your app to Reddit's platform
- `npm run launch`: Publishes your app for community review
- `npm run check`: Runs type checking, linting, and code formatting

## Getting Started for Developers

> Requires Node.js 22+ for full WASM and Devvit compatibility

1. Clone this repository
2. Run `npm install` to install dependencies
3. Run `npm run dev` to start development server
4. Visit the provided Reddit playtest URL to test your app live

The app will automatically create a test subreddit where you can interact with the counter and test WASM functionality in real-time.

## WASM Development

To rebuild the WebAssembly module:

1. Navigate to `src/wasm/`
2. Run `make` to compile the Go code to WASM
3. The compiled `lib.wasm` file will be copied to `src/client/public/`

The WASM module exposes a `multiply` function that can be called from JavaScript to demonstrate cross-language integration.
