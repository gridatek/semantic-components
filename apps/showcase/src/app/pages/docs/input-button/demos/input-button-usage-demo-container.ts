import { Component, ViewEncapsulation } from '@angular/core';
import { UsageCode } from '../../../../components/usage-code/usage-code';
import { InputButtonUsageDemo } from './input-button-usage-demo';

@Component({
  selector: 'app-input-button-usage-demo-container',
  imports: [UsageCode, InputButtonUsageDemo],
  template: `
    <app-usage-code [code]="code">
      <ng-template><app-input-button-usage-demo /></ng-template>
    </app-usage-code>
  `,
  host: { class: 'block w-full' },
  encapsulation: ViewEncapsulation.None,
})
export class InputButtonUsageDemoContainer {
  readonly code = `import { Component, ViewEncapsulation } from '@angular/core';
import { ScInputButton, ScKbd } from '@semantic-components/ui';
import { SiSearchIcon } from '@semantic-icons/lucide-icons';

@Component({
  selector: 'app-input-button-usage-demo',
  imports: [ScInputButton, ScKbd, SiSearchIcon],
  template: \`
    <button scInputButton class="max-w-sm">
      <svg siSearchIcon></svg>
      <span class="flex-1">Search...</span>
      <kbd scKbd>⌘<span class="sr-only"> Command</span>J</kbd>
    </button>
  \`,
  host: { class: 'flex w-full justify-center' },
  encapsulation: ViewEncapsulation.None,
})
export class InputButtonUsageDemo {}`;
}
