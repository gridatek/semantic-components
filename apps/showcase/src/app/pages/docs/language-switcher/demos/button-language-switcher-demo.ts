import {
  ChangeDetectionStrategy,
  Component,
  ViewEncapsulation,
} from '@angular/core';
import { ScLanguageButton } from '@semantic-components/ui-lab';

@Component({
  selector: 'app-button-language-switcher-demo',
  imports: [ScLanguageButton],
  template: `
    <div class="flex items-center gap-4">
      <button sc-language-button variant="outline"></button>
      <span class="text-sm text-muted-foreground">
        Shows current language with dropdown icon
      </span>
    </div>
  `,
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ButtonLanguageSwitcherDemo {}
