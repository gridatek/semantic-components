import {
  ChangeDetectionStrategy,
  Component,
  ViewEncapsulation,
} from '@angular/core';
import { DemoContainer } from '../../../../components/demo-container/demo-container';
import { NavigationLanguageSwitcherDemo } from './navigation-language-switcher-demo';

@Component({
  selector: 'app-navigation-language-switcher-demo-container',
  imports: [DemoContainer, NavigationLanguageSwitcherDemo],
  template: `
    <app-demo-container title="Navigation Context" [code]="code">
      <app-navigation-language-switcher-demo />
    </app-demo-container>
  `,
  host: { class: 'block' },
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NavigationLanguageSwitcherDemoContainer {
  readonly code = `import {
  ChangeDetectionStrategy,
  Component,
  ViewEncapsulation,
} from '@angular/core';
import { ScLanguageToggle } from '@semantic-components/ui-lab';

@Component({
  selector: 'app-navigation-language-switcher-demo',
  imports: [ScLanguageToggle],
  template: \`
    <div class="flex items-center justify-between rounded-lg border p-4">
      <div class="space-y-0.5">
        <span class="text-base font-medium">Language</span>
        <p class="text-sm text-muted-foreground">
          Choose your preferred language
        </p>
      </div>
      <button sc-language-toggle variant="outline"></button>
    </div>
  \`,
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NavigationLanguageSwitcherDemo {}`;
}
