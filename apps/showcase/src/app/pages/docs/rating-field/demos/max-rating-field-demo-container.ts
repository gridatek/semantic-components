import {
  ChangeDetectionStrategy,
  Component,
  ViewEncapsulation,
} from '@angular/core';
import { DemoContainer } from '../../../../components/demo-container/demo-container';
import { MaxRatingFieldDemo } from './max-rating-field-demo';

@Component({
  selector: 'app-max-rating-field-demo-container',
  imports: [DemoContainer, MaxRatingFieldDemo],
  template: `
    <app-demo-container title="Custom Maximum" [code]="code">
      <app-max-rating-field-demo />
    </app-demo-container>
  `,
  host: { class: 'block' },
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MaxRatingFieldDemoContainer {
  readonly code = `import {
  ChangeDetectionStrategy,
  Component,
  ViewEncapsulation,
  signal,
} from '@angular/core';
import {
  ScRatingField,
  ScRatingFieldItem,
  ScRatingIcon,
  ScRatingItemGroup,
} from '@semantic-components/ui-lab';
import { SiStarIcon } from '@semantic-icons/lucide-icons';

@Component({
  selector: 'app-max-rating-field-demo',
  imports: [
    ScRatingField,
    ScRatingItemGroup,
    ScRatingFieldItem,
    ScRatingIcon,
    SiStarIcon,
  ],
  template: \`
    <div class="flex flex-col gap-2">
      <div scRatingField [(value)]="rating">
        <div scRatingItemGroup>
          @for (i of [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]; track i) {
            <span scRatingItem [value]="i">
              <svg siStarIcon scRatingIcon class="size-5"></svg>
            </span>
          }
        </div>
      </div>
      <p class="text-muted-foreground text-sm">Rating: {{ rating() }} / 10</p>
    </div>
  \`,
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MaxRatingFieldDemo {
  readonly rating = signal(7);
}`;
}
