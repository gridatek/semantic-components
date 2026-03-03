import {
  ChangeDetectionStrategy,
  Component,
  ViewEncapsulation,
} from '@angular/core';
import { DemoContainer } from '../../../../components/demo-container/demo-container';
import { CustomIconsRatingFieldDemo } from './custom-icons-rating-field-demo';

@Component({
  selector: 'app-custom-icons-rating-field-demo-container',
  imports: [DemoContainer, CustomIconsRatingFieldDemo],
  template: `
    <app-demo-container title="Custom Icons" [code]="code">
      <app-custom-icons-rating-field-demo />
    </app-demo-container>
  `,
  host: { class: 'block' },
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CustomIconsRatingFieldDemoContainer {
  readonly code = `import {
  ChangeDetectionStrategy,
  Component,
  signal,
  ViewEncapsulation,
} from '@angular/core';
import {
  ScRatingField,
  ScRatingFieldItem,
  ScRatingIcon,
  ScRatingItemGroup,
} from '@semantic-components/ui-lab';
import { SiHeartIcon } from '@semantic-icons/lucide-icons';

@Component({
  selector: 'app-custom-icons-rating-field-demo',
  imports: [ScRatingField, ScRatingItemGroup, ScRatingFieldItem, ScRatingIcon, SiHeartIcon],
  template: \`
    <div class="flex flex-col gap-2">
      <div
        scRatingField
        [(value)]="rating"
        [style.--sc-rating-active-color]="'var(--color-red-500)'"
      >
        <div scRatingItemGroup>
          @for (i of [1, 2, 3, 4, 5]; track i) {
            <span scRatingItem [value]="i">
              <svg siHeartIcon scRatingIcon></svg>
            </span>
          }
        </div>
      </div>
      <p class="text-muted-foreground text-sm">Hearts: {{ rating() }} / 5</p>
    </div>
  \`,
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CustomIconsRatingFieldDemo {
  readonly rating = signal(4);
}`;
}
