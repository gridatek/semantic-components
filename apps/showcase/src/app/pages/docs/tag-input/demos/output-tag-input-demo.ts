import { JsonPipe } from '@angular/common';
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
  selector: 'app-output-tag-input-demo',
  imports: [
    JsonPipe,
    ScTagInputField,
    ScTagInputInput,
    ScTagInputTag,
    ScTagInputRemove,
    SiXIcon,
  ],
  template: `
    <div class="max-w-md space-y-4">
      <div scTagInputField [(tags)]="tags">
        @for (tag of tags(); track $index) {
          <span scTagInputTag [tag]="tag" [index]="$index">
            {{ tag }}
            <button scTagInputRemove>
              <svg siXIcon class="size-3"></svg>
            </button>
          </span>
        }
        <input scTagInputInput />
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
export class OutputTagInputDemo {
  readonly tags = signal<string[]>(['Angular', 'TypeScript']);
}
