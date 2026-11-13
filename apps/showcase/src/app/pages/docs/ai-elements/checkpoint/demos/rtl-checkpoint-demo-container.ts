import { Component, ViewEncapsulation } from '@angular/core';
import { DemoContainer } from '../../../../../components/demo-container/demo-container';
import { RtlCheckpointDemo } from './rtl-checkpoint-demo';

@Component({
  selector: 'app-rtl-checkpoint-demo-container',
  imports: [DemoContainer, RtlCheckpointDemo],
  template: `
    <app-demo-container
      title="RTL"
      demoUrl="/demos/ai-elements/rtl-checkpoint-demo"
      [code]="code"
    >
      <app-rtl-checkpoint-demo />
    </app-demo-container>
  `,
  host: { class: 'block w-full' },
  encapsulation: ViewEncapsulation.None,
})
export class RtlCheckpointDemoContainer {
  readonly code = `import { Dir } from '@angular/cdk/bidi';
import { Component, ViewEncapsulation } from '@angular/core';
import {
  ScBubble,
  ScBubbleContent,
  ScButton,
  ScMarker,
  ScMarkerContent,
  ScMessage,
  ScMessageContent,
} from '@semantic-components/ui';

/** Right to left: the checkpoint between two turns, its Restore button after the label. */
@Component({
  selector: 'app-rtl-checkpoint-demo',
  imports: [
    Dir,
    ScBubble,
    ScBubbleContent,
    ScButton,
    ScMarker,
    ScMarkerContent,
    ScMessage,
    ScMessageContent,
  ],
  template: \`
    <div
      dir="rtl"
      lang="ar"
      class="flex w-full max-w-sm flex-col gap-4 py-6 text-sm"
    >
      <div scMessage alignment="end">
        <div scMessageContent>
          <div scBubble alignment="end" variant="muted">
            <div scBubbleContent>أعد تسمية مكوّن الزر إلى إجراء.</div>
          </div>
        </div>
      </div>
      <div scMessage>
        <div scMessageContent>
          <p>أعدت تسمية Button إلى Action في components/ui/button.tsx.</p>
        </div>
      </div>
      <div scMarker variant="separator">
        <span scMarkerContent class="inline-flex items-center gap-2">
          أُعيدت تسمية الزر
          <button scButton size="xs" variant="outline">
            استعادة
            <span class="sr-only">إلى إعادة تسمية الزر</span>
          </button>
        </span>
      </div>
      <div scMessage alignment="end">
        <div scMessageContent>
          <div scBubble alignment="end" variant="muted">
            <div scBubbleContent>حدّث التوثيق ليطابق.</div>
          </div>
        </div>
      </div>
    </div>
  \`,
  host: { class: 'flex w-full justify-center' },
  encapsulation: ViewEncapsulation.None,
})
export class RtlCheckpointDemo {}`;
}
