import {
  ChangeDetectionStrategy,
  Component,
  ViewEncapsulation,
} from '@angular/core';
import { DemoContainer } from '../../../../components/demo-container/demo-container';
import { EnglishLabelsLanguageSwitcherDemo } from './english-labels-language-switcher-demo';

@Component({
  selector: 'app-english-labels-language-switcher-demo-container',
  imports: [DemoContainer, EnglishLabelsLanguageSwitcherDemo],
  template: `
    <app-demo-container title="English Labels" [code]="code">
      <app-english-labels-language-switcher-demo />
    </app-demo-container>
  `,
  host: { class: 'block' },
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class EnglishLabelsLanguageSwitcherDemoContainer {
  readonly code = `import {
  ChangeDetectionStrategy,
  Component,
  ViewEncapsulation,
} from '@angular/core';
import { ScLanguageSelect } from '@semantic-components/ui-lab';

@Component({
  selector: 'app-english-labels-language-switcher-demo',
  imports: [ScLanguageSelect],
  template: \`
    <div class="max-w-xs">
      <sc-language-select [showNativeLabels]="false"></sc-language-select>
    </div>
  \`,
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class EnglishLabelsLanguageSwitcherDemo {}`;
}
