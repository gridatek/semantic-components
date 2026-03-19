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
  ScTagsInputItem,
  ScTagsInputItemDelete,
} from '@semantic-components/ui-lab';
import { SiXIcon } from '@semantic-icons/lucide-icons';

@Component({
  selector: 'app-delimiters-tags-input-demo',
  imports: [
    ScField,
    ScLabel,
    ScTagsInput,
    ScTagsInputControl,
    ScTagsInputItem,
    ScTagsInputItemDelete,
    SiXIcon,
  ],
  template: `
    <div class="w-full max-w-md">
      <div scField>
        <label scLabel>Tags</label>
        <div scTagsInput [(tags)]="tags" [delimiters]="['Enter', ' ', 'Tab']">
          @for (tag of tags(); track $index) {
            <span scTagsInputItem [tag]="tag" [index]="$index">
              {{ tag }}
              <button scTagsInputItemDelete>
                <svg siXIcon class="size-3"></svg>
              </button>
            </span>
          }
          <input scTagsInputControl />
        </div>
      </div>
    </div>
  `,
  host: { class: 'flex w-full justify-center' },
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DelimitersTagsInputDemo {
  readonly tags = signal<string[]>(['space', 'separated']);
}
