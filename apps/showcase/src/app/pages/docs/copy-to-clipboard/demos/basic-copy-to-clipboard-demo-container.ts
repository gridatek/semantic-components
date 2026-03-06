import {
  ChangeDetectionStrategy,
  Component,
  ViewEncapsulation,
} from '@angular/core';
import { DemoContainer } from '../../../../components/demo-container/demo-container';
import { BasicCopyToClipboardDemo } from './basic-copy-to-clipboard-demo';

@Component({
  selector: 'app-basic-copy-to-clipboard-demo-container',
  imports: [DemoContainer, BasicCopyToClipboardDemo],
  template: `
    <app-demo-container
      title="Basic"
      demoUrl="/demos/copy-to-clipboard/basic-copy-to-clipboard-demo"
      [code]="code"
    >
      <app-basic-copy-to-clipboard-demo />
    </app-demo-container>
  `,
  host: { class: 'block w-full' },
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BasicCopyToClipboardDemoContainer {
  readonly code = `import {
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
  template: \`
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
          <svg siCheckIcon></svg>
          Copied
        } @else {
          <svg siCopyIcon></svg>
          Copy
        }
      </button>
    </div>
  \`,
  host: { class: 'block w-full' },
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BasicCopyToClipboardDemo {
  readonly text = 'npm install @semantic-components/ui';
}`;
}
