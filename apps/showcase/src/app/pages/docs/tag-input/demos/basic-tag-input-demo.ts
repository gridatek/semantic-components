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
  selector: 'app-basic-tag-input-demo',
  imports: [ScTagInput, ScTagInputField, ScTagInputTag],
  template: `
    <div class="max-w-md">
      <div scTagInput [(tags)]="tags">
        @for (tag of tags(); track tag) {
          <span scTagInputTag [tag]="tag"></span>
        }
        <input scTagInputField />
      </div>
    </div>
  `,
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BasicTagInputDemo {
  readonly tags = signal<string[]>(['Angular', 'TypeScript']);
}
