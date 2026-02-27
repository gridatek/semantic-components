import {
  ChangeDetectionStrategy,
  Component,
  ViewEncapsulation,
} from '@angular/core';
import { ScCopyButton } from '@semantic-components/ui-lab';

@Component({
  selector: 'app-inline-copy-button-demo',
  imports: [ScCopyButton],
  template: `
    <div
      class="bg-muted/50 flex max-w-md items-center gap-2 rounded-md border px-3 py-2"
    >
      <code class="flex-1 font-mono text-sm">
        npm install &#64;angular/core
      </code>
      <button
        scCopyButton
        [value]="'npm install @angular/core'"
        size="sm"
      ></button>
    </div>
  `,
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class InlineCopyButtonDemo {}
