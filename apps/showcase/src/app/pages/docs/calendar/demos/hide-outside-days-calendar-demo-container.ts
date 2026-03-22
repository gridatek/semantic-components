import {
  ChangeDetectionStrategy,
  Component,
  ViewEncapsulation,
} from '@angular/core';
import { DemoContainer } from '../../../../components/demo-container/demo-container';
import { HideOutsideDaysCalendarDemo } from './hide-outside-days-calendar-demo';

@Component({
  selector: 'app-hide-outside-days-calendar-demo-container',
  imports: [DemoContainer, HideOutsideDaysCalendarDemo],
  template: `
    <app-demo-container
      title="Hide Outside Days"
      description="Outside-month days are hidden, showing only days from the current month."
      demoUrl="/demos/calendar/hide-outside-days-calendar-demo"
      [code]="code"
    >
      <app-hide-outside-days-calendar-demo />
    </app-demo-container>
  `,
  host: { class: 'block w-full' },
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HideOutsideDaysCalendarDemoContainer {
  readonly code = '';
}
