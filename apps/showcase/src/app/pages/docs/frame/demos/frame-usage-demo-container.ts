import { Component, ViewEncapsulation } from '@angular/core';
import { UsageCode } from '../../../../components/usage-code/usage-code';
import { FrameUsageDemo } from './frame-usage-demo';

@Component({
  selector: 'app-frame-usage-demo-container',
  imports: [UsageCode, FrameUsageDemo],
  template: `
    <app-usage-code [code]="code">
      <ng-template><app-frame-usage-demo /></ng-template>
    </app-usage-code>
  `,
  host: { class: 'block w-full' },
  encapsulation: ViewEncapsulation.None,
})
export class FrameUsageDemoContainer {
  readonly code = `import { Component, ViewEncapsulation } from '@angular/core';
import { ScFrame } from '@semantic-components/ui';

@Component({
  selector: 'app-frame-usage-demo',
  imports: [ScFrame],
  template: \`
    <div scFrame class="w-full max-w-sm p-6">
      <p class="text-sm font-medium">Framed</p>
      <p class="text-muted-foreground text-sm">
        The style's card corners, ring and shadow, round any box.
      </p>
    </div>
  \`,
  host: { class: 'flex w-full justify-center' },
  encapsulation: ViewEncapsulation.None,
})
export class FrameUsageDemo {}`;
}
