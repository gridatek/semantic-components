import {
  ChangeDetectionStrategy,
  Component,
  ViewEncapsulation,
} from '@angular/core';
import {
  ScCard,
  ScCardContent,
  ScCardDescription,
  ScCardFooter,
  ScCardHeader,
  ScCardTitle,
} from '@semantic-components/ui-lab';

@Component({
  selector: 'app-basic-card-demo',
  imports: [
    ScCard,
    ScCardContent,
    ScCardDescription,
    ScCardFooter,
    ScCardHeader,
    ScCardTitle,
  ],
  template: `
    <div sc-card class="w-[350px]">
      <div sc-card-header>
        <h3 sc-card-title>Card Title</h3>
        <p sc-card-description>Card description goes here.</p>
      </div>
      <div sc-card-content>
        <p>
          Card content goes here. This is where the main content of the card
          lives.
        </p>
      </div>
      <div sc-card-footer>
        <p class="text-sm text-muted-foreground">Card footer</p>
      </div>
    </div>
  `,
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BasicCardDemo {}
