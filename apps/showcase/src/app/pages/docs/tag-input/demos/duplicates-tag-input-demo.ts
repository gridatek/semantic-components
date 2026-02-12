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
  selector: 'app-duplicates-tag-input-demo',
  imports: [ScTagInput, ScTagInputField, ScTagInputTag],
  template: `
    <div class="max-w-md">
      <div sc-tag-input [(tags)]="tags" [allowDuplicates]="true">
        @for (tag of tags(); track $index) {
          <span sc-tag-input-tag [tag]="tag" variant="secondary"></span>
        }
        <input sc-tag-input-field />
      </div>
    </div>
  `,
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DuplicatesTagInputDemo {
  readonly tags = signal<string[]>(['hello']);
}
