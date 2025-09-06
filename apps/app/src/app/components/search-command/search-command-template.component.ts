import { CommonModule } from '@angular/common';
import { Component, OnDestroy, OnInit, signal } from '@angular/core';
import { Router } from '@angular/router';

import {
  ScCommand,
  ScCommandEmpty,
  ScCommandGroup,
  ScCommandInput,
  ScCommandItem,
  ScCommandList,
  ScCommandLoading,
  ScCommandSeparator,
} from '@semantic-components/ui';
import {
  SiExternalLinkIcon,
  SiFileTextIcon,
  SiHashIcon,
  SiSearchIcon,
} from '@semantic-icons/lucide-icons';
import { Subject, takeUntil } from 'rxjs';

import { AlgoliaSearchService, SearchResult } from '../../services/algolia-search.service';

@Component({
  selector: 'app-search-command-template',
  imports: [
    CommonModule,
    ScCommand,
    ScCommandInput,
    ScCommandList,
    ScCommandEmpty,
    ScCommandLoading,
    ScCommandGroup,
    ScCommandItem,
    ScCommandSeparator,
    SiSearchIcon,
    SiFileTextIcon,
    SiHashIcon,
    SiExternalLinkIcon,
  ],
  template: `
    <sc-command (commandSelect)="onResultSelect($event)">
      <sc-command-input
        class="h-14"
        [value]="searchQuery()"
        (valueChange)="onSearchChange($event)"
        placeholder="Search documentation, components, and more..."
      />

      <sc-command-list class="max-h-80 overflow-auto">
        <sc-command-empty>
          <div class="flex flex-col items-center justify-center py-8 text-center">
            <svg class="h-8 w-8 text-muted-foreground mb-2" si-search-icon></svg>
            <p class="text-sm text-muted-foreground">
              {{ searchQuery() ? 'No results found.' : 'Type to search...' }}
            </p>
          </div>
        </sc-command-empty>

        <sc-command-loading *ngIf="isLoading()">
          <div class="flex items-center justify-center py-8">
            <div class="animate-spin rounded-full h-6 w-6 border-b-2 border-primary"></div>
            <span class="ml-2 text-sm text-muted-foreground">Searching...</span>
          </div>
        </sc-command-loading>

        <ng-container *ngIf="searchResults()?.length">
          <!-- Documentation Results -->
          <sc-command-group
            *ngIf="getResultsByCategory('documentation').length"
            heading="Documentation"
          >
            <sc-command-item
              class="flex items-start gap-3 p-3"
              *ngFor="let result of getResultsByCategory('documentation')"
              [value]="result.objectID"
            >
              <svg class="h-4 w-4 text-muted-foreground mt-0.5 shrink-0" si-file-text-icon></svg>
              <div class="flex-1 min-w-0">
                <div
                  class="font-medium truncate"
                  [innerHTML]="getHighlightedText(result.title)"
                ></div>
                <div
                  class="text-sm text-muted-foreground mt-1 line-clamp-2"
                  [innerHTML]="getHighlightedText(result.content)"
                ></div>
                <div class="text-xs text-muted-foreground mt-1" *ngIf="result.hierarchy">
                  {{ getBreadcrumb(result.hierarchy) }}
                </div>
              </div>
              <svg class="h-3 w-3 text-muted-foreground shrink-0" si-external-link-icon></svg>
            </sc-command-item>
          </sc-command-group>

          <!-- Component Results -->
          <sc-command-separator
            *ngIf="
              getResultsByCategory('documentation').length &&
              getResultsByCategory('component').length
            "
          />

          <sc-command-group *ngIf="getResultsByCategory('component').length" heading="Components">
            <sc-command-item
              class="flex items-start gap-3 p-3"
              *ngFor="let result of getResultsByCategory('component')"
              [value]="result.objectID"
            >
              <svg class="h-4 w-4 text-muted-foreground mt-0.5 shrink-0" si-hash-icon></svg>
              <div class="flex-1 min-w-0">
                <div
                  class="font-medium truncate"
                  [innerHTML]="getHighlightedText(result.title)"
                ></div>
                <div
                  class="text-sm text-muted-foreground mt-1 line-clamp-2"
                  [innerHTML]="getHighlightedText(result.content)"
                ></div>
              </div>
              <svg class="h-3 w-3 text-muted-foreground shrink-0" si-external-link-icon></svg>
            </sc-command-item>
          </sc-command-group>

          <!-- Other Results -->
          <sc-command-separator
            *ngIf="
              (getResultsByCategory('documentation').length ||
                getResultsByCategory('component').length) &&
              getResultsByCategory('other').length
            "
          />

          <sc-command-group *ngIf="getResultsByCategory('other').length" heading="Other">
            <sc-command-item
              class="flex items-start gap-3 p-3"
              *ngFor="let result of getResultsByCategory('other')"
              [value]="result.objectID"
            >
              <svg class="h-4 w-4 text-muted-foreground mt-0.5 shrink-0" si-search-icon></svg>
              <div class="flex-1 min-w-0">
                <div
                  class="font-medium truncate"
                  [innerHTML]="getHighlightedText(result.title)"
                ></div>
                <div
                  class="text-sm text-muted-foreground mt-1 line-clamp-2"
                  [innerHTML]="getHighlightedText(result.content)"
                ></div>
              </div>
              <svg class="h-3 w-3 text-muted-foreground shrink-0" si-external-link-icon></svg>
            </sc-command-item>
          </sc-command-group>
        </ng-container>
      </sc-command-list>
    </sc-command>
  `,
  styles: [
    `
      .line-clamp-2 {
        display: -webkit-box;
        -webkit-line-clamp: 2;
        -webkit-box-orient: vertical;
        overflow: hidden;
      }

      ::ng-deep mark {
        background-color: theme('colors.yellow.200');
        color: theme('colors.yellow.900');
        padding: 0 2px;
        border-radius: 2px;
      }

      ::ng-deep .dark mark {
        background-color: theme('colors.yellow.900');
        color: theme('colors.yellow.100');
      }
    `,
  ],
})
export class SearchCommandTemplateComponent implements OnInit, OnDestroy {
  searchQuery = signal('');
  searchResults = signal<SearchResult[]>([]);
  isLoading = signal(false);

