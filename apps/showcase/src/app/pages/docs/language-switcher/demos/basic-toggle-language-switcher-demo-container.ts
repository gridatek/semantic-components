import {
  ChangeDetectionStrategy,
  Component,
  ViewEncapsulation,
} from '@angular/core';
import { DemoContainer } from '../../../../components/demo-container/demo-container';
import { BasicToggleLanguageSwitcherDemo } from './basic-toggle-language-switcher-demo';

@Component({
  selector: 'app-basic-toggle-language-switcher-demo-container',
  imports: [DemoContainer, BasicToggleLanguageSwitcherDemo],
  template: `
    <app-demo-container title="Basic Toggle" [code]="code">
      <app-basic-toggle-language-switcher-demo />
    </app-demo-container>
  `,
  host: { class: 'block' },
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BasicToggleLanguageSwitcherDemoContainer {
  readonly code = `import {
  ChangeDetectionStrategy,
  Component,
  inject,
  ViewEncapsulation,
} from '@angular/core';
import { ScLanguageService, ScLanguageToggle } from '@semantic-components/ui-lab';

@Component({
  selector: 'app-basic-toggle-language-switcher-demo',
  imports: [ScLanguageToggle],
  template: \`
    <div class="flex items-center gap-4">
      <button sc-language-toggle></button>
      <span class="text-sm text-muted-foreground">
        Current: {{ languageService.currentLanguage().label }}
      </span>
    </div>
  \`,
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BasicToggleLanguageSwitcherDemo {
  protected readonly languageService = inject(ScLanguageService);
}`;
}
