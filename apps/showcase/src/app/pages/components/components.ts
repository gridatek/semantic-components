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
  ScLink,
  ScToggleGroup,
  ScToggleGroupItem,
} from '@semantic-components/ui';
import { ComponentStatusBadge } from '../../components/component-status-badge/component-status-badge';
import { ComponentCategory } from '../../data/components';
import { ComponentsService } from '../../services/components-service';

/** Components: every component, filtered by category, each card to its docs. */
@Component({
  selector: 'app-components',
  imports: [
    ComponentStatusBadge,
    RouterLink,
    ScBadge,
    ScFrame,
    ScLink,
    ScToggleGroup,
    ScToggleGroupItem,
  ],
  template: `
    <section
      class="flex flex-col items-center gap-2 px-6 py-8 text-center md:py-16 lg:py-20 xl:gap-4"
    >
      <h1
        class="text-primary max-w-4xl text-3xl leading-tight font-semibold tracking-tight text-balance lg:leading-[1.1] xl:text-5xl xl:tracking-tighter"
      >
        Components
      </h1>
      <p class="text-foreground max-w-2xl text-base text-balance sm:text-lg">
        Beautifully designed components built with Angular Aria and Tailwind CSS
        — directives on your own elements, in the look of your preset.
      </p>
      <div class="flex flex-wrap justify-center gap-2 pt-2">
        <a
          scLink
          variant="button"
          size="sm"
          routerLink="/docs/getting-started/introduction"
        >
          Get started
        </a>
        <a scLink variant="ghost" size="sm" routerLink="/ai-elements">
          AI Elements
        </a>
      </div>
    </section>

    <section
      class="mx-auto w-full max-w-6xl space-y-6 px-4 pb-16"
      aria-labelledby="components-title"
    >
      <h2 id="components-title" class="sr-only">All components</h2>
      <div
        scToggleGroup
        class="flex-wrap justify-center"
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
            <h3 class="leading-none font-semibold tracking-tight">
              {{ item.name }}
            </h3>
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
    </section>
  `,
  host: { class: 'block' },
  encapsulation: ViewEncapsulation.None,
})
export default class Components {
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

  readonly filterCategory = signal<string[]>(['All']);

  readonly filteredComponents = computed(() => {
    const [category] = this.filterCategory();
    const visible = this.componentsService.visibleComponents();
    const items =
      category && category !== 'All'
        ? visible.filter((item) => item.category === category)
        : visible;
    return items.slice().sort((a, b) => a.name.localeCompare(b.name));
  });
}
