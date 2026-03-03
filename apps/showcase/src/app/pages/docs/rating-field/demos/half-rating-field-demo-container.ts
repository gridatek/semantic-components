import {
  ChangeDetectionStrategy,
  Component,
  ViewEncapsulation,
} from '@angular/core';
import { DemoContainer } from '../../../../components/demo-container/demo-container';
import { HalfRatingFieldDemo } from './half-rating-field-demo';

@Component({
  selector: 'app-half-rating-field-demo-container',
  imports: [DemoContainer, HalfRatingFieldDemo],
  template: `
    <app-demo-container title="Half-Star Rating" [code]="code">
      <app-half-rating-field-demo />
    </app-demo-container>
  `,
  host: { class: 'block' },
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HalfRatingFieldDemoContainer {
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
  selector: 'app-half-rating-field-demo',
  imports: [
    ScRatingField,
    ScRatingItemGroup,
    ScRatingFieldItem,
    ScRatingIcon,
    SiStarIcon,
  ],
  template: \`
    <div class="flex flex-col gap-2">
      <div scRatingField [(value)]="rating" [allowHalf]="true">
        <div scRatingItemGroup>
          @for (i of [1, 2, 3, 4, 5]; track i) {
            <span scRatingItem [value]="i">
              <svg siStarIcon scRatingIcon></svg>
              <svg siStarIcon scRatingIcon></svg>
            </span>
          }
        </div>
      </div>
      <p class="text-muted-foreground text-sm">
        Rating: {{ rating() }} / 5 (click left/right half of stars)
      </p>
    </div>
  \`,
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HalfRatingFieldDemo {
  readonly rating = signal(3.5);
}`;
}
