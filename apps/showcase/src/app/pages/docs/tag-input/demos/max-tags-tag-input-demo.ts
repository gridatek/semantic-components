import {
  ChangeDetectionStrategy,
  Component,
  signal,
  ViewEncapsulation,
} from '@angular/core';
import {
  ScTagInput,
  ScTagInputCount,
  ScTagInputField,
  ScTagInputTag,
} from '@semantic-components/ui-lab';

@Component({
  selector: 'app-max-tags-tag-input-demo',
  imports: [ScTagInput, ScTagInputField, ScTagInputTag, ScTagInputCount],
  template: `
    <div class="max-w-md space-y-2">
      <div sc-tag-input [(tags)]="tags" [maxTags]="5">
        @for (tag of tags(); track tag) {
          <span sc-tag-input-tag [tag]="tag"></span>
        }
        <input sc-tag-input-field />
      </div>
      <div class="flex justify-end">
        <span sc-tag-input-count></span>
      </div>
    </div>
  `,
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MaxTagsTagInputDemo {
  readonly tags = signal<string[]>(['One', 'Two', 'Three']);
}
