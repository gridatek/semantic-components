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
  host: { class: 'block w-full' },
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
  ScRatingFieldGroup,
  ScRatingFieldIcon,
  ScRatingFieldItem,
} from '@semantic-components/ui';
import { SiStarIcon } from '@semantic-icons/lucide-icons';

@Component({
  selector: 'app-half-rating-field-demo',
  imports: [
    ScRatingField,
    ScRatingFieldGroup,
    ScRatingFieldItem,
    ScRatingFieldIcon,
    SiStarIcon,
  ],
  template: \`
    <div class="flex flex-col gap-2">
      <div scRatingField [(value)]="rating" [allowHalf]="true">
        <div scRatingFieldGroup>
          @for (i of [1, 2, 3, 4, 5]; track i) {
            <span scRatingFieldItem [value]="i">
              <svg siStarIcon scRatingFieldIcon></svg>
              <svg siStarIcon scRatingFieldIcon></svg>
            </span>
          }
        </div>
      </div>
      <p class="text-muted-foreground text-sm">
        Rating: {{ rating() }} / 5 (click left/right half of stars)
      </p>
    </div>
  \`,
  host: { class: 'flex w-full justify-center' },
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HalfRatingFieldDemo {
  readonly rating = signal(3.5);
}`;
}
