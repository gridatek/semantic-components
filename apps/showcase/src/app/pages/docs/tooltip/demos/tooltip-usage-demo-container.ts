import { Component, ViewEncapsulation } from '@angular/core';
import { UsageCode } from '../../../../components/usage-code/usage-code';
import { TooltipUsageDemo } from './tooltip-usage-demo';

@Component({
  selector: 'app-tooltip-usage-demo-container',
  imports: [UsageCode, TooltipUsageDemo],
  template: `
    <app-usage-code [code]="code">
      <ng-template><app-tooltip-usage-demo /></ng-template>
    </app-usage-code>
  `,
  host: { class: 'block w-full' },
  encapsulation: ViewEncapsulation.None,
})
export class TooltipUsageDemoContainer {
  readonly code = `import { Component, ViewEncapsulation } from '@angular/core';
import {
  ScButton,
  ScTooltip,
  ScTooltipArrow,
  ScTooltipPortal,
  ScTooltipProvider,
  ScTooltipTrigger,
} from '@semantic-components/ui';

@Component({
  selector: 'app-tooltip-usage-demo',
  imports: [
    ScButton,
    ScTooltip,
    ScTooltipArrow,
    ScTooltipPortal,
    ScTooltipProvider,
    ScTooltipTrigger,
  ],
  template: \`
    <div scTooltipProvider>
      <button scButton scTooltipTrigger variant="outline">Hover</button>
      <ng-template scTooltipPortal>
        <div scTooltip>
          Add to library
          <span scTooltipArrow></span>
        </div>
      </ng-template>
    </div>
  \`,
  host: { class: 'flex w-full justify-center' },
  encapsulation: ViewEncapsulation.None,
})
export class TooltipUsageDemo {}`;
}
