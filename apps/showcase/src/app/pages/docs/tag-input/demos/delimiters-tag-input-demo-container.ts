import {
  ChangeDetectionStrategy,
  Component,
  ViewEncapsulation,
} from '@angular/core';
import { DemoContainer } from '../../../../components/demo-container/demo-container';
import { DelimitersTagInputDemo } from './delimiters-tag-input-demo';

@Component({
  selector: 'app-delimiters-tag-input-demo-container',
  imports: [DemoContainer, DelimitersTagInputDemo],
  template: `
    <app-demo-container title="Custom Delimiters" [code]="code">
      <app-delimiters-tag-input-demo />
    </app-demo-container>
  `,
  host: { class: 'block' },
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DelimitersTagInputDemoContainer {
  readonly code = `import {
  ChangeDetectionStrategy,
  Component,
  signal,
  ViewEncapsulation,
} from '@angular/core';
import {
  ScTagInput,
  ScTagInputField,
  ScTagInputTag,
} from '@semantic-components/ui-lab';

@Component({
  selector: 'app-delimiters-tag-input-demo',
  imports: [ScTagInput, ScTagInputField, ScTagInputTag],
  template: \`
    <div class="max-w-md">
      <div sc-tag-input [(tags)]="tags" [delimiters]="['Enter', ' ', 'Tab']">
        @for (tag of tags(); track tag) {
          <span sc-tag-input-tag [tag]="tag"></span>
        }
        <input sc-tag-input-field />
      </div>
    </div>
  \`,
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DelimitersTagInputDemo {
  readonly tags = signal<string[]>(['space', 'separated']);
}`;
}
