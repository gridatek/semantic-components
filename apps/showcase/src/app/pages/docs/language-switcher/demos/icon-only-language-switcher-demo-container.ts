import {
  ChangeDetectionStrategy,
  Component,
  ViewEncapsulation,
} from '@angular/core';
import { DemoContainer } from '../../../../components/demo-container/demo-container';
import { IconOnlyLanguageSwitcherDemo } from './icon-only-language-switcher-demo';

@Component({
  selector: 'app-icon-only-language-switcher-demo-container',
  imports: [DemoContainer, IconOnlyLanguageSwitcherDemo],
  template: `
    <app-demo-container title="Icon Only" [code]="code">
      <app-icon-only-language-switcher-demo />
    </app-demo-container>
  `,
  host: { class: 'block' },
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class IconOnlyLanguageSwitcherDemoContainer {
  readonly code = `import {
  ChangeDetectionStrategy,
  Component,
  ViewEncapsulation,
} from '@angular/core';
import { ScLanguageToggle } from '@semantic-components/ui-lab';

@Component({
  selector: 'app-icon-only-language-switcher-demo',
  imports: [ScLanguageToggle],
  template: \`
    <div class="flex items-center gap-4">
      <button sc-language-toggle [iconOnly]="true" size="icon"></button>
      <span class="text-sm text-muted-foreground">Globe icon only</span>
    </div>
  \`,
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class IconOnlyLanguageSwitcherDemo {}`;
}
