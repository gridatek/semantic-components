import {
  ChangeDetectionStrategy,
  Component,
  inject,
  ViewEncapsulation,
} from '@angular/core';
import {
  ScLanguageService,
  ScLanguageToggle,
} from '@semantic-components/ui-lab';

@Component({
  selector: 'app-basic-toggle-language-switcher-demo',
  imports: [ScLanguageToggle],
  template: `
    <div class="flex items-center gap-4">
      <button sc-language-toggle></button>
      <span class="text-sm text-muted-foreground">
        Current: {{ languageService.currentLanguage().label }}
      </span>
    </div>
  `,
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BasicToggleLanguageSwitcherDemo {
  protected readonly languageService = inject(ScLanguageService);
}
