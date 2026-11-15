import { Service, computed, inject } from '@angular/core';
import { ComponentItem } from '../data/components';
import {
  type DocsPage,
  aiElementPages,
  installationPages,
  introductionPages,
} from '../data/docs-nav';
import { ComponentsService } from './components-service';

/** What a group lists: guide pages, components, or utilities. */
export type DocsNavKind = 'page' | 'component' | 'utility';

/** A group of docs pages, as the sidebar shows it. */
export interface DocsNavGroup {
  readonly label: string;
  readonly kind: DocsNavKind;
  readonly pages: readonly DocsPage[];
}

const toPages = (items: readonly ComponentItem[]): DocsPage[] =>
  items.map((item) => ({
    name: item.name,
    path: '/docs/components/' + item.path,
    description: item.description,
  }));

/**
 * The docs' pages, grouped as the sidebar shows them: the sidebar, the search
 * and the previous / next links read them, so they never differ.
 */
@Service()
export class DocsNavService {
  private readonly componentsService = inject(ComponentsService);

  /** The groups with pages, in the sidebar's order. */
  readonly groups = computed<DocsNavGroup[]>(() =>
    [
      {
        label: 'Semantic Components',
        kind: 'page' as const,
        pages: introductionPages,
      },
      {
        label: 'Installation',
        kind: 'page' as const,
        pages: installationPages,
      },
      {
        label: 'Components',
        kind: 'component' as const,
        pages: toPages(this.componentsService.visibleComponents()),
      },
      {
        label: 'Charts',
        kind: 'component' as const,
        pages: toPages(this.componentsService.visibleCharts()),
      },
      {
        label: 'Utilities',
        kind: 'utility' as const,
        pages: toPages(this.componentsService.visibleUtilities()),
      },
      {
        label: 'Recipes',
        kind: 'component' as const,
        pages: toPages(this.componentsService.visibleRecipes()),
      },
      {
        label: 'AI Elements',
        kind: 'component' as const,
        pages: aiElementPages,
      },
    ].filter((group) => group.pages.length > 0),
  );

  /** Every page, in order. */
  readonly pages = computed(() =>
    this.groups().flatMap((group) => group.pages),
  );
}
