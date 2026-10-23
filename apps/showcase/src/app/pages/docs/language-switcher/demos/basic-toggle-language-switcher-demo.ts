import { Component, ViewEncapsulation, inject } from '@angular/core';
import { ScLanguageService, ScLanguageToggle } from '@semantic-components/ui';
import { SiGlobeIcon } from '@semantic-icons/lucide-icons';

@Component({
  selector: 'app-basic-toggle-language-switcher-demo',
  imports: [ScLanguageToggle, SiGlobeIcon],
  template: `
    <div class="flex items-center gap-4">
      <button scLanguageToggle #toggle="scLanguageToggle">
        <svg siGlobeIcon></svg>
        {{ toggle.current().code }}
        <span class="sr-only">Switch to {{ toggle.next().label }}</span>
      </button>
      <span class="text-muted-foreground text-sm">
        Current: {{ languageService.currentLanguage().label }}
      </span>
    </div>
  `,
  host: { class: 'flex w-full justify-center' },
  encapsulation: ViewEncapsulation.None,
})
export class BasicToggleLanguageSwitcherDemo {
  protected readonly languageService = inject(ScLanguageService);
}
