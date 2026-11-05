import { Component, ViewEncapsulation } from '@angular/core';
import { DemoContainer } from '../../../../components/demo-container/demo-container';
import { HeightCodeBlockDemo } from './height-code-block-demo';

@Component({
  selector: 'app-height-code-block-demo-container',
  imports: [DemoContainer, HeightCodeBlockDemo],
  template: `
    <app-demo-container
      title="Height"
      demoUrl="/demos/code-block/height-code-block-demo"
      [code]="code"
    >
      <app-height-code-block-demo />
    </app-demo-container>
  `,
  host: { class: 'block w-full' },
  encapsulation: ViewEncapsulation.None,
})
export class HeightCodeBlockDemoContainer {
  readonly code = `import { Component, ViewEncapsulation } from '@angular/core';
import {
  ScCodeBlock,
  ScCodeBlockActions,
  ScCodeBlockContent,
  ScCodeBlockCopy,
  ScCodeBlockHeader,
  ScCodeBlockTitle,
} from '@semantic-components/ui/code-block';
import { SiCheckIcon, SiCopyIcon } from '@semantic-icons/lucide-icons';

/** A max height on the code: it scrolls, its edges fading. */
@Component({
  selector: 'app-height-code-block-demo',
  imports: [
    ScCodeBlock,
    ScCodeBlockHeader,
    ScCodeBlockTitle,
    ScCodeBlockActions,
    ScCodeBlockCopy,
    ScCodeBlockContent,
    SiCheckIcon,
    SiCopyIcon,
  ],
  template: \`
    <div scCodeBlock>
      <div scCodeBlockHeader>
        <div scCodeBlockTitle>Logs</div>
        <div scCodeBlockActions>
          <button [scCodeBlockCopy]="logs" #copy="scCodeBlockCopy">
            @if (copy.copied()) {
              <svg siCheckIcon></svg>
            } @else {
              <svg siCopyIcon></svg>
            }
            <span class="sr-only">Copy logs</span>
          </button>
        </div>
      </div>
      <pre
        scCodeBlockContent
        [code]="logs"
        class="scroll-fade-y max-h-48"
      ></pre>
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
export class HeightCodeBlockDemo {
  readonly logs = \`[12:00:00] GET /api/items/1 200 in 12ms
[12:00:01] GET /api/items/2 200 in 13ms
[12:00:02] GET /api/items/3 200 in 14ms
[12:00:03] GET /api/items/4 200 in 15ms
[12:00:04] GET /api/items/5 200 in 16ms
[12:00:05] GET /api/items/6 200 in 17ms
[12:00:06] GET /api/items/7 200 in 18ms
[12:00:07] GET /api/items/8 200 in 19ms
[12:00:08] GET /api/items/9 200 in 20ms
[12:00:09] GET /api/items/10 200 in 21ms
[12:00:10] GET /api/items/11 200 in 22ms
[12:00:11] GET /api/items/12 200 in 23ms
[12:00:12] GET /api/items/13 200 in 24ms
[12:00:13] GET /api/items/14 200 in 25ms
[12:00:14] GET /api/items/15 200 in 26ms
[12:00:15] GET /api/items/16 200 in 27ms
[12:00:16] GET /api/items/17 200 in 28ms
[12:00:17] GET /api/items/18 200 in 29ms
[12:00:18] GET /api/items/19 200 in 30ms
[12:00:19] GET /api/items/20 200 in 31ms
[12:00:20] GET /api/items/21 200 in 32ms
[12:00:21] GET /api/items/22 200 in 33ms
[12:00:22] GET /api/items/23 200 in 34ms
[12:00:23] GET /api/items/24 200 in 35ms\`;
}`;
}
