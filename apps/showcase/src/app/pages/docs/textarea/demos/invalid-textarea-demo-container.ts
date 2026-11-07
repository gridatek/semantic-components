import { Component, ViewEncapsulation } from '@angular/core';
import { DemoContainer } from '../../../../components/demo-container/demo-container';
import { InvalidTextareaDemo } from './invalid-textarea-demo';

@Component({
  selector: 'app-invalid-textarea-demo-container',
  imports: [DemoContainer, InvalidTextareaDemo],
  template: `
    <app-demo-container
      title="Invalid"
      demoUrl="/demos/textarea/invalid-textarea-demo"
      [code]="code"
    >
      <app-invalid-textarea-demo />
    </app-demo-container>
  `,
  host: { class: 'block w-full' },
  encapsulation: ViewEncapsulation.None,
})
export class InvalidTextareaDemoContainer {
  readonly code = `import { Component, ViewEncapsulation, signal } from '@angular/core';
import { FormField, form, required } from '@angular/forms/signals';
import {
  ScField,
  ScFieldErrors,
  ScLabel,
  ScTextarea,
} from '@semantic-components/ui';

/** Invalid once touched (Signal Forms): marked, and its error read with it. */
@Component({
  selector: 'app-invalid-textarea-demo',
  imports: [FormField, ScField, ScFieldErrors, ScLabel, ScTextarea],
  template: \`
    <div scField class="w-full max-w-sm">
      <label scLabel>Message</label>
      <textarea
        scTextarea
        [formField]="messageForm.message"
        placeholder="Type your message here."
      ></textarea>
      <div scFieldErrors></div>
    </div>
  \`,
  host: { class: 'flex w-full justify-center' },
  encapsulation: ViewEncapsulation.None,
})
export class InvalidTextareaDemo {
  protected readonly messageForm = form(signal({ message: '' }), (path) => {
    required(path.message, { message: 'Please enter a message.' });
  });

  constructor() {
    // Touched already, to show it invalid.
    this.messageForm.message().markAsTouched();
  }
}`;
}
