# Algolia Search Integration

This document explains how the Algolia search integration works with the Semantic Components library.

## Overview

The search functionality is implemented using the `ScCommandTrigger` component integrated with Algolia's search API. This provides a modern, fast search experience similar to what you'd find in VS Code, GitHub, or other professional applications.

## Architecture

### Components

1. **AlgoliaSearchService** (`apps/app/src/app/services/algolia-search.service.ts`)
   - Injectable service that manages Algolia client configuration
   - Provides RxJS-based search with debouncing (300ms)
   - Handles search queries, results, and error states

2. **SearchCommandTemplateComponent** (`apps/app/src/app/components/search-command/search-command-template.component.ts`)
   - Template component that renders the search interface
   - Uses ScCommand components for the UI
   - Categorizes results (Documentation, Components, Other)
   - Handles result selection and navigation

3. **Header Integration** (`apps/app/src/app/components/header.ts`)
   - Uses `ScCommandTrigger` with the search template
   - Provides keyboard shortcuts (⌘K/Ctrl+K)
   - Responsive design for desktop and mobile

## Features

- **Real-time Search**: Debounced search with live results
- **Keyboard Shortcuts**: ⌘K (Mac) or Ctrl+K (Windows/Linux)
- **Categorized Results**: Organized by type with icons
- **Loading States**: Visual feedback during search
- **Error Handling**: Graceful handling of API errors
- **Navigation**: Automatic routing to selected results
- **Responsive**: Works on desktop and mobile devices

## Configuration

### 1. Install Dependencies

```bash
npm install algoliasearch
```

### 2. Configure Algolia Credentials

Copy the example configuration and fill in your credentials:

```bash
cp apps/app/src/app/services/search.config.example.ts apps/app/src/app/services/search.config.ts
```

Update the configuration:

```typescript
export const searchConfig = {
  applicationId: 'YOUR_APPLICATION_ID',
  searchApiKey: 'YOUR_SEARCH_API_KEY',
  indexName: 'your-index-name',
};
```

### 3. Initialize the Service

In your component or app initialization:

```typescript
constructor(private algoliaService: AlgoliaSearchService) {
  this.algoliaService.configure(
    searchConfig.applicationId,
    searchConfig.searchApiKey,
    searchConfig.indexName
  );
}
```

## Usage Examples

### Basic Search Trigger

```typescript
@Component({
  template: `
    <sc-command-trigger [config]="searchConfig" [dialogTemplate]="searchTemplate">
      <svg slot="icon" si-search-icon></svg>
      Search...
    </sc-command-trigger>

    <ng-template #searchTemplate>
      <app-search-command-template />
    </ng-template>
  `,
})
export class MyComponent {
  searchConfig: CommandTriggerConfig = {
    title: 'Search',
    width: '700px',
    height: '500px',
    enableGlobalShortcut: true,
    shortcutKey: 'k',
  };
}
```

### Custom Search Configuration

```typescript
const customConfig: CommandTriggerConfig = {
  title: 'Custom Search',
  description: 'Search with custom settings',
  width: '600px',
  height: '400px',
  placeholder: 'Type to search...',
  enableGlobalShortcut: true,
  shortcutKey: 'j', // Ctrl+J
  requiresShift: false,
};
```

## Data Structure

### Search Result Interface

```typescript
interface SearchResult {
  objectID: string;
  title: string;
  content: string;
  url: string;
  category: string;
  hierarchy?: {
    lvl0?: string;
    lvl1?: string;
    lvl2?: string;
    lvl3?: string;
  };
}
```

### Expected Algolia Index Structure

Your Algolia index should contain documents with these fields:

```json
{
  "objectID": "unique-id",
  "title": "Page Title",
  "content": "Page content or description",
  "url": "/path/to/page",
  "category": "documentation|component|guide",
  "hierarchy": {
    "lvl0": "Section",
    "lvl1": "Subsection",
    "lvl2": "Page"
  }
}
```

## Testing

The integration includes multiple demo components that you can use to test the functionality:

1. **Mock Search Demo** - Uses local mock data
2. **Algolia Integration Demo** - Real Algolia integration
3. **Command Trigger Demo** - Various trigger configurations

## Keyboard Shortcuts

- **⌘K (Mac) / Ctrl+K (Windows/Linux)**: Open search
- **ESC**: Close search dialog
- **↑/↓**: Navigate results
- **Enter**: Select result
- **Tab**: Navigate between sections

## Performance Considerations

- Search queries are debounced by 300ms to reduce API calls
- Results are cached temporarily by Algolia's client
- The search dialog lazy-loads to improve initial page performance
- Images and heavy content are not included in search results

## Customization

### Styling

The search interface uses Tailwind CSS classes and can be customized by:

1. Modifying the template component styles
2. Overriding CSS variables for theme colors
3. Adjusting the dialog size and positioning

### Search Behavior

- Modify debounce timing in the service
- Add filters for specific content types
- Customize result categorization logic
- Add search analytics tracking

### Icons and Branding

- Replace default icons with custom SVGs
- Add your logo to the search interface
- Customize empty states and loading messages

## Browser Support

- Modern browsers with ES2020+ support
- Requires JavaScript enabled
- Works with screen readers (ARIA compliant)
- Mobile-friendly responsive design
