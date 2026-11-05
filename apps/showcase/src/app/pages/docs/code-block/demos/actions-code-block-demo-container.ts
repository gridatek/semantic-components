import { Component, ViewEncapsulation } from '@angular/core';
import { DemoContainer } from '../../../../components/demo-container/demo-container';
import { ActionsCodeBlockDemo } from './actions-code-block-demo';

@Component({
  selector: 'app-actions-code-block-demo-container',
  imports: [DemoContainer, ActionsCodeBlockDemo],
  template: `
    <app-demo-container
      title="Actions"
      demoUrl="/demos/code-block/actions-code-block-demo"
      [code]="code"
    >
      <app-actions-code-block-demo />
    </app-demo-container>
  `,
  host: { class: 'block w-full' },
  encapsulation: ViewEncapsulation.None,
})
export class ActionsCodeBlockDemoContainer {
  readonly code = `import { DOCUMENT } from '@angular/common';
import { Component, ViewEncapsulation, inject, signal } from '@angular/core';
import { ScButton } from '@semantic-components/ui';
import {
  ScCodeBlock,
  ScCodeBlockActions,
  ScCodeBlockContent,
  ScCodeBlockCopy,
  ScCodeBlockHeader,
  ScCodeBlockTitle,
} from '@semantic-components/ui/code-block';
import {
  SiCheckIcon,
  SiCopyIcon,
  SiDownloadIcon,
  SiTerminalIcon,
  SiTextWrapIcon,
} from '@semantic-icons/lucide-icons';

/** Your buttons beside the copy one, as scButton: wrap the lines (pressed while on), download the output. */
@Component({
  selector: 'app-actions-code-block-demo',
  imports: [
    ScButton,
    ScCodeBlock,
    ScCodeBlockHeader,
    ScCodeBlockTitle,
    ScCodeBlockActions,
    ScCodeBlockCopy,
    ScCodeBlockContent,
    SiCheckIcon,
    SiCopyIcon,
    SiDownloadIcon,
    SiTerminalIcon,
    SiTextWrapIcon,
  ],
  template: \`
    <div scCodeBlock>
      <div scCodeBlockHeader>
        <div scCodeBlockTitle><svg siTerminalIcon></svg>Terminal</div>
        <div scCodeBlockActions>
          <button
            scButton
            variant="ghost"
            size="icon-xs"
            class="aria-pressed:text-foreground"
            [attr.aria-pressed]="wrap()"
            (click)="wrap.set(!wrap())"
          >
            <svg siTextWrapIcon></svg>
            <span class="sr-only">Wrap lines</span>
          </button>
          <button scButton variant="ghost" size="icon-xs" (click)="download()">
            <svg siDownloadIcon></svg>
            <span class="sr-only">Download</span>
          </button>
          <button [scCodeBlockCopy]="output" #copy="scCodeBlockCopy">
            @if (copy.copied()) {
              <svg siCheckIcon></svg>
            } @else {
              <svg siCopyIcon></svg>
            }
            <span class="sr-only">Copy output</span>
          </button>
        </div>
      </div>
      <pre scCodeBlockContent [code]="output" [wrap]="wrap()"></pre>
      <span aria-live="polite" class="sr-only">
        @if (copy.copied()) {
          Copied
        }
      </span>
    </div>
  \`,
  host: { class: 'block w-full max-w-md' },
  encapsulation: ViewEncapsulation.None,
})
export class ActionsCodeBlockDemo {
  readonly output = \`$ pnpm build
> next build

✓ Compiled successfully in 4.2s
✓ Linting and checking validity of types
✓ Generating static pages (12/12)\`;
  protected readonly wrap = signal(false);
  private readonly document = inject(DOCUMENT);

  protected download(): void {
    const link = this.document.createElement('a');
    link.href = URL.createObjectURL(
      new Blob([this.output], { type: 'text/plain' }),
    );
    link.download = 'build.log';
    link.click();
    URL.revokeObjectURL(link.href);
  }
}`;
}
