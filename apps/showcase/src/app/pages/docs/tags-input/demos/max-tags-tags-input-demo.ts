import {
  ChangeDetectionStrategy,
  Component,
  ViewEncapsulation,
  signal,
} from '@angular/core';
import { ScField, ScLabel } from '@semantic-components/ui';
import {
  ScTagsInput,
  ScTagsInputControl,
  ScTagsInputCount,
  ScTagsInputItem,
  ScTagsInputItemDelete,
} from '@semantic-components/ui-lab';
import { SiXIcon } from '@semantic-icons/lucide-icons';

@Component({
  selector: 'app-max-tags-tags-input-demo',
  imports: [
    ScField,
    ScLabel,
    ScTagsInput,
    ScTagsInputControl,
    ScTagsInputItem,
    ScTagsInputItemDelete,
    ScTagsInputCount,
    SiXIcon,
  ],
  template: `
    <div class="w-full max-w-md">
      <div scField>
        <label scLabel>Tags</label>
        <div scTagsInput [(tags)]="tags" [maxTags]="5">
          @for (tag of tags(); track $index) {
            <span scTagsInputItem [tag]="tag" [index]="$index">
              {{ tag }}
              <button scTagsInputItemDelete>
                <svg siXIcon class="size-3"></svg>
              </button>
            </span>
          }
          <input scTagsInputControl />
          <span scTagsInputCount class="ml-auto text-xs"></span>
        </div>
      </div>
    </div>
  `,
  host: { class: 'flex w-full justify-center' },
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MaxTagsTagsInputDemo {
  readonly tags = signal<string[]>(['One', 'Two', 'Three']);
}
