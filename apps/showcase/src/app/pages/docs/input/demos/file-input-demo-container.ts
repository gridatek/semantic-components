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
import { ScField, ScInput, ScLabel } from '@semantic-components/ui-lab';

@Component({
  selector: 'app-file-input-demo',
  imports: [ScField, ScInput, ScLabel],
  template: \`
    <div sc-field>
      <label sc-label>Upload file</label>
      <input sc-input type="file" />
    </div>
  \`,
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FileInputDemo {}`;
}
