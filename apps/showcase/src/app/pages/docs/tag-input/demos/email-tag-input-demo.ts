import {
  ChangeDetectionStrategy,
  Component,
  ViewEncapsulation,
  signal,
} from '@angular/core';
import {
  ScTagInputField,
  ScTagInputInput,
  ScTagInputRemove,
  ScTagInputTag,
} from '@semantic-components/ui-lab';
import { SiXIcon } from '@semantic-icons/lucide-icons';

@Component({
  selector: 'app-email-tag-input-demo',
  imports: [
    ScTagInputField,
    ScTagInputInput,
    ScTagInputTag,
    ScTagInputRemove,
    SiXIcon,
  ],
  template: `
    <div class="max-w-lg space-y-2">
      <label class="text-sm font-medium">To:</label>
      <div scTagInputField [(tags)]="tags" placeholder="Add recipient...">
        @for (tag of tags(); track $index) {
          <span
            scTagInputTag
            [tag]="tag"
            [index]="$index"
            variant="outline"
            class="rounded-full"
          >
            {{ tag }}
            <button scTagInputRemove>
              <svg siXIcon class="size-3"></svg>
            </button>
          </span>
        }
        <input scTagInputInput [addOnBlur]="true" />
      </div>
    </div>
  `,
  host: { class: 'flex w-full justify-center' },
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class EmailTagInputDemo {
  readonly tags = signal<string[]>(['alice@example.com', 'bob@example.com']);
}
