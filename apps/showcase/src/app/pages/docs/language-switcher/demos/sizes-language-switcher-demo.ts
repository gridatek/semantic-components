import {
  ChangeDetectionStrategy,
  Component,
  ViewEncapsulation,
} from '@angular/core';
import { ScLanguageToggle } from '@semantic-components/ui-lab';

@Component({
  selector: 'app-sizes-language-switcher-demo',
  imports: [ScLanguageToggle],
  template: `
    <div class="flex items-center gap-4">
      <div class="flex flex-col items-center gap-2">
        <button scLanguageToggle variant="outline" size="sm"></button>
        <span class="text-muted-foreground text-xs">Small</span>
      </div>
      <div class="flex flex-col items-center gap-2">
        <button scLanguageToggle variant="outline" size="default"></button>
        <span class="text-muted-foreground text-xs">Default</span>
      </div>
      <div class="flex flex-col items-center gap-2">
        <button scLanguageToggle variant="outline" size="lg"></button>
        <span class="text-muted-foreground text-xs">Large</span>
      </div>
      <div class="flex flex-col items-center gap-2">
        <button
          scLanguageToggle
          variant="outline"
          size="icon"
          [iconOnly]="true"
        ></button>
        <span class="text-muted-foreground text-xs">Icon</span>
      </div>
    </div>
  `,
  host: { class: 'block w-full' },
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SizesLanguageSwitcherDemo {}
