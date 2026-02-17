import {
  ChangeDetectionStrategy,
  Component,
  ViewEncapsulation,
} from '@angular/core';
import { DemoContainer } from '../../../../components/demo-container/demo-container';
import { BadgeTimezoneDemo } from './badge-timezone-demo';

@Component({
  selector: 'app-badge-timezone-demo-container',
  imports: [DemoContainer, BadgeTimezoneDemo],
  template: `
    <app-demo-container title="Badge" [code]="code">
      <app-badge-timezone-demo />
    </app-demo-container>
  `,
  host: { class: 'block' },
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BadgeTimezoneDemoContainer {
  readonly code = `import {
  ChangeDetectionStrategy,
  Component,
  ViewEncapsulation,
} from '@angular/core';
import { ScTimezoneBadge } from '@semantic-components/ui-lab';

@Component({
  selector: 'app-badge-timezone-demo',
  imports: [ScTimezoneBadge],
  template: \`
    <div class="flex items-center gap-4">
      <span scTimezoneBadge></span>
      <span scTimezoneBadge [showLabel]="true"></span>
      <span scTimezoneBadge [showOffset]="true"></span>
      <span scTimezoneBadge [showLabel]="true" [showOffset]="true"></span>
    </div>
  \`,
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BadgeTimezoneDemo {}`;
}
