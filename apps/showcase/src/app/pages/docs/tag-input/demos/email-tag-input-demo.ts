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
  selector: 'app-email-tag-input-demo',
  imports: [
    ScTagInput,
    ScTagInputField,
    ScTagInputTag,
    ScTagInputRemove,
    SiXIcon,
  ],
  template: `
    <div class="max-w-lg space-y-2">
      <label class="text-sm font-medium">To:</label>
      <div scTagInput [(tags)]="tags" placeholder="Add recipient...">
        @for (tag of tags(); track tag) {
          <span
            scTagInputTag
            [tag]="tag"
            variant="outline"
            class="rounded-full"
          >
            {{ tag }}
            <button scTagInputRemove>
              <svg siXIcon class="size-3"></svg>
            </button>
          </span>
        }
        <input scTagInputField [addOnBlur]="true" />
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
