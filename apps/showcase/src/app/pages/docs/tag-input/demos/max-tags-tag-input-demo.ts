import {
  ChangeDetectionStrategy,
  Component,
  ViewEncapsulation,
  signal,
} from '@angular/core';
import {
  ScTagInputCount,
  ScTagInputField,
  ScTagInputInput,
  ScTagInputRemove,
  ScTagInputTag,
} from '@semantic-components/ui-lab';
import { SiXIcon } from '@semantic-icons/lucide-icons';

@Component({
  selector: 'app-max-tags-tag-input-demo',
  imports: [
    ScTagInputField,
    ScTagInputInput,
    ScTagInputTag,
    ScTagInputRemove,
    ScTagInputCount,
    SiXIcon,
  ],
  template: `
    <div class="max-w-md space-y-2">
      <div scTagInputField [(tags)]="tags" [maxTags]="5">
        @for (tag of tags(); track $index) {
          <span scTagInputTag [tag]="tag" [index]="$index">
            {{ tag }}
            <button scTagInputRemove>
              <svg siXIcon class="size-3"></svg>
            </button>
          </span>
        }
        <input scTagInputInput />
        <span scTagInputCount class="ml-auto text-xs"></span>
      </div>
    </div>
  `,
  host: { class: 'flex w-full justify-center' },
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MaxTagsTagInputDemo {
  readonly tags = signal<string[]>(['One', 'Two', 'Three']);
}
