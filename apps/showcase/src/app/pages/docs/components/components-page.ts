import {
  ChangeDetectionStrategy,
  Component,
  computed,
  inject,
  signal,
  ViewEncapsulation,
} from '@angular/core';
import { RouterLink } from '@angular/router';
import {
  ScBadge,
  ScToggleGroup,
  ScToggleGroupItem,
} from '@semantic-components/ui-lab';
import { ComponentStatusBadge } from '../../../components/component-status-badge/component-status-badge';
import { ComponentCategory, ComponentLibrary } from '../../../data/components';
import { ComponentsService } from '../../../services/components.service';

@Component({
  selector: 'app-components-page',
  imports: [
    RouterLink,
    ComponentStatusBadge,
    ScBadge,
    ScToggleGroup,
    ScToggleGroupItem,
  ],
  template: `
    <div class="space-y-8">
      <div class="space-y-2">
        <h1 class="text-3xl font-bold tracking-tight">Components</h1>
        <p class="text-muted-foreground">
          Beautifully designed components built with Angular ARIA and Tailwind
          CSS.
        </p>
      </div>

      <div
        sc-toggle-group
        type="single"
        class="flex-wrap"
        [(value)]="filterCategory"
        aria-label="Filter components by category"
      >
        <button
          sc-toggle-group-item
          value="All"
          class="data-[state=on]:border data-[state=on]:border-input"
        >
          All
        </button>
        @for (category of categories; track category) {
          <button
            sc-toggle-group-item
            [value]="category"
            class="data-[state=on]:border data-[state=on]:border-input"
          >
            {{ category }}
          </button>
        }
      </div>

      <div class="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        @for (item of filteredComponents(); track item.path) {
          <a
            [routerLink]="'/docs/components/' + item.path"
            class="group relative rounded-lg border p-6 hover:bg-accent transition-colors"
          >
            <h3 class="font-semibold leading-none tracking-tight">
              {{ item.name }}
            </h3>
            <p class="text-sm text-muted-foreground mt-2">
              {{ item.description }}
            </p>
            <div class="mt-3 flex flex-wrap items-center gap-2">
              <app-component-status-badge [status]="item.status" />
              <span
                sc-badge
                variant="outline"
                [style.background-color]="categoryColor.bg"
                [style.color]="categoryColor.text"
                [style.border-color]="categoryColor.text"
              >
                {{ item.category }}
              </span>
              <span
                sc-badge
                variant="outline"
                [style.background-color]="libraryColors[item.library].bg"
                [style.color]="libraryColors[item.library].text"
                [style.border-color]="libraryColors[item.library].text"
              >
                {{ item.library }}
              </span>
            </div>
          </a>
        }
      </div>
    </div>
  `,
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export default class ComponentsPage {
  private readonly componentsService = inject(ComponentsService);

  readonly categories: ComponentCategory[] = [
    'Forms',
    'Buttons & Actions',
    'Navigation',
    'Layout',
    'Data Display',
    'Feedback',
    'Overlay',
    'Media',
    'Editor',
    'Advanced',
  ];

  readonly categoryColor = {
    bg: 'color-mix(in oklch, var(--primary) 15%, transparent)',
    text: 'var(--primary)',
  };

  readonly libraryColors: Record<
    ComponentLibrary,
    { bg: string; text: string }
  > = {
    ui: {
      bg: 'color-mix(in oklch, var(--chart-1) 15%, transparent)',
      text: 'var(--chart-1)',
    },
    'ui-lab': {
      bg: 'color-mix(in oklch, var(--chart-2) 15%, transparent)',
      text: 'var(--chart-2)',
    },
    carousel: {
      bg: 'color-mix(in oklch, var(--chart-3) 15%, transparent)',
      text: 'var(--chart-3)',
    },
    code: {
      bg: 'color-mix(in oklch, var(--chart-4) 15%, transparent)',
      text: 'var(--chart-4)',
    },
    editor: {
      bg: 'color-mix(in oklch, var(--chart-5) 15%, transparent)',
      text: 'var(--chart-5)',
    },
  };

  readonly filterCategory = signal<string | null>('All');

  readonly filteredComponents = computed(() => {
    const category = this.filterCategory();
    const visible = this.componentsService.visibleComponents();
    const items =
      category && category !== 'All'
        ? visible.filter((item) => item.category === category)
        : visible;
    return items.slice().sort((a, b) => a.name.localeCompare(b.name));
  });
}
