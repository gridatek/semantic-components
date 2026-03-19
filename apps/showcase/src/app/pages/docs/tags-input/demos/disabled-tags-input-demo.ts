import {
  ChangeDetectionStrategy,
  Component,
  ViewEncapsulation,
} from '@angular/core';
import {
  ScTagsInput,
  ScTagsInputControl,
  ScTagsInputItem,
  ScTagsInputItemDelete,
} from '@semantic-components/ui-lab';
import { SiXIcon } from '@semantic-icons/lucide-icons';

@Component({
  selector: 'app-disabled-tags-input-demo',
  imports: [
    ScTagsInput,
    ScTagsInputControl,
    ScTagsInputItem,
    ScTagsInputItemDelete,
    SiXIcon,
  ],
  template: `
    <div class="w-full max-w-md">
      <div scTagsInput [tags]="['Angular', 'React', 'Vue']" [disabled]="true">
        @for (tag of ['Angular', 'React', 'Vue']; track $index) {
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
  `,
  host: { class: 'flex w-full justify-center' },
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DisabledTagsInputDemo {}