  private destroy$ = new Subject<void>();

  constructor(
    private algoliaService: AlgoliaSearchService,
    private router: Router,
  ) {}

  ngOnInit(): void {
    // Subscribe to search results
    this.algoliaService
      .getSearchResults()
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: (results) => {
          this.searchResults.set(results);
          this.isLoading.set(false);
        },
        error: (error) => {
          console.error('Search error:', error);
          this.isLoading.set(false);
        },
      });
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  onSearchChange(query: string): void {
    this.searchQuery.set(query);

    if (query.trim()) {
      this.isLoading.set(true);
      this.algoliaService.setSearchQuery(query);
    } else {
      this.searchResults.set([]);
      this.isLoading.set(false);
    }
  }

  onResultSelect(resultId: string): void {
    const result = this.searchResults().find((r) => r.objectID === resultId);
    if (!result) return;

    // Navigate to the result URL
    if (result.url.startsWith('/')) {
      this.router.navigate([result.url]);
    } else if (result.url.startsWith('http')) {
      window.open(result.url, '_blank');
    }
  }

  getResultsByCategory(category: string): SearchResult[] {
    return this.searchResults().filter((result) => {
      if (category === 'documentation') {
        return result.category === 'documentation' || result.category === 'docs';
      }
      if (category === 'component') {
        return result.category === 'component' || result.category === 'components';
      }
      if (category === 'other') {
        return !['documentation', 'docs', 'component', 'components'].includes(result.category);
      }
      return result.category === category;
    });
  }

  getBreadcrumb(hierarchy: any): string {
    const parts = [hierarchy.lvl0, hierarchy.lvl1, hierarchy.lvl2, hierarchy.lvl3].filter(Boolean);
    return parts.join(' › ');
  }

  getHighlightedText(text: string): string {
    // This would typically be handled by Algolia's highlighting
    // For now, we'll return the text as-is
    // In a real implementation, you'd process the _highlightResult from Algolia
    return text || '';
  }
}
