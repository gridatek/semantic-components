import {
  ChangeDetectionStrategy,
  Component,
  ViewEncapsulation,
} from '@angular/core';
import { DemoContainer } from '../../../../components/demo-container/demo-container';
import { BasicRatingFieldDemo } from './basic-rating-field-demo';

@Component({
  selector: 'app-basic-rating-field-demo-container',
  imports: [DemoContainer, BasicRatingFieldDemo],
  template: `
    <app-demo-container title="Basic" [code]="code">
      <app-basic-rating-field-demo />
    </app-demo-container>
  `,
  host: { class: 'block' },
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BasicRatingFieldDemoContainer {
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
} from '@semantic-components/ui';
import { SiStarIcon } from '@semantic-icons/lucide-icons';

@Component({
  selector: 'app-basic-rating-field-demo',
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
          @for (i of [1, 2, 3, 4, 5]; track i) {
            <span scRatingItem [value]="i">
              <svg siStarIcon scRatingIcon></svg>
            </span>
          }
        </div>
      </div>
      <p class="text-muted-foreground text-sm">Rating: {{ rating() }} / 5</p>
    </div>
  \`,
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BasicRatingFieldDemo {
  readonly rating = signal(3);
}`;
}
