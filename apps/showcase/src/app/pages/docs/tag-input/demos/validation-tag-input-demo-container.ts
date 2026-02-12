import {
  ChangeDetectionStrategy,
  Component,
  ViewEncapsulation,
} from '@angular/core';
import { DemoContainer } from '../../../../components/demo-container/demo-container';
import { ValidationTagInputDemo } from './validation-tag-input-demo';

@Component({
  selector: 'app-validation-tag-input-demo-container',
  imports: [DemoContainer, ValidationTagInputDemo],
  template: `
    <app-demo-container title="Validation" [code]="code">
      <app-validation-tag-input-demo />
    </app-demo-container>
  `,
  host: { class: 'block' },
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ValidationTagInputDemoContainer {
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
  selector: 'app-validation-tag-input-demo',
  imports: [ScTagInput, ScTagInputField, ScTagInputTag],
  template: \`
    <div class="max-w-md">
      <div sc-tag-input [(tags)]="tags" [minLength]="2" [maxLength]="15">
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
export class ValidationTagInputDemo {
  readonly tags = signal<string[]>(['valid']);
}`;
}
