import { JsonPipe } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  signal,
  ViewEncapsulation,
} from '@angular/core';
import {
  ScTagInput,
  ScTagInputField,
  ScTagInputTag,
} from '@semantic-components/ui-lab';

@Component({
  selector: 'app-output-tag-input-demo',
  imports: [JsonPipe, ScTagInput, ScTagInputField, ScTagInputTag],
  template: `
    <div class="max-w-md space-y-4">
      <div sc-tag-input [(tags)]="tags">
        @for (tag of tags(); track tag) {
          <span sc-tag-input-tag [tag]="tag"></span>
        }
        <input sc-tag-input-field />
      </div>
      <div class="rounded-md border p-4 bg-muted/50">
        <pre class="text-sm">{{ tags() | json }}</pre>
      </div>
    </div>
  `,
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class OutputTagInputDemo {
  readonly tags = signal<string[]>(['Angular', 'TypeScript']);
}
