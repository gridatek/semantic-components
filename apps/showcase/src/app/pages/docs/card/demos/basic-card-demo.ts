import {
  ChangeDetectionStrategy,
  Component,
  ViewEncapsulation,
} from '@angular/core';
import {
  ScCard,
  ScCardBody,
  ScCardDescription,
  ScCardFooter,
  ScCardHeader,
  ScCardTitle,
} from '@semantic-components/ui';

@Component({
  selector: 'app-basic-card-demo',
  imports: [
    ScCard,
    ScCardBody,
    ScCardDescription,
    ScCardFooter,
    ScCardHeader,
    ScCardTitle,
  ],
  template: `
    <div scCard class="w-[350px]">
      <div scCardHeader>
        <h3 scCardTitle>Card Title</h3>
        <p scCardDescription>Card description goes here.</p>
      </div>
      <div scCardBody>
        <p>
          Card content goes here. This is where the main content of the card
          lives.
        </p>
      </div>
      <div scCardFooter>
        <p class="text-sm text-muted-foreground">Card footer</p>
      </div>
    </div>
  `,
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BasicCardDemo {}
