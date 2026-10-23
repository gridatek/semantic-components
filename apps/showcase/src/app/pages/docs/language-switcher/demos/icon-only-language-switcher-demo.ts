import { Component, ViewEncapsulation } from '@angular/core';
import { ScLanguageToggle } from '@semantic-components/ui';
import { SiGlobeIcon } from '@semantic-icons/lucide-icons';

@Component({
  selector: 'app-icon-only-language-switcher-demo',
  imports: [ScLanguageToggle, SiGlobeIcon],
  template: `
    <div class="flex items-center gap-4">
      <button scLanguageToggle size="icon" #toggle="scLanguageToggle">
        <svg siGlobeIcon></svg>
        <span class="sr-only">Switch to {{ toggle.next().label }}</span>
      </button>
      <span class="text-muted-foreground text-sm">Globe icon only</span>
    </div>
  `,
  host: { class: 'flex w-full justify-center' },
  encapsulation: ViewEncapsulation.None,
})
export class IconOnlyLanguageSwitcherDemo {}
