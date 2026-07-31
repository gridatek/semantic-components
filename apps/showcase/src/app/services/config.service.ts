import { httpResource } from '@angular/common/http';
import { Service, computed } from '@angular/core';

interface AppConfig {
  devMode: boolean;
}

@Service()
export class ConfigService {
  private readonly configResource = httpResource<AppConfig>(
    () => 'config.json',
  );

  readonly devMode = computed(
    () => this.configResource.value()?.devMode ?? false,
  );
}
