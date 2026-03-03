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
  signal,
  ViewEncapsulation,
} from '@angular/core';
import {
  ScRatingField,
  ScRatingItemGroup,
  ScRatingFieldItem,
} from '@semantic-components/ui-lab';
import { SiStarIcon } from '@semantic-icons/lucide-icons';

@Component({
  selector: 'app-half-rating-field-demo',
  imports: [ScRatingField, ScRatingItemGroup, ScRatingFieldItem, SiStarIcon],
  template: \`
    <div class="flex flex-col gap-2">
      <div scRatingField [(value)]="rating" [allowHalf]="true">
        <div scRatingItemGroup class="flex gap-0.5">
          @for (i of [1, 2, 3, 4, 5]; track i) {
            <span
              scRatingItem
              [value]="i"
              #item="scRatingItem"
              class="relative cursor-pointer transition-transform hover:scale-110"
            >
              <svg siStarIcon class="size-6 text-gray-300"></svg>
              <svg
                siStarIcon
                class="absolute inset-0 size-6 fill-yellow-400 text-yellow-400 transition-colors"
                [class.hidden]="item.state() === 'empty'"
                [style.clip-path]="
                  item.state() === 'half' ? 'inset(0 50% 0 0)' : 'none'
                "
              ></svg>
            </span>
          }
        </div>
      </div>
      <p class="text-sm text-muted-foreground">
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
