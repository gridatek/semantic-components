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
      <div scTagInput [(tags)]="tags" [maxTags]="5">
        @for (tag of tags(); track tag) {
          <span scTagInputTag [tag]="tag"></span>
        }
        <input scTagInputField />
      </div>
      <div class="flex justify-end">
        <span scTagInputCount></span>
      </div>
    </div>
  `,
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MaxTagsTagInputDemo {
  readonly tags = signal<string[]>(['One', 'Two', 'Three']);
}
