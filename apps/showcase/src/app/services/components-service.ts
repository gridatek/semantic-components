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

  readonly visibleComponents = computed(() => {
    const all = this.listed();
    return all.filter(
      (c) => c.category !== 'Utilities' && c.category !== 'Recipes',
    );
  });

  readonly visibleUtilities = computed(() => {
    const all = this.listed();
    return all.filter((c) => c.category === 'Utilities');
  });

  readonly visibleRecipes = computed(() => {
    const all = this.listed();
    return all.filter((c) => c.category === 'Recipes');
  });
}
