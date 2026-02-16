import {
  ChangeDetectionStrategy,
  Component,
  ViewEncapsulation,
} from '@angular/core';
import { ScCopyButtonWithText } from '@semantic-components/ui-lab';

@Component({
  selector: 'app-withtext-copy-button-demo',
  imports: [ScCopyButtonWithText],
  template: `
    <div class="flex flex-wrap items-center gap-4">
      <div scCopyButtonWithText [value]="'Copy me!'"></div>
      <div
        scCopyButtonWithText
        [value]="'Custom text'"
        copyText="Copy Link"
        copiedText="Link Copied!"
        variant="outline"
      ></div>
      <div scCopyButtonWithText [value]="'Small button'" size="sm"></div>
    </div>
  `,
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class WithtextCopyButtonDemo {}
