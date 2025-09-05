import { Injectable } from '@angular/core';

import { algoliasearch } from 'algoliasearch';
import {
  BehaviorSubject,
  Observable,
  debounceTime,
  distinctUntilChanged,
  map,
  switchMap,
} from 'rxjs';

// Define types for Algolia
type SearchClient = any;
type SearchIndex = any;

export interface SearchResult {
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

export interface SearchResponse {
  hits: SearchResult[];
  nbHits: number;
  page: number;
  nbPages: number;
  hitsPerPage: number;
  processingTimeMS: number;
  query: string;
}

@Injectable({
  providedIn: 'root',
})
export class AlgoliaSearchService {
  private client: SearchClient | null = null;
  private index: SearchIndex | null = null;
  private searchQuery$ = new BehaviorSubject<string>('');

  // Configuration - these should be set from environment or configuration
  private readonly applicationId: string = '';
  private readonly searchApiKey: string = '';
  private readonly indexName: string = 'semantic-components';

  constructor() {
    this.initializeClient();
  }

  private initializeClient(): void {
    if (this.applicationId && this.searchApiKey) {
      this.client = algoliasearch(this.applicationId, this.searchApiKey);
      this.index = this.client.searchIndex(this.indexName);
    }
  }

  /**
   * Configure Algolia client with credentials
   */
  configure(applicationId: string, searchApiKey: string, indexName?: string): void {
    this.client = algoliasearch(applicationId, searchApiKey);
    this.index = this.client.searchIndex(indexName || this.indexName);
  }

  /**
   * Set search query
   */
  setSearchQuery(query: string): void {
    this.searchQuery$.next(query);
  }

  /**
   * Get search results as observable with debouncing
   */
  getSearchResults(): Observable<SearchResult[]> {
    return this.searchQuery$.pipe(
      debounceTime(300),
      distinctUntilChanged(),
      switchMap((query) => this.performSearch(query)),
      map((response) => response.hits),
    );
  }

  /**
   * Perform immediate search
   */
  async search(
    query: string,
    options?: {
      hitsPerPage?: number;
      page?: number;
      filters?: string;
    },
  ): Promise<SearchResponse> {
    if (!this.index) {
      throw new Error('Algolia client not configured. Call configure() first.');
    }

    if (!query.trim()) {
      return {
        hits: [],
        nbHits: 0,
        page: 0,
        nbPages: 0,
        hitsPerPage: options?.hitsPerPage || 10,
        processingTimeMS: 0,
        query: '',
      };
    }

    try {
      const result = await this.index.search(query, {
        hitsPerPage: options?.hitsPerPage || 10,
        page: options?.page || 0,
        filters: options?.filters,
        attributesToHighlight: ['title', 'content'],
        attributesToSnippet: ['content:20'],
      });

      return {
        hits: result.hits as SearchResult[],
        nbHits: result.nbHits,
        page: result.page,
        nbPages: result.nbPages,
        hitsPerPage: result.hitsPerPage,
        processingTimeMS: result.processingTimeMS,
        query: result.query,
      };
    } catch (error) {
      console.error('Algolia search error:', error);
      throw error;
    }
  }

  /**
   * Search with RxJS Observable
   */
  private performSearch(query: string): Observable<SearchResponse> {
    return new Observable((observer) => {
      this.search(query)
        .then((response) => {
          observer.next(response);
          observer.complete();
        })
        .catch((error) => {
          observer.error(error);
        });
    });
  }

  /**
   * Get search suggestions
   */
  async getSuggestions(query: string, maxSuggestions: number = 5): Promise<string[]> {
    if (!this.index || !query.trim()) {
      return [];
    }

    try {
      const result = await this.index.search(query, {
        hitsPerPage: maxSuggestions,
        attributesToRetrieve: ['title'],
        attributesToHighlight: [],
        attributesToSnippet: [],
      });

      return result.hits.map((hit: any) => hit.title).filter(Boolean);
    } catch (error) {
      console.error('Error getting suggestions:', error);
      return [];
    }
  }

  /**
   * Clear search query
   */
  clearSearch(): void {
    this.searchQuery$.next('');
  }

  /**
   * Check if Algolia is configured
   */
  isConfigured(): boolean {
    return this.client !== null && this.index !== null;
  }
}
