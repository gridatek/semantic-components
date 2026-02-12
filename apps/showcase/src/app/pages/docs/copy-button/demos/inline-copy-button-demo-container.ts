import {
  ChangeDetectionStrategy,
  Component,
  ViewEncapsulation,
} from '@angular/core';
import { DemoContainer } from '../../../../components/demo-container/demo-container';
import { InlineCopyButtonDemo } from './inline-copy-button-demo';

@Component({
  selector: 'app-inline-copy-button-demo-container',
  imports: [DemoContainer, InlineCopyButtonDemo],
  template: `
    <app-demo-container title="Inline with Text" [code]="code">
      <app-inline-copy-button-demo />
    </app-demo-container>
  `,
  host: { class: 'block' },
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class InlineCopyButtonDemoContainer {
  readonly code = `import {
  ChangeDetectionStrategy,
  Component,
  ViewEncapsulation,
} from '@angular/core';
import { ScCopyButton } from '@semantic-components/ui-lab';

@Component({
  selector: 'app-inline-copy-button-demo',
  imports: [ScCopyButton],
  template: \`
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
  \`,
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class InlineCopyButtonDemo {}`;
}
