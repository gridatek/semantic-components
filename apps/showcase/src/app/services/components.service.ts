import { httpResource } from '@angular/common/http';
import { Injectable, computed, inject } from '@angular/core';
import { ComponentItem } from '../data/components';
import { ConfigService } from './config.service';

@Injectable({
  providedIn: 'root',
})
export class ComponentsService {
  private readonly configService = inject(ConfigService);

  private readonly componentsResource = httpResource<ComponentItem[]>(
    () => 'components.json',
  );

  readonly components = computed(() => this.componentsResource.value() ?? []);

  readonly visibleComponents = computed(() => {
    const all = this.configService.devMode()
      ? this.components()
      : this.components().filter((c) => !c.hidden);
    return all.filter(
      (c) => c.category !== 'Utilities' && c.category !== 'Recipes',
    );
  });

  readonly visibleUtilities = computed(() => {
    const all = this.configService.devMode()
      ? this.components()
      : this.components().filter((c) => !c.hidden);
    return all.filter((c) => c.category === 'Utilities');
  });

  readonly visibleRecipes = computed(() => {
    const all = this.configService.devMode()
      ? this.components()
      : this.components().filter((c) => !c.hidden);
    return all.filter((c) => c.category === 'Recipes');
  });
}
