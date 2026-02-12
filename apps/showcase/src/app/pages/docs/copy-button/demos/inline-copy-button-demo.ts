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
      class="flex items-center gap-2 rounded-md border bg-muted/50 px-3 py-2 max-w-md"
    >
      <code class="flex-1 text-sm font-mono">
        npm install &#64;angular/core
      </code>
      <button
        sc-copy-button
        [value]="'npm install @angular/core'"
        size="sm"
      ></button>
    </div>
  `,
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class InlineCopyButtonDemo {}
