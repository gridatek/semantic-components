import { Component, ViewEncapsulation } from '@angular/core';
import { DemoContainer } from '../../../../components/demo-container/demo-container';
import { TextButtonGroupDemo } from './text-button-group-demo';

@Component({
  selector: 'app-text-button-group-demo-container',
  imports: [DemoContainer, TextButtonGroupDemo],
  template: `
    <app-demo-container
      title="Text"
      demoUrl="/demos/button-group/text-button-group-demo"
      [code]="code"
    >
      <app-text-button-group-demo />
    </app-demo-container>
  `,
  host: { class: 'block w-full' },
  encapsulation: ViewEncapsulation.None,
})
export class TextButtonGroupDemoContainer {
  readonly code = `import { Component, ViewEncapsulation } from '@angular/core';
import {
  ScButton,
  ScButtonGroup,
  ScButtonGroupText,
  ScInput,
} from '@semantic-components/ui';

@Component({
  selector: 'app-text-button-group-demo',
  imports: [ScButton, ScButtonGroup, ScButtonGroupText, ScInput],
  template: \`
    <div scButtonGroup aria-label="Website">
      <label scButtonGroupText for="text-button-group-url">https://</label>
      <input scInput id="text-button-group-url" placeholder="example.com" />
      <button scButton variant="outline">Visit</button>
    </div>
  \`,
  host: { class: 'flex w-full justify-center' },
  encapsulation: ViewEncapsulation.None,
})
export class TextButtonGroupDemo {}`;
}
