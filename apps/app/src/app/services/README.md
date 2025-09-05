# Mock Command Service

## Overview

The `MockCommandService` provides a realistic fake service to demonstrate the Command Component functionality with comprehensive test data and interactions.

## Features

### 📊 **25+ Mock Commands** across 6 categories:

- **File Operations**: New File, Open File, Save File, Save As...
- **Navigation**: Go to Line, Find File, Find and Replace, Go Back
- **View**: Toggle Sidebar, Toggle Theme, Zoom In/Out
- **Settings**: Open Settings, Keyboard Shortcuts, Reset Layout
- **Help & Support**: Show Help, About, Check Updates
- **Development**: Developer Tools, Reload App, Clear Cache

### 🎯 **Command Features**:

- **Icons**: Emoji icons for visual identification
- **Descriptions**: Helpful context for each command
- **Keyboard Shortcuts**: Display shortcuts like ⌘N, ⌘S, F1
- **Disabled States**: Some commands marked as disabled for demo
- **Categories**: Organized grouping with proper labels

### 🔍 **Service Methods**:

- `getAllCommands()` - Get all available commands
- `getCommandsByCategory()` - Get commands grouped by category
- `searchCommands(query)` - Search with filtering
- `executeCommand(id)` - Execute command with toast notifications
- `getRecentCommands()` - Mock recent commands
- `getSuggestedCommands()` - Mock suggested commands
- `fuzzyFilter()` - Custom fuzzy search algorithm

### 🎨 **Interactive Features**:

- **Toast Notifications**: Visual feedback when commands execute
- **Real Actions**: Each command has a meaningful action function
- **Observable Patterns**: Uses RxJS for realistic async behavior
- **Network Simulation**: Includes delays to simulate real API calls

## Usage in Demos

### Command Demo (`command-demo.ts`)

- **Dynamic Data Loading**: Load recent, suggested, or all commands
- **Filter Switching**: Toggle between default and fuzzy search
- **Real-time Filtering**: Search through 25+ commands instantly
- **Interactive Controls**: Buttons to change demo modes

### Command Dialog Demo (`command-dialog-demo.ts`)

- **Modal Integration**: Opens full command palette in dialog
- **Auto-close**: Dialog closes after command selection
- **Comprehensive Data**: Shows all categories and commands
- **Keyboard Navigation**: Full arrow key + Enter/Escape support

## Testing Features

You can test the following functionality:

### ✅ **Search & Filtering**

- Try searching for "file", "settings", "theme", "help"
- Test fuzzy search with partial matches like "newf" → "New File"
- Empty search shows all commands

### ✅ **Keyboard Navigation**

- Use arrow keys to navigate
- Press Enter to select commands
- Escape to clear search

### ✅ **Mouse Interaction**

- Hover over items to select them
- Click to execute commands
- See visual hover feedback

### ✅ **State Management**

- Load different command sets (recent/suggested/all)
- Toggle between filter algorithms
- See disabled states on some dev commands

### ✅ **Notifications**

- Every command shows toast notification
- Clear visual feedback
- Auto-dismiss after 3 seconds

## Command Categories

| Category            | Commands   | Purpose                       |
| ------------------- | ---------- | ----------------------------- |
| **File Operations** | 4 commands | File management actions       |
| **Navigation**      | 4 commands | App navigation and search     |
| **View**            | 4 commands | UI layout and appearance      |
| **Settings**        | 3 commands | Configuration and preferences |
| **Help & Support**  | 3 commands | Documentation and info        |
| **Development**     | 3 commands | Dev tools (some disabled)     |

## Demo URLs

- **Main Demo**: `http://localhost:4201/docs/components/command`
- **Dialog Demo**: Same page, click "Command Dialog" tab

This service provides a comprehensive testing environment that demonstrates all the Command Component's capabilities with realistic data and interactions!
