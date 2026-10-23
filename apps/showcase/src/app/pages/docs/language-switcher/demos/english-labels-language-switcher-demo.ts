import { Component, ViewEncapsulation } from '@angular/core';
import { ScLanguageSelect } from '@semantic-components/ui';

@Component({
  selector: 'app-english-labels-language-switcher-demo',
  imports: [ScLanguageSelect],
  template: `
    <div class="max-w-xs">
      <div scLanguageSelect label="Language" [showNativeLabels]="false"></div>
    </div>
  `,
  host: { class: 'flex w-full justify-center' },
  encapsulation: ViewEncapsulation.None,
})
export class EnglishLabelsLanguageSwitcherDemo {}
