import {
  ChangeDetectionStrategy,
  Component,
  ViewEncapsulation,
} from '@angular/core';
import { ScButton } from '@semantic-components/ui';
import { ScCopyToClipboard } from '@semantic-components/ui';
import { SiCheckIcon, SiCopyIcon } from '@semantic-icons/lucide-icons';

@Component({
  selector: 'app-basic-copy-to-clipboard-demo',
  imports: [ScCopyToClipboard, SiCheckIcon, SiCopyIcon, ScButton],
  template: `
    <div class="flex items-center gap-4">
      <code class="bg-muted rounded px-3 py-2 text-sm">
        npm install &#64;semantic-components/ui
      </code>
      <button
        scButton
        variant="outline"
        size="sm"
        [scCopyToClipboard]="text"
        #copy="scCopyToClipboard"
      >
        @if (copy.copied()) {
          <svg siCheckIcon class="size-4"></svg>
          Copied
        } @else {
          <svg siCopyIcon class="size-4"></svg>
          Copy
        }
      </button>
    </div>
  `,
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BasicCopyToClipboardDemo {
  readonly text = 'npm install @semantic-components/ui';
}
