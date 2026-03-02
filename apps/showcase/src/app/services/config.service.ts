import { httpResource } from '@angular/common/http';
import { Injectable, computed } from '@angular/core';

interface AppConfig {
  devMode: boolean;
}

@Injectable({
  providedIn: 'root',
})
export class ConfigService {
  private readonly configResource = httpResource<AppConfig>(
    () => 'config.json',
  );

  readonly devMode = computed(
    () => this.configResource.value()?.devMode ?? false,
  );
}
