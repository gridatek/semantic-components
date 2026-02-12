import {
  ChangeDetectionStrategy,
  Component,
  ViewEncapsulation,
} from '@angular/core';
import { ScField, ScInput, ScLabel } from '@semantic-components/ui-lab';

@Component({
  selector: 'app-file-input-demo',
  imports: [ScField, ScInput, ScLabel],
  template: `
    <div sc-field>
      <label sc-label>Upload file</label>
      <input sc-input type="file" />
    </div>
  `,
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FileInputDemo {}
