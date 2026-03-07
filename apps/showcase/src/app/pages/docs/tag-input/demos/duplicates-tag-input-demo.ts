import {
  ChangeDetectionStrategy,
  Component,
  ViewEncapsulation,
  signal,
} from '@angular/core';
import {
  ScTagInput,
  ScTagInputField,
  ScTagInputTag,
} from '@semantic-components/ui-lab';

@Component({
  selector: 'app-duplicates-tag-input-demo',
  imports: [ScTagInput, ScTagInputField, ScTagInputTag],
  template: `
    <div class="max-w-md">
      <div scTagInput [(tags)]="tags" [allowDuplicates]="true">
        @for (tag of tags(); track $index) {
          <span scTagInputTag [tag]="tag" variant="secondary"></span>
        }
        <input scTagInputField />
      </div>
    </div>
  `,
  host: { class: 'flex w-full justify-center' },
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DuplicatesTagInputDemo {
  readonly tags = signal<string[]>(['hello']);
}
