import { Component, ViewEncapsulation } from '@angular/core';
import { DemoContainer } from '../../../../components/demo-container/demo-container';
import { SeparatorMarkerDemo } from './separator-marker-demo';

@Component({
  selector: 'app-separator-marker-demo-container',
  imports: [DemoContainer, SeparatorMarkerDemo],
  template: `
    <app-demo-container
      title="Separator"
      demoUrl="/demos/marker/separator-marker-demo"
      [code]="code"
    >
      <app-separator-marker-demo />
    </app-demo-container>
  `,
  host: { class: 'block w-full' },
  encapsulation: ViewEncapsulation.None,
})
export class SeparatorMarkerDemoContainer {
  readonly code = `import { Component, ViewEncapsulation } from '@angular/core';
import { ScMarker, ScMarkerContent } from '@semantic-components/ui';

/** A labeled divider — a date, a section — in a conversation. No role="separator": its label would be lost. */
@Component({
  selector: 'app-separator-marker-demo',
  imports: [ScMarker, ScMarkerContent],
  template: \`
    <div class="flex w-full max-w-sm flex-col gap-8 py-6">
      <div scMarker variant="separator">
        <span scMarkerContent>Today</span>
      </div>
      <div scMarker variant="separator">
        <span scMarkerContent>Worked for 42s</span>
      </div>
      <div scMarker variant="separator">
        <span scMarkerContent>Conversation compacted</span>
      </div>
    </div>
  \`,
  host: { class: 'flex w-full justify-center' },
  encapsulation: ViewEncapsulation.None,
})
export class SeparatorMarkerDemo {}`;
}
