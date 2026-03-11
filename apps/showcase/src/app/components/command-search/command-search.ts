import {
  ChangeDetectionStrategy,
  Component,
  ViewEncapsulation,
  computed,
  inject,
  signal,
} from '@angular/core';
import { Router } from '@angular/router';
import {
  ScCommand,
  ScCommandEmpty,
  ScCommandGroup,
  ScCommandGroupLabel,
  ScCommandInput,
  ScCommandInputGroup,
  ScCommandItem,
  ScCommandList,
  ScCommandListContainer,
  ScCommandSeparator,
  ScDialog,
  ScDialogPortal,
  ScDialogProvider,
  ScHotkey,
} from '@semantic-components/ui';
import {
  SiBoxIcon,
  SiDownloadIcon,
  SiFileTextIcon,
  SiSearchIcon,
} from '@semantic-icons/lucide-icons';
import { ComponentsService } from '../../services/components.service';
import { CommandSearchService } from './command-search.service';

interface SearchItem {
  label: string;
  path: string;
  group: 'getting-started' | 'installation' | 'component';
  keywords?: string[];
}

@Component({
  selector: 'app-command-search',
  imports: [
    ScCommand,
    ScCommandEmpty,
    ScCommandGroup,
    ScCommandGroupLabel,
    ScCommandInput,
    ScCommandInputGroup,
    ScCommandItem,
    ScCommandList,
    ScCommandListContainer,
    ScCommandSeparator,
    ScDialog,
    ScDialogPortal,
    ScDialogProvider,
    ScHotkey,
    SiBoxIcon,
    SiDownloadIcon,
    SiFileTextIcon,
    SiSearchIcon,
  ],
  template: `
    <div scDialogProvider [(open)]="commandSearchService.isOpen">
      <kbd
        scHotkey="mod+k"
        (scHotkeyPressed)="commandSearchService.toggle()"
        class="hidden"
      ></kbd>
      <ng-template scDialogPortal>
        <div scDialog class="w-lg gap-0 p-0">
          <div scCommand class="**:data-[slot=command-input-group]:h-12">
            <div scCommandInputGroup>
              <svg
                siSearchIcon
                class="mr-2 size-4 shrink-0 opacity-50"
                aria-hidden="true"
              ></svg>
              <input
                scCommandInput
                placeholder="Search documentation..."
                [(value)]="searchString"
              />
            </div>
            <ng-template scCommandListContainer>
              <div scCommandList (valuesChange)="onSelect($event)">
                @if (!hasResults()) {
                  <div scCommandEmpty>No results found.</div>
                }
                @if (filteredGettingStarted().length > 0) {
                  <div scCommandGroup>
                    <span scCommandGroupLabel>Getting Started</span>
                    @for (item of filteredGettingStarted(); track item.path) {
                      <div
                        scCommandItem
                        class="data-[active=true]:bg-accent data-[active=true]:text-accent-foreground"
                        [value]="item.path"
                        [label]="item.label"
                      >
                        <svg
                          siFileTextIcon
                          class="size-4 shrink-0"
                          aria-hidden="true"
                        ></svg>
                        <span>{{ item.label }}</span>
                      </div>
                    }
                  </div>
                }
                @if (filteredInstallation().length > 0) {
                  <div scCommandSeparator></div>
                  <div scCommandGroup>
                    <span scCommandGroupLabel>Installation</span>
                    @for (item of filteredInstallation(); track item.path) {
                      <div
                        scCommandItem
                        class="data-[active=true]:bg-accent data-[active=true]:text-accent-foreground"
                        [value]="item.path"
                        [label]="item.label"
                      >
                        <svg
                          siDownloadIcon
                          class="size-4 shrink-0"
                          aria-hidden="true"
                        ></svg>
                        <span>{{ item.label }}</span>
                      </div>
                    }
                  </div>
                }
                @if (filteredComponents().length > 0) {
                  <div scCommandSeparator></div>
                  <div scCommandGroup>
                    <span scCommandGroupLabel>Components</span>
                    @for (item of filteredComponents(); track item.path) {
                      <div
                        scCommandItem
                        class="data-[active=true]:bg-accent data-[active=true]:text-accent-foreground"
                        [value]="item.path"
                        [label]="item.label"
                      >
                        <svg
                          siBoxIcon
                          class="size-4 shrink-0"
                          aria-hidden="true"
                        ></svg>
                        <span>{{ item.label }}</span>
                      </div>
                    }
                  </div>
                }
              </div>
            </ng-template>
          </div>
        </div>
      </ng-template>
    </div>
  `,
  host: { class: 'block' },
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CommandSearch {
  private readonly router = inject(Router);
  private readonly componentsService = inject(ComponentsService);
  protected readonly commandSearchService = inject(CommandSearchService);

  readonly searchString = signal('');

  private readonly gettingStarted: SearchItem[] = [
    {
      label: 'Introduction',
      path: '/docs/getting-started/introduction',
      group: 'getting-started',
      keywords: ['getting started', 'overview'],
    },
    {
      label: 'Components',
      path: '/docs/components',
      group: 'getting-started',
      keywords: ['list', 'overview'],
    },
  ];

  private readonly installation: SearchItem[] = [
    {
      label: 'Prerequisites',
      path: '/docs/getting-started/prerequisites',
      group: 'installation',
      keywords: ['install', 'setup', 'requirements'],
    },
    {
      label: 'UI',
      path: '/docs/getting-started/ui',
      group: 'installation',
      keywords: ['core', 'install'],
    },
    {
      label: 'UI Lab',
      path: '/docs/getting-started/ui-lab',
      group: 'installation',
      keywords: ['experimental', 'install'],
    },
    {
      label: 'Carousel',
      path: '/docs/getting-started/carousel',
      group: 'installation',
      keywords: ['slider', 'install'],
    },
    {
      label: 'Charts',
      path: '/docs/getting-started/charts',
      group: 'installation',
      keywords: ['graph', 'install'],
    },
    {
      label: 'Editor',
      path: '/docs/getting-started/editor',
      group: 'installation',
      keywords: ['rich text', 'install'],
    },
    {
      label: 'Code',
      path: '/docs/getting-started/code',
      group: 'installation',
      keywords: ['highlight', 'syntax', 'install'],
    },
    {
      label: 'MCP Server',
      path: '/docs/getting-started/mcp-server',
      group: 'installation',
      keywords: ['model context protocol', 'ai'],
    },
  ];

  private readonly componentItems = computed<SearchItem[]>(() =>
    this.componentsService.visibleComponents().map((c) => ({
      label: c.name,
      path: `/docs/components/${c.path}`,
      group: 'component' as const,
      keywords: [c.category.toLowerCase(), c.description.toLowerCase()],
    })),
  );

  readonly filteredGettingStarted = computed(() => {
    const search = this.searchString().toLowerCase();
    return this.filterItems(this.gettingStarted, search);
  });

  readonly filteredInstallation = computed(() => {
    const search = this.searchString().toLowerCase();
    return this.filterItems(this.installation, search);
  });

  readonly filteredComponents = computed(() => {
    const search = this.searchString().toLowerCase();
    return this.filterItems(this.componentItems(), search);
  });

  readonly hasResults = computed(
    () =>
      this.filteredGettingStarted().length > 0 ||
      this.filteredInstallation().length > 0 ||
      this.filteredComponents().length > 0,
  );

  private filterItems(items: SearchItem[], search: string): SearchItem[] {
    if (!search) return items;
    return items.filter(
      (item) =>
        item.label.toLowerCase().includes(search) ||
        item.keywords?.some((k) => k.includes(search)),
    );
  }

  onSelect(values: readonly string[]): void {
    const path = values[0];
    if (path) {
      this.navigate(path);
    }
  }

  navigate(path: string): void {
    this.commandSearchService.close();
    this.searchString.set('');
    this.router.navigateByUrl(path);
  }
}
