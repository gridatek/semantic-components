import { Component, ViewEncapsulation } from '@angular/core';
import { DemoContainer } from '../../../../components/demo-container/demo-container';
import { ButtonTextareaDemo } from './button-textarea-demo';

@Component({
  selector: 'app-button-textarea-demo-container',
  imports: [DemoContainer, ButtonTextareaDemo],
  template: `
    <app-demo-container
      title="Button"
      demoUrl="/demos/textarea/button-textarea-demo"
      [code]="code"
    >
      <app-button-textarea-demo />
    </app-demo-container>
  `,
  host: { class: 'block w-full' },
  encapsulation: ViewEncapsulation.None,
})
export class ButtonTextareaDemoContainer {
  readonly code = `import { Component, ViewEncapsulation } from '@angular/core';
import { ScButton, ScTextarea } from '@semantic-components/ui';

/** A message and its send button. */
@Component({
  selector: 'app-button-textarea-demo',
  imports: [ScButton, ScTextarea],
  template: \`
    <div class="grid w-full max-w-sm gap-2">
      <textarea
        scTextarea
        placeholder="Type your message here."
        aria-label="Message"
      ></textarea>
      <button scButton type="button">Send message</button>
    </div>
  \`,
  host: { class: 'flex w-full justify-center' },
  encapsulation: ViewEncapsulation.None,
})
export class ButtonTextareaDemo {}`;
}
