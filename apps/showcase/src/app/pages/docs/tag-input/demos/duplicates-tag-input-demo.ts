import {
  ChangeDetectionStrategy,
  Component,
  ViewEncapsulation,
  signal,
} from '@angular/core';
import {
  ScTagInput,
  ScTagInputField,
  ScTagInputRemove,
  ScTagInputTag,
} from '@semantic-components/ui-lab';
import { SiXIcon } from '@semantic-icons/lucide-icons';

@Component({
  selector: 'app-duplicates-tag-input-demo',
  imports: [
    ScTagInput,
    ScTagInputField,
    ScTagInputTag,
    ScTagInputRemove,
    SiXIcon,
  ],
  template: `
    <div class="max-w-md">
      <div scTagInput [(tags)]="tags" [allowDuplicates]="true">
        @for (tag of tags(); track $index) {
          <span scTagInputTag [tag]="tag" variant="secondary">
            {{ tag }}
            <button scTagInputRemove>
              <svg siXIcon class="size-3"></svg>
            </button>
          </span>
        }
        <input scTagInputField />
      </div>
    </div>
  `,
  host: { class: 'flex w-full justify-center' },
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DuplicatesTagInputDemo {
  readonly tags = signal<string[]>(['hello']);
}
