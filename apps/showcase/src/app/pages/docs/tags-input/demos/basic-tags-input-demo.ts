import { Component, ViewEncapsulation, signal } from '@angular/core';
import { ScField, ScFieldDescription, ScLabel } from '@semantic-components/ui';
import {
  ScTagsInput,
  ScTagsInputControl,
  ScTagsInputItem,
  ScTagsInputItemRemove,
} from '@semantic-components/ui-lab';
import { SiXIcon } from '@semantic-icons/lucide-icons';

/** Enter or a comma adds a tag, and so does leaving the field; a duplicate is refused. Backspace or ← in the empty field goes to the last tag — ← → between tags, Delete removes one. */
@Component({
  selector: 'app-basic-tags-input-demo',
  imports: [
    ScTagsInput,
    ScTagsInputControl,
    ScTagsInputItem,
    ScTagsInputItemRemove,
    ScField,
    ScFieldDescription,
    ScLabel,
    SiXIcon,
  ],
  template: `
    <div scField class="w-full max-w-md">
      <label scLabel>Skills</label>
      <div scTagsInput [(value)]="skills">
        @for (skill of skills(); track $index) {
          <span scTagsInputItem>
            <span>{{ skill }}</span>
            <button scTagsInputItemRemove>
              <svg siXIcon></svg>
              <span class="sr-only">Remove {{ skill }}</span>
            </button>
          </span>
        }
        <input scTagsInputControl placeholder="Add a skill" />
      </div>
      <p scFieldDescription>Press Enter or type a comma to add one.</p>
    </div>
  `,
  host: { class: 'flex w-full justify-center' },
  encapsulation: ViewEncapsulation.None,
})
export class BasicTagsInputDemo {
  readonly skills = signal(['Angular', 'TypeScript', 'Accessibility']);
}
