// Example configuration for Algolia search
// Copy this file to search.config.ts and fill in your actual credentials

export const searchConfig = {
  // Your Algolia Application ID
  applicationId: 'YOUR_APPLICATION_ID',

  // Your Algolia Search-Only API Key (NOT the Admin API Key)
  searchApiKey: 'YOUR_SEARCH_API_KEY',

  // Your search index name
  indexName: 'semantic-components',

  // Optional: Search configuration
  searchOptions: {
    hitsPerPage: 10,
    attributesToRetrieve: ['title', 'content', 'url', 'category', 'hierarchy'],
    attributesToHighlight: ['title', 'content'],
    attributesToSnippet: ['content:20'],
  },

  // Optional: Filters for different content types
  filters: {
    components: 'category:component',
    documentation: 'category:documentation OR category:docs',
    all: '', // No filter for all results
  },
};

// Example usage in a component:
/*
import { searchConfig } from './search.config';
import { AlgoliaSearchService } from './algolia-search.service';

constructor(private algoliaService: AlgoliaSearchService) {
  // Configure Algolia with your credentials
  this.algoliaService.configure(
    searchConfig.applicationId,
    searchConfig.searchApiKey,
    searchConfig.indexName
  );
}
*/
