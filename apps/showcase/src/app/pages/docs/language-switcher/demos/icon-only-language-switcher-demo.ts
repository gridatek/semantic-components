import {
  ChangeDetectionStrategy,
  Component,
  ViewEncapsulation,
} from '@angular/core';
import { ScLanguageToggle } from '@semantic-components/ui-lab';

@Component({
  selector: 'app-icon-only-language-switcher-demo',
  imports: [ScLanguageToggle],
  template: `
    <div class="flex items-center gap-4">
      <button scLanguageToggle [iconOnly]="true" size="icon"></button>
      <span class="text-muted-foreground text-sm">Globe icon only</span>
    </div>
  `,
  host: { class: 'block w-full' },
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class IconOnlyLanguageSwitcherDemo {}
