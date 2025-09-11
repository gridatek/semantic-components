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
  selector: 'app-field-demo',
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
        <h2 sc-card-title>Field Component</h2>
        <p sc-card-description>
          The ScField component provides automatic accessibility features and form field management,
          eliminating the need to manually manage label-input relationships.
        </p>
      </div>

      <div class="space-y-4" sc-card-content>
        <div sc-field controlId="user-email">
          <label sc-label>Email</label>
          <input sc-input type="email" placeholder="Enter your email" data-slot="control" />
        </div>

        <div sc-field controlId="user-name">
          <label sc-label>Name</label>
          <input sc-input placeholder="Enter your name" data-slot="control" />
        </div>

        <div sc-field>
          <label sc-label>Message</label>
          <input sc-input placeholder="Enter your message" data-slot="control" />
        </div>

        <button sc-button type="submit">Submit</button>
      </div>
    </div>
  `,
  styles: ``,
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FieldDemo {}
