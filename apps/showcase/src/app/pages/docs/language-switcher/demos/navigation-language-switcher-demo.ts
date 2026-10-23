import { Component, ViewEncapsulation } from '@angular/core';
import { ScLanguageToggle } from '@semantic-components/ui';
import { SiGlobeIcon } from '@semantic-icons/lucide-icons';

@Component({
  selector: 'app-navigation-language-switcher-demo',
  imports: [ScLanguageToggle, SiGlobeIcon],
  template: `
    <div class="flex items-center justify-between rounded-lg border p-4">
      <div class="space-y-0.5">
        <span class="text-base font-medium">Language</span>
        <p class="text-muted-foreground text-sm">
          Choose your preferred language
        </p>
      </div>
      <button scLanguageToggle variant="outline" #toggle="scLanguageToggle">
        <svg siGlobeIcon></svg>
        {{ toggle.current().code }}
        <span class="sr-only">Switch to {{ toggle.next().label }}</span>
      </button>
    </div>
  `,
  host: { class: 'flex w-full justify-center' },
  encapsulation: ViewEncapsulation.None,
})
export class NavigationLanguageSwitcherDemo {}
