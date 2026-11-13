import { Component, ViewEncapsulation } from '@angular/core';
import { DemoContainer } from '../../../../../components/demo-container/demo-container';
import { MutedFramesStackTraceDemo } from './muted-frames-stack-trace-demo';

@Component({
  selector: 'app-muted-frames-stack-trace-demo-container',
  imports: [DemoContainer, MutedFramesStackTraceDemo],
  template: `
    <app-demo-container
      title="Muted frames"
      demoUrl="/demos/ai-elements/muted-frames-stack-trace-demo"
      [code]="code"
    >
      <app-muted-frames-stack-trace-demo />
    </app-demo-container>
  `,
  host: { class: 'block w-full' },
  encapsulation: ViewEncapsulation.None,
})
export class MutedFramesStackTraceDemoContainer {
  readonly code = `import { Component, ViewEncapsulation } from '@angular/core';
import {
  ScCollapsible,
  ScCollapsiblePanel,
  ScCollapsibleTrigger,
  ScTrace,
  ScTraceCollapsible,
  ScTraceCollapsiblePanelContent,
  ScTraceCollapsibleTrigger,
  ScTraceIcon,
  ScTraceLine,
  ScTraceTitle,
} from '@semantic-components/ui';
import { SiCircleXIcon } from '@semantic-icons/lucide-icons';

const STACK = \`TypeError: Cannot read properties of undefined (reading 'total')
    at formatInvoice (app/lib/billing.ts:42:31)
    at InvoiceRow (app/components/invoice-row.tsx:18:12)
    at renderWithHooks (node_modules/react-dom/cjs/react-dom.development.js:14985:18)
    at beginWork (node_modules/react-dom/cjs/react-dom.development.js:19049:16)\`;

/** The error, then every frame: the framework's muted, yours in the text colour. */
@Component({
  selector: 'app-muted-frames-stack-trace-demo',
  imports: [
    ScCollapsible,
    ScCollapsiblePanel,
    ScCollapsibleTrigger,
    ScTrace,
    ScTraceCollapsible,
    ScTraceCollapsiblePanelContent,
    ScTraceCollapsibleTrigger,
    ScTraceIcon,
    ScTraceLine,
    ScTraceTitle,
    SiCircleXIcon,
  ],
  template: \`
    <div scTrace class="w-full max-w-sm">
      <div scCollapsible scTraceCollapsible [open]="true">
        <button scCollapsibleTrigger scTraceCollapsibleTrigger>
          <span scTraceLine status="error">
            <span scTraceIcon><svg siCircleXIcon></svg></span>
            <span scTraceTitle>Failed: {{ error }}</span>
          </span>
        </button>
        <div scCollapsiblePanel>
          <div scTraceCollapsiblePanelContent>
            <div
              class="bg-muted flex flex-col gap-2 overflow-x-auto rounded-md p-3 font-mono text-xs"
              tabindex="0"
              role="region"
              aria-label="Stack trace"
            >
              <p class="text-destructive">{{ error }}</p>
              <ol>
                @for (frame of frames; track $index) {
                  <li
                    class="whitespace-nowrap"
                    [class.text-foreground]="!frame.includes('node_modules')"
                  >
                    {{ frame }}
                  </li>
                }
              </ol>
            </div>
          </div>
        </div>
      </div>
    </div>
  \`,
  host: { class: 'flex w-full justify-center' },
  encapsulation: ViewEncapsulation.None,
})
export class MutedFramesStackTraceDemo {
  private readonly lines = STACK.split('\\n').map((line) => line.trim());
  protected readonly error = this.lines[0];
  protected readonly frames = this.lines.slice(1);
}`;
}
