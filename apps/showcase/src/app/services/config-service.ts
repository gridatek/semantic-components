import { httpResource } from '@angular/common/http';
import { Service, computed } from '@angular/core';

interface AppConfig {
  /** Dev-only extras: isolation links, the Usage demos. */
  devMode: boolean;
  /** Hidden pages (`hidden` in components.json) listed too. */
  showHidden?: boolean;
}

@Service()
export class ConfigService {
  private readonly configResource = httpResource<AppConfig>(
    () => 'config.json',
  );

  readonly devMode = computed(
    () => this.configResource.value()?.devMode ?? false,
  );

  readonly showHidden = computed(
    () => this.configResource.value()?.showHidden ?? false,
  );
}
