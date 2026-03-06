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
      <button scLanguageButton variant="outline"></button>
      <span class="text-muted-foreground text-sm">
        Shows current language with dropdown icon
      </span>
    </div>
  `,
  host: { class: 'block w-full' },
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ButtonLanguageSwitcherDemo {}
