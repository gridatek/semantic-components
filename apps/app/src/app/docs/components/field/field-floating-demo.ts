import { ChangeDetectionStrategy, Component, ViewEncapsulation } from '@angular/core';

import {
  ScButton,
  ScCard,
  ScCardContent,
  ScCardDescription,
  ScCardHeader,
  ScCardTitle,
  ScField,
  ScInput,
  ScLabel,
} from '@semantic-components/ui';

@Component({
  selector: 'app-field-floating-demo',
  imports: [
    ScCard,
    ScCardHeader,
    ScCardTitle,
    ScCardDescription,
    ScCardContent,
    ScField,
    ScLabel,
    ScInput,
    ScButton,
  ],
  template: `
    <div class="w-[350px]" sc-card>
      <div sc-card-header>
        <h2 sc-card-title>Floating Labels</h2>
        <p sc-card-description>
          Fields with floating label animation that moves up when the input is focused or has
          content.
        </p>
      </div>

      <div class="space-y-4" sc-card-content>
        <div [floatingLabel]="true" sc-field>
          <label sc-label>Email</label>
          <input sc-input type="email" data-slot="control" />
        </div>

        <div [floatingLabel]="true" sc-field>
          <label sc-label>Full Name</label>
          <input sc-input data-slot="control" />
        </div>

        <div [floatingLabel]="true" sc-field>
          <label sc-label>Phone Number</label>
          <input sc-input type="tel" data-slot="control" />
        </div>

        <button sc-button type="submit">Submit</button>
      </div>
    </div>
  `,
  styles: ``,
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FieldFloatingDemo {}
