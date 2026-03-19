import { JsonPipe } from '@angular/common';
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
  selector: 'app-output-tags-input-demo',
  imports: [
    JsonPipe,
    ScField,
    ScLabel,
    ScTagsInput,
    ScTagsInputControl,
    ScTagsInputItem,
    ScTagsInputItemDelete,
    SiXIcon,
  ],
  template: `
    <div class="w-full max-w-md space-y-4">
      <div scField>
        <label scLabel>Tags</label>
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
        </div>
      </div>
      <div class="bg-muted/50 rounded-md border p-4">
        <pre class="text-sm">{{ tags() | json }}</pre>
      </div>
    </div>
  `,
  host: { class: 'flex w-full justify-center' },
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class OutputTagsInputDemo {
  readonly tags = signal<string[]>(['Angular', 'TypeScript']);
}
