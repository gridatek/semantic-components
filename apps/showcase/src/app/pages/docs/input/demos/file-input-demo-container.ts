import { Component, ViewEncapsulation } from '@angular/core';
import { DemoContainer } from '../../../../components/demo-container/demo-container';
import { FileInputDemo } from './file-input-demo';

@Component({
  selector: 'app-file-input-demo-container',
  imports: [DemoContainer, FileInputDemo],
  template: `
    <app-demo-container
      title="File"
      demoUrl="/demos/input/file-input-demo"
      [code]="code"
    >
      <app-file-input-demo />
    </app-demo-container>
  `,
  host: { class: 'block w-full' },
  encapsulation: ViewEncapsulation.None,
})
export class FileInputDemoContainer {
  readonly code = `import { Component, ViewEncapsulation } from '@angular/core';
import {
  ScField,
  ScFieldDescription,
  ScInput,
  ScLabel,
} from '@semantic-components/ui';

@Component({
  selector: 'app-file-input-demo',
  imports: [ScField, ScFieldDescription, ScInput, ScLabel],
  template: \`
    <div scField class="w-full max-w-xs">
      <label scLabel>Picture</label>
      <input scInput type="file" accept="image/*" />
      <p scFieldDescription>Select a picture to upload.</p>
    </div>
  \`,
  host: { class: 'flex w-full justify-center' },
  encapsulation: ViewEncapsulation.None,
})
export class FileInputDemo {}`;
}
