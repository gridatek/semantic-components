import { computed, inject, Injectable } from '@angular/core';

import { COMPONENTS } from '../data/components';
import { ConfigService } from './config.service';

@Injectable({
  providedIn: 'root',
})
export class ComponentsService {
  private readonly configService = inject(ConfigService);

  readonly visibleComponents = computed(() =>
    this.configService.devMode()
      ? COMPONENTS
      : COMPONENTS.filter((c) => !c.hidden),
  );
}
