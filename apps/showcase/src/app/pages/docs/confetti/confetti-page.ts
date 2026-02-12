import {
  ChangeDetectionStrategy,
  Component,
  ViewEncapsulation,
} from '@angular/core';
import { BasicConfettiDemoContainer } from './demos/basic-confetti-demo-container';
import { CornerBurstsConfettiDemoContainer } from './demos/corner-bursts-confetti-demo-container';
import { CustomColorsConfettiDemoContainer } from './demos/custom-colors-confetti-demo-container';
import { FromElementConfettiDemoContainer } from './demos/from-element-confetti-demo-container';
import { MultipleBurstsConfettiDemoContainer } from './demos/multiple-bursts-confetti-demo-container';
import { TocHeading } from '../../../components/toc/toc-heading';
import { ComponentStatusBadge } from '../../../components/component-status-badge/component-status-badge';
import { COMPONENTS } from '../../../data/components';

@Component({
  selector: 'app-confetti-page',
  imports: [
    BasicConfettiDemoContainer,
    FromElementConfettiDemoContainer,
    CustomColorsConfettiDemoContainer,
    MultipleBurstsConfettiDemoContainer,
    CornerBurstsConfettiDemoContainer,
    TocHeading,
    ComponentStatusBadge,
  ],
  template: `
    <div class="space-y-8">
      <div class="space-y-2">
        <h1 class="text-3xl font-bold tracking-tight">Confetti</h1>
        <p class="text-muted-foreground">A confetti component.</p>
        <app-component-status-badge [status]="componentStatus" />
      </div>

      <section class="space-y-8">
        <h2 toc class="text-xl font-semibold tracking-tight">Examples</h2>
        <app-basic-confetti-demo-container />
        <app-from-element-confetti-demo-container />
        <app-custom-colors-confetti-demo-container />
        <app-multiple-bursts-confetti-demo-container />
        <app-corner-bursts-confetti-demo-container />
      </section>
    </div>
  `,
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export default class ConfettiPage {
  readonly componentStatus = COMPONENTS.find((c) => c.path === 'confetti')!
    .status;
}
