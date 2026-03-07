import {
  ChangeDetectionStrategy,
  Component,
  ViewEncapsulation,
} from '@angular/core';
import { DemoContainer } from '../../../../components/demo-container/demo-container';
import { DescriptionStatCardDemo } from './description-stat-card-demo';

@Component({
  selector: 'app-description-stat-card-demo-container',
  imports: [DemoContainer, DescriptionStatCardDemo],
  template: `
    <app-demo-container
      title="With Description"
      demoUrl="/demos/stat-card/description-stat-card-demo"
      [code]="code"
    >
      <app-description-stat-card-demo />
    </app-demo-container>
  `,
  host: { class: 'block w-full' },
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DescriptionStatCardDemoContainer {
  readonly code = `import {
  ChangeDetectionStrategy,
  Component,
  ViewEncapsulation,
} from '@angular/core';
import {
  ScStatCard,
  ScStatCardChange,
  ScStatCardDescription,
  ScStatCardIcon,
  ScStatCardLabel,
  ScStatCardValue,
} from '@semantic-components/ui-lab';
import { SiChevronUpIcon, SiPercentIcon } from '@semantic-icons/lucide-icons';

@Component({
  selector: 'app-description-stat-card-demo',
  imports: [
    ScStatCard,
    ScStatCardLabel,
    ScStatCardValue,
    ScStatCardIcon,
    ScStatCardChange,
    ScStatCardDescription,
    SiPercentIcon,
    SiChevronUpIcon,
  ],
  template: \`
    <div class="max-w-sm">
      <div scStatCard>
        <div class="flex items-start justify-between">
          <div class="space-y-1">
            <p scStatCardLabel>Conversion Rate</p>
            <p scStatCardValue>3.24%</p>
          </div>
          <div scStatCardIcon>
            <svg siPercentIcon></svg>
          </div>
        </div>
        <div class="mt-3 flex items-center gap-2">
          <span scStatCardChange trend="up">
            <svg siChevronUpIcon class="size-3.5"></svg>
            <span>+2.4%</span>
          </span>
          <span class="text-muted-foreground text-xs">vs last week</span>
        </div>
        <p scStatCardDescription>
          Percentage of visitors who completed a purchase
        </p>
      </div>
    </div>
  \`,
  host: { class: 'block w-full' },
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DescriptionStatCardDemo {}`;
}
