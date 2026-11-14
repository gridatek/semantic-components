import { httpResource } from '@angular/common/http';
import { Service, computed, inject } from '@angular/core';
import { ComponentItem } from '../data/components';
import { ConfigService } from './config-service';

@Service()
export class ComponentsService {
  private readonly configService = inject(ConfigService);

  private readonly componentsResource = httpResource<ComponentItem[]>(
    () => 'components.json',
  );

  readonly components = computed(() => this.componentsResource.value() ?? []);

  /** Every page, or only those not hidden (`showHidden` in config.json). */
  private readonly listed = computed(() =>
    this.configService.showHidden()
      ? this.components()
      : this.components().filter((c) => !c.hidden),
  );

  /** The components, charts aside (the sidebar lists those apart). */
  readonly visibleComponents = computed(() => {
    const all = this.listed();
    return all.filter(
      (c) =>
        c.category !== 'Utilities' &&
        c.category !== 'Recipes' &&
        c.category !== 'Charts',
    );
  });

  /** The charts: the shared parts (Chart), then each type. */
  readonly visibleCharts = computed(() => {
    const all = this.listed();
    return all
      .filter((c) => c.category === 'Charts')
      .sort((a, b) =>
        a.path === 'chart'
          ? -1
          : b.path === 'chart'
            ? 1
            : a.name.localeCompare(b.name),
      );
  });

  /** What the components pages list: the components and the charts. */
  readonly visibleCatalog = computed(() => [
    ...this.visibleComponents(),
    ...this.visibleCharts(),
  ]);

  readonly visibleUtilities = computed(() => {
    const all = this.listed();
    return all.filter((c) => c.category === 'Utilities');
  });

  readonly visibleRecipes = computed(() => {
    const all = this.listed();
    return all.filter((c) => c.category === 'Recipes');
  });
}
