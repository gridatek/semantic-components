import { Component, ViewEncapsulation } from '@angular/core';
import { ScHeading } from '@semantic-components/ui';
import { ComponentBadges } from '../../../components/component-badges/component-badges';
import { TocHeading } from '../../../components/toc/toc-heading';
import { BasicGanttDemoContainer } from './demos/basic-gantt-demo-container';
import { MilestonesGanttDemoContainer } from './demos/milestones-gantt-demo-container';
import { RtlGanttDemoContainer } from './demos/rtl-gantt-demo-container';
import { ScalesGanttDemoContainer } from './demos/scales-gantt-demo-container';

@Component({
  selector: 'app-gantt-page',
  imports: [
    BasicGanttDemoContainer,
    ScalesGanttDemoContainer,
    MilestonesGanttDemoContainer,
    RtlGanttDemoContainer,
    TocHeading,
    ComponentBadges,
    ScHeading,
  ],
  template: `
    <div class="space-y-8">
      <div class="space-y-2">
        <h1 scHeading>Gantt</h1>
        <p class="text-muted-foreground">
          A Data Table with a timeline column: each row's bar from its start to
          its end, its progress, arrows to the tasks that follow. Drag a bar,
          its ends or its progress; or, on a row, Alt+←/→ moves it a day,
          Alt+Shift+←/→ its end, Alt+↑/↓ its progress. The bar proposes the
          change, your data applies it.
        </p>
        <app-component-badges path="gantt" />
      </div>

      <section class="space-y-8">
        <h2 scHeading appToc>Examples</h2>
        <app-basic-gantt-demo-container />
        <app-scales-gantt-demo-container />
        <app-milestones-gantt-demo-container />
        <app-rtl-gantt-demo-container />
      </section>
    </div>
  `,
  encapsulation: ViewEncapsulation.None,
})
export default class GanttPage {}
