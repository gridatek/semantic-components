import { Component, ViewEncapsulation } from '@angular/core';
import { UsageCode } from '../../../../components/usage-code/usage-code';
import { TextareaUsageDemo } from './textarea-usage-demo';

@Component({
  selector: 'app-textarea-usage-demo-container',
  imports: [UsageCode, TextareaUsageDemo],
  template: `
    <app-usage-code [code]="code">
      <ng-template><app-textarea-usage-demo /></ng-template>
    </app-usage-code>
  `,
  host: { class: 'block w-full' },
  encapsulation: ViewEncapsulation.None,
})
export class TextareaUsageDemoContainer {
  readonly code = `import { Component, ViewEncapsulation } from '@angular/core';
import { ScTextarea } from '@semantic-components/ui';

@Component({
  selector: 'app-textarea-usage-demo',
  imports: [ScTextarea],
  template: \`
    <textarea
      scTextarea
      placeholder="Type your message here."
      aria-label="Message"
      class="max-w-sm"
    ></textarea>
  \`,
  host: { class: 'flex w-full justify-center' },
  encapsulation: ViewEncapsulation.None,
})
export class TextareaUsageDemo {}`;
}
