import {
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
  template: `
    <div class="max-w-md">
      <div sc-tag-input [tags]="['Angular', 'React', 'Vue']" [disabled]="true">
        @for (tag of ['Angular', 'React', 'Vue']; track tag) {
          <span sc-tag-input-tag [tag]="tag"></span>
        }
        <input sc-tag-input-field />
      </div>
    </div>
  `,
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DisabledTagInputDemo {}
