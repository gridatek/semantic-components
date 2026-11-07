import { Component, ViewEncapsulation } from '@angular/core';
import { DemoContainer } from '../../../../components/demo-container/demo-container';
import { DisabledTextareaDemo } from './disabled-textarea-demo';

@Component({
  selector: 'app-disabled-textarea-demo-container',
  imports: [DemoContainer, DisabledTextareaDemo],
  template: `
    <app-demo-container
      title="Disabled"
      demoUrl="/demos/textarea/disabled-textarea-demo"
      [code]="code"
    >
      <app-disabled-textarea-demo />
    </app-demo-container>
  `,
  host: { class: 'block w-full' },
  encapsulation: ViewEncapsulation.None,
})
export class DisabledTextareaDemoContainer {
  readonly code = `import { Component, ViewEncapsulation } from '@angular/core';
import { ScField, ScLabel, ScTextarea } from '@semantic-components/ui';

/** disabled: dimmed, and nothing can be typed. */
@Component({
  selector: 'app-disabled-textarea-demo',
  imports: [ScField, ScLabel, ScTextarea],
  template: \`
    <div scField class="w-full max-w-sm">
      <label scLabel>Message</label>
      <textarea
        scTextarea
        placeholder="Type your message here."
        disabled
      ></textarea>
    </div>
  \`,
  host: { class: 'flex w-full justify-center' },
  encapsulation: ViewEncapsulation.None,
})
export class DisabledTextareaDemo {}`;
}
