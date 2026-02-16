import {
  ChangeDetectionStrategy,
  Component,
  ViewEncapsulation,
} from '@angular/core';
import { ScLanguageSelect } from '@semantic-components/ui-lab';

@Component({
  selector: 'app-select-language-switcher-demo',
  imports: [ScLanguageSelect],
  template: `
    <div class="max-w-xs">
      <sc-language-select></sc-language-select>
    </div>
  `,
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SelectLanguageSwitcherDemo {}
