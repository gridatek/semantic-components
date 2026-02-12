import {
  ChangeDetectionStrategy,
  Component,
  signal,
  ViewEncapsulation,
} from '@angular/core';
import {
  ScTagInput,
  ScTagInputClear,
  ScTagInputCount,
  ScTagInputField,
  ScTagInputTag,
} from '@semantic-components/ui-lab';

@Component({
  selector: 'app-form-field-tag-input-demo',
  imports: [
    ScTagInput,
    ScTagInputField,
    ScTagInputTag,
    ScTagInputClear,
    ScTagInputCount,
  ],
  template: `
    <div class="max-w-md space-y-4">
      <div class="space-y-2">
        <label class="text-sm font-medium">Skills</label>
        <div
          sc-tag-input
          [(tags)]="skillTags"
          [maxTags]="10"
          placeholder="Add a skill..."
        >
          @for (tag of skillTags(); track tag) {
            <span sc-tag-input-tag [tag]="tag" variant="secondary"></span>
          }
          <input sc-tag-input-field />
          <span sc-tag-input-count class="ml-auto text-xs"></span>
        </div>
        <p class="text-xs text-muted-foreground">Add up to 10 skills</p>
      </div>

      <div class="space-y-2">
        <label class="text-sm font-medium">Categories</label>
        <div
          sc-tag-input
          [(tags)]="categoryTags"
          [maxTags]="3"
          placeholder="Select categories..."
        >
          @for (tag of categoryTags(); track tag) {
            <span sc-tag-input-tag [tag]="tag"></span>
          }
          <input sc-tag-input-field />
          <button sc-tag-input-clear></button>
        </div>
      </div>
    </div>
  `,
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FormFieldTagInputDemo {
  readonly skillTags = signal<string[]>(['JavaScript', 'CSS', 'HTML']);
  readonly categoryTags = signal<string[]>(['Technology']);
}
