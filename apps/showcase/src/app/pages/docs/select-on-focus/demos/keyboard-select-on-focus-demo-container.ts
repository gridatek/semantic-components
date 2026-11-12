import { Component, ViewEncapsulation } from '@angular/core';
import { DemoContainer } from '../../../../components/demo-container/demo-container';
import { KeyboardSelectOnFocusDemo } from './keyboard-select-on-focus-demo';

@Component({
  selector: 'app-keyboard-select-on-focus-demo-container',
  imports: [DemoContainer, KeyboardSelectOnFocusDemo],
  template: `
    <app-demo-container
      title="Keyboard only"
      description='scSelectOnFocus="keyboard": Tab in and the text is selected; a click places the caret where you click.'
      demoUrl="/demos/select-on-focus/keyboard-select-on-focus-demo"
      [code]="code"
    >
      <app-keyboard-select-on-focus-demo />
    </app-demo-container>
  `,
  host: { class: 'block w-full' },
  encapsulation: ViewEncapsulation.None,
})
export class KeyboardSelectOnFocusDemoContainer {
  readonly code = `import { Component, ViewEncapsulation } from '@angular/core';
import {
  ScField,
  ScInput,
  ScLabel,
  ScSelectOnFocus,
} from '@semantic-components/ui';

/** Selected on a keyboard focus only: a click places the caret. */
@Component({
  selector: 'app-keyboard-select-on-focus-demo',
  imports: [ScSelectOnFocus, ScInput, ScField, ScLabel],
  template: \`
    <div scField class="w-64">
      <label scLabel>Coupon code</label>
      <input scInput scSelectOnFocus="keyboard" value="SPRING-2026" />
    </div>
  \`,
  host: { class: 'flex w-full justify-center' },
  encapsulation: ViewEncapsulation.None,
})
export class KeyboardSelectOnFocusDemo {}`;
}
