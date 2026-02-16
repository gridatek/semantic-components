import {
  ChangeDetectionStrategy,
  Component,
  ViewEncapsulation,
} from '@angular/core';
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
  host: { class: 'block' },
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FileInputDemoContainer {
  readonly code = `import {
  ChangeDetectionStrategy,
  Component,
  ViewEncapsulation,
} from '@angular/core';
import { ScField, ScLabel } from '@semantic-components/ui';
import { ScInput } from '@semantic-components/ui';

@Component({
  selector: 'app-file-input-demo',
  imports: [ScField, ScInput, ScLabel],
  template: \`
    <div scField>
      <label scLabel>Upload file</label>
      <input scInput type="file" />
    </div>
  \`,
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FileInputDemo {}`;
}
