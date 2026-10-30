import { Component, ViewEncapsulation } from '@angular/core';
import { DemoContainer } from '../../../../components/demo-container/demo-container';
import { TextControlGroupDemo } from './text-control-group-demo';

@Component({
  selector: 'app-text-control-group-demo-container',
  imports: [DemoContainer, TextControlGroupDemo],
  template: `
    <app-demo-container
      title="Text"
      demoUrl="/demos/control-group/text-control-group-demo"
      [code]="code"
    >
      <app-text-control-group-demo />
    </app-demo-container>
  `,
  host: { class: 'block w-full' },
  encapsulation: ViewEncapsulation.None,
})
export class TextControlGroupDemoContainer {
  readonly code = `import { Component, ViewEncapsulation } from '@angular/core';
import {
  ScButton,
  ScControlGroup,
  ScControlGroupText,
  ScInput,
} from '@semantic-components/ui';

@Component({
  selector: 'app-text-control-group-demo',
  imports: [ScButton, ScControlGroup, ScControlGroupText, ScInput],
  template: \`
    <div scControlGroup aria-label="Website">
      <label scControlGroupText for="text-control-group-url">https://</label>
      <input scInput id="text-control-group-url" placeholder="example.com" />
      <button scButton variant="outline">Visit</button>
    </div>
  \`,
  host: { class: 'flex w-full justify-center' },
  encapsulation: ViewEncapsulation.None,
})
export class TextControlGroupDemo {}`;
}
