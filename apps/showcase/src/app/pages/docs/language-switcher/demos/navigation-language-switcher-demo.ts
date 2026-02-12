import {
  ChangeDetectionStrategy,
  Component,
  ViewEncapsulation,
} from '@angular/core';
import { ScLanguageToggle } from '@semantic-components/ui-lab';

@Component({
  selector: 'app-navigation-language-switcher-demo',
  imports: [ScLanguageToggle],
  template: `
    <div class="flex items-center justify-between rounded-lg border p-4">
      <div class="space-y-0.5">
        <span class="text-base font-medium">Language</span>
        <p class="text-sm text-muted-foreground">
          Choose your preferred language
        </p>
      </div>
      <button sc-language-toggle variant="outline"></button>
    </div>
  `,
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NavigationLanguageSwitcherDemo {}
