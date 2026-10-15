import { Component, ViewEncapsulation } from '@angular/core';
import { ScLanguageToggle } from '@semantic-components/ui-lab';
import { SiGlobeIcon } from '@semantic-icons/lucide-icons';

@Component({
  selector: 'app-variants-language-switcher-demo',
  imports: [ScLanguageToggle, SiGlobeIcon],
  template: `
    <div class="flex items-center gap-4">
      <div class="flex flex-col items-center gap-2">
        <button scLanguageToggle variant="default" #toggle1="scLanguageToggle">
          <svg siGlobeIcon></svg>
          {{ toggle1.current().code }}
          <span class="sr-only">Switch to {{ toggle1.next().label }}</span>
        </button>
        <span class="text-muted-foreground text-xs">Default</span>
      </div>
      <div class="flex flex-col items-center gap-2">
        <button scLanguageToggle variant="outline" #toggle2="scLanguageToggle">
          <svg siGlobeIcon></svg>
          {{ toggle2.current().code }}
          <span class="sr-only">Switch to {{ toggle2.next().label }}</span>
        </button>
        <span class="text-muted-foreground text-xs">Outline</span>
      </div>
      <div class="flex flex-col items-center gap-2">
        <button scLanguageToggle variant="ghost" #toggle3="scLanguageToggle">
          <svg siGlobeIcon></svg>
          {{ toggle3.current().code }}
          <span class="sr-only">Switch to {{ toggle3.next().label }}</span>
        </button>
        <span class="text-muted-foreground text-xs">Ghost</span>
      </div>
    </div>
  `,
  host: { class: 'flex w-full justify-center' },
  encapsulation: ViewEncapsulation.None,
})
export class VariantsLanguageSwitcherDemo {}
