import {
  ChangeDetectionStrategy,
  Component,
  ViewEncapsulation,
} from '@angular/core';
import { ScLanguageSelect } from '@semantic-components/ui-lab';

@Component({
  selector: 'app-english-labels-language-switcher-demo',
  imports: [ScLanguageSelect],
  template: `
    <div class="max-w-xs">
      <sc-language-select [showNativeLabels]="false"></sc-language-select>
    </div>
  `,
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class EnglishLabelsLanguageSwitcherDemo {}
