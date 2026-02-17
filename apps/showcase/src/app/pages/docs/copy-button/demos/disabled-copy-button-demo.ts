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
        scCopyButton
        [value]="'Cannot copy'"
        [disabled]="true"
        variant="outline"
      ></button>
      <div
        scCopyButtonWithText
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
