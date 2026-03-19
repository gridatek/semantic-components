import {
  ChangeDetectionStrategy,
  Component,
  ViewEncapsulation,
  signal,
} from '@angular/core';
import {
  ScTagsInput,
  ScTagsInputClear,
  ScTagsInputControl,
  ScTagsInputItem,
  ScTagsInputItemDelete,
} from '@semantic-components/ui-lab';
import { SiXIcon } from '@semantic-icons/lucide-icons';

@Component({
  selector: 'app-clearable-tags-input-demo',
  imports: [
    ScTagsInput,
    ScTagsInputControl,
    ScTagsInputItem,
    ScTagsInputItemDelete,
    ScTagsInputClear,
    SiXIcon,
  ],
  template: `
    <div class="w-full max-w-md">
      <div scTagsInput [(tags)]="tags">
        @for (tag of tags(); track $index) {
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
  `,
  host: { class: 'flex w-full justify-center' },
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ClearableTagsInputDemo {
  readonly tags = signal<string[]>(['React', 'Vue', 'Svelte']);
}
