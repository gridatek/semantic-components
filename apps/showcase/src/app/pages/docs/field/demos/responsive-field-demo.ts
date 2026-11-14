import { Component, ViewEncapsulation } from '@angular/core';
import {
  ScButton,
  ScField,
  ScFieldContentWrapper,
  ScFieldDescription,
  ScFieldGroup,
  ScFieldset,
  ScInput,
  ScLabel,
  ScLegend,
} from '@semantic-components/ui';

/** orientation="responsive": label and input stacked, side by side once the group is wide enough. */
@Component({
  selector: 'app-responsive-field-demo',
  imports: [
    ScButton,
    ScField,
    ScFieldContentWrapper,
    ScFieldDescription,
    ScFieldGroup,
    ScFieldset,
    ScInput,
    ScLabel,
    ScLegend,
  ],
  template: `
    <div class="w-full max-w-lg">
      <fieldset scFieldset>
        <legend scLegend>Profile</legend>
        <p scFieldDescription>Fill in your profile information.</p>
        <div scFieldGroup>
          <div scField orientation="responsive">
            <div scFieldContentWrapper>
              <label scLabel>Name</label>
              <p scFieldDescription>
                Provide your full name for identification
              </p>
            </div>
            <input scInput placeholder="Evil Rabbit" />
          </div>
          <div scField orientation="responsive">
            <button scButton type="button">Submit</button>
            <button scButton type="button" variant="outline">Cancel</button>
          </div>
        </div>
      </fieldset>
    </div>
  `,
  host: { class: 'flex w-full justify-center' },
  encapsulation: ViewEncapsulation.None,
})
export class ResponsiveFieldDemo {}
