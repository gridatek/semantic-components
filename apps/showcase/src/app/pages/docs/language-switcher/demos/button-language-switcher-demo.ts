import { Component, ViewEncapsulation } from '@angular/core';
import { ScLanguageButton } from '@semantic-components/ui';
import { SiChevronDownIcon } from '@semantic-icons/lucide-icons';

@Component({
  selector: 'app-button-language-switcher-demo',
  imports: [ScLanguageButton, SiChevronDownIcon],
  template: `
    <div class="flex items-center gap-4">
      <button scLanguageButton variant="outline" #language="scLanguageButton">
        {{ language.current().nativeLabel }}
        <svg siChevronDownIcon></svg>
      </button>
      <span class="text-muted-foreground text-sm">
        Shows current language with dropdown icon
      </span>
    </div>
  `,
  host: { class: 'flex w-full justify-center' },
  encapsulation: ViewEncapsulation.None,
})
export class ButtonLanguageSwitcherDemo {}
