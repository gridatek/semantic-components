import {
  ChangeDetectionStrategy,
  Component,
  ViewEncapsulation,
} from '@angular/core';
import { DemoContainer } from '../../../../components/demo-container/demo-container';
import { DisabledRatingFieldDemo } from './disabled-rating-field-demo';

@Component({
  selector: 'app-disabled-rating-field-demo-container',
  imports: [DemoContainer, DisabledRatingFieldDemo],
  template: `
    <app-demo-container title="Disabled" [code]="code">
      <app-disabled-rating-field-demo />
    </app-demo-container>
  `,
  host: { class: 'block' },
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DisabledRatingFieldDemoContainer {
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
  selector: 'app-disabled-rating-field-demo',
  imports: [ScRatingField, ScRatingItemGroup, ScRatingFieldItem, SiStarIcon],
  template: \`
    <div class="flex flex-col gap-2">
      <div sc-rating-field [(value)]="rating" [disabled]="true">
        <div sc-rating-item-group class="flex gap-0.5">
          @for (i of [1, 2, 3, 4, 5]; track i) {
            <span sc-rating-item [value]="i" class="opacity-50">
              <svg
                si-star-icon
                class="size-6"
                [class.fill-yellow-400]="i <= rating()"
                [class.text-yellow-400]="i <= rating()"
                [class.text-gray-300]="i > rating()"
              ></svg>
            </span>
          }
        </div>
      </div>
      <p class="text-sm text-muted-foreground">
        Rating: {{ rating() }} / 5 (disabled)
      </p>
    </div>
  \`,
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DisabledRatingFieldDemo {
  readonly rating = signal(2);
}`;
}
