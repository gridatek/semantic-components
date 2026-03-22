import {
  ChangeDetectionStrategy,
  Component,
  ViewEncapsulation,
} from '@angular/core';
import { DemoContainer } from '../../../../components/demo-container/demo-container';
import { KeepOutsideDaysCalendarDemo } from './keep-outside-days-calendar-demo';

@Component({
  selector: 'app-keep-outside-days-calendar-demo-container',
  imports: [DemoContainer, KeepOutsideDaysCalendarDemo],
  template: `
    <app-demo-container
      title="Keep Month on Outside Day Click"
      description="Clicking an outside-month day selects it but stays on the current month view."
      demoUrl="/demos/calendar/keep-outside-days-calendar-demo"
      [code]="code"
    >
      <app-keep-outside-days-calendar-demo />
    </app-demo-container>
  `,
  host: { class: 'block w-full' },
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class KeepOutsideDaysCalendarDemoContainer {
  readonly code = '';
}
