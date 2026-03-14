import {
  ChangeDetectionStrategy,
  Component,
  ViewEncapsulation,
} from '@angular/core';
import { ScButton, ScCopyToClipboard } from '@semantic-components/ui';
import { SiCheckIcon, SiCopyIcon } from '@semantic-icons/lucide-icons';

@Component({
  selector: 'app-copy-to-clipboard-usage-demo',
  imports: [ScButton, ScCopyToClipboard, SiCheckIcon, SiCopyIcon],
  template: `
    <button
      scButton
      variant="outline"
      [scCopyToClipboard]="text"
      #copy="scCopyToClipboard"
    >
      @if (copy.copied()) {
        <svg siCheckIcon></svg>
        Copied
      } @else {
        <svg siCopyIcon></svg>
        Copy
      }
    </button>
  `,
  host: { class: 'flex w-full justify-center' },
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CopyToClipboardUsageDemo {
  readonly text = 'Hello, world!';
}
