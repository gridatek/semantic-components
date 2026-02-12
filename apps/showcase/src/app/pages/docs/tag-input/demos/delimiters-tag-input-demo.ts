import {
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
  template: `
    <div class="max-w-md">
      <div sc-tag-input [(tags)]="tags" [delimiters]="['Enter', ' ', 'Tab']">
        @for (tag of tags(); track tag) {
          <span sc-tag-input-tag [tag]="tag"></span>
        }
        <input sc-tag-input-field />
      </div>
    </div>
  `,
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DelimitersTagInputDemo {
  readonly tags = signal<string[]>(['space', 'separated']);
}
