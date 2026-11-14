import {
  Component,
  ViewEncapsulation,
  computed,
  inject,
  signal,
} from '@angular/core';
import { RouterLink } from '@angular/router';
import {
  ScBadge,
  ScFrame,
  ScHeading,
  ScToggleGroup,
  ScToggleGroupItem,
} from '@semantic-components/ui';
import { ComponentStatusBadge } from '../../../components/component-status-badge/component-status-badge';
import { ComponentCategory } from '../../../data/components';
import { ComponentsService } from '../../../services/components-service';

@Component({
  selector: 'app-components-page',
  imports: [
    RouterLink,
    ComponentStatusBadge,
    ScBadge,
    ScFrame,
    ScToggleGroup,
    ScToggleGroupItem,
    ScHeading,
  ],
  template: `
    <div class="space-y-8">
      <div class="space-y-2">
        <h1 scHeading>Components</h1>
        <p class="text-muted-foreground">
          Beautifully designed components built with Angular ARIA and Tailwind
          CSS.
        </p>
      </div>

      <div
        scToggleGroup
        class="flex-wrap"
        [(value)]="filterCategory"
        aria-label="Filter components by category"
      >
        <button
          scToggleGroupItem
          value="All"
          class="data-[state=on]:border-input data-[state=on]:border"
        >
          All
        </button>
        @for (category of categories; track category) {
          <button
            scToggleGroupItem
            [value]="category"
            class="data-[state=on]:border-input data-[state=on]:border"
          >
            {{ category }}
          </button>
        }
      </div>

      <div class="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        @for (item of filteredComponents(); track item.path) {
          <a
            scFrame
            [routerLink]="'/docs/components/' + item.path"
            class="group hover:bg-accent relative p-6 transition-colors"
          >
            <h2 class="text-base leading-none font-semibold tracking-tight">
              {{ item.name }}
            </h2>
            <p class="text-muted-foreground mt-2 text-sm">
              {{ item.description }}
            </p>
            <div class="mt-3 flex flex-wrap items-center gap-2">
              <span scBadge variant="outline">{{ item.category }}</span>
              <app-component-status-badge [status]="item.status" />
            </div>
          </a>
        }
      </div>
    </div>
  `,
  encapsulation: ViewEncapsulation.None,
})
export default class ComponentsPage {
  private readonly componentsService = inject(ComponentsService);

  readonly categories: ComponentCategory[] = [
    'Forms',
    'Buttons & Actions',
    'Navigation',
    'Layout',
    'Data Display',
    'Charts',
    'Feedback',
    'Overlay',
    'Media',
    'Editor',
    'Advanced',
  ];

  readonly filterCategory = signal<string[]>(['All']);

  readonly filteredComponents = computed(() => {
    const [category] = this.filterCategory();
    const visible = this.componentsService.visibleCatalog();
    const items =
      category && category !== 'All'
        ? visible.filter((item) => item.category === category)
        : visible;
    return items.slice().sort((a, b) => a.name.localeCompare(b.name));
  });
}
