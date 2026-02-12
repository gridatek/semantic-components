import {
  ChangeDetectionStrategy,
  Component,
  ViewEncapsulation,
} from '@angular/core';
import { DemoContainer } from '../../../../components/demo-container/demo-container';
import { DisabledTagInputDemo } from './disabled-tag-input-demo';

@Component({
  selector: 'app-disabled-tag-input-demo-container',
  imports: [DemoContainer, DisabledTagInputDemo],
  template: `
    <app-demo-container title="Disabled" [code]="code">
      <app-disabled-tag-input-demo />
    </app-demo-container>
  `,
  host: { class: 'block' },
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DisabledTagInputDemoContainer {
  readonly code = `import {
  ChangeDetectionStrategy,
  Component,
  ViewEncapsulation,
} from '@angular/core';
import {
  ScTagInput,
  ScTagInputField,
  ScTagInputTag,
} from '@semantic-components/ui-lab';

@Component({
  selector: 'app-disabled-tag-input-demo',
  imports: [ScTagInput, ScTagInputField, ScTagInputTag],
  template: \`
    <div class="max-w-md">
      <div sc-tag-input [tags]="['Angular', 'React', 'Vue']" [disabled]="true">
        @for (tag of ['Angular', 'React', 'Vue']; track tag) {
          <span sc-tag-input-tag [tag]="tag"></span>
        }
        <input sc-tag-input-field />
      </div>
    </div>
  \`,
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DisabledTagInputDemo {}`;
}
