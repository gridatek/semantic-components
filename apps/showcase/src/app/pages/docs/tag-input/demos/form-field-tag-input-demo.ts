import {
  ChangeDetectionStrategy,
  Component,
  ViewEncapsulation,
  signal,
} from '@angular/core';
import {
  ScTagInput,
  ScTagInputClear,
  ScTagInputCount,
  ScTagInputField,
  ScTagInputRemove,
  ScTagInputTag,
} from '@semantic-components/ui-lab';
import { SiXIcon } from '@semantic-icons/lucide-icons';

@Component({
  selector: 'app-form-field-tag-input-demo',
  imports: [
    ScTagInput,
    ScTagInputField,
    ScTagInputTag,
    ScTagInputRemove,
    ScTagInputClear,
    ScTagInputCount,
    SiXIcon,
  ],
  template: `
    <div class="max-w-md space-y-4">
      <div class="space-y-2">
        <label class="text-sm font-medium">Skills</label>
        <div
          scTagInput
          [(tags)]="skillTags"
          [maxTags]="10"
          placeholder="Add a skill..."
        >
          @for (tag of skillTags(); track tag) {
            <span scTagInputTag [tag]="tag" variant="secondary">
              {{ tag }}
              <button scTagInputRemove>
                <svg siXIcon class="size-3"></svg>
              </button>
            </span>
          }
          <input scTagInputField />
          <span scTagInputCount class="ml-auto text-xs"></span>
        </div>
        <p class="text-muted-foreground text-xs">Add up to 10 skills</p>
      </div>

      <div class="space-y-2">
        <label class="text-sm font-medium">Categories</label>
        <div
          scTagInput
          [(tags)]="categoryTags"
          [maxTags]="3"
          placeholder="Select categories..."
        >
          @for (tag of categoryTags(); track tag) {
            <span scTagInputTag [tag]="tag">
              {{ tag }}
              <button scTagInputRemove>
                <svg siXIcon class="size-3"></svg>
              </button>
            </span>
          }
          <input scTagInputField />
          <button scTagInputClear>
            <svg siXIcon class="size-4"></svg>
          </button>
        </div>
      </div>
    </div>
  `,
  host: { class: 'flex w-full justify-center' },
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FormFieldTagInputDemo {
  readonly skillTags = signal<string[]>(['JavaScript', 'CSS', 'HTML']);
  readonly categoryTags = signal<string[]>(['Technology']);
}
