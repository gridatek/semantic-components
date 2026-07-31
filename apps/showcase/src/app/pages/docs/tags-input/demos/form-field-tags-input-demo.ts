import { Component, ViewEncapsulation, signal } from '@angular/core';
import { ScField, ScLabel } from '@semantic-components/ui';
import {
  ScTagsInput,
  ScTagsInputClear,
  ScTagsInputControl,
  ScTagsInputCount,
  ScTagsInputItem,
  ScTagsInputItemDelete,
} from '@semantic-components/ui-lab';
import { SiXIcon } from '@semantic-icons/lucide-icons';

@Component({
  selector: 'app-form-field-tags-input-demo',
  imports: [
    ScField,
    ScLabel,
    ScTagsInput,
    ScTagsInputControl,
    ScTagsInputItem,
    ScTagsInputItemDelete,
    ScTagsInputClear,
    ScTagsInputCount,
    SiXIcon,
  ],
  template: `
    <div class="w-full max-w-md space-y-4">
      <div scField>
        <label scLabel>Skills</label>
        <div
          scTagsInput
          [(tags)]="skillTags"
          [maxTags]="10"
          placeholder="Add a skill..."
        >
          @for (tag of skillTags(); track $index) {
            <span
              scTagsInputItem
              [tag]="tag"
              [index]="$index"
              variant="secondary"
            >
              {{ tag }}
              <button scTagsInputItemDelete>
                <svg siXIcon class="size-3"></svg>
              </button>
            </span>
          }
          <input scTagsInputControl />
          <span scTagsInputCount class="ml-auto text-xs"></span>
        </div>
        <p class="text-muted-foreground text-xs">Add up to 10 skills</p>
      </div>

      <div scField>
        <label scLabel>Categories</label>
        <div
          scTagsInput
          [(tags)]="categoryTags"
          [maxTags]="3"
          placeholder="Select categories..."
        >
          @for (tag of categoryTags(); track $index) {
            <span scTagsInputItem [tag]="tag" [index]="$index">
              {{ tag }}
              <button scTagsInputItemDelete>
                <svg siXIcon class="size-3"></svg>
              </button>
            </span>
          }
          <input scTagsInputControl />
          <button scTagsInputClear>
            <svg siXIcon class="size-4"></svg>
          </button>
        </div>
      </div>
    </div>
  `,
  host: { class: 'flex w-full justify-center' },
  encapsulation: ViewEncapsulation.None,
})
export class FormFieldTagsInputDemo {
  readonly skillTags = signal<string[]>(['JavaScript', 'CSS', 'HTML']);
  readonly categoryTags = signal<string[]>(['Technology']);
}
