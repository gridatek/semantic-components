import {
  ChangeDetectionStrategy,
  Component,
  ViewEncapsulation,
} from '@angular/core';
import { DemoContainer } from '../../../../components/demo-container/demo-container';
import { SelectLanguageSwitcherDemo } from './select-language-switcher-demo';

@Component({
  selector: 'app-select-language-switcher-demo-container',
  imports: [DemoContainer, SelectLanguageSwitcherDemo],
  template: `
    <app-demo-container title="Select" [code]="code">
      <app-select-language-switcher-demo />
    </app-demo-container>
  `,
  host: { class: 'block' },
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SelectLanguageSwitcherDemoContainer {
  readonly code = `import {
  ChangeDetectionStrategy,
  Component,
  ViewEncapsulation,
} from '@angular/core';
import { ScLanguageSelect } from '@semantic-components/ui-lab';

@Component({
  selector: 'app-select-language-switcher-demo',
  imports: [ScLanguageSelect],
  template: \`
    <div class="max-w-xs">
      <sc-language-select></sc-language-select>
    </div>
  \`,
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SelectLanguageSwitcherDemo {}`;
}
