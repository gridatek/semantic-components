import { CommonModule } from '@angular/common';
import { Component, signal } from '@angular/core';

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
import { SiFileTextIcon, SiHashIcon, SiSearchIcon } from '@semantic-icons/lucide-icons';

interface MockSearchResult {
  id: string;
  title: string;
  content: string;
  category: 'component' | 'documentation' | 'guide';
  url: string;
}

@Component({
  selector: 'app-command-search-demo',
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
  ],
  template: `
    <sc-command class="rounded-lg border shadow-md md:min-w-[450px]">
      <sc-command-input
        class="h-12"
        (valueChange)="onSearchChange($event)"
        placeholder="Search components, docs, and guides..."
      />

      <sc-command-list class="max-h-80">
        <sc-command-empty>
          <div class="flex flex-col items-center justify-center py-6 text-center">
            <svg class="h-8 w-8 text-muted-foreground mb-2" si-search-icon></svg>
            <p class="text-sm text-muted-foreground">
              {{
                searchQuery()
                  ? 'No results found.'
                  : 'Type to search documentation and components...'
              }}
            </p>
          </div>
        </sc-command-empty>

        <sc-command-loading *ngIf="isLoading()">
          <div class="flex items-center justify-center py-6">
            <div class="animate-spin rounded-full h-5 w-5 border-b-2 border-primary"></div>
            <span class="ml-2 text-sm text-muted-foreground">Searching...</span>
          </div>
        </sc-command-loading>

        <ng-container *ngIf="!isLoading() && filteredResults().length > 0">
          <!-- Components -->
          <sc-command-group *ngIf="getComponentResults().length > 0" heading="Components">
            <sc-command-item
              class="flex items-start gap-3 p-3"
              *ngFor="let result of getComponentResults()"
              (select)="onResultSelect(result)"
            >
              <svg class="h-4 w-4 text-muted-foreground mt-0.5 flex-shrink-0" si-hash-icon></svg>
              <div class="flex-1 min-w-0">
                <div class="font-medium truncate">{{ result.title }}</div>
                <div class="text-sm text-muted-foreground mt-1 line-clamp-2">
                  {{ result.content }}
                </div>
              </div>
            </sc-command-item>
          </sc-command-group>

          <!-- Documentation -->
          <sc-command-separator
            *ngIf="getComponentResults().length > 0 && getDocumentationResults().length > 0"
          />

          <sc-command-group *ngIf="getDocumentationResults().length > 0" heading="Documentation">
            <sc-command-item
              class="flex items-start gap-3 p-3"
              *ngFor="let result of getDocumentationResults()"
              (select)="onResultSelect(result)"
            >
              <svg
                class="h-4 w-4 text-muted-foreground mt-0.5 flex-shrink-0"
                si-file-text-icon
              ></svg>
              <div class="flex-1 min-w-0">
                <div class="font-medium truncate">{{ result.title }}</div>
                <div class="text-sm text-muted-foreground mt-1 line-clamp-2">
                  {{ result.content }}
                </div>
              </div>
            </sc-command-item>
          </sc-command-group>

          <!-- Guides -->
          <sc-command-separator
            *ngIf="
              (getComponentResults().length > 0 || getDocumentationResults().length > 0) &&
              getGuideResults().length > 0
            "
          />

          <sc-command-group *ngIf="getGuideResults().length > 0" heading="Guides">
            <sc-command-item
              class="flex items-start gap-3 p-3"
              *ngFor="let result of getGuideResults()"
              (select)="onResultSelect(result)"
            >
              <svg
                class="h-4 w-4 text-muted-foreground mt-0.5 flex-shrink-0"
                si-file-text-icon
              ></svg>
              <div class="flex-1 min-w-0">
                <div class="font-medium truncate">{{ result.title }}</div>
                <div class="text-sm text-muted-foreground mt-1 line-clamp-2">
                  {{ result.content }}
                </div>
              </div>
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
    `,
  ],
})
export class CommandSearchDemo {
  searchQuery = signal('');
  isLoading = signal(false);
  filteredResults = signal<MockSearchResult[]>([]);

  // Mock search results
  private mockResults: MockSearchResult[] = [
    {
      id: '1',
      title: 'Button Component',
      content:
        'A flexible button component with multiple variants, sizes, and states for user interactions.',
      category: 'component',
      url: '/docs/components/button',
    },
    {
      id: '2',
      title: 'Command Component',
      content:
        'Fast, composable, unstyled command menu for Angular applications with keyboard navigation.',
      category: 'component',
      url: '/docs/components/command',
    },
    {
      id: '3',
      title: 'Dialog Component',
      content:
        'A modal dialog component for displaying content that requires user attention or action.',
      category: 'component',
      url: '/docs/components/dialog',
    },
    {
      id: '4',
      title: 'Installation Guide',
      content: 'Learn how to install and set up Semantic Components in your Angular project.',
      category: 'documentation',
      url: '/docs/getting-started/installation',
    },
    {
      id: '5',
      title: 'Theme Customization',
      content: 'Customize the appearance of components using CSS variables and Tailwind CSS.',
      category: 'guide',
      url: '/docs/guides/theming',
    },
    {
      id: '6',
      title: 'Accessibility Features',
      content:
        'Understanding built-in accessibility features and best practices for screen readers.',
      category: 'documentation',
      url: '/docs/getting-started/accessibility',
    },
    {
      id: '7',
      title: 'Form Components',
      content: 'Input, Select, Checkbox, and other form components with validation support.',
      category: 'component',
      url: '/docs/components/form',
    },
    {
      id: '8',
      title: 'Migration Guide',
      content: 'Step-by-step guide for migrating from other UI libraries to Semantic Components.',
      category: 'guide',
      url: '/docs/guides/migration',
    },
  ];

  // Icons are now used directly in template

  onSearchChange(query: string): void {
    this.searchQuery.set(query);

    if (!query.trim()) {
      this.filteredResults.set([]);
      return;
    }

    // Simulate loading state
    this.isLoading.set(true);

    // Simulate API call delay
    setTimeout(() => {
      const filtered = this.mockResults.filter(
        (result) =>
          result.title.toLowerCase().includes(query.toLowerCase()) ||
          result.content.toLowerCase().includes(query.toLowerCase()),
      );

      this.filteredResults.set(filtered);
      this.isLoading.set(false);
    }, 300);
  }

  onResultSelect(result: MockSearchResult): void {
    console.log('Selected result:', result);
    // In a real app, this would navigate to the result URL
    alert(`Navigating to: ${result.title} (${result.url})`);
  }

  getComponentResults(): MockSearchResult[] {
    return this.filteredResults().filter((result) => result.category === 'component');
  }

  getDocumentationResults(): MockSearchResult[] {
    return this.filteredResults().filter((result) => result.category === 'documentation');
  }

  getGuideResults(): MockSearchResult[] {
    return this.filteredResults().filter((result) => result.category === 'guide');
  }
}
