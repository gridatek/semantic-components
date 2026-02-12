import {
  ChangeDetectionStrategy,
  Component,
  ViewEncapsulation,
} from '@angular/core';
import {
  ScCopyButton,
  ScCopyButtonWithText,
} from '@semantic-components/ui-lab';

@Component({
  selector: 'app-disabled-copy-button-demo',
  imports: [ScCopyButton, ScCopyButtonWithText],
  template: `
    <div class="flex items-center gap-4">
      <button
        sc-copy-button
        [value]="'Cannot copy'"
        [disabled]="true"
        variant="outline"
      ></button>
      <div
        sc-copy-button-with-text
        [value]="'Cannot copy'"
        [disabled]="true"
        variant="outline"
      ></div>
    </div>
  `,
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DisabledCopyButtonDemo {}
