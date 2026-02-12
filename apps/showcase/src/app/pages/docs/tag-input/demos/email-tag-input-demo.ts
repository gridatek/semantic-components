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
  selector: 'app-email-tag-input-demo',
  imports: [ScTagInput, ScTagInputField, ScTagInputTag],
  template: `
    <div class="max-w-lg space-y-2">
      <label class="text-sm font-medium">To:</label>
      <div sc-tag-input [(tags)]="tags" placeholder="Add recipient...">
        @for (tag of tags(); track tag) {
          <span
            sc-tag-input-tag
            [tag]="tag"
            variant="outline"
            class="rounded-full"
          ></span>
        }
        <input sc-tag-input-field [addOnBlur]="true" />
      </div>
    </div>
  `,
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class EmailTagInputDemo {
  readonly tags = signal<string[]>(['alice@example.com', 'bob@example.com']);
}
