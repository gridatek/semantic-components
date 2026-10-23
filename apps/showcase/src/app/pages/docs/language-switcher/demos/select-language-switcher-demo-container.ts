import { Component, ViewEncapsulation } from '@angular/core';
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
  host: { class: 'block w-full' },
  encapsulation: ViewEncapsulation.None,
})
export class SelectLanguageSwitcherDemoContainer {
  readonly code = `import { Component, ViewEncapsulation } from '@angular/core';
import { ScLanguageSelect } from '@semantic-components/ui';

@Component({
  selector: 'app-select-language-switcher-demo',
  imports: [ScLanguageSelect],
  template: \`
    <div class="max-w-xs">
      <div scLanguageSelect label="Language"></div>
    </div>
  \`,
  host: { class: 'flex w-full justify-center' },
  encapsulation: ViewEncapsulation.None,
})
export class SelectLanguageSwitcherDemo {}`;
}
