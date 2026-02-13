import {
  ChangeDetectionStrategy,
  Component,
  computed,
  signal,
  ViewEncapsulation,
} from '@angular/core';
import { RouterLink } from '@angular/router';
import { ScToggleGroup, ScToggleGroupItem } from '@semantic-components/ui-lab';
import { ComponentStatusBadge } from '../../../components/component-status-badge/component-status-badge';
import {
  ComponentCategory,
  ComponentItem,
  COMPONENTS,
} from '../../../data/components';

@Component({
  selector: 'app-components-page',
  imports: [RouterLink, ComponentStatusBadge, ScToggleGroup, ScToggleGroupItem],
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
                class="text-muted-foreground bg-muted inline-flex items-center rounded-md px-2 py-0.5 text-xs font-medium"
              >
                {{ item.category }}
              </span>
              <span
                class="text-muted-foreground bg-muted inline-flex items-center rounded-md px-2 py-0.5 text-xs font-medium"
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

  readonly filterCategory = signal<string | null>('All');

  readonly filteredComponents = computed(() => {
    const category = this.filterCategory();
    const items =
      category && category !== 'All'
        ? COMPONENTS.filter((item) => item.category === category)
        : COMPONENTS;
    return items.slice().sort((a, b) => a.name.localeCompare(b.name));
  });
}
